# Google Sheets Integration Setup Guide

This guide will help you set up Google Sheets integration for your forms so that all form submissions are automatically saved to Google Sheets.

## Step 1: Create Google Sheets

Create separate Google Sheets for each form type:

### 1. Parent Tutoring Requests Sheet
**Columns (Row 1 headers):**
- A: Timestamp
- B: Form Type
- C: Parent Name
- D: Parent Email
- E: Phone Number
- F: Child Name
- G: Child Age
- H: Child Grade
- I: Subjects Requested
- J: Preferred Schedule
- K: Learning Goals
- L: Special Requirements
- M: Preferred Location
- N: Budget
- O: Additional Comments

### 2. Student Enrollment Sheet
**Columns (Row 1 headers):**
- A: Timestamp
- B: Form Type
- C: Student Name
- D: Student Email
- E: Phone Number
- F: Age
- G: Grade
- H: School
- I: Subjects Needed
- J: Current Challenges
- K: Learning Goals
- L: Preferred Schedule
- M: Parent Name
- N: Parent Contact
- O: Additional Comments

### 3. School Services Sheet
**Columns (Row 1 headers):**
- A: Timestamp
- B: Form Type
- C: Contact Person Name
- D: Contact Person Email
- E: School Name
- F: School Address
- G: Phone Number
- H: Position
- I: Service Type
- J: Number of Students
- K: Grade Level
- L: Subjects Needed
- M: Project Duration
- N: Budget
- O: Specific Requirements
- P: Preferred Start Date
- Q: Additional Comments

### 4. Teacher Applications Sheet
**Columns (Row 1 headers):**
- A: Timestamp
- B: Form Type
- C: Teacher Name
- D: Teacher Email
- E: Phone Number
- F: Qualifications
- G: Experience
- H: Subjects of Expertise
- I: Grade Preference
- J: Availability
- K: Location
- L: Teaching Approach
- M: References
- N: Additional Information
- O: Resume

### 5. Initiative Interest Sheet
**Columns (Row 1 headers):**
- A: Timestamp
- B: Form Type
- C: Participant Name
- D: Participant Email
- E: Phone Number
- F: Interest
- G: Participation Type
- H: Available Time
- I: Skills
- J: Sponsorship Amount
- K: Sponsorship Type
- L: Organization
- M: Previous Experience
- N: Motivation
- O: Additional Comments

## Step 2: Create Google Apps Script

For each Google Sheet, you need to create a Google Apps Script web app:

1. Open your Google Sheet
2. Go to **Extensions > Apps Script**
3. Delete the default code and paste the following:

```javascript
/**
 * Google Apps Script for Uniqwrites Form Submissions
 * This script receives form data and saves it to the connected Google Sheet
 */

function doPost(e) {
  try {
    // Parse the incoming JSON data
    const data = JSON.parse(e.postData.contents);
    
    // Get the active sheet
    const sheet = SpreadsheetApp.getActiveSheet();
    
    // Determine the form type and format data accordingly
    const formType = data.formType || 'unknown';
    
    let rowData;
    
    switch(formType) {
      case 'parent':
        rowData = formatParentData(data);
        break;
      case 'student':
        rowData = formatStudentData(data);
        break;
      case 'school':
        rowData = formatSchoolData(data);
        break;
      case 'teacher':
        rowData = formatTeacherData(data);
        break;
      case 'initiative':
        rowData = formatInitiativeData(data);
        break;
      default:
        rowData = formatGenericData(data);
    }
    
    // Add the data to the sheet
    sheet.appendRow(rowData);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({success: true, message: 'Data saved successfully'}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error processing form submission:', error);
    
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  // Handle GET requests for testing
  return ContentService
    .createTextOutput(JSON.stringify({status: 'Google Apps Script is running', timestamp: new Date()}))
    .setMimeType(ContentService.MimeType.JSON);
}

function formatParentData(data) {
  return [
    data.timestamp || new Date().toISOString(),
    data.formType || 'parent',
    data.parentName || data.name || '',
    data.parentEmail || data.email || '',
    data.phoneNumber || '',
    data.childName || '',
    data.childAge || '',
    data.childGrade || '',
    data.subjectsRequested || '',
    data.preferredSchedule || '',
    data.learningGoals || '',
    data.specialRequirements || '',
    data.preferredLocation || '',
    data.budget || '',
    data.additionalComments || ''
  ];
}

function formatStudentData(data) {
  return [
    data.timestamp || new Date().toISOString(),
    data.formType || 'student',
    data.studentName || data.name || '',
    data.studentEmail || data.email || '',
    data.phoneNumber || '',
    data.age || '',
    data.grade || '',
    data.school || '',
    data.subjectsNeeded || '',
    data.currentChallenges || '',
    data.learningGoals || '',
    data.preferredSchedule || '',
    data.parentName || '',
    data.parentContact || '',
    data.additionalComments || ''
  ];
}

function formatSchoolData(data) {
  return [
    data.timestamp || new Date().toISOString(),
    data.formType || 'school',
    data.contactPersonName || data.name || '',
    data.contactPersonEmail || data.email || '',
    data.schoolName || '',
    data.schoolAddress || '',
    data.phoneNumber || '',
    data.position || '',
    data.serviceType || '',
    data.numberOfStudents || '',
    data.gradeLevel || '',
    data.subjectsNeeded || '',
    data.projectDuration || '',
    data.budget || '',
    data.specificRequirements || '',
    data.preferredStartDate || '',
    data.additionalComments || ''
  ];
}

function formatTeacherData(data) {
  return [
    data.timestamp || new Date().toISOString(),
    data.formType || 'teacher',
    data.teacherName || data.name || '',
    data.teacherEmail || data.email || '',
    data.phoneNumber || '',
    data.qualifications || '',
    data.experience || '',
    data.subjectsOfExpertise || '',
    data.gradePreference || '',
    data.availability || '',
    data.location || '',
    data.teachingApproach || '',
    data.references || '',
    data.additionalInformation || '',
    data.resume || ''
  ];
}

function formatInitiativeData(data) {
  return [
    data.timestamp || new Date().toISOString(),
    data.formType || 'initiative',
    data.participantName || data.name || '',
    data.participantEmail || data.email || '',
    data.phoneNumber || '',
    data.interest || '',
    data.participationType || '',
    data.availableTime || '',
    data.skills || '',
    data.sponsorshipAmount || '',
    data.sponsorshipType || '',
    data.organization || '',
    data.previousExperience || '',
    data.motivation || '',
    data.additionalComments || ''
  ];
}

function formatGenericData(data) {
  return [
    data.timestamp || new Date().toISOString(),
    data.formType || 'generic',
    data.name || '',
    data.email || '',
    JSON.stringify(data) // Store all data as JSON for unknown form types
  ];
}
```

