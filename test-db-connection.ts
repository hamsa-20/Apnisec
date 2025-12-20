import { PrismaClient } from '@prisma/client';

async function testDb() {
  const prisma = new PrismaClient();
  
  try {
    await prisma.$connect();
    console.log('✅ Database connected successfully');
    
    // Try to create a user directly
    const user = await prisma.user.create({
      data: {
        email: 'testdb@apnisec.com',
        name: 'Test DB User',
        password: 'hashed_password_test',
      },
    });
    
    console.log('✅ User created:', user.email);
    
    // Count users
    const userCount = await prisma.user.count();
    console.log(`📊 Total users in database: ${userCount}`);
    
    await prisma.$disconnect();
    
  } catch (error: any) {
    console.error('❌ Database error:', error.message);
    console.error('Full error:', error);
  }
}

testDb();