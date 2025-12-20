// src/lib/classes/services/EmailService.ts (UPDATE existing file)
import { Resend } from 'resend'
import { ApiError } from '../errors/ApiError'

export class EmailService {
  private resend: Resend

  constructor() {
    this.resend = new Resend(process.env.RESEND_API_KEY!)
  }

  // EXISTING METHODS (keep these):
  async sendWelcomeEmail(email: string, name: string) { /* ... existing code ... */ }
  async sendSecurityAlert(email: string, subject: string, message: string) { /* ... existing code ... */ }
  async sendIssueNotification(email: string, issue: any) { /* ... existing code ... */ }

  // NEW METHODS for cybersecurity features:
  async sendDarkWebAlert(userId: string, domain: string, scanResult: any) {
    try {
      const data = await this.resend.emails.send({
        from: 'ApniSec Security <alerts@apnisec.com>',
        to: ['user-email-would-be-here@example.com'], // In real app, get from user ID
        subject: `🚨 Dark Web Alert for ${domain}`,
        html: this.generateDarkWebAlertHTML(domain, scanResult)
      })
      return data
    } catch (error) {
      console.error('Failed to send dark web alert:', error)
      throw new ApiError('Failed to send dark web alert', 500)
    }
  }

  async sendVCISOPlan(userId: string, companyName: string, plan: any) {
    try {
      const data = await this.resend.emails.send({
        from: 'ApniSec VCISO <vciso@apnisec.com>',
        to: ['user-email@example.com'],
        subject: `📋 Your VCISO Security Plan for ${companyName}`,
        html: this.generateVCISOPlanHTML(companyName, plan)
      })
      return data
    } catch (error) {
      console.error('Failed to send VCISO plan:', error)
      throw new ApiError('Failed to send security plan', 500)
    }
  }

  private generateDarkWebAlertHTML(domain: string, scanResult: any): string {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #dc2626;">🚨 Dark Web Security Alert</h2>
        <p>We found potential security issues for your domain: <strong>${domain}</strong></p>
        
        <div style="background-color: #fef2f2; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h3 style="color: #dc2626;">Scan Results:</h3>
          <ul>
            <li>Leaks Found: ${scanResult.leaksFound}</li>
            <li>Credentials Exposed: ${scanResult.credentialsExposed}</li>
            <li>Severity Level: ${scanResult.severity}</li>
            <li>Scan Date: ${new Date(scanResult.lastScan).toLocaleDateString()}</li>
          </ul>
        </div>
        
        <div style="background-color: #f0f9ff; padding: 15px; border-radius: 5px;">
          <h3 style="color: #0369a1;">Recommended Actions:</h3>
          <ol>
            <li>Reset passwords for affected accounts</li>
            <li>Enable multi-factor authentication</li>
            <li>Monitor financial transactions</li>
            <li>Educate employees about phishing attacks</li>
          </ol>
        </div>
        
        <p style="margin-top: 20px;">
          <a href="https://yourapp.com/dashboard" style="background-color: #2563eb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
            View Full Report in Dashboard
          </a>
        </p>
      </div>
    `
  }

  private generateVCISOPlanHTML(companyName: string, plan: any): string {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #059669;">📋 Your VCISO Security Plan</h2>
        <p>Dear ${companyName} Team,</p>
        
        <p>Your customized security plan has been prepared by ApniSec Virtual CISO.</p>
        
        <div style="background-color: #f0f9ff; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h3>Risk Assessment:</h3>
          <p>Risk Level: <strong>${plan.riskAssessment.riskLevel}</strong></p>
          <p>Vulnerability Score: ${plan.riskAssessment.vulnerabilityScore}/100</p>
        </div>
        
        <div style="background-color: #f0fdf4; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h3>Key Security Controls:</h3>
          <ul>
            ${plan.securityControls.map((control: string) => `<li>${control}</li>`).join('')}
          </ul>
        </div>
        
        <div style="background-color: #fef7cd; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h3>Implementation Timeline:</h3>
          <ul>
            ${plan.timeline.map((phase: any) => 
              `<li><strong>${phase.phase}:</strong> ${phase.duration}</li>`
            ).join('')}
          </ul>
        </div>
        
        <p style="margin-top: 20px;">
          <a href="https://yourapp.com/dashboard/vciso-plan" style="background-color: #059669; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
            View Complete Plan
          </a>
        </p>
      </div>
    `
  }
}