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
    
    // Create a row with the data
    const timestamp = data.timestamp || new Date().toISOString();
    
    // Create a comprehensive row that works for all form types
    const rowData = [
      timestamp,
      data.formType || 'unknown',
      data.name || data.parentName || data.studentName || data.teacherName || data.contactPersonName || data.participantName || '',
      data.email || data.parentEmail || data.studentEmail || data.teacherEmail || data.contactPersonEmail || data.participantEmail || '',
      data.phoneNumber || '',
      data.childName || data.school || data.schoolName || data.qualifications || data.organization || '',
      data.childAge || data.age || data.grade || data.experience || data.interest || '',
      data.childGrade || data.gradeLevel || data.gradePreference || data.participationType || '',
      data.subjectsRequested || data.subjectsNeeded || data.subjectsOfExpertise || data.serviceType || data.skills || '',
      data.preferredSchedule || data.currentChallenges || data.availability || data.numberOfStudents || data.availableTime || '',
      data.learningGoals || data.teachingApproach || data.projectDuration || data.sponsorshipAmount || '',
      data.specialRequirements || data.specificRequirements || data.references || data.sponsorshipType || '',
      data.preferredLocation || data.location || data.preferredStartDate || data.previousExperience || '',
      data.budget || data.additionalInformation || data.motivation || '',
      data.additionalComments || data.resume || JSON.stringify(data)
    ];
    
    // Add the data to the sheet
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
