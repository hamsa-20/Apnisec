export const ISSUE_TYPES = [
  'CLOUD_SECURITY',
  'RETEAM_ASSESSMENT',
  'VAPT'
] as const;

export const PRIORITY_LEVELS = [
  'LOW',
  'MEDIUM',
  'HIGH',
  'CRITICAL'
] as const;

export const ISSUE_STATUS = [
  'OPEN',
  'IN_PROGRESS',
  'RESOLVED',
  'CLOSED'
] as const;

export const RATE_LIMIT = {
  MAX_REQUESTS: 100,
  WINDOW_MS: 15 * 60 * 1000 // 15 minutes
};