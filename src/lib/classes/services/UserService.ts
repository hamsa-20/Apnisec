// import { UserRepository } from '../repositories/UserRepository';

// export interface UserProfile {
//   id: string;
//   email: string;
//   name?: string;
//   company?: string;
//   phone?: string;
//   createdAt: Date;
//   updatedAt: Date;
// }

// export interface UpdateProfileData {
//   name?: string;
//   company?: string;
//   phone?: string;
// }

// export class UserService {
//   private userRepository: UserRepository;

//   constructor() {
//     this.userRepository = new UserRepository();
//   }

//   async getUserProfile(userId: string): Promise<UserProfile> {
//     // Mock data - in real app, fetch from database
//     return {
//       id: userId,
//       email: 'user@example.com',
//       name: 'Demo User',
//       company: 'Demo Company',
//       phone: '+1234567890',
//       createdAt: new Date(),
//       updatedAt: new Date()
//     };
//   }

//   async updateUserProfile(userId: string, data: UpdateProfileData): Promise<UserProfile> {
//     // Mock update - in real app, update in database
//     const currentProfile = await this.getUserProfile(userId);
    
//     return {
//       ...currentProfile,
//       ...data,
//       updatedAt: new Date()
//     };
//   }
// }
import bcrypt from 'bcryptjs'
import { UserRepository } from '../repositories/UserRepository'
import { EmailService } from './EmailService'
import { ApiError } from '../errors/ApiError'

export class UserService {
  private repo = new UserRepository()
  private email = new EmailService()

  // ================= CHANGE PASSWORD =================
  async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string
  ) {
    const user = await this.repo.findById(userId)
    if (!user) {
      throw new ApiError('User not found', 404)
    }

    const isValid = await bcrypt.compare(currentPassword, user.password)
    if (!isValid) {
      throw new ApiError('Current password is incorrect', 400)
    }

    if (newPassword.length < 6) {
      throw new ApiError('Password must be at least 6 characters', 400)
    }

    const hashed = await bcrypt.hash(newPassword, 10)

    await this.repo.update(userId, {
      password: hashed,
    })

    // 📧 SECURITY EMAIL
    await this.email.sendSecurityAlert(
      user.email,
      'Password Changed',
      'Your password was changed successfully. If this was not you, contact support immediately.'
    )

    return { success: true }
  }
  async getUserProfile(userId: string) {
  const user = await this.repo.findById(userId)

  if (!user) {
    throw new ApiError('User not found', 404)
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone ?? null,
    role: user.role ?? null,
    createdAt: user.createdAt,
  }
}


  // ================= UPDATE PROFILE =================
  async updateProfile(userId: string, data: any) {
    const user = await this.repo.findById(userId)
    if (!user) {
      throw new ApiError('User not found', 404)
    }

    await this.repo.update(userId, {
      name: data.name ?? user.name,
      // ⚠️ ONLY include fields that exist in Prisma schema
      // add phone/role here ONLY if they exist in schema
    })

    // 📧 PROFILE UPDATE EMAIL
    await this.email.sendSecurityAlert(
      user.email,
      'Profile Updated',
      'Your profile information was updated successfully.'
    )

    return { success: true }
  }
}
