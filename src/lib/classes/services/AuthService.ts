import bcrypt from 'bcryptjs';
import { UserRepository } from '../repositories/UserRepository';
import { JWTService } from './JWTService';
import { EmailService } from './EmailService';
import { ApiError, ValidationError } from '../errors/ApiError';

export class AuthService {
  private userRepository: UserRepository;
  private jwtService: JWTService;
  private emailService: EmailService;

  constructor() {
    this.userRepository = new UserRepository();
    this.jwtService = new JWTService();
    this.emailService = new EmailService();
  }

  async register(email: string, password: string, name?: string) {
    if (!email || !password) {
      throw new ValidationError('Email and password are required');
    }

    if (password.length < 6) {
      throw new ValidationError('Password must be at least 6 characters');
    }

    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new ValidationError('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userRepository.create({
      email,
      password: hashedPassword,
      name
    });

    await this.emailService.sendWelcomeEmail(email, name || 'User');

    const token = this.jwtService.generateToken({
      userId: user.id,
      email: user.email
    });

    return { user, token };
  }

  async login(email: string, password: string) {
    if (!email || !password) {
      throw new ValidationError('Email and password are required');
    }

    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new ApiError('Invalid credentials', 401);
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new ApiError('Invalid credentials', 401);
    }

    const token = this.jwtService.generateToken({
      userId: user.id,
      email: user.email
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      },
      token
    };
  }

  async getCurrentUser(userId: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new ApiError('User not found', 404);
    }
    return user;
  }
}