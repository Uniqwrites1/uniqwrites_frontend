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

class EmailService {
  // Send form submission to admin email
  async sendFormSubmission(submission: FormSubmissionEmail): Promise<boolean> {
    try {
      const success = await this.sendViaVercelFunction(submission);
      if (success) return true;

      console.log('Vercel function failed, trying Formspree fallback...');
      return await this.sendViaFormspree(submission);
    } catch (error) {
      console.error('Failed to send form submission email:', error);
      return false;
    }
  }

  // Send via Vercel serverless function (recommended)
  private async sendViaVercelFunction(submission: FormSubmissionEmail): Promise<boolean> {
    try {
      const response = await fetch('/api/send-email', {
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

      if (!response.ok) {
        const errorData = await response.text().catch(() => 'Unknown error');
        console.error('Vercel function returned error:', response.status, errorData);
        return false;
      }

      const result = await response.json().catch(() => null);
      console.log('Email sent successfully via Vercel function:', result);
      return true;
    } catch (error) {
      console.error('Vercel function submission failed:', error);
      return false;
    }
  }

  // Send via Formspree (free service fallback)
  private async sendViaFormspree(submission: FormSubmissionEmail): Promise<boolean> {
    try {
      if (!formspreeEndpoint) {
        console.error('Formspree endpoint is not defined in environment variables.');
        return false;
      }

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

      return response.ok;
    } catch (error) {
      console.error('Formspree submission failed:', error);
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
