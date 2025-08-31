import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

interface EmailRequest {
  type: string;
  name: string;
  email: string;
  phone?: string;
  interest?: string;
  sponsorType?: string;
  message: string;
  formType?: string;
  structuredData?: Record<string, unknown>;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { type, name, email, phone, interest, sponsorType, message, formType, structuredData }: EmailRequest = req.body;

    // Validate required fields
    if (!type || !name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }    // Create transporter using Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER, // Your Gmail address
        pass: process.env.GMAIL_APP_PASSWORD, // Gmail App Password
      },
    });

    // Format the email content
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
          ${type}
        </h2>
        
        <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #374151; margin-top: 0;">Contact Information</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          ${phone && phone !== 'N/A' ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
          ${interest && interest !== 'General inquiry' ? `<p><strong>Interest/Subject:</strong> ${interest}</p>` : ''}
          ${sponsorType && sponsorType !== 'N/A' ? `<p><strong>Sponsor Type:</strong> ${sponsorType}</p>` : ''}
        </div>

        ${structuredData && formType ? generateStructuredContent(structuredData, formType) : ''}

        <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
          <h3 style="color: #374151; margin-top: 0;">Complete Form Data</h3>
          <pre style="white-space: pre-wrap; font-family: monospace; background-color: #f3f4f6; padding: 15px; border-radius: 4px; overflow-x: auto; font-size: 12px;">${message}</pre>
        </div>

        <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">
          <p>This email was sent from the Uniqwrites website form submission system.</p>
          <p>Date: ${new Date().toLocaleString()}</p>
        </div>
      </div>
    `;

    // Email options
    const mailOptions = {
      from: `"Uniqwrites Website" <${process.env.GMAIL_USER}>`,
      to: 'info@uniqwrites.africa',
      replyTo: email,
      subject: `${type} - ${name}`,
      html: htmlContent,
      text: message, // Plain text fallback
    };    // Send admin notification email
    await transporter.sendMail(mailOptions);
    console.log(`Admin notification email sent successfully for ${type} from ${name} (${email})`);

    // Send user acknowledgment email
    const userEmailSent = await sendUserAcknowledgment(transporter, email, name, formType || 'contact', structuredData);
    
    return res.status(200).json({ 
      success: true, 
      message: 'Emails sent successfully',
      details: {
        adminNotification: true,
        userAcknowledgment: userEmailSent
      }
    });

  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ 
      error: 'Failed to send email', 
      details: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined 
    });
  }
}

function generateStructuredContent(structuredData: Record<string, unknown>, formType: string): string {
  switch (formType) {
    case 'teacher':
      return generateTeacherContent(structuredData);
    case 'parent':
      return generateParentContent(structuredData);
    case 'school':
      return generateSchoolContent(structuredData);
    case 'initiative':
      return generateInitiativeContent(structuredData);
    default:
      return '';
  }
}

function generateTeacherContent(data: Record<string, unknown>): string {
  const sections: string[] = [];
  
  // Personal Details Section
  const personalFields = ['fullName', 'gender', 'dateOfBirth', 'phoneNumber', 'email', 'address', 'state'];
  const personalDetails = personalFields
    .filter(field => data[field])
    .map(field => `<p><strong>${formatFieldLabel(field)}:</strong> ${data[field]}</p>`)
    .join('\n          ');
  
  if (personalDetails) {
    sections.push(`
        <div style="background-color: #f0f9ff; padding: 15px; border-radius: 6px; margin: 15px 0;">
          <h4 style="color: #0369a1; margin-top: 0; margin-bottom: 10px;">Personal Details</h4>
          ${personalDetails}
        </div>`);
  }

  // Academic Information Section
  const academicInfo: string[] = [];
  if (data.highestQualification) {
    academicInfo.push(`<p><strong>Highest Qualification:</strong> ${data.highestQualification}</p>`);
  }
  if (data.yearsOfExperience) {
    academicInfo.push(`<p><strong>Years of Experience:</strong> ${data.yearsOfExperience}</p>`);
  }
  if (data.teachingCertifications && Array.isArray(data.teachingCertifications)) {
    academicInfo.push(`<p><strong>Teaching Certifications:</strong> ${data.teachingCertifications.join(', ')}</p>`);
  }
  if (data.subjectsOfExpertise && Array.isArray(data.subjectsOfExpertise)) {
    academicInfo.push(`<p><strong>Subjects of Expertise:</strong> ${data.subjectsOfExpertise.join(', ')}</p>`);
  }
  if (data.preferredStudentLevels && Array.isArray(data.preferredStudentLevels)) {
    academicInfo.push(`<p><strong>Preferred Student Levels:</strong> ${data.preferredStudentLevels.join(', ')}</p>`);
  }

  if (academicInfo.length > 0) {
    sections.push(`
        <div style="background-color: #f0fdf4; padding: 15px; border-radius: 6px; margin: 15px 0;">
          <h4 style="color: #16a34a; margin-top: 0; margin-bottom: 10px;">Academic Information</h4>
          ${academicInfo.join('\n          ')}
        </div>`);
  }

  // Service Preferences Section
  const serviceInfo: string[] = [];
  if (data.availableMode && Array.isArray(data.availableMode)) {
    serviceInfo.push(`<p><strong>Available Modes:</strong> ${data.availableMode.join(', ')}</p>`);
  }
  if (data.preferredOpportunities && Array.isArray(data.preferredOpportunities)) {
    serviceInfo.push(`<p><strong>Preferred Opportunities:</strong> ${data.preferredOpportunities.join(', ')}</p>`);
  }

  if (serviceInfo.length > 0) {
    sections.push(`
        <div style="background-color: #fef3c7; padding: 15px; border-radius: 6px; margin: 15px 0;">
          <h4 style="color: #d97706; margin-top: 0; margin-bottom: 10px;">Service Preferences</h4>
          ${serviceInfo.join('\n          ')}
        </div>`);
  }

  return sections.join('\n      ');
}

function generateParentContent(data: Record<string, unknown>): string {
  const sections: string[] = [];
  
  // Parent Information Section
  const parentFields = ['fullName', 'phoneNumber', 'emailAddress', 'residentialAddress', 'stateOfResidence', 'relationshipToStudent'];
  const parentDetails = parentFields
    .filter(field => data[field])
    .map(field => `<p><strong>${formatFieldLabel(field)}:</strong> ${data[field]}</p>`)
    .join('\n          ');
  
  if (parentDetails) {
    sections.push(`
        <div style="background-color: #f0f9ff; padding: 15px; border-radius: 6px; margin: 15px 0;">
          <h4 style="color: #0369a1; margin-top: 0; margin-bottom: 10px;">Parent Information</h4>
          ${parentDetails}
        </div>`);
  }

  // Student Information Section
  if (data.students && Array.isArray(data.students)) {
    const studentsHtml = data.students.map((student: unknown, index: number) => {
      const studentRecord = student as Record<string, unknown>;
      return `
            <div style="margin-bottom: 10px; padding: 10px; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 4px;">
              <h5 style="margin: 0 0 5px 0; color: #374151;">Student ${index + 1}</h5>
              <p style="margin: 2px 0;"><strong>Name:</strong> ${studentRecord.name || 'N/A'}</p>
              <p style="margin: 2px 0;"><strong>Age:</strong> ${studentRecord.age || 'N/A'}</p>
              <p style="margin: 2px 0;"><strong>Current Class:</strong> ${studentRecord.currentClass || 'N/A'}</p>
              ${studentRecord.peculiarity ? `<p style="margin: 2px 0;"><strong>Special Notes:</strong> ${studentRecord.peculiarity}</p>` : ''}
            </div>`;
    }).join('');
    
    sections.push(`
        <div style="background-color: #f0fdf4; padding: 15px; border-radius: 6px; margin: 15px 0;">
          <h4 style="color: #16a34a; margin-top: 0; margin-bottom: 10px;">Student Information</h4>
          ${studentsHtml}
        </div>`);
  }

  // Tutoring Requirements Section
  const tutoringInfo: string[] = [];
  if (data.servicesType && typeof data.servicesType === 'object') {
    const services = Object.entries(data.servicesType as Record<string, boolean>)
      .filter(([, value]) => value)
      .map(([key]) => formatFieldLabel(key));
    if (services.length > 0) {
      tutoringInfo.push(`<p><strong>Requested Services:</strong> ${services.join(', ')}</p>`);
    }
  }
  
  if (data.subjectsRequested) {
    tutoringInfo.push(`<p><strong>Subjects Requested:</strong> ${data.subjectsRequested}</p>`);
  }
  if (data.preferredMode) {
    tutoringInfo.push(`<p><strong>Preferred Mode:</strong> ${data.preferredMode}</p>`);
  }
  if (data.durationPerLesson) {
    tutoringInfo.push(`<p><strong>Duration Per Lesson:</strong> ${data.durationPerLesson}</p>`);
  }
  if (data.preferredLessonTime) {
    tutoringInfo.push(`<p><strong>Preferred Lesson Time:</strong> ${data.preferredLessonTime}</p>`);
  }
  if (data.startDate) {
    tutoringInfo.push(`<p><strong>Start Date:</strong> ${data.startDate}</p>`);
  }
  if (data.preferredDays && typeof data.preferredDays === 'object') {
    const days = Object.entries(data.preferredDays as Record<string, boolean>)
      .filter(([, value]) => value)
      .map(([key]) => key.charAt(0).toUpperCase() + key.slice(1));
    if (days.length > 0) {
      tutoringInfo.push(`<p><strong>Preferred Days:</strong> ${days.join(', ')}</p>`);
    }
  }

  if (tutoringInfo.length > 0) {
    sections.push(`
        <div style="background-color: #fef3c7; padding: 15px; border-radius: 6px; margin: 15px 0;">
          <h4 style="color: #d97706; margin-top: 0; margin-bottom: 10px;">Tutoring Requirements</h4>
          ${tutoringInfo.join('\n          ')}
        </div>`);
  }

  // Tutor Preferences Section
  const tutorPrefs: string[] = [];
  if (data.preferredGender) {
    tutorPrefs.push(`<p><strong>Preferred Gender:</strong> ${data.preferredGender}</p>`);
  }
  if (data.languagePreference) {
    tutorPrefs.push(`<p><strong>Language Preference:</strong> ${data.languagePreference}</p>`);
  }
  if (data.qualificationsPriority) {
    tutorPrefs.push(`<p><strong>Qualifications Priority:</strong> ${data.qualificationsPriority}</p>`);
  }

  if (tutorPrefs.length > 0) {
    sections.push(`
        <div style="background-color: #fdf2f8; padding: 15px; border-radius: 6px; margin: 15px 0;">
          <h4 style="color: #be185d; margin-top: 0; margin-bottom: 10px;">Tutor Preferences</h4>
          ${tutorPrefs.join('\n          ')}
        </div>`);
  }

  return sections.join('\n      ');
}

function generateSchoolContent(data: Record<string, unknown>): string {
  const sections: string[] = [];
  
  // School Information Section
  const schoolFields = ['schoolName', 'schoolAddress', 'state', 'lga', 'schoolEmail', 'contactPersonName', 'contactPhoneNumber'];
  const schoolDetails = schoolFields
    .filter(field => data[field])
    .map(field => `<p><strong>${formatFieldLabel(field)}:</strong> ${data[field]}</p>`)
    .join('\n          ');
  
  if (data.schoolType && Array.isArray(data.schoolType)) {
    const schoolTypeHtml = `<p><strong>School Type:</strong> ${data.schoolType.join(', ')}</p>`;
    const combinedDetails = schoolDetails ? `${schoolDetails}\n          ${schoolTypeHtml}` : schoolTypeHtml;
    
    sections.push(`
        <div style="background-color: #f0f9ff; padding: 15px; border-radius: 6px; margin: 15px 0;">
          <h4 style="color: #0369a1; margin-top: 0; margin-bottom: 10px;">School Information</h4>
          ${combinedDetails}
        </div>`);
  } else if (schoolDetails) {
    sections.push(`
        <div style="background-color: #f0f9ff; padding: 15px; border-radius: 6px; margin: 15px 0;">
          <h4 style="color: #0369a1; margin-top: 0; margin-bottom: 10px;">School Information</h4>
          ${schoolDetails}
        </div>`);
  }

  // Service Type Section
  if (data.serviceType && Array.isArray(data.serviceType)) {
    sections.push(`
        <div style="background-color: #f0fdf4; padding: 15px; border-radius: 6px; margin: 15px 0;">
          <h4 style="color: #16a34a; margin-top: 0; margin-bottom: 10px;">Requested Services</h4>
          <p><strong>Service Types:</strong> ${data.serviceType.join(', ')}</p>
        </div>`);
  }

  // Teacher Request Details Section
  if (data.teacherRequestDetails && typeof data.teacherRequestDetails === 'object') {
    const details = data.teacherRequestDetails as Record<string, unknown>;
    const teacherInfo: string[] = [];
    
    if (details.numberOfTeachers) {
      teacherInfo.push(`<p><strong>Number of Teachers:</strong> ${details.numberOfTeachers}</p>`);
    }
    if (details.subjectsNeeded) {
      teacherInfo.push(`<p><strong>Subjects Needed:</strong> ${details.subjectsNeeded}</p>`);
    }
    if (details.duration) {
      teacherInfo.push(`<p><strong>Duration:</strong> ${details.duration}</p>`);
    }
    if (details.preferredStartDate) {
      teacherInfo.push(`<p><strong>Preferred Start Date:</strong> ${details.preferredStartDate}</p>`);
    }
    if (details.specificRequirements && Array.isArray(details.specificRequirements)) {
      teacherInfo.push(`<p><strong>Specific Requirements:</strong> ${details.specificRequirements.join(', ')}</p>`);
    }

    if (teacherInfo.length > 0) {
      sections.push(`
        <div style="background-color: #fef3c7; padding: 15px; border-radius: 6px; margin: 15px 0;">
          <h4 style="color: #d97706; margin-top: 0; margin-bottom: 10px;">Teacher Request Details</h4>
          ${teacherInfo.join('\n          ')}
        </div>`);
    }
  }

  // EdTech Service Details Section
  if (data.edTechServiceDetails && typeof data.edTechServiceDetails === 'object') {
    const details = data.edTechServiceDetails as Record<string, unknown>;
    const edTechInfo: string[] = [];
    
    if (details.areasOfInterest && Array.isArray(details.areasOfInterest)) {
      edTechInfo.push(`<p><strong>Areas of Interest:</strong> ${details.areasOfInterest.join(', ')}</p>`);
    }
    if (details.preferredMode) {
      edTechInfo.push(`<p><strong>Preferred Mode:</strong> ${details.preferredMode}</p>`);
    }
    if (details.budgetRange) {
      edTechInfo.push(`<p><strong>Budget Range:</strong> ${details.budgetRange}</p>`);
    }

    if (edTechInfo.length > 0) {
      sections.push(`
        <div style="background-color: #fdf2f8; padding: 15px; border-radius: 6px; margin: 15px 0;">
          <h4 style="color: #be185d; margin-top: 0; margin-bottom: 10px;">EdTech Service Details</h4>
          ${edTechInfo.join('\n          ')}
        </div>`);
    }
  }

  // Additional Notes Section
  if (data.additionalNotes) {
    sections.push(`
        <div style="background-color: #f3f4f6; padding: 15px; border-radius: 6px; margin: 15px 0;">
          <h4 style="color: #374151; margin-top: 0; margin-bottom: 10px;">Additional Notes</h4>
          <p style="white-space: pre-wrap;">${data.additionalNotes}</p>
        </div>`);
  }

  return sections.join('\n      ');
}

function generateInitiativeContent(data: Record<string, unknown>): string {
  const sections: string[] = [];
  
  // Basic Information Section
  const basicFields = ['name', 'email', 'phone', 'organization', 'role'];
  const basicDetails = basicFields
    .filter(field => data[field])
    .map(field => `<p><strong>${formatFieldLabel(field)}:</strong> ${data[field]}</p>`)
    .join('\n          ');
  
  if (basicDetails) {
    sections.push(`
        <div style="background-color: #f0f9ff; padding: 15px; border-radius: 6px; margin: 15px 0;">
          <h4 style="color: #0369a1; margin-top: 0; margin-bottom: 10px;">Contact Information</h4>
          ${basicDetails}
        </div>`);
  }

  // Interest/Initiative Details Section
  const interestInfo: string[] = [];
  if (data.interest) {
    interestInfo.push(`<p><strong>Area of Interest:</strong> ${data.interest}</p>`);
  }
  if (data.initiativeType) {
    interestInfo.push(`<p><strong>Initiative Type:</strong> ${data.initiativeType}</p>`);
  }
  if (data.sponsorshipType) {
    interestInfo.push(`<p><strong>Sponsorship Type:</strong> ${data.sponsorshipType}</p>`);
  }
  if (data.collaborationType) {
    interestInfo.push(`<p><strong>Collaboration Type:</strong> ${data.collaborationType}</p>`);
  }

  if (interestInfo.length > 0) {
    sections.push(`
        <div style="background-color: #f0fdf4; padding: 15px; border-radius: 6px; margin: 15px 0;">
          <h4 style="color: #16a34a; margin-top: 0; margin-bottom: 10px;">Initiative Details</h4>
          ${interestInfo.join('\n          ')}
        </div>`);
  }

  // Message/Description Section
  if (data.message || data.description) {
    const messageText = data.message || data.description;
    sections.push(`
        <div style="background-color: #fef3c7; padding: 15px; border-radius: 6px; margin: 15px 0;">
          <h4 style="color: #d97706; margin-top: 0; margin-bottom: 10px;">Message</h4>
          <p style="white-space: pre-wrap;">${messageText}</p>
        </div>`);
  }

  return sections.join('\n      ');
}

function formatFieldLabel(field: string): string {
  return field
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\s+/g, ' ')
    .trim();
}

// Send user acknowledgment email with role-specific messaging
async function sendUserAcknowledgment(
  transporter: nodemailer.Transporter, 
  userEmail: string, 
  userName: string, 
  formType: string, 
  formData?: Record<string, unknown>
): Promise<boolean> {
  try {
    const acknowledgmentData = getUserAcknowledgmentData(formType);
    const userSubmissionSummary = generateUserSubmissionSummary(formData || {}, formType);
    
    const userHtmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #000000 0%, #333333 100%); color: #FFC107; text-align: center; padding: 30px 20px;">
          <h1 style="margin: 0; font-size: 28px; font-weight: bold;">Uniqwrites</h1>
          <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Education with You in Mind</p>
        </div>

        <!-- Confirmation Message -->
        <div style="padding: 30px 20px; text-align: center; background-color: #f0fdf4; border-left: 4px solid #16a34a;">
          <div style="display: inline-block; width: 60px; height: 60px; background-color: #16a34a; border-radius: 50%; margin-bottom: 20px; position: relative;">
            <span style="color: white; font-size: 30px; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">✓</span>
          </div>
          <h2 style="color: #16a34a; margin: 0 0 10px 0; font-size: 24px;">${acknowledgmentData.title}</h2>
          <p style="color: #000000; font-size: 18px; margin: 0; font-weight: 500;">Hello ${userName}!</p>
        </div>

        <!-- Main Content -->
        <div style="padding: 30px 20px;">
          <p style="font-size: 16px; line-height: 1.6; color: #374151; margin-bottom: 25px;">
            ${acknowledgmentData.message}
          </p>

          <!-- Submission Summary -->
          ${userSubmissionSummary}

          <!-- Next Steps -->
          <div style="background-color: #fef3c7; padding: 25px; border-radius: 8px; margin: 25px 0;">
            <h3 style="color: #d97706; margin-top: 0; margin-bottom: 15px; font-size: 18px;">
              📋 What Happens Next?
            </h3>
            <ol style="margin: 0; padding-left: 20px; color: #374151;">              ${acknowledgmentData.nextSteps.map((step) => 
                `<li style="margin-bottom: 8px; line-height: 1.5;">${step}</li>`
              ).join('')}
            </ol>
          </div>

          <!-- Contact Information -->
          <div style="background-color: #f8fafc; padding: 25px; border-radius: 8px; margin: 25px 0;">
            <h3 style="color: #1f2937; margin-top: 0; margin-bottom: 15px; font-size: 18px;">
              📞 Need Immediate Assistance?
            </h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
              <div style="display: flex; align-items: center;">
                <span style="color: #FFC107; margin-right: 10px; font-size: 18px;">✉️</span>
                <div>
                  <p style="margin: 0; font-weight: 600; color: #1f2937;">Email Us</p>
                  <p style="margin: 0; color: #6b7280; font-size: 14px;">info@uniqwrites.africa</p>
                </div>
              </div>
              <div style="display: flex; align-items: center;">
                <span style="color: #FFC107; margin-right: 10px; font-size: 18px;">📞</span>
                <div>
                  <p style="margin: 0; font-weight: 600; color: #1f2937;">Call Us</p>
                  <p style="margin: 0; color: #6b7280; font-size: 14px;">Available 9 AM - 6 PM (WAT)</p>
                </div>
              </div>
            </div>
          </div>

          <!-- CTA Section -->
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://uniqwrites.vercel.app" 
               style="display: inline-block; background-color: #FFC107; color: #000000; padding: 15px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px;">
              Visit Our Website
            </a>
          </div>
        </div>

        <!-- Footer -->
        <div style="background-color: #1f2937; color: #ffffff; padding: 20px; text-align: center; font-size: 14px;">
          <p style="margin: 0 0 10px 0;">
            <strong>Uniqwrites Educational Concepts</strong>
          </p>
          <p style="margin: 0; opacity: 0.8;">
            Making learning accessible to all through technology, personalization, and strong relationships.
          </p>
          <p style="margin: 10px 0 0 0; opacity: 0.6; font-size: 12px;">
            This is an automated confirmation email. Please do not reply to this email.
          </p>
        </div>
      </div>
    `;

    const userMailOptions = {
      from: `"Uniqwrites Team" <${process.env.GMAIL_USER}>`,
      to: userEmail,
      subject: `Confirmation: ${acknowledgmentData.title}`,
      html: userHtmlContent,
    };

    await transporter.sendMail(userMailOptions);
    console.log(`✅ User acknowledgment email sent to ${userEmail}`);
    return true;

  } catch (error) {
    console.error('❌ Failed to send user acknowledgment email:', error);
    return false;
  }
}

