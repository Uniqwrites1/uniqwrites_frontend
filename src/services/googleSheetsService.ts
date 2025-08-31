// Google Sheets integration service
import { logEnvironmentVariables, testGoogleSheetsAccess } from '../debug/envTest';

export interface GoogleSheetsSubmission {
  formType: 'parent' | 'student' | 'school' | 'teacher' | 'initiative';
  submitterName: string;
  submitterEmail: string;
  formData: Record<string, unknown>;
  timestamp?: string;
}

class GoogleSheetsService {
  private hasTestedUrls = false;
  
  private readonly webAppUrls = {
    // You'll need to replace these with your actual Google Apps Script web app URLs
    parent: import.meta.env.VITE_GOOGLE_SHEETS_PARENT_URL || '',
    student: import.meta.env.VITE_GOOGLE_SHEETS_STUDENT_URL || '',
    school: import.meta.env.VITE_GOOGLE_SHEETS_SCHOOL_URL || '',
    teacher: import.meta.env.VITE_GOOGLE_SHEETS_TEACHER_URL || '',
    initiative: import.meta.env.VITE_GOOGLE_SHEETS_INITIATIVE_URL || '',
    // Fallback general URL if specific ones aren't configured
    general: import.meta.env.VITE_GOOGLE_SHEETS_GENERAL_URL || ''
  };

