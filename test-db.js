import { prisma } from '@/lib/db'

async function test() {
  try {
    await prisma.\()
    console.log(' Database connected')
    
    const users = await prisma.user.findMany()
    console.log(\ Found \ users\)
    
    await prisma.\()
  } catch (error) {
    console.error(' Database error:', error.message)
  }
}

test()
