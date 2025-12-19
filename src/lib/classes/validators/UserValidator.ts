export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export class UserValidator {
  validateProfileUpdate(data: any): ValidationResult {
    // Check if data is an object
    if (!data || typeof data !== 'object') {
      return { valid: false, error: 'Invalid profile data' };
    }

    // Validate name if provided
    if (data.name !== undefined && (typeof data.name !== 'string' || data.name.trim().length === 0)) {
      return { valid: false, error: 'Name must be a non-empty string' };
    }

    // Validate company if provided
    if (data.company !== undefined && typeof data.company !== 'string') {
      return { valid: false, error: 'Company must be a string' };
    }

    // Validate phone if provided
    if (data.phone !== undefined) {
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
      if (typeof data.phone !== 'string' || !phoneRegex.test(data.phone.replace(/[\s\-\(\)]/g, ''))) {
        return { valid: false, error: 'Invalid phone number format' };
      }
    }

    return { valid: true };
  }
}