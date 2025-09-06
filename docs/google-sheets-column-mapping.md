# Google Sheets Data Formatting - Implementation Guide

## 🎯 **What Was Fixed**

The issue was that the Google Apps Script was using a generic data format for all form types, but your parent sheet has specific columns that weren't being matched. I've now added **form-specific formatting functions** that map each form's data to the correct columns.

## 📋 **New Formatting Functions Added**

### 1. **formatParentData()** - Parent Tutoring Requests
Maps to your parent sheet columns exactly:
```
Timestamp, Full name, Phone Number, Email address, Residential Address, State of Residence, 
Relationship to Student, Student(s) Name, Age, Current Class, Column 10, Subjects Requested, 
preferred mode, Duration per Lesson, Preferred Lesson Time, Start Date, preferred Tutor Gender, 
Language Preference, Qualification Priority, Tell us more about you ward(s) peculiarity, 
Preferred Lesson Days, Lead Status, Column 1
```

### 2. **formatStudentData()** - Student Enrollments
Maps student form fields including:
- Personal info (name, age, contact details)
- Academic info (current class, school, grades)
- Learning requirements and preferences
- Emergency contact information

### 3. **formatSchoolData()** - School Service Requests
Maps school form fields including:
- School information (name, type, address)
- Contact person details
- Service requirements
- EdTech and teacher request details

### 4. **formatTeacherData()** - Teacher Applications
Maps teacher form fields including:
- Personal details
- Academic qualifications
- Teaching experience
- Subject expertise
- Preferred opportunities

### 5. **formatInitiativeData()** - Initiative Applications
Maps initiative form fields including:
- Participant information
- Initiative type (literacy, back-to-school)
- Participation type (sponsor, volunteer)
- Contribution details

## 🔧 **Deployment Instructions**

### **Step 1: Update Your Google Apps Script**

1. **Open your Parent Google Sheet**
2. **Go to Extensions > Apps Script**
3. **Replace ALL existing code** with the content from `google-apps-script-universal.js`
4. **Save the script** (Ctrl+S)
5. **Deploy as Web App**:
   - Click "Deploy" > "New Deployment"
   - Type: "Web app"
   - Execute as: "Me"
   - Who has access: "Anyone"
   - Click "Deploy"
6. **Copy the Web App URL**

### **Step 2: Repeat for Other Sheets**
Do the same process for:
- Student enrollment sheet
- School service request sheet  
- Teacher application sheet
- Initiative application sheet

### **Step 3: Update Environment Variables**
Add your Web App URLs to your `.env` file:
```env
VITE_GOOGLE_SHEETS_PARENT_URL=your_parent_web_app_url
VITE_GOOGLE_SHEETS_STUDENT_URL=your_student_web_app_url
VITE_GOOGLE_SHEETS_SCHOOL_URL=your_school_web_app_url
VITE_GOOGLE_SHEETS_TEACHER_URL=your_teacher_web_app_url
VITE_GOOGLE_SHEETS_INITIATIVE_URL=your_initiative_web_app_url
```

## 📊 **Data Mapping Examples**

### **Parent Form Data Mapping:**
```javascript
// Form data from frontend:
{
  formData: {
    parentInfo: {
      fullName: "John Doe",
      phoneNumber: "08012345678",
      emailAddress: "john@example.com",
      residentialAddress: "123 Lagos Street",
      stateOfResidence: "Lagos",
      relationshipToStudent: "Father"
    },
    students: [{
      name: "Jane Doe",
      age: 12,
      currentClass: "JSS 2",
      peculiarity: "Needs extra help with Math"
    }],
    tutoringRequirements: {
      subjectsRequested: "Mathematics, English",
      preferredMode: "Home Tutoring",
      durationPerLesson: "2 hours",
      preferredLessonTime: "Evenings",
      startDate: "2025-09-15",
      preferredDays: {
        monday: true,
        wednesday: true,
        friday: true
      }
    },
    tutorPreferences: {
      preferredGender: "Female",
      languagePreference: "English",
      qualificationsPriority: "University Graduate"
    }
  }
}

// Gets formatted to sheet row:
[
  "2025-09-06T10:30:00Z",     // Timestamp
  "John Doe",                  // Full name
  "08012345678",              // Phone Number
  "john@example.com",         // Email address
  "123 Lagos Street",         // Residential Address
  "Lagos",                    // State of Residence
  "Father",                   // Relationship to Student
  "Jane Doe",                 // Student(s) Name
  "12",                       // Age
  "JSS 2",                    // Current Class
  "",                         // Column 10 (empty)
  "Mathematics, English",     // Subjects Requested
  "Home Tutoring",           // preferred mode
  "2 hours",                 // Duration per Lesson
  "Evenings",                // Preferred Lesson Time
  "2025-09-15",              // Start Date
  "Female",                  // preferred Tutor Gender
  "English",                 // Language Preference
  "University Graduate",     // Qualification Priority
  "Needs extra help with Math", // Tell us more about you ward(s) peculiarity
  "Monday, Wednesday, Friday", // Preferred Lesson Days
  "New",                     // Lead Status
  ""                         // Column 1 (empty)
]
```

## ✅ **Testing Your Setup**

1. **Submit a test form** from your website
2. **Check your Google Sheet** - data should now appear in the correct columns
3. **Verify email automation** - welcome email should be sent
4. **Check console logs** in Google Apps Script for any errors

## 🔍 **Troubleshooting**

If data still doesn't match columns:

1. **Check column headers** in your sheet match exactly what's documented
2. **Verify Web App deployment** is set to "Anyone" access
3. **Check environment variables** are correct in your `.env` file
4. **Look at Google Apps Script logs** for error messages

## 📝 **Column Structure Reference**

Your parent sheet should have these columns in this exact order:
1. Timestamp
2. Full name  
3. Phone Number
4. Email address
5. Residential Address
6. State of Residence
7. Relationship to Student
8. Student(s) Name
9. Age
10. Current Class
11. Column 10 (empty)
12. Subjects Requested
13. preferred mode
14. Duration per Lesson
15. Preferred Lesson Time
16. Start Date
17. preferred Tutor Gender
18. Language Preference
19. Qualification Priority
20. Tell us more about you ward(s) peculiarity
21. Preferred Lesson Days
22. Lead Status
23. Column 1 (empty)

## 🎉 **Expected Results**

After deployment:
- ✅ **Parent form data** will match your exact column structure
- ✅ **All form types** will have properly formatted data
- ✅ **Email automation** will continue working
- ✅ **Lead tracking** will be consistent with "New" status
- ✅ **Data integrity** will be maintained across all sheets
