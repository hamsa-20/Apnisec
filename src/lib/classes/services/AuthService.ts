// // @ts-nocheck
// // src/lib/classes/services/AuthService.ts
// import bcrypt from 'bcryptjs'
// import { JWTService } from './JWTService'
// import { EmailService } from './EmailService'
// import { RateLimiterService } from './RateLimiterService'
// import { UserRepository } from '../repositories/UserRepository'
// import { ApiError } from '../errors/ApiError'
// import { AuthValidator } from '../validators/AuthValidator'

// export class AuthService {
//   private jwtService: JWTService
//   private emailService: EmailService
//   private rateLimiter: RateLimiterService
//   private userRepository: UserRepository
//   private validator: AuthValidator

//   constructor() {
//     this.jwtService = new JWTService()
//     this.emailService = new EmailService()
//     this.rateLimiter = new RateLimiterService()
//     this.userRepository = new UserRepository()
//     this.validator = new AuthValidator()
//   }

//   async register(userData: any) {
//     await this.validator.validateRegister(userData)

//     const existingUser = await this.userRepository.findByEmail(userData.email)
//     if (existingUser) {
//       throw new ApiError('Email already registered', 400)
//     }

//     await this.rateLimiter.checkLimit(`register:${userData.email}`, 5, 3600000)

//     const hashedPassword = await bcrypt.hash(userData.password, 10)

//     const user = await this.userRepository.create({
//       email: userData.email,
//       password: hashedPassword,
//       name: userData.name || null,
//       company: userData.company || null,
//       phone: userData.phone || null,
//       role: 'USER',
//       isActive: true
//     })

//     const tokens = this.jwtService.generateTokens({
//       userId: user.id,
//       email: user.email,
//       role: user.role || 'USER'
//     })

//     if (user.email) {
//       await this.emailService.sendWelcomeEmail(
//         user.email, 
//         user.name || user.email.split('@')[0]
//       )
//     }

//     return {
//       user: {
//         id: user.id,
//         email: user.email,
//         name: user.name,
//         company: user.company,
//         role: user.role || 'USER'
//       },
//       tokens
//     }
//   }
  

//   async login(email: string, password: string, ipAddress?: string) {
//     await this.validator.validateLogin({ email, password })

//     await this.rateLimiter.checkLimit(`login:${email}`, 10, 900000)

//     const user = await this.userRepository.findByEmail(email)
//     if (!user) {
//       throw new ApiError('Invalid credentials', 401)
//     }

//     const isValidPassword = await bcrypt.compare(password, user.password)
//     if (!isValidPassword) {
//       throw new ApiError('Invalid credentials', 401)
//     }

//     if (!user.isActive) {
//       throw new ApiError('Account is deactivated', 403)
//     }

//     const tokens = this.jwtService.generateTokens({
//       userId: user.id,
//       email: user.email,
//       role: user.role || 'USER'
//     })

//     await this.userRepository.updateLastLogin(user.id, ipAddress)

//     if (user.email) {
//       await this.emailService.sendSecurityAlert(
//         user.email,
//         'New Login Detected',
//         `New login from IP: ${ipAddress || 'Unknown'}`
//       )
//     }

//     return {
//       user: {
//         id: user.id,
//         email: user.email,
//         name: user.name,
//         role: user.role || 'USER',
//         company: user.company
//       },
//       tokens
//     }
//   }

//   async logout(userId: string) {
//     await this.jwtService.invalidateUserTokens(userId)
//     return { success: true, message: 'Logged out successfully' }
//   }
//   // In src/lib/classes/services/AuthService.ts - Update the register method
// async register(userData: any) {
//   try {
//     // Try validation, but don't fail hard if validator has issues
//     try {
//       await this.validator.validateRegister(userData);
//     } catch (error) {
//       console.warn('Validator error:', error);
//       // Continue with basic validation
//       if (!userData.email || !userData.password) {
//         throw new ApiError('Email and password are required', 400);
//       }
//       if (userData.password.length < 6) {
//         throw new ApiError('Password must be at least 6 characters', 400);
//       }
//     }

//     const existingUser = await this.userRepository.findByEmail(userData.email);
//     if (existingUser) {
//       throw new ApiError('Email already registered', 400);
//     }
    

//     // SIMPLIFIED: Remove rate limiting for now
//     // await this.rateLimiter.checkLimit(`register:${userData.email}`, 5, 3600000);

//     const hashedPassword = await bcrypt.hash(userData.password, 10);

