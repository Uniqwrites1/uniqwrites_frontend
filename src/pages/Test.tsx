import React from "react";
import { googleSheetsService } from "../services/googleSheetsService";

const Test = () => {
  const testGoogleSheets = async () => {
    console.log('🧪 Starting manual Google Sheets test...');
    
    const testData = {
      formType: 'parent' as const,
      submitterName: 'Test User',
      submitterEmail: 'test@example.com',
      formData: {
        phoneNumber: '1234567890',
        childName: 'Test Child',
        childAge: '10',
        subjectsRequested: 'Math, English',
        preferredSchedule: 'Weekends'
      }
    };
    
    try {
      const result = await googleSheetsService.submitToGoogleSheets(testData);
      console.log('🧪 Test result:', result);
      
      if (result) {
        alert('✅ Google Sheets test successful! Check the console for details and your Google Sheet for the data.');
      } else {
        alert('❌ Google Sheets test failed. Check the console for error details.');
      }
    } catch (error) {
      console.error('🧪 Test error:', error);
      alert('❌ Google Sheets test error: ' + (error as Error).message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Google Sheets Integration Test</h1>
      <p className="text-gray-600 mb-6">This page helps test the Google Sheets integration.</p>
      
      <div className="bg-blue-50 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Test Google Sheets Submission</h2>
        <p className="text-gray-700 mb-4">
          Click the button below to test if Google Sheets integration is working.
          Open the browser console (F12) to see detailed logs.
        </p>
        
        <button
          onClick={testGoogleSheets}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
        >
          🧪 Test Google Sheets Integration
        </button>
      </div>
      
      <div className="bg-yellow-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">What this test does:</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Submits test data to the parent form Google Sheet</li>
          <li>Shows detailed console logs about the process</li>
          <li>Should trigger a welcome email to test@example.com</li>
          <li>Should add a row to your Google Sheet</li>
        </ul>
        
        <h3 className="text-lg font-semibold mb-2 mt-4">Expected results:</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>✅ Console shows "Successfully submitted to Google Sheets"</li>
          <li>✅ New row appears in your Google Sheet</li>
          <li>✅ Welcome email sent to test@example.com</li>
        </ul>
      </div>
    </div>
  );
};

export default Test;
