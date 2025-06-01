// Enhanced Email Input Component with Duplicate Validation
// Provides real-time email validation and duplicate checking

import React, { useEffect, useState } from 'react';
import { useEmailValidation } from '../../hooks/useEmailValidation';

export interface EmailInputProps {
  value: string;
  onChange: (value: string) => void;
  onValidationChange?: (isValid: boolean, isDuplicate: boolean) => void;
  formType: 'parent' | 'school' | 'teacher' | 'initiative';
  label?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  disabled?: boolean;
  id?: string;
  name?: string;
  error?: string; // External validation error
}

export const EmailInput: React.FC<EmailInputProps> = ({
  value,
  onChange,
  onValidationChange,
  formType,
  label = 'Email Address',
  placeholder = 'Enter your email address',
  required = true,
  className = '',
  disabled = false,
  id = 'email',
  name = 'email',
  error
}) => {
  const [hasBlurred, setHasBlurred] = useState(false);
  const [showValidation, setShowValidation] = useState(false);

  const {
    validationState,
    isValidating,
    validateEmail,
    clearValidation
  } = useEmailValidation({
    formType,
    validateOnChange: true,
    debounceMs: 800
  });

  // Handle validation state changes
  useEffect(() => {
    if (validationState && onValidationChange) {
      onValidationChange(validationState.isValid, validationState.isDuplicate);
    }
  }, [validationState, onValidationChange]);

  // Trigger validation when value changes (if user has interacted)
  useEffect(() => {
    if (value && hasBlurred) {
      setShowValidation(true);
      validateEmail(value);
    } else if (!value) {
      clearValidation();
      setShowValidation(false);
    }
  }, [value, hasBlurred, validateEmail, clearValidation]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
  };

  const handleBlur = () => {
    setHasBlurred(true);
    if (value) {
      setShowValidation(true);
      validateEmail(value);
    }
  };

  const handleFocus = () => {
    if (!value) {
      setShowValidation(false);
    }
  };

  // Determine validation display
  const shouldShowValidation = showValidation && hasBlurred && value;
  const hasValidationError = shouldShowValidation && validationState && (!validationState.isValid || validationState.isDuplicate);
  const hasExternalError = error && hasBlurred;

  // Input styling based on validation state
  const getInputClassName = () => {
    const baseClasses = `w-full px-4 py-2 border rounded-md focus:outline-none transition-all duration-200 ${className}`;
    
    if (disabled) {
      return `${baseClasses} bg-gray-100 cursor-not-allowed border-gray-300`;
    }
    
    if (hasExternalError || hasValidationError) {
      return `${baseClasses} border-red-500 focus:ring-2 focus:ring-red-200 focus:border-red-500`;
    }
    
    if (shouldShowValidation && validationState?.isValid && !validationState?.isDuplicate) {
      return `${baseClasses} border-green-500 focus:ring-2 focus:ring-green-200 focus:border-green-500`;
    }
    
    return `${baseClasses} border-gray-300 focus:ring-2 focus:ring-[#FFC107] focus:border-transparent`;
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-black mb-2" htmlFor={id}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <div className="relative">
        <input
          type="email"
          id={id}
          name={name}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={getInputClassName()}
          autoComplete="email"
        />
        
        {/* Loading indicator */}
        {isValidating && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-300 border-t-[#FFC107]"></div>
          </div>
        )}
        
        {/* Validation success indicator */}
        {shouldShowValidation && validationState?.isValid && !validationState?.isDuplicate && !isValidating && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
        )}
        
        {/* Validation error indicator */}
        {(hasValidationError || hasExternalError) && !isValidating && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>
      
      {/* Error messages */}
      {hasExternalError && (
        <p className="text-sm text-red-600 flex items-center">
          <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
      
      {hasValidationError && (
        <p className="text-sm text-red-600 flex items-center">
          <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {validationState?.message}
        </p>
      )}
      
      {/* Success message */}
      {shouldShowValidation && validationState?.isValid && !validationState?.isDuplicate && (
        <p className="text-sm text-green-600 flex items-center">
          <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Email is available
        </p>
      )}
      
      {/* Duplicate warning with suggestion */}
      {shouldShowValidation && validationState?.isDuplicate && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
          <div className="flex items-center">
            <svg className="h-5 w-5 text-yellow-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <p className="text-sm text-yellow-800">
              <strong>Email Already Registered:</strong> {validationState.message}
            </p>
          </div>
          <p className="text-xs text-yellow-700 mt-2">
            If this is your account, please use a different email or contact support if you need assistance.
          </p>
        </div>
      )}
    </div>
  );
};