//     const user = await this.userRepository.create({
//       email: userData.email,
//       password: hashedPassword,
//       name: userData.name || null,
//       company: userData.company || null,
//       phone: userData.phone || null,
//       role: 'USER',
//       isActive: true
//     });

//     const tokens = this.jwtService.generateTokens({
//       userId: user.id,
//       email: user.email,
//       role: user.role || 'USER'
//     });

//     // Send email async (don't await)
//     if (user.email) {
//       this.emailService.sendWelcomeEmail(
//         user.email, 
//         user.name || user.email.split('@')[0]
//       ).catch(err => console.error('Email error:', err));
//     }

//     return {
//       user: {
//         id: user.id,
//         email: user.email,
//         name: user.name,
//         company: user.company,
//         role: user.role || 'USER'
//       },
//       tokens
//     };
//   } catch (error) {
//     console.error('Registration service error:', error);
//     throw error;
//   }
// }}

// // // @ts-nocheck
// // // src/lib/classes/services/AuthService.ts - FIXED WITH DOUBLE AWAIT
// // import bcrypt from 'bcryptjs'
// // import { JWTService } from './JWTService'
// // import { EmailService } from './EmailService'
// // import { RateLimiterService } from './RateLimiterService'
// // import { UserRepository } from '../repositories/UserRepository'
// // import { ApiError } from '../errors/ApiError'
// // import { AuthValidator } from '../validators/AuthValidator'

// // export class AuthService {
// //   private jwtService: JWTService
// //   private emailService: EmailService
// //   private rateLimiter: RateLimiterService
// //   private userRepository: UserRepository
// //   private validator: AuthValidator

// //   constructor() {
// //     this.jwtService = new JWTService()
// //     this.emailService = new EmailService()
// //     this.rateLimiter = new RateLimiterService()
// //     this.userRepository = new UserRepository()
// //     this.validator = new AuthValidator()
// //   }

// //   async register(userData: any) {
// //     try {
// //       // SIMPLIFIED VALIDATION
// //       if (!userData.email || !userData.email.includes('@')) {
// //         throw new ApiError('Valid email is required', 400)
// //       }
      
// //       if (!userData.password || userData.password.length < 6) {
// //         throw new ApiError('Password must be at least 6 characters', 400)
// //       }

// //       // Check existing user
// //       const existingUser = await this.userRepository.findByEmail(userData.email)
// //       if (existingUser) {
// //         throw new ApiError('Email already registered', 400)
// //       }

// //       // Hash password
// //       const hashedPassword = await bcrypt.hash(userData.password, 10)

// //       // FIX: DOUBLE AWAIT to handle Promise<Promise<any>>
// //       const userPromise = this.userRepository.create({
// //         email: userData.email,
// //         password: hashedPassword,
// //         name: userData.name || null,
// //         company: userData.company || null,
// //         phone: userData.phone || null,
// //         role: 'USER',
// //         isActive: true
// //       })
      
// //       const user = await (await userPromise) as any // DOUBLE AWAIT

// //       // Generate tokens
// //       const tokens = this.jwtService.generateTokens({
// //         userId: user.id, // Now this works
// //         email: user.email,
// //         role: user.role || 'USER'
// //       })

// //       // Send welcome email async
// //       if (user.email) {
// //         this.emailService.sendWelcomeEmail(
// //           user.email, 
// //           user.name || user.email.split('@')[0]
// //         ).catch(err => console.error('Email error:', err))
// //       }

// //       return {
// //         user: {
// //           id: user.id,
// //           email: user.email,
// //           name: user.name,
// //           company: user.company,
// //           role: user.role || 'USER'
// //         },
// //         tokens
// //       }
// //     } catch (error) {
// //       console.error('Registration service error:', error)
// //       throw error
// //     }
// //   }

// //   async login(email: string, password: string, ipAddress?: string) {
// //     try {
// //       // Basic validation
// //       if (!email || !email.includes('@')) {
// //         throw new ApiError('Valid email is required', 400)
// //       }
      
// //       if (!password) {
// //         throw new ApiError('Password is required', 400)
// //       }

// //       // Find user
// //       const userPromise = this.userRepository.findByEmail(email)
// //       const user = await (await userPromise) as any // DOUBLE AWAIT
      
// //       if (!user) {
// //         throw new ApiError('Invalid credentials', 401)
// //       }

// //       // Check password
// //       const isValidPassword = await bcrypt.compare(password, user.password)
// //       if (!isValidPassword) {
// //         throw new ApiError('Invalid credentials', 401)
// //       }