// Get role-specific acknowledgment data
function getUserAcknowledgmentData(formType: string) {
  const acknowledgmentMessages = {
    parent: {
      title: 'Parent Tutoring Request Received!',
      message: 'Thank you for choosing Uniqwrites for your child\'s educational journey. We have successfully received your tutoring request and our dedicated team will contact you within 24 hours to discuss the perfect tutor match for your child\'s specific needs.',
      nextSteps: [
        'Our team will carefully review your requirements and preferences',
        'We will match you with suitable, qualified tutors from our network',
        'You will receive a personal call within 24 hours to discuss options',
        'Schedule a consultation meeting at your convenience',
        'Begin tutoring sessions with your selected tutor'
      ]
    },
    school: {
      title: 'School Service Request Received!',
      message: 'Thank you for your interest in Uniqwrites school services and educational solutions. We have received your service request and our education consultants will contact you within 48 hours to discuss your institution\'s specific needs and requirements.',
      nextSteps: [
        'Our consultants will thoroughly review your institutional requirements',
        'We will prepare a customized service proposal tailored to your needs',
        'You will receive a detailed consultation call to discuss solutions',
        'Schedule an on-site visit if needed for comprehensive assessment',
        'Begin implementation of approved educational services'
      ]
    },
    teacher: {
      title: 'Teacher Application Received!',
      message: 'Thank you for your interest in joining the Uniqwrites teaching team! We have successfully received your application and our HR team will review it within 72 hours. We appreciate your commitment to education and look forward to potentially welcoming you to our team.',
      nextSteps: [
        'Our HR team will thoroughly review your application and credentials',
        'We will verify your educational background and teaching experience',
        'Qualified candidates will be contacted for a comprehensive interview',
        'Complete our specialized training program upon successful selection',
        'Begin your teaching journey with matched students and ongoing support'
      ]
    },
    initiative: {
      title: 'Initiative Interest Received!',
      message: 'Thank you for your interest in supporting our educational initiatives and community outreach programs. We have received your submission and our community engagement team will contact you soon to discuss how you can make a meaningful impact in education.',
      nextSteps: [
        'Our team will review your area of interest and availability',
        'We will match you with suitable volunteer or sponsorship opportunities',
        'You will receive detailed information about upcoming programs and initiatives',
        'Join our community of education advocates and change-makers',
        'Begin making a positive impact in students\' lives and communities'
      ]
    },
    contact: {
      title: 'Message Received!',
      message: 'Thank you for contacting Uniqwrites! We have received your message and our customer service team will respond within 24 hours. We value your inquiry and look forward to assisting you with your educational needs.',
      nextSteps: [
        'Our customer service team will review your message carefully',
        'We will prepare a personalized and comprehensive response',
        'You will receive a detailed reply within 24 hours',
        'Follow up with additional questions if needed',
        'Explore our services and educational resources'
      ]
    }
  };

  return acknowledgmentMessages[formType as keyof typeof acknowledgmentMessages] || acknowledgmentMessages.contact;
}

