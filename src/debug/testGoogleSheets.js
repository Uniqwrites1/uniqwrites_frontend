// Simple test script to verify Google Apps Script
const testGoogleSheets = async () => {
  const testData = {
    timestamp: new Date().toISOString(),
    formType: 'parent',
    name: 'Test User',
    email: 'test@example.com',
    phoneNumber: '1234567890',
    childName: 'Test Child',
    childAge: '10',
    subjectsRequested: 'Math, English'
  };
  
  const url = 'https://script.google.com/macros/s/AKfycbwjWLYsSwzgtiNKes_cAovz82Sdk10LShwhT5ol4hYFILcqJOKD0PQgXgTJ8QM4urMY/exec';
  
  console.log('Testing Google Apps Script with data:', testData);
  console.log('URL:', url);
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
      mode: 'cors'
    });
    
    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));
    
    const result = await response.text();
    console.log('Response body:', result);
    
    if (response.ok) {
      try {
        const parsed = JSON.parse(result);
        console.log('Parsed response:', parsed);
      } catch (e) {
        console.log('Response is not JSON');
      }
    }
    
  } catch (error) {
    console.error('Test failed:', error);
  }
};

// Run the test
testGoogleSheets();
