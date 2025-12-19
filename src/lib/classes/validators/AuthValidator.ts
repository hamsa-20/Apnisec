import validator from 'validator';
import { ValidationError } from '../errors/ApiError';

export class AuthValidator {
  static validateEmail(email: string): void {
    if (!email || !validator.isEmail(email)) {
      throw new ValidationError('Valid email is required');
    }
  }

  static validatePassword(password: string): void {
    if (!password || password.length < 6) {
      throw new ValidationError('Password must be at least 6 characters');
    }
  }

  static validateName(name: string): void {
    if (name && name.length > 100) {
      throw new ValidationError('Name must be less than 100 characters');
    }
  }

  static validateRegisterInput(data: { email: string; password: string; name?: string }): void {
    this.validateEmail(data.email);
    this.validatePassword(data.password);
    if (data.name) this.validateName(data.name);
  }

  static validateLoginInput(data: { email: string; password: string }): void {
    this.validateEmail(data.email);
    if (!data.password) {
      throw new ValidationError('Password is required');
    }
  }
}