// src/lib/classes/handlers/CybersecurityHandler.ts
import { CybersecurityService } from '../services/CybersecurityService'
import { ApiError } from '../errors/ApiError'

export class CybersecurityHandler {
  private cybersecurityService: CybersecurityService

  constructor() {
    this.cybersecurityService = new CybersecurityService()
  }

  async getServices() {
    try {
      const services = await this.cybersecurityService.getServiceOverview()
      return {
        success: true,
        data: services,
        timestamp: new Date()
      }
    } catch (error) {
      throw new ApiError('Failed to fetch services', 500)
    }
  }
}