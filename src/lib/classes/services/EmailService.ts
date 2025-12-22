// import { Resend } from 'resend'
// import { ApiError } from '../errors/ApiError'

// export class EmailService {
//   private resend: Resend
//   private from: string

//   constructor() {
//     if (!process.env.RESEND_API_KEY) {
//       throw new Error('RESEND_API_KEY is missing')
//     }

//     this.resend = new Resend(process.env.RESEND_API_KEY)
//     this.from = process.env.EMAIL_FROM || 'ApniSec <noreply@apnisec.com>'
//   }

//   /* ================= BASIC EMAILS ================= */

//   async sendWelcomeEmail(email: string, name: string) {
//     try {
//       await this.resend.emails.send({
//         from: this.from,
//         to: email,
//         subject: 'Welcome to ApniSec 🚀',
//         html: `
//           <div style="font-family: Arial, sans-serif">
//             <h2>Welcome, ${name} 👋</h2>
//             <p>Your ApniSec account has been created successfully.</p>
//             <p>You can now manage security issues from your dashboard.</p>
//             <br />
//             <p>— ApniSec Team</p>
//           </div>
//         `,
//       })
//     } catch (error) {
//       console.error('Welcome email failed:', error)
//     }
//   }

//   async sendSecurityAlert(email: string, subject: string, message: string) {
//     try {
//       await this.resend.emails.send({
//         from: this.from,
//         to: email,
//         subject,
//         html: `
//           <div style="font-family: Arial, sans-serif">
//             <h3>Security Alert</h3>
//             <p>${message}</p>
//             <br />
//             <p>— ApniSec Security Team</p>
//           </div>
//         `,
//       })
//     } catch (error) {
//       console.error('Security alert email failed:', error)
//     }
//   }

//   async sendIssueNotification(
//     email: string,
//     issue: { type: string; title: string; description: string }
//   ) {
//     try {
//       await this.resend.emails.send({
//         from: this.from,
//         to: email,
//         subject: 'New Issue Created',
//         html: `
//           <div style="font-family: Arial, sans-serif">
//             <h3>Issue Created Successfully</h3>
//             <p><strong>Type:</strong> ${issue.type}</p>
//             <p><strong>Title:</strong> ${issue.title}</p>
//             <p><strong>Description:</strong></p>
//             <p>${issue.description}</p>
//           </div>
//         `,
//       })
//     } catch (error) {
//       console.error('Issue notification email failed:', error)
//     }
//   }

//   /* ================= ADVANCED SECURITY EMAILS ================= */

//   async sendDarkWebAlert(
//     email: string,
//     domain: string,
//     scanResult: {
//       leaksFound: number
//       credentialsExposed: number
//       severity: string
//       lastScan: string
//     }
//   ) {
//     try {
//       await this.resend.emails.send({
//         from: this.from,
//         to: email,
//         subject: `🚨 Dark Web Alert for ${domain}`,
//         html: this.generateDarkWebAlertHTML(domain, scanResult),
//       })
//     } catch (error) {
//       console.error('Dark web alert email failed:', error)
//       throw new ApiError('Failed to send dark web alert', 500)
//     }
//   }

//   async sendVCISOPlan(
//     email: string,
//     companyName: string,
//     plan: {
//       riskAssessment: {
//         riskLevel: string
//         vulnerabilityScore: number
//       }
//       securityControls: string[]
//       timeline: { phase: string; duration: string }[]
//     }
//   ) {
//     try {
//       await this.resend.emails.send({
//         from: this.from,
//         to: email,
//         subject: `📋 VCISO Security Plan for ${companyName}`,
//         html: this.generateVCISOPlanHTML(companyName, plan),
//       })
//     } catch (error) {
//       console.error('VCISO plan email failed:', error)
//       throw new ApiError('Failed to send VCISO plan', 500)
//     }
//   }

//   /* ================= EMAIL TEMPLATES ================= */

//   private generateDarkWebAlertHTML(domain: string, scanResult: any): string {
//     return `
//       <div style="font-family: Arial, sans-serif">
//         <h2 style="color:#dc2626">🚨 Dark Web Security Alert</h2>
//         <p>Domain: <strong>${domain}</strong></p>

//         <ul>
//           <li>Leaks Found: ${scanResult.leaksFound}</li>
//           <li>Credentials Exposed: ${scanResult.credentialsExposed}</li>
//           <li>Severity: ${scanResult.severity}</li>
//           <li>Last Scan: ${new Date(scanResult.lastScan).toDateString()}</li>
//         </ul>

