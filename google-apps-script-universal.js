/**
 * Universal Google Apps Script for Uniqwrites Form Submissions
 * Copy this exact code into each of your Google Sheets Apps Script editors
 * This script saves data to sheets AND sends automated welcome emails
 */

function doPost(e) {
  // Set CORS headers for cross-origin requests
  const output = ContentService.createTextOutput();
  output.setMimeType(ContentService.MimeType.JSON);
  
  try {
    // Parse the incoming JSON data
    const data = JSON.parse(e.postData.contents);
    
    // Get the active sheet
    const sheet = SpreadsheetApp.getActiveSheet();
    
    // Log the incoming data for debugging
    console.log('Received data:', data);
    
    // Create a row with the data formatted specifically for each form type
    const timestamp = data.timestamp || new Date().toISOString();
    let rowData = [];
    
    // Format data based on form type to match specific sheet columns
    switch(data.formType) {
      case 'parent':
        rowData = formatParentData(data, timestamp);
        break;
      case 'student':
        rowData = formatStudentData(data, timestamp);
        break;
      case 'school':
        rowData = formatSchoolData(data, timestamp);
        break;
      case 'teacher':
        rowData = formatTeacherData(data, timestamp);
        break;
      case 'initiative':
        rowData = formatInitiativeData(data, timestamp);
        break;
      default:
        // Fallback to generic format for unknown types
        rowData = formatGenericData(data, timestamp);
    }
    
    // Add the data to the sheet
    sheet.appendRow(rowData);
    sheet.appendRow(rowData);
    
    // Send automated welcome email to user
    let emailSent = false;
    try {
      sendWelcomeEmail(data, timestamp);
      emailSent = true;
      console.log('Welcome email sent successfully');
    } catch (emailError) {
      console.error('Failed to send welcome email:', emailError);
      // Don't fail the whole process if email fails
    }
    
    // Return success response with CORS headers
    return output.setContent(JSON.stringify({
      success: true, 
      message: 'Data saved successfully',
      timestamp: timestamp,
      formType: data.formType,
      emailSent: emailSent,
      rowsAdded: 1
    }));
      
  } catch (error) {
    console.error('Error processing form submission:', error);
    
    // Return error response with CORS headers
    return output.setContent(JSON.stringify({
      success: false, 
      error: error.toString(),
      message: 'Failed to save data'
    }));
  }
}

function doGet(e) {
  // Handle GET requests for testing with CORS headers
  const output = ContentService.createTextOutput();
  output.setMimeType(ContentService.MimeType.JSON);
  
  return output.setContent(JSON.stringify({
    status: 'Google Apps Script is running', 
    timestamp: new Date().toISOString(),
    sheet: SpreadsheetApp.getActiveSheet().getName(),
    cors: 'enabled'
  }));
}

// Handle OPTIONS requests for CORS preflight
function doOptions(e) {
  const output = ContentService.createTextOutput();
  output.setMimeType(ContentService.MimeType.TEXT);
  return output.setContent('');
}

/**
 * Send automated welcome email to form submitters
 */
function sendWelcomeEmail(data, timestamp) {
  // Extract user details
  const fullName = data.name || data.parentName || data.studentName || data.teacherName || data.contactPersonName || data.participantName || 'Valued Customer';
  const email = data.email || data.parentEmail || data.studentEmail || data.teacherEmail || data.contactPersonEmail || data.participantEmail;
  const formType = data.formType || 'general';
  
  if (!email) {
    console.log('No email address found, skipping welcome email');
    return;
  }
  
  // Format timestamp for display
  const formattedTimestamp = new Date(timestamp).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Africa/Lagos'
  });
  
  // Get email content based on form type
  const emailContent = getEmailContentByType(formType, fullName, formattedTimestamp, data);
  
  // Send the email
  try {
    MailApp.sendEmail({
      to: email,
      subject: emailContent.subject,
      body: emailContent.message,
      replyTo: 'info@uniqwrites.africa',
      name: 'Uniqwrites Educational Concepts'
    });
    
    console.log(`Welcome email sent to: ${email} (${formType})`);
  } catch (error) {
    console.error(`Failed to send welcome email to ${email}:`, error);
    throw error;
  }
}

/**
 * Get personalized email content based on user type
 */
