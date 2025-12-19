import jwt from 'jsonwebtoken';
import { AuthenticationError } from '../errors/ApiError';

export interface TokenPayload {
  userId: string;
  email: string;
}

export class JWTService {
  private readonly secret = process.env.JWT_SECRET || 'your-secret-key-change-this';
  private readonly expiresIn = '1h';

  generateToken(payload: TokenPayload): string {
    return jwt.sign(payload, this.secret, { expiresIn: this.expiresIn });
  }

  verifyToken(token: string): TokenPayload {
    try {
      return jwt.verify(token, this.secret) as TokenPayload;
    } catch (error) {
      throw new AuthenticationError('Invalid or expired token');
    }
  }

  decodeToken(token: string): TokenPayload | null {
    try {
      return jwt.decode(token) as TokenPayload;
    } catch {
      return null;
    }
  }
}