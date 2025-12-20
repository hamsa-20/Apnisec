const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function test() {
  try {
    await prisma.$connect();
    console.log('✅ Database connected successfully!');
    
    const userCount = await prisma.user.count();
    console.log(`📊 Total users: ${userCount}`);
    
    // Try to create a test user
    const testUser = await prisma.user.create({
      data: {
        email: `test${Date.now()}@test.com`,
        name: 'Test User',
        password: 'hashed_password_test'
      }
    });
    
    console.log('✅ Test user created:', testUser.email);
    
  } catch (error) {
    console.log('❌ Database error:', error.message);
    console.log('Full error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

test();