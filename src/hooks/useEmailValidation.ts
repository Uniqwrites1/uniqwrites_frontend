// React hook for email validation in form components
// Provides real-time email validation with duplicate checking

import { useState, useCallback } from 'react';
import { emailValidationService, EmailValidationResult } from '../services/emailValidationService';

export interface UseEmailValidationOptions {
  formType: 'parent' | 'school' | 'teacher' | 'initiative';
  debounceMs?: number;
  validateOnChange?: boolean;
}

export interface UseEmailValidationReturn {
  validationState: EmailValidationResult | null;
  isValidating: boolean;
  validateEmail: (email: string) => Promise<EmailValidationResult>;
  clearValidation: () => void;
  registerEmail: (email: string, submitterName: string) => Promise<void>;
}

export function useEmailValidation(options: UseEmailValidationOptions): UseEmailValidationReturn {
  const { formType, debounceMs = 800, validateOnChange = true } = options;
  
  const [validationState, setValidationState] = useState<EmailValidationResult | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);

  const validateEmail = useCallback(async (email: string): Promise<EmailValidationResult> => {
    if (!email.trim()) {
      const emptyResult: EmailValidationResult = {
        isValid: false,
        isDuplicate: false,
        message: ''
      };
      setValidationState(emptyResult);
      return emptyResult;
    }

    setIsValidating(true);
    
    try {
      const result = await emailValidationService.validateEmail(email, formType);
      setValidationState(result);
      return result;
    } catch (error) {
      console.error('❌ Email validation hook error:', error);
      const errorResult: EmailValidationResult = {
        isValid: true, // Graceful degradation
        isDuplicate: false,
        message: 'Validation temporarily unavailable'
      };
      setValidationState(errorResult);
      return errorResult;
    } finally {
      setIsValidating(false);
    }
  }, [formType]);

  const debouncedValidateEmail = useCallback((email: string) => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const timeout = setTimeout(() => {
      validateEmail(email);
    }, debounceMs);

    setDebounceTimeout(timeout);
  }, [validateEmail, debounceMs, debounceTimeout]);

  const clearValidation = useCallback(() => {
    setValidationState(null);
    setIsValidating(false);
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
      setDebounceTimeout(null);
    }
  }, [debounceTimeout]);

  const registerEmail = useCallback(async (email: string, submitterName: string) => {
    try {
      await emailValidationService.registerEmail(email, formType, submitterName);
      console.log('✅ Email registered successfully:', email);
    } catch (error) {
      console.error('❌ Email registration failed:', error);
      // Don't throw - email submission should still succeed
    }
  }, [formType]);

  return {
    validationState,
    isValidating,
    validateEmail: validateOnChange ? debouncedValidateEmail : validateEmail,
    clearValidation,
    registerEmail
  };
}
