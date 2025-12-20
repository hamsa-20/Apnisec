// src/lib/classes/services/VCISOService.ts
import { EmailService } from './EmailService'
import { VCISOPlan } from '@/lib/types/cybersecurity'

export class VCISOService {
  private emailService: EmailService

  constructor() {
    this.emailService = new EmailService()
  }

  async createSecurityPlan(
    userId: string, 
    companyInfo: {
      name: string
      industry: string
      employeeCount: number
      existingSecurity: boolean
    }
  ): Promise<VCISOPlan> {
    const plan: VCISOPlan = {
      companyName: companyInfo.name,
      createdDate: new Date(),
      riskAssessment: this.generateRiskAssessment(companyInfo),
      securityControls: this.generateSecurityControls(companyInfo),
      complianceRequirements: this.getComplianceRequirements(companyInfo.industry),
      timeline: this.generateTimeline()
    }

    // Send plan email
    await this.emailService.sendVCISOPlan(userId, companyInfo.name, plan)

    return plan
  }

  private generateRiskAssessment(companyInfo: {
    existingSecurity: boolean
    employeeCount: number
    industry: string
  }): {
    riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
    criticalAssets: string[]
    threatLandscape: string[]
    vulnerabilityScore: number
  } {
    // Determine risk level based on company info
    let riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
    
    if (!companyInfo.existingSecurity) {
      riskLevel = 'HIGH'
    } else if (companyInfo.employeeCount > 500) {
      riskLevel = 'HIGH'
    } else if (companyInfo.employeeCount > 100) {
      riskLevel = 'MEDIUM'
    } else {
      riskLevel = 'LOW'
    }

    // Adjust based on industry
    const highRiskIndustries = ['finance', 'healthcare', 'government']
    if (highRiskIndustries.includes(companyInfo.industry.toLowerCase())) {
      if (riskLevel === 'LOW') riskLevel = 'MEDIUM'
      else if (riskLevel === 'MEDIUM') riskLevel = 'HIGH'
    }

    return {
      riskLevel,
      criticalAssets: [
        'Customer PII Data',
        'Intellectual Property',
        'Financial Systems & Records',
        'Source Code Repositories',
        'Employee HR Data'
      ],
      threatLandscape: [
        'Phishing & Social Engineering',
        'Ransomware Attacks',
        'Insider Threats',
        'DDoS Attacks',
        'Supply Chain Compromises',
        'API Security Vulnerabilities'
      ],
      vulnerabilityScore: this.calculateVulnerabilityScore(companyInfo, riskLevel)
    }
  }

  private calculateVulnerabilityScore(
    companyInfo: any, 
    riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  ): number {
    let score = 50 // Base score
    
    // Adjust based on existing security
    if (!companyInfo.existingSecurity) score += 30
    
    // Adjust based on company size
    if (companyInfo.employeeCount > 1000) score += 20
    else if (companyInfo.employeeCount > 100) score += 10
    
    // Adjust based on industry
    const highRiskIndustries = ['finance', 'healthcare']
    if (highRiskIndustries.includes(companyInfo.industry.toLowerCase())) score += 15
    
    // Cap at 100
    return Math.min(score, 100)
  }

  private generateSecurityControls(companyInfo: {
    employeeCount: number
    existingSecurity: boolean
  }): string[] {
    const baseControls = [
      'Multi-factor Authentication (MFA)',
      'Endpoint Detection & Response (EDR)',
      'Network Segmentation & Micro-segmentation',
      'Data Encryption at Rest & in Transit',
      'Security Awareness Training Program',
      'Incident Response Plan & Playbooks'
    ]
    
    const enterpriseControls = [
      'Security Information & Event Management (SIEM)',
      'Vulnerability Management Program',
      'Third-party Risk Management',
      'Cloud Security Posture Management (CSPM)',
      'Identity & Access Management (IAM)',
      'Data Loss Prevention (DLP)'
    ]
    
    const advancedControls = [
      'Zero Trust Architecture',
      'Container Security',
      'API Security Gateway',
      'Threat Intelligence Platform',
      'Security Orchestration, Automation & Response (SOAR)'
    ]

    let controls = [...baseControls]
    
    if (companyInfo.employeeCount > 100 || !companyInfo.existingSecurity) {
      controls = [...controls, ...enterpriseControls]
    }
    
    if (companyInfo.employeeCount > 500) {
      controls = [...controls, ...advancedControls]
    }
    
    return controls
  }

  private getComplianceRequirements(industry: string): string[] {
    const complianceMap: Record<string, string[]> = {
      'finance': ['SOC 2 Type II', 'PCI-DSS', 'ISO 27001', 'GLBA', 'SOX'],
      'healthcare': ['HIPAA', 'HITRUST CSF', 'HITECH Act', 'GDPR (if EU patients)'],
      'technology': ['SOC 2', 'ISO 27001', 'GDPR', 'CCPA', 'FedRAMP (if government)'],
      'retail': ['PCI-DSS', 'GDPR', 'CCPA', 'SOC 2'],
      'education': ['FERPA', 'COPPA', 'CIPA', 'GDPR (if international)'],
      'government': ['FISMA', 'FedRAMP', 'NIST SP 800-53', 'CMMC'],
      'manufacturing': ['ISO 27001', 'NIST CSF', 'GDPR', 'CIS Controls'],
      'default': ['GDPR', 'Basic Security Standards', 'Vendor Security Requirements']
    }
    
    const normalizedIndustry = industry.toLowerCase().trim()
    
    // Find matching industry
    for (const [key, requirements] of Object.entries(complianceMap)) {
      if (normalizedIndustry.includes(key) || key.includes(normalizedIndustry)) {
        return requirements
      }
    }
    
    // Check specific keywords
    if (normalizedIndustry.includes('fintech') || normalizedIndustry.includes('bank')) {
      return complianceMap.finance
    }
    
    if (normalizedIndustry.includes('health') || normalizedIndustry.includes('medical')) {
      return complianceMap.healthcare
    }
    
    if (normalizedIndustry.includes('gov') || normalizedIndustry.includes('public sector')) {
      return complianceMap.government
    }
    
    return complianceMap.default
  }

  private generateTimeline(): Array<{
    phase: string
    duration: string
    tasks: string[]
  }> {
    return [
      { 
        phase: 'Assessment & Discovery', 
        duration: '2-3 weeks',
        tasks: [
          'Current State Assessment',
          'Risk Assessment & Gap Analysis',
          'Asset Inventory & Classification',
          'Stakeholder Interviews'
        ]
      },
      { 
        phase: 'Strategy & Planning', 
        duration: '1-2 weeks',
        tasks: [
          'Security Strategy Development',
          'Policy & Procedure Creation',
          'Roadmap & Implementation Plan',
          'Budget & Resource Planning'
        ]
      },
      { 
        phase: 'Implementation', 
        duration: '8-12 weeks',
        tasks: [
          'Control Implementation',
          'Tool Deployment & Configuration',
          'Process Setup & Documentation',
          'Team Training & Enablement'
        ]
      },
      { 
        phase: 'Testing & Optimization', 
        duration: '2-3 weeks',
        tasks: [
          'Control Testing & Validation',
          'Policy Review & Refinement',
          'Performance Optimization',
          'Continuous Improvement Setup'
        ]
      }
    ]
  }
}