// src/lib/types/cybersecurity.ts
export type ServiceType = 
  | 'dark-eye-watcher'
  | 'cloud-security'
  | 'virtual-ciso'
  | 'red-team-assessment'
  | 'vapt'

export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
export type SeverityLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'

export interface DarkWebScanResult {
  domain: string
  leaksFound: number
  credentialsExposed: number
  creditCardsExposed: number
  severity: SeverityLevel
  lastScan: Date
  findings: Array<{
    type: string
    description: string
    source: string
    timestamp: Date
  }>
}

export interface CloudSecurityAssessment {
  provider: 'AWS' | 'Azure' | 'GCP'
  assessmentDate: Date
  misconfigurations: number
  insecurePermissions: number
  exposedServices: number
  complianceIssues: number
  securityScore: number
  recommendations: string[]
}

export interface VCISOPlan {
  companyName: string
  createdDate: Date
  riskAssessment: {
    riskLevel: RiskLevel
    criticalAssets: string[]
    threatLandscape: string[]
    vulnerabilityScore: number
  }
  securityControls: string[]
  complianceRequirements: string[]
  timeline: Array<{
    phase: string
    duration: string
    tasks: string[]
  }>
}

export interface RedTeamAssessment {
  scope: {
    external: boolean
    internal: boolean
    socialEngineering: boolean
  }
  simulationDate: Date
  findings: Array<{
    vector: string
    success: boolean
    severity: SeverityLevel
    details: string
  }>
}

export interface VAPTResult {
  target: {
    url?: string
    ip?: string
    type: 'WEB' | 'API' | 'MOBILE' | 'NETWORK'
  }
  scanDate: Date
  vulnerabilities: Array<{
    name: string
    severity: SeverityLevel
    description: string
    impact: string
    remediation: string
  }>
  securityScore: number
  recommendations: string[]
}