## Step 3: Deploy the Web App

For each Google Apps Script:

1. Click **Deploy > New deployment**
2. Choose **Type: Web app**
3. Set **Execute as: Me**
4. Set **Who has access: Anyone**
5. Click **Deploy**
6. **Copy the Web App URL** - you'll need this for the environment variables

## Step 4: Update Environment Variables

Add these environment variables to your `.env` file:

```bash
# Google Sheets Integration URLs
VITE_GOOGLE_SHEETS_PARENT_URL=https://script.google.com/macros/s/YOUR_PARENT_SCRIPT_ID/exec
VITE_GOOGLE_SHEETS_STUDENT_URL=https://script.google.com/macros/s/YOUR_STUDENT_SCRIPT_ID/exec
VITE_GOOGLE_SHEETS_SCHOOL_URL=https://script.google.com/macros/s/YOUR_SCHOOL_SCRIPT_ID/exec
VITE_GOOGLE_SHEETS_TEACHER_URL=https://script.google.com/macros/s/YOUR_TEACHER_SCRIPT_ID/exec
VITE_GOOGLE_SHEETS_INITIATIVE_URL=https://script.google.com/macros/s/YOUR_INITIATIVE_SCRIPT_ID/exec

# Optional: General fallback URL if you want all forms to go to one sheet
VITE_GOOGLE_SHEETS_GENERAL_URL=https://script.google.com/macros/s/YOUR_GENERAL_SCRIPT_ID/exec
```

## Step 5: Test the Integration

1. Restart your development server: `npm run dev`
2. Submit a test form
3. Check your Google Sheet to see if the data appears
4. Check the browser console for any errors

## Benefits of This Setup

✅ **Automatic Data Collection**: All form submissions are automatically saved to Google Sheets  
✅ **Real-time Updates**: Data appears immediately in your sheets  
✅ **Organized Data**: Each form type has its own sheet with relevant columns  
✅ **Backup**: Even if email fails, data is still saved to Google Sheets  
✅ **Easy Analysis**: Use Google Sheets features to analyze and export data  
✅ **No Additional Costs**: Uses free Google services  

## Troubleshooting

### Common Issues:

1. **CORS Errors**: Make sure the web app is deployed with "Anyone" access
2. **Data Not Appearing**: Check the Google Apps Script logs for errors
3. **Wrong Columns**: Verify the column headers match exactly
4. **Authentication**: Ensure the script is deployed as "Execute as: Me"

### Testing the Connection:

You can test individual connections using the browser console:

```javascript
// Test parent form connection
fetch('YOUR_PARENT_WEB_APP_URL', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    formType: 'parent',
    name: 'Test Parent',
    email: 'test@example.com',
    timestamp: new Date().toISOString()
  })
});
```

## Security Considerations

- The web apps are publicly accessible but only accept POST requests with JSON data
- No sensitive authentication data is exposed
- All data is stored in your personal Google account
- You can restrict access by changing the deployment settings if needed

Now your forms will automatically save all submissions to Google Sheets while still sending notification emails!
