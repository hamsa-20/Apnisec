import { UserRepository } from '../repositories/UserRepository';

export interface UserProfile {
  id: string;
  email: string;
  name?: string;
  company?: string;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdateProfileData {
  name?: string;
  company?: string;
  phone?: string;
}

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async getUserProfile(userId: string): Promise<UserProfile> {
    // Mock data - in real app, fetch from database
    return {
      id: userId,
      email: 'user@example.com',
      name: 'Demo User',
      company: 'Demo Company',
      phone: '+1234567890',
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }

  async updateUserProfile(userId: string, data: UpdateProfileData): Promise<UserProfile> {
    // Mock update - in real app, update in database
    const currentProfile = await this.getUserProfile(userId);
    
    return {
      ...currentProfile,
      ...data,
      updatedAt: new Date()
    };
  }
}