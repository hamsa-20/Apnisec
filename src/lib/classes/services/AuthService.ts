// @ts-nocheck
// src/lib/classes/services/AuthService.ts
import bcrypt from 'bcryptjs'
import { JWTService } from './JWTService'
import { EmailService } from './EmailService'
import { RateLimiterService } from './RateLimiterService'
import { UserRepository } from '../repositories/UserRepository'
import { ApiError } from '../errors/ApiError'
import { AuthValidator } from '../validators/AuthValidator'

export class AuthService {
  private jwtService: JWTService
  private emailService: EmailService
  private rateLimiter: RateLimiterService
  private userRepository: UserRepository
  private validator: AuthValidator

  constructor() {
    this.jwtService = new JWTService()
    this.emailService = new EmailService()
    this.rateLimiter = new RateLimiterService()
    this.userRepository = new UserRepository()
    this.validator = new AuthValidator()
  }

  async register(userData: any) {
    await this.validator.validateRegister(userData)

    const existingUser = await this.userRepository.findByEmail(userData.email)
    if (existingUser) {
      throw new ApiError('Email already registered', 400)
    }

    await this.rateLimiter.checkLimit(`register:${userData.email}`, 5, 3600000)

    const hashedPassword = await bcrypt.hash(userData.password, 10)

    const user = await this.userRepository.create({
      email: userData.email,
      password: hashedPassword,
      name: userData.name || null,
      company: userData.company || null,
      phone: userData.phone || null,
      role: 'USER',
      isActive: true
    })

    const tokens = this.jwtService.generateTokens({
      userId: user.id,
      email: user.email,
      role: user.role || 'USER'
    })

    if (user.email) {
      await this.emailService.sendWelcomeEmail(
        user.email, 
        user.name || user.email.split('@')[0]
      )
    }

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        company: user.company,
        role: user.role || 'USER'
      },
      tokens
    }
  }

  async login(email: string, password: string, ipAddress?: string) {
    await this.validator.validateLogin({ email, password })

    await this.rateLimiter.checkLimit(`login:${email}`, 10, 900000)

    const user = await this.userRepository.findByEmail(email)
    if (!user) {
      throw new ApiError('Invalid credentials', 401)
    }

    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      throw new ApiError('Invalid credentials', 401)
    }

    if (!user.isActive) {
      throw new ApiError('Account is deactivated', 403)
    }

    const tokens = this.jwtService.generateTokens({
      userId: user.id,
      email: user.email,
      role: user.role || 'USER'
    })

    await this.userRepository.updateLastLogin(user.id, ipAddress)

    if (user.email) {
      await this.emailService.sendSecurityAlert(
        user.email,
        'New Login Detected',
        `New login from IP: ${ipAddress || 'Unknown'}`
      )
    }

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role || 'USER',
        company: user.company
      },
      tokens
    }
  }

  async logout(userId: string) {
    await this.jwtService.invalidateUserTokens(userId)
    return { success: true, message: 'Logged out successfully' }
  }
}