// Generate user-friendly submission summary
function generateUserSubmissionSummary(formData: Record<string, unknown>, formType: string): string {
  let summaryContent = '';
  
  switch (formType) {
    case 'parent':
      summaryContent = generateParentSummary(formData);
      break;
    case 'teacher':
      summaryContent = generateTeacherSummary(formData);
      break;
    case 'school':
      summaryContent = generateSchoolSummary(formData);
      break;
    case 'initiative':
      summaryContent = generateInitiativeSummary(formData);
      break;
    default:
      summaryContent = generateContactSummary(formData);
      break;
  }

  if (!summaryContent.trim()) {
    return '';
  }

  return `
    <div style="background-color: #f0f9ff; padding: 25px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #3b82f6;">
      <h3 style="color: #1d4ed8; margin-top: 0; margin-bottom: 15px; font-size: 18px;">
        📄 Summary of Your Submission
      </h3>
      ${summaryContent}
    </div>
  `;
}

function generateParentSummary(data: Record<string, unknown>): string {
  const sections: string[] = [];
  
  if (data.fullName || data.emailAddress) {
    sections.push(`
      <div style="margin-bottom: 15px;">
        <h4 style="color: #1f2937; margin: 0 0 5px 0; font-size: 16px;">Contact Information</h4>
        ${data.fullName ? `<p style="margin: 2px 0; color: #374151;"><strong>Name:</strong> ${data.fullName}</p>` : ''}
        ${data.emailAddress ? `<p style="margin: 2px 0; color: #374151;"><strong>Email:</strong> ${data.emailAddress}</p>` : ''}
        ${data.phoneNumber ? `<p style="margin: 2px 0; color: #374151;"><strong>Phone:</strong> ${data.phoneNumber}</p>` : ''}
      </div>
    `);
  }
    if (data.students && Array.isArray(data.students) && data.students.length > 0) {
    const studentsInfo = data.students.map((student: Record<string, unknown>, index: number) => `
      <div style="background-color: #f9fafb; padding: 10px; border-radius: 4px; margin: 8px 0;">
        <strong>Student ${index + 1}:</strong> ${student.fullName || 'Name not provided'}<br>
        <span style="color: #6b7280;">Grade: ${student.gradeLevel || 'Not specified'}, Age: ${student.age || 'Not specified'}</span>
      </div>
    `).join('');
    
    sections.push(`
      <div style="margin-bottom: 15px;">
        <h4 style="color: #1f2937; margin: 0 0 5px 0; font-size: 16px;">Student Information</h4>
        ${studentsInfo}
      </div>
    `);
  }
  
  if (data.subjectsRequested || data.preferredMode) {
    sections.push(`
      <div style="margin-bottom: 15px;">
        <h4 style="color: #1f2937; margin: 0 0 5px 0; font-size: 16px;">Tutoring Requirements</h4>
        ${data.subjectsRequested ? `<p style="margin: 2px 0; color: #374151;"><strong>Subjects:</strong> ${data.subjectsRequested}</p>` : ''}
        ${data.preferredMode ? `<p style="margin: 2px 0; color: #374151;"><strong>Preferred Mode:</strong> ${data.preferredMode}</p>` : ''}
      </div>
    `);
  }
  
  return sections.join('');
}

