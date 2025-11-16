import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const resend = new Resend(process.env.RESEND_API_KEY);

// Path to store contact submissions
const CONTACTS_FILE = path.join(process.cwd(), 'data', 'contact-submissions.json');

// Ensure data directory exists
function ensureDataDirectory() {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

// Read existing contacts
function readContacts() {
  ensureDataDirectory();
  
  if (!fs.existsSync(CONTACTS_FILE)) {
    return [];
  }
  
  try {
    const data = fs.readFileSync(CONTACTS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading contacts file:', error);
    return [];
  }
}

// Save new contact submission
function saveContact(name: string, email: string, message: string) {
  ensureDataDirectory();
  
  const contacts = readContacts();
  
  const newContact = {
    name,
    email,
    message,
    submittedAt: new Date().toISOString(),
    status: 'new'
  };
  
  contacts.push(newContact);
  
  try {
    fs.writeFileSync(CONTACTS_FILE, JSON.stringify(contacts, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error saving contact:', error);
    return false;
  }
}

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Save contact submission to file FIRST
    const saved = saveContact(name, email, message);
    if (!saved) {
      console.error('Failed to save contact submission to file');
      // Continue anyway, don't fail the request
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Practicode <onboarding@resend.dev>', // Use your verified domain later
      to: ['idrisaloma120@gmail.com'],
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
                color: white;
                padding: 30px;
                border-radius: 10px 10px 0 0;
                text-align: center;
              }
              .logo {
                font-size: 24px;
                font-weight: 900;
                color: #FFCA1A;
                margin-bottom: 10px;
              }
              .content {
                background: #f9f9f9;
                padding: 30px;
                border-radius: 0 0 10px 10px;
              }
              .field {
                margin-bottom: 20px;
              }
              .label {
                font-weight: 600;
                color: #666;
                font-size: 12px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                margin-bottom: 5px;
              }
              .value {
                background: white;
                padding: 15px;
                border-radius: 8px;
                border-left: 3px solid #FFCA1A;
              }
              .message-box {
                background: white;
                padding: 20px;
                border-radius: 8px;
                border-left: 3px solid #FFCA1A;
                white-space: pre-wrap;
                word-wrap: break-word;
              }
              .footer {
                text-align: center;
                padding: 20px;
                color: #666;
                font-size: 12px;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <div class="logo">PRACTICODE ACADEMY</div>
              <p style="margin: 0; color: #ccc;">New Contact Form Submission</p>
            </div>
            
            <div class="content">
              <div class="field">
                <div class="label">From</div>
                <div class="value">
                  <strong>${name}</strong>
                </div>
              </div>
              
              <div class="field">
                <div class="label">Email Address</div>
                <div class="value">
                  <a href="mailto:${email}" style="color: #FFCA1A; text-decoration: none;">${email}</a>
                </div>
              </div>
              
              <div class="field">
                <div class="label">Message</div>
                <div class="message-box">${message}</div>
              </div>
            </div>
            
            <div class="footer">
              <p>This email was sent from the Practicode Academy contact form.</p>
              <p>Reply directly to this email to respond to ${name}.</p>
              <p style="color: #999; font-size: 11px; margin-top: 15px;">
                Submission saved to: data/contact-submissions.json
              </p>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Email sent successfully',
        emailId: data?.id 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email. Please try again.' },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve all contact submissions
export async function GET() {
  try {
    const contacts = readContacts();
    
    return NextResponse.json(
      {
        total: contacts.length,
        contacts: contacts,
        // Group by status
        new: contacts.filter((c: any) => c.status === 'new').length,
        // Extract just emails for easy copying
        emails: contacts.map((c: any) => c.email),
        emailString: contacts.map((c: any) => c.email).join(', ')
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error retrieving contacts:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve contacts' },
      { status: 500 }
    );
  }
}