  /**
   * Submit form data to Google Sheets
   */
  async submitToGoogleSheets(submission: GoogleSheetsSubmission): Promise<boolean> {
    console.log('📊 Google Sheets Service - Starting submission:', submission.formType);
    
    // Debug environment variables
    logEnvironmentVariables();
    
    // Test URL access (only on first run)
    if (!this.hasTestedUrls) {
      await testGoogleSheetsAccess();
      this.hasTestedUrls = true;
    }
    
    try {
      // Add timestamp if not provided
      const submissionWithTimestamp = {
        ...submission,
        timestamp: submission.timestamp || new Date().toISOString()
      };

      // Get the appropriate web app URL
      const webAppUrl = this.getWebAppUrl(submission.formType);
      
      console.log('🔗 Debug - Available URLs:', this.webAppUrls);
      console.log('🔗 Debug - Selected URL for', submission.formType, ':', webAppUrl);
      
      if (!webAppUrl) {
        console.error(`❌ No Google Sheets web app URL configured for form type: ${submission.formType}`);
        return false;
      }

      console.log(`📊 Submitting to Google Sheets for ${submission.formType}...`);

      // Prepare the data based on form type
      const formattedData = this.formatDataForSheets(submissionWithTimestamp);
      console.log('📊 Formatted data for Google Sheets:', formattedData);

      const response = await fetch(webAppUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: JSON.stringify(formattedData),
        mode: 'no-cors'
      });

      console.log('📊 Response status:', response.status);
      console.log('📊 Response type:', response.type);

      // With no-cors mode, we can't read the response, but if no error was thrown, it likely succeeded
      if (response.type === 'opaque') {
        console.log('✅ Request sent successfully (no-cors mode)');
        console.log('🔍 Check your Google Sheet to verify if data was added');
        return true;
      }

      if (response.ok) {
        const result = await response.text();
        console.log('✅ Successfully submitted to Google Sheets:', result);
        
        // Try to parse the result to see if it contains success info
        try {
          const parsedResult = JSON.parse(result);
          if (parsedResult.success) {
            console.log('✅ Google Sheets confirmed success:', parsedResult);
          } else {
            console.log('⚠️ Google Sheets returned non-success response:', parsedResult);
          }
        } catch (parseError) {
          console.log('📊 Raw response (not JSON):', result.substring(0, 200));
        }
        
        return true;
      } else {
        const errorText = await response.text();
        console.error('❌ Google Sheets submission failed:', response.status, errorText.substring(0, 500));
        return false;
      }
    } catch (error) {
      console.error('❌ Google Sheets submission error:', error);
      
      // Log additional error details
      if (error instanceof Error) {
        console.error('Error name:', error.name);
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
      }
      
      // Check if it's a network error
      if (error instanceof TypeError && error.message.includes('fetch')) {
        console.error('💡 This appears to be a network/CORS error. Check if the Google Apps Script URL is correct and has "Anyone" access.');
      }
      
      return false;
    }
  }

  /**
   * Get the web app URL for a specific form type
   */
  private getWebAppUrl(formType: string): string {
    const url = this.webAppUrls[formType as keyof typeof this.webAppUrls];
    // Fallback to general URL if specific one isn't available
    return url || this.webAppUrls.general;
  }

  /**
   * Format data specifically for Google Sheets based on form details
   */
  private formatDataForSheets(submission: GoogleSheetsSubmission): Record<string, unknown> {
    const baseData = {
      timestamp: submission.timestamp,
      formType: submission.formType,
      name: submission.submitterName,
      email: submission.submitterEmail,
    };

    // For now, let's send a simplified format that matches our Google Apps Script
    // The script expects the base fields plus the raw form data
    return {
      ...baseData,
      ...submission.formData
    };
  }

  private formatParentDataForSheets(data: Record<string, unknown>): Record<string, unknown> {
    return {
      timestamp: data.timestamp,
      formType: data.formType,
      parentName: data.name,
      parentEmail: data.email,
      phoneNumber: data.phoneNumber || '',
      childName: data.childName || '',
      childAge: data.childAge || '',
      childGrade: data.childGrade || '',
      subjectsRequested: Array.isArray(data.subjectsRequested) 
        ? data.subjectsRequested.join(', ') 
        : data.subjectsRequested || '',
      preferredSchedule: data.preferredSchedule || '',
      learningGoals: data.learningGoals || '',
      specialRequirements: data.specialRequirements || '',
      preferredLocation: data.preferredLocation || '',
      budget: data.budget || '',
      additionalComments: data.additionalComments || ''
    };
  }

  private formatStudentDataForSheets(data: Record<string, unknown>): Record<string, unknown> {
    return {
      timestamp: data.timestamp,
      formType: data.formType,
      studentName: data.name,
      studentEmail: data.email,
      phoneNumber: data.phoneNumber || '',
      age: data.age || '',
      grade: data.grade || '',
      school: data.school || '',
      subjectsNeeded: Array.isArray(data.subjectsNeeded) 
        ? data.subjectsNeeded.join(', ') 
        : data.subjectsNeeded || '',
      currentChallenges: data.currentChallenges || '',
      learningGoals: data.learningGoals || '',
      preferredSchedule: data.preferredSchedule || '',
      parentName: data.parentName || '',
      parentContact: data.parentContact || '',
      additionalComments: data.additionalComments || ''
    };
  }

  private formatSchoolDataForSheets(data: Record<string, unknown>): Record<string, unknown> {
    return {
      timestamp: data.timestamp,
      formType: data.formType,
      contactPersonName: data.name,
      contactPersonEmail: data.email,
      schoolName: data.schoolName || '',
      schoolAddress: data.schoolAddress || '',
      phoneNumber: data.phoneNumber || '',
      position: data.position || '',
      serviceType: Array.isArray(data.serviceType) 
        ? data.serviceType.join(', ') 
        : data.serviceType || '',
      numberOfStudents: data.numberOfStudents || '',
      gradeLevel: data.gradeLevel || '',
      subjectsNeeded: Array.isArray(data.subjectsNeeded) 
        ? data.subjectsNeeded.join(', ') 
        : data.subjectsNeeded || '',
      projectDuration: data.projectDuration || '',
      budget: data.budget || '',
      specificRequirements: data.specificRequirements || '',
      preferredStartDate: data.preferredStartDate || '',
      additionalComments: data.additionalComments || ''
    };
  }

  private formatTeacherDataForSheets(data: Record<string, unknown>): Record<string, unknown> {
    return {
      timestamp: data.timestamp,
      formType: data.formType,
      teacherName: data.name,
      teacherEmail: data.email,
      phoneNumber: data.phoneNumber || '',
      qualifications: data.qualifications || '',
      experience: data.experience || '',
      subjectsOfExpertise: Array.isArray(data.subjectsOfExpertise) 
        ? data.subjectsOfExpertise.join(', ') 
        : data.subjectsOfExpertise || '',
      gradePreference: data.gradePreference || '',
      availability: data.availability || '',
      location: data.location || '',
      teachingApproach: data.teachingApproach || '',
      references: data.references || '',
      additionalInformation: data.additionalInformation || '',
      resume: data.resume || ''
    };
  }

  private formatInitiativeDataForSheets(data: Record<string, unknown>): Record<string, unknown> {
    return {
      timestamp: data.timestamp,
      formType: data.formType,
      participantName: data.name,
      participantEmail: data.email,
      phoneNumber: data.phoneNumber || '',
      interest: data.interest || '',
      participationType: data.participationType || '', // volunteer or sponsor
      availableTime: data.availableTime || '',
      skills: Array.isArray(data.skills) 
        ? data.skills.join(', ') 
        : data.skills || '',
      sponsorshipAmount: data.sponsorshipAmount || '',
      sponsorshipType: data.sponsorshipType || '',
      organization: data.organization || '',
      previousExperience: data.previousExperience || '',
      motivation: data.motivation || '',
      additionalComments: data.additionalComments || ''
    };
  }

  /**
   * Test the Google Sheets connection
   */
  async testConnection(formType: string): Promise<boolean> {
    const webAppUrl = this.getWebAppUrl(formType);
    
    if (!webAppUrl) {
      console.error(`❌ No web app URL configured for ${formType}`);
      return false;
    }

    try {
      const response = await fetch(webAppUrl, {
        method: 'GET',
        mode: 'cors'
      });

      return response.ok;
    } catch (error) {
      console.error(`❌ Connection test failed for ${formType}:`, error);
      return false;
    }
  }
}

export const googleSheetsService = new GoogleSheetsService();