function getEmailContentByType(formType, fullName, formattedTimestamp, data) {
  const baseSignature = `Warm regards,  
**Uniqwrites Client Services Team**  
🧠 *Empowering learners. Uplifting educators.*`;

  const baseContact = `📎 **Need Assistance?**  
Reach us directly at: **info@uniqwrites.africa** or reply to this email.

💬 While you wait, please feel free to explore our platform:  
🌐 Website: www.uniqwrites.africa`;

  switch (formType) {
    case 'parent':
      return {
        subject: "Welcome to Uniqwrites – Let's Begin Your Child's Tutoring Journey",
        message: `Dear ${fullName},

Thank you for choosing **Uniqwrites Educational Concepts**. Your tutoring request has been successfully received on ${formattedTimestamp}, and we are honored to walk with you on this journey of supporting your child's academic success.

🎯 **What Happens Next?**

Our team will reach out to you shortly via **WhatsApp** to discuss your tutoring needs in detail and match your child with a trusted, qualified educator.

We take pride in delivering:

✅ Personalized learning experiences tailored to your child's goals.  
✅ Carefully vetted, professionally trained educators.  
✅ Reliable monitoring, feedback, and support throughout the engagement.

${baseContact}

You're in good hands. At **Uniqwrites**, we don't just provide tutors — we partner with families to deliver **dignified, effective, and ethical education.**

${baseSignature}`
      };

    case 'student':
      return {
        subject: "Welcome to Uniqwrites – Your Learning Journey Starts Here!",
        message: `Dear ${fullName},

Welcome to **Uniqwrites Educational Concepts**! Your enrollment request has been successfully received on ${formattedTimestamp}, and we're excited to support you on your academic journey.

🎯 **What Happens Next?**

Our team will contact you shortly via **WhatsApp** to discuss your learning goals and match you with the perfect tutor who understands your unique needs.

What makes Uniqwrites special for students like you:

✅ Personalized learning plans designed around your goals and learning style.  
✅ Expert tutors who make learning engaging and fun.  
✅ Flexible scheduling that works with your lifestyle.  
✅ Continuous progress tracking and feedback.

${baseContact}

We believe every student has unlimited potential. Let's unlock yours together!

${baseSignature}`
      };

    case 'teacher':
      return {
        subject: "Welcome to the Uniqwrites Teaching Community!",
        message: `Dear ${fullName},

Thank you for your interest in joining the **Uniqwrites Educational Concepts** teaching team! Your application has been successfully received on ${formattedTimestamp}.

🎯 **What Happens Next?**

Our HR team will carefully review your application and credentials. If your profile matches our requirements, we'll contact you within 72 hours via **WhatsApp** to discuss the next steps.

Why educators love working with Uniqwrites:

✅ Competitive compensation and flexible scheduling.  
✅ Professional development opportunities and ongoing support.  
✅ Access to quality educational resources and materials.  
✅ A collaborative community of passionate educators.  
✅ Meaningful impact on students' lives and academic success.

${baseContact}

We're always looking for passionate educators who share our vision of **dignified, effective, and ethical education.**

${baseSignature}`
      };

    case 'school':
      return {
        subject: "Welcome to Uniqwrites – Partnering for Educational Excellence",
        message: `Dear ${fullName},

Thank you for considering **Uniqwrites Educational Concepts** as your educational partner. Your service request has been successfully received on ${formattedTimestamp}.

🎯 **What Happens Next?**

Our education consultants will review your requirements and contact you within 48 hours via **WhatsApp** to discuss how we can support your institution's goals.

Our school partnership services include:

✅ Customized tutoring programs for your students.  
✅ Teacher training and professional development workshops.  
✅ Educational consultancy and curriculum support.  
✅ After-school and holiday programs.  
✅ Special needs education support.

${baseContact}

We understand that every educational institution has unique needs. Let's work together to create solutions that truly make a difference.

${baseSignature}`
      };

    case 'initiative':
      // Check if it's sponsor or volunteer
      const participationType = data.participationType || data.interest || '';
      const isVolunteer = participationType.toLowerCase().includes('volunteer');
      const isSponsor = participationType.toLowerCase().includes('sponsor');

      if (isVolunteer) {
        return {
          subject: "Welcome to Uniqwrites Initiatives – Thank You for Volunteering!",
          message: `Dear ${fullName},

Thank you for your generous offer to volunteer with **Uniqwrites Educational Concepts**! Your application has been successfully received on ${formattedTimestamp}.

🎯 **What Happens Next?**

Our community outreach team will contact you shortly via **WhatsApp** to discuss volunteer opportunities that match your skills and availability.

How your volunteer efforts make a difference:

✅ Direct impact on underserved students' educational outcomes.  
✅ Mentoring opportunities that change young lives.  
✅ Community building through educational initiatives.  
✅ Professional networking with like-minded individuals.  
✅ Personal fulfillment through meaningful service.

${baseContact}

Your time and talents are invaluable gifts. Together, we can create lasting change in our communities through education.

${baseSignature}`
        };
      } else if (isSponsor) {
        return {
          subject: "Welcome to Uniqwrites Initiatives – Thank You for Your Generous Support!",
          message: `Dear ${fullName},

Thank you for your generous interest in sponsoring **Uniqwrites Educational Concepts** initiatives! Your application has been successfully received on ${formattedTimestamp}.

🎯 **What Happens Next?**

Our partnerships team will contact you shortly via **WhatsApp** to discuss sponsorship opportunities and how your support can create maximum impact.

Your sponsorship enables us to:

✅ Provide free tutoring to underserved students.  
✅ Offer scholarships and educational materials.  
✅ Expand our community outreach programs.  
✅ Train more qualified educators for underserved communities.  
✅ Create sustainable educational initiatives.

${baseContact}

Your partnership is an investment in the future of education. Together, we can break barriers and create opportunities for countless students.

${baseSignature}`
        };
      } else {
        return {
          subject: "Welcome to Uniqwrites Initiatives – Thank You for Your Interest!",
          message: `Dear ${fullName},

Thank you for your interest in **Uniqwrites Educational Concepts** initiatives! Your application has been successfully received on ${formattedTimestamp}.

🎯 **What Happens Next?**

Our community outreach team will contact you shortly via **WhatsApp** to discuss how you can get involved in our educational initiatives.

Ways to make a difference with Uniqwrites:

✅ Volunteer opportunities in education and mentoring.  
✅ Sponsorship programs that directly impact students.  
✅ Community partnerships and collaborative projects.  
✅ Skills-based volunteering using your expertise.  
✅ Advocacy for educational equity and access.

${baseContact}

Every contribution, whether time, resources, or expertise, helps us build a stronger educational foundation for our communities.

${baseSignature}`
        };
      }

    default:
      return {
        subject: "Welcome to Uniqwrites – Thank You for Your Interest!",
        message: `Dear ${fullName},

Thank you for your interest in **Uniqwrites Educational Concepts**. Your submission has been successfully received on ${formattedTimestamp}.

🎯 **What Happens Next?**

Our team will review your request and contact you shortly via **WhatsApp** to discuss how we can assist you.

${baseContact}

At **Uniqwrites**, we're committed to delivering **dignified, effective, and ethical education** for all.

${baseSignature}`
      };
  }
}

