import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const resend = new Resend(process.env.RESEND_API_KEY);

// Path to store subscriber emails
const SUBSCRIBERS_FILE = path.join(process.cwd(), 'data', 'newsletter-subscribers.json');

// Ensure data directory exists
function ensureDataDirectory() {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

// Read existing subscribers
function readSubscribers() {
  ensureDataDirectory();
  
  if (!fs.existsSync(SUBSCRIBERS_FILE)) {
    return [];
  }
  
  try {
    const data = fs.readFileSync(SUBSCRIBERS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading subscribers file:', error);
    return [];
  }
}

// Save new subscriber
function saveSubscriber(email: string) {
  ensureDataDirectory();
  
  const subscribers = readSubscribers();
  
  // Check if email already exists
  const existingIndex = subscribers.findIndex((sub: any) => sub.email === email);
  
  const newSubscriber = {
    email,
    subscribedAt: new Date().toISOString(),
    status: 'active'
  };
  
  if (existingIndex >= 0) {
    // Update existing subscriber
    subscribers[existingIndex] = newSubscriber;
  } else {
    // Add new subscriber
    subscribers.push(newSubscriber);
  }
  
  try {
    fs.writeFileSync(SUBSCRIBERS_FILE, JSON.stringify(subscribers, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error saving subscriber:', error);
    return false;
  }
}

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // Validate email
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Check if already subscribed
    const subscribers = readSubscribers();
    const alreadySubscribed = subscribers.some((sub: any) => sub.email === email);
    
    if (alreadySubscribed) {
      return NextResponse.json(
        { error: 'This email is already subscribed' },
        { status: 400 }
      );
    }

    // Save subscriber to file FIRST (before sending emails)
    const saved = saveSubscriber(email);
    if (!saved) {
      console.error('Failed to save subscriber to file');
      // Continue anyway, don't fail the request
    }

    // Send notification to admin (no email sent to subscriber)
    const { data: adminData, error: adminError } = await resend.emails.send({
      from: 'Practicode Academy <onboarding@resend.dev>',
      to: ['idrisaloma120@gmail.com'],
      subject: `New Newsletter Subscription: ${email}`,
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
              .email-box {
                background: white;
                padding: 20px;
                border-radius: 8px;
                border-left: 3px solid #FFCA1A;
                font-size: 18px;
                font-weight: 600;
                text-align: center;
                margin: 20px 0;
              }
              .info {
                color: #666;
                font-size: 14px;
                text-align: center;
                margin-top: 20px;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <div class="logo">PRACTICODE ACADEMY</div>
              <p style="margin: 0; color: #ccc;">New Newsletter Subscription</p>
            </div>
            
            <div class="content">
              <p style="font-size: 16px; color: #333;">
                Great news! Someone just subscribed to your newsletter.
              </p>
              
              <div class="email-box">
                ${email}
              </div>
              
              <p class="info">
                A welcome email has been automatically sent to the subscriber.<br>
                Email saved to: data/newsletter-subscribers.json
              </p>
            </div>
          </body>
        </html>
      `,
    });

    // Don't fail the request if admin notification fails
    if (adminError) {
      console.error('Error sending admin notification:', adminError);
      // Still return success since the email was saved to file
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Successfully subscribed to newsletter',
        emailId: adminData?.id 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error processing newsletter subscription:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again.' },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve all subscribers
export async function GET() {
  try {
    const subscribers = readSubscribers();
    
    // Extract just the emails for easy copying
    const emails = subscribers.map((sub: any) => sub.email);
    
    return NextResponse.json(
      {
        total: subscribers.length,
        subscribers: subscribers,
        emailList: emails,
        emailString: emails.join(', ') // Easy to copy comma-separated list
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error retrieving subscribers:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve subscribers' },
      { status: 500 }
    );
  }
}
