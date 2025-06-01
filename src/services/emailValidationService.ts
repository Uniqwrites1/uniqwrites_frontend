// Email Validation Service - Prevents duplicate registrations
// This service provides email validation functionality to prevent multiple registrations

export interface EmailValidationResult {
  isValid: boolean;
  isDuplicate: boolean;
  message: string;
  existingFormType?: string;
  registrationDate?: string;
}

export interface StoredEmailRecord {
  email: string;
  formType: 'parent' | 'school' | 'teacher' | 'initiative';
  submitterName: string;
  registrationDate: string;
  id: string;
}

class EmailValidationService {
  private static instance: EmailValidationService;
  private readonly STORAGE_KEY = 'uniqwrites_registered_emails';
  private readonly VALIDATION_API_ENDPOINT = '/api/validate-email';

  static getInstance(): EmailValidationService {
    if (!EmailValidationService.instance) {
      EmailValidationService.instance = new EmailValidationService();
    }
    return EmailValidationService.instance;
  }

  /**
   * Main validation method - checks if email is already registered
   */
  async validateEmail(email: string, formType: string): Promise<EmailValidationResult> {
    console.log('🔍 Email Validation Service - Checking email:', email);

    try {
      // Step 1: Basic email format validation
      if (!this.isValidEmailFormat(email)) {
        return {
          isValid: false,
          isDuplicate: false,
          message: 'Please enter a valid email address'
        };
      }

      // Step 2: Check against local storage first (for client-side validation)
      const localCheck = this.checkLocalStorage(email);
      if (localCheck.isDuplicate) {
        console.log('❌ Email found in local storage:', localCheck);
        return localCheck;
      }

      // Step 3: Check against server/external API (fallback)
      const serverCheck = await this.checkServerValidation(email, formType);
      if (serverCheck.isDuplicate) {
        console.log('❌ Email found in server validation:', serverCheck);
        return serverCheck;
      }

      console.log('✅ Email validation passed');
      return {
        isValid: true,
        isDuplicate: false,
        message: 'Email is available'
      };

    } catch (error) {
      console.error('❌ Email validation error:', error);
      // If validation fails, allow submission but log the error
      return {
        isValid: true,
        isDuplicate: false,
        message: 'Email validation temporarily unavailable'
      };
    }
  }

  /**
   * Register a new email after successful form submission
   */
  async registerEmail(
    email: string, 
    formType: 'parent' | 'school' | 'teacher' | 'initiative',
    submitterName: string
  ): Promise<void> {
    console.log('📝 Registering new email:', email);

    const record: StoredEmailRecord = {
      email: email.toLowerCase().trim(),
      formType,
      submitterName,
      registrationDate: new Date().toISOString(),
      id: this.generateUniqueId()
    };

    // Store in local storage
    this.storeInLocalStorage(record);

    // Attempt to store on server
    try {
      await this.storeOnServer(record);
    } catch (error) {
      console.error('⚠️ Failed to store email on server:', error);
      // Continue - local storage backup is sufficient
    }
  }

  /**
   * Validate email format using regex
   */
  private isValidEmailFormat(email: string): boolean {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  }

  /**
   * Check local storage for duplicate emails
   */
  private checkLocalStorage(email: string): EmailValidationResult {
    try {
      const storedEmails = localStorage.getItem(this.STORAGE_KEY);
      if (!storedEmails) {
        return { isValid: true, isDuplicate: false, message: 'No local records found' };
      }

      const emailRecords: StoredEmailRecord[] = JSON.parse(storedEmails);
      const normalizedEmail = email.toLowerCase().trim();
      
      const existingRecord = emailRecords.find(record => 
        record.email === normalizedEmail
      );

      if (existingRecord) {
        const formTypeMessage = this.getFormTypeDisplayName(existingRecord.formType);
        return {
          isValid: false,
          isDuplicate: true,
          message: `This email is already registered as a ${formTypeMessage} (${new Date(existingRecord.registrationDate).toLocaleDateString()})`,
          existingFormType: existingRecord.formType,
          registrationDate: existingRecord.registrationDate
        };
      }

      return { isValid: true, isDuplicate: false, message: 'Email available in local storage' };
    } catch (error) {
      console.error('❌ Local storage check failed:', error);
      return { isValid: true, isDuplicate: false, message: 'Local validation unavailable' };
    }
  }

  /**
   * Check server-side validation (fallback method)
   */
  private async checkServerValidation(email: string, formType: string): Promise<EmailValidationResult> {
    try {
      console.log('🌐 Checking server validation for email:', email);
      
      const response = await fetch(this.VALIDATION_API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.toLowerCase().trim(),
          formType
        })
      });

      if (!response.ok) {
        throw new Error(`Server validation failed: ${response.status}`);
      }

      const result = await response.json();
      return result;

    } catch (error) {
      console.error('❌ Server validation failed:', error);
      // Return valid if server check fails (graceful degradation)
      return {
        isValid: true,
        isDuplicate: false,
        message: 'Server validation unavailable'
      };
    }
  }

  /**
   * Store email record in local storage
   */
  private storeInLocalStorage(record: StoredEmailRecord): void {
    try {
      const existingRecords = localStorage.getItem(this.STORAGE_KEY);
      const records: StoredEmailRecord[] = existingRecords ? JSON.parse(existingRecords) : [];
      
      // Remove any existing record with same email (update scenario)
      const filteredRecords = records.filter(r => r.email !== record.email);
      filteredRecords.push(record);

      // Limit storage to last 1000 entries to prevent storage overflow
      const limitedRecords = filteredRecords.slice(-1000);
      
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(limitedRecords));
      console.log('✅ Email stored in local storage');
    } catch (error) {
      console.error('❌ Failed to store in local storage:', error);
    }
  }

  /**
   * Store email record on server (via API)
   */
  private async storeOnServer(record: StoredEmailRecord): Promise<void> {
    try {
      const response = await fetch('/api/store-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(record)
      });

      if (!response.ok) {
        throw new Error(`Failed to store email on server: ${response.status}`);
      }

      console.log('✅ Email stored on server');
    } catch (error) {
      console.error('❌ Server storage failed:', error);
      throw error;
    }
  }

  /**
   * Generate unique ID for email records
   */
  private generateUniqueId(): string {
    return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Get user-friendly form type names
   */
  private getFormTypeDisplayName(formType: string): string {
    const displayNames = {
      parent: 'Parent/Guardian',
      teacher: 'Teacher/Tutor',
      school: 'School/Institution',
      initiative: 'Initiative/Volunteer'
    };
    return displayNames[formType as keyof typeof displayNames] || formType;
  }

  /**
   * Clear all stored email records (admin function)
   */
  clearAllRecords(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    console.log('🗑️ All email records cleared');
  }

  /**
   * Get all stored email records (admin function)
   */
  getAllRecords(): StoredEmailRecord[] {
    try {
      const storedEmails = localStorage.getItem(this.STORAGE_KEY);
      return storedEmails ? JSON.parse(storedEmails) : [];
    } catch (error) {
      console.error('❌ Failed to retrieve records:', error);
      return [];
    }
  }

  /**
   * Remove specific email record (admin function)
   */
  removeEmailRecord(email: string): boolean {
    try {
      const records = this.getAllRecords();
      const filteredRecords = records.filter(record => 
        record.email !== email.toLowerCase().trim()
      );
      
      if (filteredRecords.length < records.length) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filteredRecords));
        console.log('✅ Email record removed:', email);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('❌ Failed to remove email record:', error);
      return false;
    }
  }
}

// Export singleton instance
export const emailValidationService = EmailValidationService.getInstance();