// Test function - you can run this to test the script
function testScript() {
  const testData = {
    formType: 'test',
    name: 'Test User',
    email: 'your-test-email@example.com', // Replace with your actual email for testing
    phoneNumber: '1234567890',
    timestamp: new Date().toISOString()
  };
  
  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  const result = doPost(mockEvent);
  console.log('Test result:', result.getContent());
}

// Test email function separately
function testWelcomeEmail() {
  const testData = {
    name: 'Test User',
    email: 'your-test-email@example.com', // Replace with your actual email for testing
    formType: 'parent'
  };
  
  try {
    sendWelcomeEmail(testData, new Date().toISOString());
    console.log('Test email sent successfully');
  } catch (error) {
    console.error('Test email failed:', error);
  }
}

/**
 * Format Parent Form Data to match specific sheet columns
 * Columns: Timestamp, Full name, Phone Number, Email address, Residential Address, State of Residence, 
 *          Relationship to Student, Student(s) Name, Age, Current Class, Column 10, Subjects Requested, 
 *          preferred mode, Duration per Lesson, Preferred Lesson Time, Start Date, preferred Tutor Gender, 
 *          Language Preference, Qualification Priority, Tell us more about you ward(s) peculiarity, 
 *          Preferred Lesson Days, Lead Status, Column 1
 */
