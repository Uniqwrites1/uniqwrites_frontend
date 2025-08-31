// Debug script to test environment variables and Google Sheets URLs
export function logEnvironmentVariables() {
  console.log('🔍 Environment Variables Debug:');
  console.log('VITE_GOOGLE_SHEETS_PARENT_URL:', import.meta.env.VITE_GOOGLE_SHEETS_PARENT_URL);
  console.log('VITE_GOOGLE_SHEETS_STUDENT_URL:', import.meta.env.VITE_GOOGLE_SHEETS_STUDENT_URL);
  console.log('VITE_GOOGLE_SHEETS_SCHOOL_URL:', import.meta.env.VITE_GOOGLE_SHEETS_SCHOOL_URL);
  console.log('VITE_GOOGLE_SHEETS_TEACHER_URL:', import.meta.env.VITE_GOOGLE_SHEETS_TEACHER_URL);
  console.log('VITE_GOOGLE_SHEETS_INITIATIVE_URL:', import.meta.env.VITE_GOOGLE_SHEETS_INITIATIVE_URL);
  console.log('VITE_GOOGLE_SHEETS_GENERAL_URL:', import.meta.env.VITE_GOOGLE_SHEETS_GENERAL_URL);
  console.log('VITE_FORMSPREE_ENDPOINT:', import.meta.env.VITE_FORMSPREE_ENDPOINT);
}

// Test function to check Google Sheets URL access
export async function testGoogleSheetsAccess() {
  const urls = [
    import.meta.env.VITE_GOOGLE_SHEETS_PARENT_URL,
    import.meta.env.VITE_GOOGLE_SHEETS_STUDENT_URL,
    import.meta.env.VITE_GOOGLE_SHEETS_SCHOOL_URL,
    import.meta.env.VITE_GOOGLE_SHEETS_TEACHER_URL,
  ];
  
  console.log('🧪 Testing Google Sheets URL Access...');
  
  for (const url of urls) {
    if (url && url !== '') {
      try {
        console.log(`Testing ${url.substring(0, 50)}...`);
        const response = await fetch(url, { method: 'GET', mode: 'cors' });
        console.log(`Response status: ${response.status}`);
        
        if (response.status === 200) {
          const text = await response.text();
          if (text.includes('Google Account')) {
            console.log('❌ URL requires authentication - needs to be set to "Anyone" access');
          } else {
            console.log('✅ URL is accessible');
          }
        } else {
          console.log('❌ URL returned error status');
        }
      } catch (error) {
        console.log('❌ URL test failed:', error);
      }
    }
  }
}
