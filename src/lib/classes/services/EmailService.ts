import { Resend } from 'resend';

export class EmailService {
  private resend: Resend;

  constructor() {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.warn('RESEND_API_KEY is not set. Email service will not work.');
    }
    this.resend = new Resend(apiKey || 'dummy-key');
  }

  async sendWelcomeEmail(to: string, name: string): Promise<boolean> {
    try {
      if (!process.env.RESEND_API_KEY) {
        console.log('Simulating welcome email to:', to);
        return true;
      }

      await this.resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'ApniSec <onboarding@apnisec.com>',
        to,
        subject: `Welcome to ApniSec, ${name}!`,
        html: `
          <h1>Welcome to ApniSec!</h1>
          <p>Hello ${name},</p>
          <p>Your account has been successfully created.</p>
          <p>You can now access your dashboard and start managing security issues.</p>
          <a href="${process.env.APP_URL}/dashboard">Go to Dashboard</a>
        `
      });
      console.log(`Welcome email sent to ${to}`);
      return true;
    } catch (error) {
      console.error('Failed to send welcome email:', error);
      return false;
    }
  }

  async sendIssueNotification(to: string, issue: any): Promise<boolean> {
    try {
      if (!process.env.RESEND_API_KEY) {
        console.log('Simulating issue notification to:', to);
        return true;
      }

      await this.resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'ApniSec <notifications@apnisec.com>',
        to,
        subject: `New Issue Created: ${issue.title}`,
        html: `
          <h2>New Security Issue</h2>
          <p><strong>Type:</strong> ${issue.type}</p>
          <p><strong>Title:</strong> ${issue.title}</p>
          <p><strong>Description:</strong> ${issue.description}</p>
          <p><strong>Priority:</strong> ${issue.priority || 'Medium'}</p>
          <a href="${process.env.APP_URL}/dashboard">View in Dashboard</a>
        `
      });
      return true;
    } catch (error) {
      console.error('Failed to send issue notification:', error);
      return false;
    }
  }
}