function formatParentData(data, timestamp) {
  const formData = data.formData || {};
  const parentInfo = formData.parentInfo || {};
  const students = formData.students || [{}];
  const tutoringRequirements = formData.tutoringRequirements || {};
  const tutorPreferences = formData.tutorPreferences || {};
  
  // Get primary student info (first student)
  const primaryStudent = students[0] || {};
  
  // Format preferred days
  const preferredDays = tutoringRequirements.preferredDays || {};
  const daysArray = [];
  Object.keys(preferredDays).forEach(day => {
    if (preferredDays[day]) {
      daysArray.push(day.charAt(0).toUpperCase() + day.slice(1));
    }
  });
  const preferredDaysStr = daysArray.join(', ');
  
  // Format services type
  const servicesType = tutoringRequirements.servicesType || {};
  const servicesArray = [];
  Object.keys(servicesType).forEach(service => {
    if (servicesType[service]) {
      servicesArray.push(service);
    }
  });
  const servicesTypeStr = servicesArray.join(', ');
  
  return [
    timestamp, // Timestamp
    parentInfo.fullName || '', // Full name
    parentInfo.phoneNumber || '', // Phone Number
    parentInfo.emailAddress || '', // Email address
    parentInfo.residentialAddress || '', // Residential Address
    parentInfo.stateOfResidence || '', // State of Residence
    parentInfo.relationshipToStudent || '', // Relationship to Student
    primaryStudent.name || '', // Student(s) Name
    primaryStudent.age || '', // Age
    primaryStudent.currentClass || '', // Current Class
    '', // Column 10 (empty)
    tutoringRequirements.subjectsRequested || '', // Subjects Requested
    tutoringRequirements.preferredMode || '', // preferred mode
    tutoringRequirements.durationPerLesson || '', // Duration per Lesson
    tutoringRequirements.preferredLessonTime || '', // Preferred Lesson Time
    tutoringRequirements.startDate || '', // Start Date
    tutorPreferences.preferredGender || '', // preferred Tutor Gender
    tutorPreferences.languagePreference || '', // Language Preference
    tutorPreferences.qualificationsPriority || '', // Qualification Priority
    primaryStudent.peculiarity || '', // Tell us more about you ward(s) peculiarity
    preferredDaysStr, // Preferred Lesson Days
    'New', // Lead Status
    '' // Column 1 (empty)
  ];
}

/**
 * Format Student Form Data
 */
function formatStudentData(data, timestamp) {
  const formData = data.formData || {};
  
  return [
    timestamp, // Timestamp
    formData.fullName || '', // Full Name
    formData.age || '', // Age
    formData.phoneNumber || '', // Phone Number
    formData.emailAddress || '', // Email Address
    formData.residentialAddress || '', // Residential Address
    formData.stateOfResidence || '', // State of Residence
    formData.emergencyContact || '', // Emergency Contact
    formData.emergencyContactPhone || '', // Emergency Contact Phone
    formData.currentClass || '', // Current Class
    formData.currentSchool || '', // Current School
    formData.previousGrades || '', // Previous Grades
    formData.academicChallenges || '', // Academic Challenges
    formData.learningGoals || '', // Learning Goals
    formData.subjectsRequested || '', // Subjects Requested
    formData.preferredMode || '', // Preferred Mode
    formatPreferredDays(formData.preferredDays), // Preferred Days
    formData.durationPerLesson || '', // Duration per Lesson
    formData.preferredLessonTime || '', // Preferred Lesson Time
    formData.startDate || '', // Start Date
    formData.preferredGender || '', // Preferred Gender
    formData.languagePreference || '', // Language Preference
    formData.qualificationsPriority || '', // Qualifications Priority
    formData.specialNeeds || '', // Special Needs
    'New' // Lead Status
  ];
}

/**
 * Format School Form Data
 */
