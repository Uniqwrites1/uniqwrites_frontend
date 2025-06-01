// Vercel serverless function for storing email records
// This API endpoint stores email records to prevent future duplicates

import { VercelRequest, VercelResponse } from '@vercel/node';

interface StoredEmailRecord {
  email: string;
  formType: 'parent' | 'school' | 'teacher' | 'initiative';
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
    const record: StoredEmailRecord = req.body;

    if (!record.email || !record.formType || !record.submitterName) {
      res.status(400).json({ 
        success: false, 
        error: 'Missing required fields: email, formType, submitterName' 
      });
      return;
    }

    // Normalize email
    const normalizedEmail = record.email.toLowerCase().trim();

    // Store the record
    const storedRecord: StoredEmailRecord = {
      ...record,
      email: normalizedEmail,
      registrationDate: record.registrationDate || new Date().toISOString()
    };

    emailStorage.set(normalizedEmail, storedRecord);

    console.log('✅ Email record stored:', normalizedEmail, storedRecord.formType);
    
    res.status(200).json({ 
      success: true, 
      message: 'Email record stored successfully',
      recordId: storedRecord.id
    });

  } catch (error) {
    console.error('❌ Email storage error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to store email record' 
    });
  }
}