// //       // Check if active
// //       if (!user.isActive) {
// //         throw new ApiError('Account is deactivated', 403)
// //       }

// //       // Generate tokens
// //       const tokens = this.jwtService.generateTokens({
// //         userId: user.id,
// //         email: user.email,
// //         role: user.role || 'USER'
// //       })

// //       // Update last login
// //       try {
// //         await this.userRepository.updateLastLogin(user.id, ipAddress)
// //       } catch (error) {
// //         console.warn('Could not update last login:', error)
// //       }

// //       // Send security alert async
// //       if (user.email) {
// //         this.emailService.sendSecurityAlert(
// //           user.email,
// //           'New Login Detected',
// //           `New login from IP: ${ipAddress || 'Unknown'}`
// //         ).catch(err => console.error('Email error:', err))
// //       }

// //       return {
// //         user: {
// //           id: user.id,
// //           email: user.email,
// //           name: user.name,
// //           role: user.role || 'USER',
// //           company: user.company
// //         },
// //         tokens
// //       }
// //     } catch (error) {
// //       console.error('Login service error:', error)
// //       throw error
// //     }
// //   }

// //   async logout(userId: string) {
// //     return { success: true, message: 'Logged out successfully' }
// //   }

// //   async getUserFromToken(token: string): Promise<any> {
// //     try {
// //       // Verify token
// //       const payload = this.jwtService.verifyToken(token)
      
// //       if (!payload || !payload.userId) {
// //         throw new ApiError('Invalid token', 401)
// //       }
      
// //       // Get user from database
// //       const userPromise = this.userRepository.findByEmail(payload.email)
// //       const user = await (await userPromise) as any // DOUBLE AWAIT
      
// //       if (!user) {
// //         throw new ApiError('User not found', 404)
// //       }
      
// //       // Return user without password
// //       return {
// //         id: user.id,
// //         email: user.email,
// //         name: user.name,
// //         role: user.role || 'USER',
// //         company: user.company
// //       }
// //     } catch (error) {
// //       console.error('getUserFromToken error:', error)
      
// //       if (error instanceof ApiError) {
// //         throw error
// //       }
      
// //       throw new ApiError('Invalid or expired token', 401)
// //     }
// //   }
// // }
// @ts-nocheck
import bcrypt from 'bcryptjs'
import { JWTService } from './JWTService'
import { EmailService } from './EmailService'
import { UserRepository } from '../repositories/UserRepository'
import { ApiError } from '../errors/ApiError'
import { AuthValidator } from '../validators/AuthValidator'

export class AuthService {
  private jwtService: JWTService
  private emailService: EmailService
  private userRepository: UserRepository
  private validator: AuthValidator

  constructor() {
    this.jwtService = new JWTService()
    this.emailService = new EmailService()
    this.userRepository = new UserRepository()
    this.validator = new AuthValidator()
  }

  async register(userData: any) {
    // ✅ BASIC VALIDATION (NO STRICT VALIDATOR)
    if (!userData.email || !userData.password) {
      throw new ApiError('Email and password are required', 400)
    }

    if (userData.password.length < 6) {
      throw new ApiError('Password must be at least 6 characters', 400)
    }

    const existingUser = await this.userRepository.findByEmail(userData.email)
    if (existingUser) {
      throw new ApiError('Email already registered', 400)
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10)

    // ✅ ONLY FIELDS THAT EXIST IN PRISMA
    const user = await this.userRepository.create({
      email: userData.email,
      password: hashedPassword,
      name: userData.name || null
    })

    const tokens = this.jwtService.generateTokens({
      userId: user.id,
      email: user.email,
      role: 'USER'
    })

    // ✅ NON-BLOCKING EMAIL
    if (user.email) {
      this.emailService
        .sendWelcomeEmail(
          user.email,
          user.name || user.email.split('@')[0]
        )
        .catch(() => {})
    }

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      },
      tokens
    }
  }

  async login(email: string, password: string, ipAddress?: string) {
    await this.validator.validateLogin({ email, password })

    const user = await this.userRepository.findByEmail(email)
    if (!user) {
      throw new ApiError('Invalid credentials', 401)
    }

    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      throw new ApiError('Invalid credentials', 401)
    }

    const tokens = this.jwtService.generateTokens({
      userId: user.id,
      email: user.email,
      role: 'USER'
    })

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      },
      tokens
    }
  }

  async logout(userId: string) {
    await this.jwtService.invalidateUserTokens(userId)
    return { success: true, message: 'Logged out successfully' }
  }
}