function formatSchoolData(data, timestamp) {
  const formData = data.formData || {};
  const schoolInfo = formData.schoolInfo || {};
  const contactInfo = formData.contactInfo || {};
  const serviceDetails = formData.serviceDetails || {};
  
  return [
    timestamp, // Timestamp
    schoolInfo.schoolName || '', // School Name
    Array.isArray(schoolInfo.schoolType) ? schoolInfo.schoolType.join(', ') : schoolInfo.schoolType || '', // School Type
    schoolInfo.schoolAddress || '', // School Address
    schoolInfo.state || '', // State
    schoolInfo.lga || '', // LGA
    schoolInfo.schoolEmail || '', // School Email
    contactInfo.contactPersonName || '', // Contact Person Name
    contactInfo.contactPhoneNumber || '', // Contact Phone Number
    Array.isArray(serviceDetails.serviceType) ? serviceDetails.serviceType.join(', ') : serviceDetails.serviceType || '', // Service Type
    serviceDetails.teacherRequestDetails ? JSON.stringify(serviceDetails.teacherRequestDetails) : '', // Teacher Request Details
    serviceDetails.edTechServiceDetails ? JSON.stringify(serviceDetails.edTechServiceDetails) : '', // EdTech Service Details
    serviceDetails.additionalNotes || '', // Additional Notes
    serviceDetails.agreementConfirmed ? 'Yes' : 'No', // Agreement Confirmed
    'New' // Lead Status
  ];
}

/**
 * Format Teacher Form Data
 */
function formatTeacherData(data, timestamp) {
  const formData = data.formData || {};
  
  return [
    timestamp, // Timestamp
    formData.fullName || '', // Full Name
    formData.gender || '', // Gender
    formData.dateOfBirth || '', // Date of Birth
    formData.phoneNumber || '', // Phone Number
    formData.email || '', // Email
    formData.address || '', // Address
    formData.state || '', // State
    formData.highestQualification || '', // Highest Qualification
    Array.isArray(formData.teachingCertifications) ? formData.teachingCertifications.join(', ') : formData.teachingCertifications || '', // Teaching Certifications
    Array.isArray(formData.subjectsOfExpertise) ? formData.subjectsOfExpertise.join(', ') : formData.subjectsOfExpertise || '', // Subjects of Expertise
    formData.yearsOfExperience || '', // Years of Experience
    Array.isArray(formData.preferredStudentLevels) ? formData.preferredStudentLevels.join(', ') : formData.preferredStudentLevels || '', // Preferred Student Levels
    Array.isArray(formData.availableMode) ? formData.availableMode.join(', ') : formData.availableMode || '', // Available Mode
    Array.isArray(formData.preferredOpportunities) ? formData.preferredOpportunities.join(', ') : formData.preferredOpportunities || '', // Preferred Opportunities
    'CV Uploaded', // CV Status (files can't be processed directly)
    'Photo Uploaded', // Photo Status
    'Certificates Uploaded', // Certificates Status
    'New' // Application Status
  ];
}

/**
 * Format Initiative Form Data
 */
function formatInitiativeData(data, timestamp) {
  const formData = data.formData || {};
  
  return [
    timestamp, // Timestamp
    formData.fullName || '', // Full Name
    formData.email || '', // Email
    formData.phoneNumber || '', // Phone Number
    formData.address || '', // Address
    formData.occupation || '', // Occupation
    formData.initiativeType || '', // Initiative Type (literacy, back-to-school)
    formData.participationType || '', // Participation Type (sponsor, volunteer)
    formData.contributionType || '', // Contribution Type
    formData.amount || '', // Amount (for sponsors)
    formData.availability || '', // Availability (for volunteers)
    formData.skills || '', // Skills
    formData.motivation || '', // Motivation
    formData.additionalComments || '', // Additional Comments
    'New' // Status
  ];
}

/**
 * Format Generic Data (fallback)
 */
function formatGenericData(data, timestamp) {
  return [
    timestamp,
    data.name || data.fullName || '',
    data.email || '',
    data.phoneNumber || data.phone || '',
    data.formType || '',
    JSON.stringify(data.formData || data),
    'New'
  ];
}

/**
 * Helper function to format preferred days
 */
function formatPreferredDays(preferredDays) {
  if (!preferredDays || typeof preferredDays !== 'object') {
    return '';
  }
  
  const daysArray = [];
  Object.keys(preferredDays).forEach(day => {
    if (preferredDays[day]) {
      daysArray.push(day.charAt(0).toUpperCase() + day.slice(1));
    }
  });
  
  return daysArray.join(', ');
}
