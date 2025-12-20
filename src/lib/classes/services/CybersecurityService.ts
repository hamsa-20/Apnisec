// src/lib/classes/services/CybersecurityService.ts
import { ApiError } from '../errors/ApiError'
import { DarkEyeWatcherService } from './DarkEyeWatcherService'
import { CloudSecurityService } from './CloudSecurityService'
import { VCISOService } from './VCISOService'
import { RedTeamAssessmentService } from './RedTeamAssessmentService'
import { VAPTService } from './VAPTService'
import { ServiceType } from '@/lib/types/cybersecurity'

export class CybersecurityService {
  private darkEyeWatcherService: DarkEyeWatcherService
  private cloudSecurityService: CloudSecurityService
  private vCISOService: VCISOService
  private redTeamAssessmentService: RedTeamAssessmentService
  private vaptService: VAPTService

  constructor() {
    this.darkEyeWatcherService = new DarkEyeWatcherService()
    this.cloudSecurityService = new CloudSecurityService()
    this.vCISOService = new VCISOService()
    this.redTeamAssessmentService = new RedTeamAssessmentService()
    this.vaptService = new VAPTService()
  }

  async getServiceOverview() {
    return {
      services: [
        {
          id: 'dark-eye-watcher',
          name: 'Dark Eye Watcher',
          description: 'Monitor The Dark Web For Compromised Data 24x7',
          features: [
            'Track data breaches in real-time',
            'Threat Intelligence Platform',
            'Data Loss Prevention (DLP)',
            'Brand Protection Services'
          ],
          icon: '👁️',
          benefits: [
            'Early detection of compromised credentials',
            'Protect brand reputation',
            'Prevent financial loss',
            'Meet compliance requirements'
          ]
        },
        {
          id: 'cloud-security',
          name: 'Cloud Security',
          description: 'Comprehensive Cloud Security Posture Management',
          features: [
            'Asset Monitoring & Discovery',
            'Cloud Security Posture Management (CSPM)',
            'Microservices Security',
            'Cloud Attack Emulation'
          ],
          icon: '☁️',
          benefits: [
            'Identify misconfigurations',
            'Prevent data breaches',
            'Ensure compliance',
            'Optimize cloud costs'
          ]
        },
        {
          id: 'virtual-ciso',
          name: 'Virtual CISO',
          description: 'Your Dedicated Security Leadership Team',
          features: [
            'Continuous Vulnerability Scanning',
            'DevSecOps Implementation',
            'Threat Modelling & Architecture Review',
            'Compliance Management'
          ],
          icon: '🛡️',
          benefits: [
            'Expert security guidance',
            'Cost-effective leadership',
            'Proactive risk management',
            'Regulatory compliance'
          ]
        },
        {
          id: 'red-team-assessment',
          name: 'Red Team Assessment',
          description: 'Real-World Attack Simulation',
          features: [
            'Social Engineering Simulations',
            'Network & Firewall Penetration Testing',
            'Physical Security Assessments',
            'Cloud Attack Emulation'
          ],
          icon: '🔴',
          benefits: [
            'Identify real vulnerabilities',
            'Test incident response',
            'Validate security controls',
            'Improve security posture'
          ]
        },
        {
          id: 'vapt',
          name: 'VAPT',
          description: 'Vulnerability Assessment & Penetration Testing',
          features: [
            'Web, API & Mobile Application Security',
            'Secure Code Review',
            'Network Security Testing',
            'Detailed Reporting & Remediation'
          ],
          icon: '🔍',
          benefits: [
            'Find vulnerabilities before attackers',
            'Meet compliance requirements',
            'Protect customer data',
            'Build trust with stakeholders'
          ]
        }
      ]
    }
  }

  async getServiceDetails(serviceId: ServiceType) {
    const overview = await this.getServiceOverview()
    const service = overview.services.find(s => s.id === serviceId)
    
    if (!service) {
      throw new ApiError('Service not found', 404)
    }

    // Add additional details based on service type
    const additionalDetails: Record<string, any> = {
      'dark-eye-watcher': {
        scanningFrequency: '24/7 Real-time',
        dataSources: ['Dark Web Forums', 'Paste Sites', 'IRC Channels', 'Telegram Groups'],
        alertTypes: ['Credentials Exposed', 'Financial Data', 'Personal Information', 'Intellectual Property']
      },
      'cloud-security': {
        supportedPlatforms: ['AWS', 'Azure', 'Google Cloud', 'Kubernetes'],
        complianceFrameworks: ['SOC2', 'ISO27001', 'HIPAA', 'GDPR', 'PCI-DSS']
      },
      'virtual-ciso': {
        deliverables: [
          'Security Strategy & Roadmap',
          'Risk Assessment Report',
          'Security Policies & Procedures',
          'Incident Response Plan'
        ],
        engagementModels: ['Full-time', 'Part-time', 'Advisory']
      },
      'red-team-assessment': {
        methodologies: ['OSSTMM', 'PTES', 'NIST SP 800-115'],
        toolsUsed: ['Metasploit', 'Burp Suite', 'Cobalt Strike', 'Custom Scripts']
      },
      'vapt': {
        testingTypes: ['Black Box', 'White Box', 'Grey Box'],
        standardsFollowed: ['OWASP Top 10', 'SANS 25', 'NIST', 'CIS Benchmarks']
      }
    }

    return {
      ...service,
      details: additionalDetails[serviceId] || {}
    }
  }

  async calculateServicePrice(serviceId: ServiceType, options: any) {
    // Price calculation logic
    const basePrices: Record<ServiceType, number> = {
      'dark-eye-watcher': 999,
      'cloud-security': 1499,
      'virtual-ciso': 2999,
      'red-team-assessment': 1999,
      'vapt': 2499
    }

    let total = basePrices[serviceId] || 0

    // Add-ons and customizations
    if (options?.enterpriseSupport) total += 500
    if (options?.priorityResponse) total += 300
    if (options?.customReporting) total += 200
    if (options?.trainingSessions) total += options.trainingSessions * 100

    return {
      basePrice: basePrices[serviceId],
      addons: total - basePrices[serviceId],
      totalPrice: total,
      billingPeriod: options?.billingPeriod || 'monthly',
      currency: 'USD'
    }
  }
}