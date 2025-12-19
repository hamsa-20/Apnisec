export abstract class BaseRepository {
  protected db: any;

  constructor() {
    this.db = {
      // Mock database methods
      findMany: async () => [],
      findUnique: async () => null,
      create: async (data: any) => ({ id: 'mock-id', ...data }),
      update: async (data: any) => ({ id: 'mock-id', ...data }),
      delete: async () => ({ id: 'mock-id' })
    };
  }

  async disconnect(): Promise<void> {
    // Mock disconnect
  }

  // This is the execute method that UserRepository inherits
  protected async execute<T>(operation: () => Promise<T>): Promise<T> {
    try {
      return await operation();
    } catch (error) {
      console.error('Database error:', error);
      // Return empty/default value for testing
      if (Array.isArray(operation as any)) {
        return [] as T;
      }
      return null as T;
    }
  }
}