function generateTeacherSummary(data: Record<string, unknown>): string {
  const sections: string[] = [];
  
  if (data.fullName || data.emailAddress) {
    sections.push(`
      <div style="margin-bottom: 15px;">
        <h4 style="color: #1f2937; margin: 0 0 5px 0; font-size: 16px;">Personal Information</h4>
        ${data.fullName ? `<p style="margin: 2px 0; color: #374151;"><strong>Name:</strong> ${data.fullName}</p>` : ''}
        ${data.emailAddress ? `<p style="margin: 2px 0; color: #374151;"><strong>Email:</strong> ${data.emailAddress}</p>` : ''}
        ${data.phoneNumber ? `<p style="margin: 2px 0; color: #374151;"><strong>Phone:</strong> ${data.phoneNumber}</p>` : ''}
      </div>
    `);
  }
  
  if (data.highestQualification || data.yearsOfExperience) {
    sections.push(`
      <div style="margin-bottom: 15px;">
        <h4 style="color: #1f2937; margin: 0 0 5px 0; font-size: 16px;">Qualifications</h4>
        ${data.highestQualification ? `<p style="margin: 2px 0; color: #374151;"><strong>Highest Qualification:</strong> ${data.highestQualification}</p>` : ''}
        ${data.yearsOfExperience ? `<p style="margin: 2px 0; color: #374151;"><strong>Experience:</strong> ${data.yearsOfExperience}</p>` : ''}
      </div>
    `);
  }
  
  if (data.subjectsOfExpertise && Array.isArray(data.subjectsOfExpertise)) {
    sections.push(`
      <div style="margin-bottom: 15px;">
        <h4 style="color: #1f2937; margin: 0 0 5px 0; font-size: 16px;">Teaching Expertise</h4>
        <p style="margin: 2px 0; color: #374151;"><strong>Subjects:</strong> ${data.subjectsOfExpertise.join(', ')}</p>
      </div>
    `);
  }
  
  return sections.join('');
}

