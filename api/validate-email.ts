// Vercel serverless function for email validation
// This API endpoint validates emails against a simple storage system

import { VercelRequest, VercelResponse } from '@vercel/node';

interface EmailValidationRequest {
  email: string;
  formType: string;
}

interface EmailValidationResult {
  isValid: boolean;
  isDuplicate: boolean;
  message: string;
  existingFormType?: string;
  registrationDate?: string;
}

interface StoredEmailRecord {
  email: string;
  formType: string;
  submitterName: string;
  registrationDate: string;
  id: string;
}

// Simple in-memory storage for demo (in production, use a proper database)
const emailStorage = new Map<string, StoredEmailRecord>();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { email, formType }: EmailValidationRequest = req.body;

    if (!email || !formType) {
      res.status(400).json({
        isValid: false,
        isDuplicate: false,
        message: 'Email and form type are required'
      });
      return;
    }

    // Normalize email
    const normalizedEmail = email.toLowerCase().trim();

    // Check if email exists in storage
    const existingRecord = emailStorage.get(normalizedEmail);

    if (existingRecord) {
      const formTypeDisplayName = getFormTypeDisplayName(existingRecord.formType);
      const registrationDate = new Date(existingRecord.registrationDate).toLocaleDateString();

      const result: EmailValidationResult = {
        isValid: false,
        isDuplicate: true,
        message: `This email is already registered as a ${formTypeDisplayName} (${registrationDate})`,
        existingFormType: existingRecord.formType,
        registrationDate: existingRecord.registrationDate
      };

      console.log('❌ Duplicate email found:', normalizedEmail);
      res.status(200).json(result);
      return;
    }

    // Email is available
    const result: EmailValidationResult = {
      isValid: true,
      isDuplicate: false,
      message: 'Email is available'
    };

    console.log('✅ Email validation passed:', normalizedEmail);
    res.status(200).json(result);

  } catch (error) {
    console.error('❌ Email validation error:', error);
    res.status(500).json({
      isValid: true, // Graceful degradation
      isDuplicate: false,
      message: 'Email validation service temporarily unavailable'
    });
  }
}

function getFormTypeDisplayName(formType: string): string {
  const displayNames: Record<string, string> = {
    parent: 'Parent/Guardian',
    teacher: 'Teacher/Tutor',
    school: 'School/Institution',
    initiative: 'Initiative/Volunteer'
  };
  return displayNames[formType] || formType;
}
