// Email service for the public site

const formspreeEndpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT;

export interface EmailData {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

export interface FormSubmissionEmail {
  formType: 'parent' | 'school' | 'teacher' | 'initiative';
  submitterName: string;
  submitterEmail: string;
  formData: Record<string, unknown>;
}

class EmailService {  // Send form submission to admin email
  async sendFormSubmission(submission: FormSubmissionEmail): Promise<boolean> {
    console.log('📧 Email Service - Starting form submission:', submission.formType);
    
    try {
      console.log('📧 Step 1: Attempting Vercel serverless function...');
      const success = await this.sendViaVercelFunction(submission);
      if (success) {
        console.log('✅ Email sent successfully via Vercel function');
        return true;
      }

      console.log('📧 Step 2: Vercel function failed, trying Formspree fallback...');
      const fallbackSuccess = await this.sendViaFormspree(submission);
      if (fallbackSuccess) {
        console.log('✅ Email sent successfully via Formspree fallback');
        return true;
      }

      console.log('❌ Both email methods failed');
      return false;
    } catch (error) {
      console.error('❌ Failed to send form submission email:', error);
      return false;
    }
  }  // Send via Vercel serverless function (recommended)
  private async sendViaVercelFunction(submission: FormSubmissionEmail): Promise<boolean> {
    const endpoints = ['/api/send-email', '/pages/api/send-email'];
    
    for (const endpoint of endpoints) {
      try {
        console.log(`📧 Vercel Function - Trying endpoint: ${endpoint}...`);
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: this.getSubjectByFormType(submission.formType),
            name: submission.submitterName,
            email: submission.submitterEmail,
            phone: this.extractPhoneFromFormData(submission.formData),
            interest: this.extractInterestFromFormData(submission.formData, submission.formType),
            sponsorType: this.extractSponsorTypeFromFormData(submission.formData),
            message: this.generatePlainTextContent(submission)
          })
        });

        if (response.ok) {
          const result = await response.json().catch(() => null);
          console.log(`✅ Email sent successfully via Vercel function (${endpoint}):`, result);
          return true;
        }

        const errorData = await response.text().catch(() => 'Unknown error');
        console.error(`❌ Endpoint ${endpoint} returned error:`, response.status, errorData);
      } catch (error) {
        console.error(`❌ Endpoint ${endpoint} failed:`, error);
      }
    }
    
    console.error('❌ All Vercel function endpoints failed');
    return false;
  }
  // Send via Formspree (free service fallback)
  private async sendViaFormspree(submission: FormSubmissionEmail): Promise<boolean> {
    try {      if (!formspreeEndpoint || formspreeEndpoint.includes('YOUR_FORM_ID')) {
        console.error('❌ Formspree endpoint is not configured. Please create a form at https://formspree.io');
        return false;
      }

      console.log('📧 Formspree - Sending to:', formspreeEndpoint);
      
      const formData = new FormData();
      formData.append('_replyto', submission.submitterEmail);
      formData.append('_subject', `${this.getSubjectByFormType(submission.formType)} - ${submission.submitterName}`);
      formData.append('name', submission.submitterName);
      formData.append('email', submission.submitterEmail);
      formData.append('formType', submission.formType);
      formData.append('message', this.generatePlainTextContent(submission));

      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        console.log('✅ Formspree submission successful');
        return true;
      } else {
        console.error('❌ Formspree submission failed:', response.status, await response.text().catch(() => 'Unknown error'));
        return false;
      }
    } catch (error) {
      console.error('❌ Formspree submission failed:', error);
      return false;
    }
  }

  private extractPhoneFromFormData(formData: Record<string, unknown>): string {
    const phone = formData.phoneNumber || formData.phone || formData.contactNumber;
    return typeof phone === 'string' ? phone : 'N/A';
  }
  private extractInterestFromFormData(formData: Record<string, unknown>, formType: string): string {
    switch (formType) {
      case 'parent':
        return typeof formData.subjectsRequested === 'string' ? formData.subjectsRequested : 'Parent tutoring request';
      case 'school':
        return typeof formData.serviceType === 'string' ? formData.serviceType : 'School service request';
      case 'teacher': {
        const subjects = formData.subjectsOfExpertise;
        return Array.isArray(subjects) ? subjects.join(', ') : 'Teacher application';
      }
      case 'initiative': {
        const interest = formData.interest || formData.message;
        return typeof interest === 'string' ? interest : 'Initiative interest';
      }
      default:
        return 'General inquiry';
    }
  }

  private extractSponsorTypeFromFormData(formData: Record<string, unknown>): string {
    const sponsorType = formData.sponsorshipType || formData.sponsorType;
    return typeof sponsorType === 'string' ? sponsorType : 'N/A';
  }

  private getSubjectByFormType(formType: string): string {
    const subjects = {
      parent: 'New Parent Tutoring Request',
      school: 'New School Service Request',
      teacher: 'New Teacher Application',
      initiative: 'New Initiative Interest'
    };
    return subjects[formType as keyof typeof subjects] || 'New Form Submission';
  }

  private generatePlainTextContent(submission: FormSubmissionEmail): string {
    const { formType, submitterName, submitterEmail, formData } = submission;

    let content = `New ${formType} form submission\n\n`;
    content += `Name: ${submitterName}\n`;
    content += `Email: ${submitterEmail}\n`;
    content += `Date: ${new Date().toLocaleString()}\n\n`;
    content += `Form Details:\n`;

    for (const [key, value] of Object.entries(formData)) {
      if (value !== undefined && value !== null && value !== '') {
        const formattedKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
        content += `${formattedKey}: ${JSON.stringify(value)}\n`;
      }
    }

    return content;
  }
}

export const emailService = new EmailService();
