// // src/lib/classes/validators/AuthValidator.ts
// import validator from 'validator'
// import { ApiError } from '../errors/ApiError'

// export class AuthValidator {
//   async validateRegister(data: {
//     email: string
//     password: string
//     name?: string
//     company?: string
//     phone?: string
//   }): Promise<void> {
//     const errors: string[] = []

//     // Email validation
//     if (!data.email || !validator.isEmail(data.email)) {
//       errors.push('Valid email is required')
//     }

//     // Password validation
//     if (!data.password || data.password.length < 8) {
//       errors.push('Password must be at least 8 characters long')
//     }

//     if (!data.password.match(/[A-Z]/)) {
//       errors.push('Password must contain at least one uppercase letter')
//     }

//     if (!data.password.match(/[a-z]/)) {
//       errors.push('Password must contain at least one lowercase letter')
//     }

//     if (!data.password.match(/[0-9]/)) {
//       errors.push('Password must contain at least one number')
//     }

//     // Name validation (optional)
//     if (data.name && data.name.length > 100) {
//       errors.push('Name cannot exceed 100 characters')
//     }

//     // Company validation (optional)
//     if (data.company && data.company.length > 200) {
//       errors.push('Company name cannot exceed 200 characters')
//     }

//     // Phone validation (optional)
//     if (data.phone && !validator.isMobilePhone(data.phone)) {
//       errors.push('Invalid phone number format')
//     }

//     if (errors.length > 0) {
//       throw new ApiError(errors.join(', '), 400)
//     }
//   }

//   async validateLogin(data: { email: string; password: string }): Promise<void> {
//     const errors: string[] = []

//     if (!data.email || !validator.isEmail(data.email)) {
//       errors.push('Valid email is required')
//     }

//     if (!data.password) {
//       errors.push('Password is required')
//     }

//     if (errors.length > 0) {
//       throw new ApiError(errors.join(', '), 400)
//     }
//   }
// }

// src/lib/classes/validators/AuthValidator.ts - SIMPLIFIED WORKING VERSION
import { ApiError } from '../errors/ApiError'

export class AuthValidator {
  async validateRegister(data: {
    email: string
    password: string
    name?: string
    company?: string
    phone?: string
  }): Promise<void> {
    const errors: string[] = []

    // SIMPLIFIED Email validation
    if (!data.email || !data.email.includes('@') || !data.email.includes('.')) {
      errors.push('Valid email is required')
    }

    // SIMPLIFIED Password validation - MINIMUM REQUIREMENTS
    if (!data.password || data.password.length < 6) {
      errors.push('Password must be at least 6 characters long')
    }

    // REMOVED complex password requirements for now
    // if (!data.password.match(/[A-Z]/)) {
    //   errors.push('Password must contain at least one uppercase letter')
    // }
    // if (!data.password.match(/[a-z]/)) {
    //   errors.push('Password must contain at least one lowercase letter')
    // }
    // if (!data.password.match(/[0-9]/)) {
    //   errors.push('Password must contain at least one number')
    // }

    // Name validation (optional)
    if (data.name && data.name.length > 100) {
      errors.push('Name cannot exceed 100 characters')
    }

    // Company validation (optional) - removed validation for demo
    // if (data.company && data.company.length > 200) {
    //   errors.push('Company name cannot exceed 200 characters')
    // }

    // Phone validation (optional) - removed validation for demo
    // if (data.phone && !validator.isMobilePhone(data.phone)) {
    //   errors.push('Invalid phone number format')
    // }

    if (errors.length > 0) {
      throw new ApiError(errors.join(', '), 400)
    }
  }

  async validateLogin(data: { email: string; password: string }): Promise<void> {
    const errors: string[] = []

    if (!data.email || !data.email.includes('@')) {
      errors.push('Valid email is required')
    }

    if (!data.password) {
      errors.push('Password is required')
    }

    if (errors.length > 0) {
      throw new ApiError(errors.join(', '), 400)
    }
  }

  // Simple validation methods for forms
  validateEmail(email: string): boolean {
    return email.includes('@') && email.includes('.')
  }

  validatePassword(password: string): boolean {
    return password.length >= 6
  }
}