function generateSchoolSummary(data: Record<string, unknown>): string {
  const sections: string[] = [];
  
  if (data.schoolName || data.contactPersonName) {
    sections.push(`
      <div style="margin-bottom: 15px;">
        <h4 style="color: #1f2937; margin: 0 0 5px 0; font-size: 16px;">School Information</h4>
        ${data.schoolName ? `<p style="margin: 2px 0; color: #374151;"><strong>School:</strong> ${data.schoolName}</p>` : ''}
        ${data.contactPersonName ? `<p style="margin: 2px 0; color: #374151;"><strong>Contact Person:</strong> ${data.contactPersonName}</p>` : ''}
        ${data.emailAddress ? `<p style="margin: 2px 0; color: #374151;"><strong>Email:</strong> ${data.emailAddress}</p>` : ''}
      </div>
    `);
  }
  
  if (data.serviceType && Array.isArray(data.serviceType)) {
    sections.push(`
      <div style="margin-bottom: 15px;">
        <h4 style="color: #1f2937; margin: 0 0 5px 0; font-size: 16px;">Requested Services</h4>
        <p style="margin: 2px 0; color: #374151;">${data.serviceType.join(', ')}</p>
      </div>
    `);
  }
  
  return sections.join('');
}

function generateInitiativeSummary(data: Record<string, unknown>): string {
  const sections: string[] = [];
  
  if (data.fullName || data.emailAddress) {
    sections.push(`
      <div style="margin-bottom: 15px;">
        <h4 style="color: #1f2937; margin: 0 0 5px 0; font-size: 16px;">Contact Information</h4>
        ${data.fullName ? `<p style="margin: 2px 0; color: #374151;"><strong>Name:</strong> ${data.fullName}</p>` : ''}
        ${data.emailAddress ? `<p style="margin: 2px 0; color: #374151;"><strong>Email:</strong> ${data.emailAddress}</p>` : ''}
      </div>
    `);
  }
  
  if (data.interest || data.initiativeType) {
    sections.push(`
      <div style="margin-bottom: 15px;">
        <h4 style="color: #1f2937; margin: 0 0 5px 0; font-size: 16px;">Interest Area</h4>
        ${data.interest ? `<p style="margin: 2px 0; color: #374151;"><strong>Interest:</strong> ${data.interest}</p>` : ''}
        ${data.initiativeType ? `<p style="margin: 2px 0; color: #374151;"><strong>Type:</strong> ${data.initiativeType}</p>` : ''}
      </div>
    `);
  }
  
  return sections.join('');
}

function generateContactSummary(data: Record<string, unknown>): string {
  const sections: string[] = [];
  
  if (data.name || data.email) {
    sections.push(`
      <div style="margin-bottom: 15px;">
        <h4 style="color: #1f2937; margin: 0 0 5px 0; font-size: 16px;">Contact Information</h4>
        ${data.name ? `<p style="margin: 2px 0; color: #374151;"><strong>Name:</strong> ${data.name}</p>` : ''}
        ${data.email ? `<p style="margin: 2px 0; color: #374151;"><strong>Email:</strong> ${data.email}</p>` : ''}
      </div>
    `);
  }
  
  return sections.join('');
}
