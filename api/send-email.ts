import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

interface EmailRequest {
  type: string;
  name: string;
  email: string;
  phone?: string;
  interest?: string;
  sponsorType?: string;
  message: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { type, name, email, phone, interest, sponsorType, message }: EmailRequest = req.body;

    // Validate required fields
    if (!type || !name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }    // Create transporter using Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER, // Your Gmail address
        pass: process.env.GMAIL_APP_PASSWORD, // Gmail App Password
      },
    });

    // Format the email content
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
          ${type}
        </h2>
        
        <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #374151; margin-top: 0;">Contact Information</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          ${phone && phone !== 'N/A' ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
          ${interest && interest !== 'General inquiry' ? `<p><strong>Interest/Subject:</strong> ${interest}</p>` : ''}
          ${sponsorType && sponsorType !== 'N/A' ? `<p><strong>Sponsor Type:</strong> ${sponsorType}</p>` : ''}
        </div>

        <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
          <h3 style="color: #374151; margin-top: 0;">Form Details</h3>
          <pre style="white-space: pre-wrap; font-family: monospace; background-color: #f3f4f6; padding: 15px; border-radius: 4px; overflow-x: auto;">${message}</pre>
        </div>

        <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">
          <p>This email was sent from the Uniqwrites website form submission system.</p>
          <p>Date: ${new Date().toLocaleString()}</p>
        </div>
      </div>
    `;

    // Email options
    const mailOptions = {
      from: `"Uniqwrites Website" <${process.env.GMAIL_USER}>`,
      to: 'uniqwrites1@gmail.com',
      replyTo: email,
      subject: `${type} - ${name}`,
      html: htmlContent,
      text: message, // Plain text fallback
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    console.log(`Email sent successfully for ${type} from ${name} (${email})`);
    return res.status(200).json({ success: true, message: 'Email sent successfully' });

  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ 
      error: 'Failed to send email', 
      details: process.env.NODE_ENV === 'development' ? error.message : undefined 
    });
  }
}