//         <p>Please take immediate action.</p>
//       </div>
//     `
//   }

//   private generateVCISOPlanHTML(companyName: string, plan: any): string {
//     return `
//       <div style="font-family: Arial, sans-serif">
//         <h2>📋 VCISO Security Plan</h2>
//         <p><strong>Company:</strong> ${companyName}</p>

//         <h3>Risk Assessment</h3>
//         <p>Risk Level: ${plan.riskAssessment.riskLevel}</p>
//         <p>Score: ${plan.riskAssessment.vulnerabilityScore}/100</p>

//         <h3>Security Controls</h3>
//         <ul>
//           ${plan.securityControls.map((c: string) => `<li>${c}</li>`).join('')}
//         </ul>

//         <h3>Timeline</h3>
//         <ul>
//           ${plan.timeline
//             .map((t: any) => `<li>${t.phase} – ${t.duration}</li>`)
//             .join('')}
//         </ul>
//       </div>
//     `
//   }
// }
import { Resend } from 'resend'
import { ApiError } from '../errors/ApiError'

export class EmailService {
  private resend: Resend

  constructor() {
    this.resend = new Resend(process.env.RESEND_API_KEY || '')
  }

  async sendWelcomeEmail(email: string, name: string) {
    if (!process.env.RESEND_API_KEY) {
      console.warn('RESEND_API_KEY missing, skipping email')
      return
    }

    try {
      console.log('📧 Sending welcome email to:', email)

      return await this.resend.emails.send({
        from: 'ApniSec <onboarding@resend.dev>',
        to: [email],
        subject: 'Welcome to ApniSec 🎉',
        html: `
          <h2>Welcome ${name}</h2>
          <p>Your ApniSec account has been successfully created.</p>
        `,
      })
    } catch (error) {
      console.error('Email error:', error)
      throw new ApiError('Failed to send welcome email', 500)
    }
  }

  async sendSecurityAlert(email: string, subject: string, message: string) {
    return this.resend.emails.send({
      from: 'onboarding@resend.dev',

      to: [email],
      subject,
      html: `<p>${message}</p>`,
    })
  }

  async sendIssueNotification(email: string, issue: any) {
    return this.resend.emails.send({
      from: 'ApniSec <onboarding@resend.dev>',
      to: [email],
      subject: `New Issue Created: ${issue.title}`,
      html: `
        <h3>${issue.title}</h3>
        <p>${issue.description}</p>
        <p>Type: ${issue.type}</p>
      `,
    })
  }
  async sendDarkWebAlert(
  email: string,
  domain: string,
  scanResult: {
    severity: string
    leaksFound: number
    credentialsExposed: number
  }
) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY missing, skipping dark web alert email')
    return
  }

  try {
    return await this.resend.emails.send({
      from: 'ApniSec Alerts <onboarding@resend.dev>',
      to: [email],
      subject: `🚨 Dark Web Alert for ${domain}`,
      html: `
        <h2>🚨 Dark Web Exposure Detected</h2>
        <p><strong>Domain:</strong> ${domain}</p>
        <p><strong>Severity:</strong> ${scanResult.severity}</p>

        <ul>
          <li>Leaks Found: ${scanResult.leaksFound}</li>
          <li>Credentials Exposed: ${scanResult.credentialsExposed}</li>
        </ul>

        <p>Please take immediate action to secure your systems.</p>
      `,
    })
  } catch (error) {
    console.error('Failed to send dark web alert email:', error)
    throw new ApiError('Failed to send dark web alert email', 500)
  }
}
async sendVCISOPlan(
  email: string,
  companyName: string,
  plan: any
) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY missing, skipping VCISO email')
    return
  }

  try {
    return await this.resend.emails.send({
      from: 'ApniSec VCISO <onboarding@resend.dev>',
      to: [email],
      subject: `📋 Your VCISO Security Plan for ${companyName}`,
      html: `
        <h2>📋 VCISO Security Plan</h2>

        <p><strong>Company:</strong> ${companyName}</p>
        <p><strong>Risk Level:</strong> ${plan.riskLevel}</p>

        <h3>Key Recommendations</h3>
        <ul>
          ${(plan.recommendations || [])
            .map((r: string) => `<li>${r}</li>`)
            .join('')}
        </ul>

        <p>Please review this plan carefully and reach out if you need assistance.</p>
      `,
    })
  } catch (error) {
    console.error('Failed to send VCISO plan email:', error)
    throw new ApiError('Failed to send VCISO plan email', 500)
  }
}


  

      

}
