import { AuthService } from './src/lib/classes/services/AuthService';

async function testAuth() {
  const authService = new AuthService();
  
  try {
    // Test registration
    console.log('Testing registration...');
    const registerResult = await authService.register({
      email: 'test@apnisec.com',
      password: 'Password123!',
      name: 'Test User'
    });
    console.log('✅ Registration successful:', registerResult.user.email);
    console.log('Token:', registerResult.token.substring(0, 20) + '...');
    
    // Test login
    console.log('\nTesting login...');
    const loginResult = await authService.login({
      email: 'test@apnisec.com',
      password: 'Password123!'
    });
    console.log('✅ Login successful:', loginResult.user.email);
    
    // Test token verification
    console.log('\nTesting token verification...');
    const decoded = authService.verifyToken(loginResult.token);
    console.log('✅ Token verified. User ID:', decoded.userId);
    
  } catch (error: any) {
    console.error('❌ Auth test failed:', error.message);
  }
}

testAuth();