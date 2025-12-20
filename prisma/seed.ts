import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');
  
  // Create a test user
  const hashedPassword = await bcrypt.hash('password123', 10);
  
  const user = await prisma.user.create({
    data: {
      email: 'test@apnisec.com',
      name: 'Test User',
      password: hashedPassword,
    },
  });
  
  console.log(`✅ Created user: ${user.email}`);
  
  // Create sample issues
  const issues = await prisma.issue.createMany({
    data: [
      {
        type: 'CLOUD_SECURITY',
        title: 'AWS S3 Bucket Misconfiguration',
        description: 'Publicly accessible S3 bucket containing sensitive data',
        priority: 'HIGH',
        status: 'OPEN',
        userId: user.id,
      },
      {
        type: 'VAPT',
        title: 'SQL Injection Vulnerability',
        description: 'Found SQL injection in login endpoint',
        priority: 'CRITICAL',
        status: 'IN_PROGRESS',
        userId: user.id,
      },
      {
        type: 'RETEAM_ASSESSMENT',
        title: 'Internal Network Assessment',
        description: 'Assessing internal network security controls',
        priority: 'MEDIUM',
        status: 'OPEN',
        userId: user.id,
      },
    ],
  });
  
  console.log(`✅ Created ${issues.count} issues`);
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });