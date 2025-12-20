// Quick test to check token flow
const testToken = async () => {
  console.log('🔍 Testing JWT Flow...\n');
  
  // 1. Check if token exists in localStorage
  const token = localStorage.getItem('token');
  console.log('1. Token in localStorage:', token ? '✅ Yes' : '❌ No');
  
  if (token) {
    // 2. Try to decode token
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log('2. Token payload:', payload);
      console.log('   - User ID:', payload.userId);
      console.log('   - Email:', payload.email);
    } catch (e) {
      console.log('2. ❌ Cannot decode token:', e.message);
    }
    
    // 3. Test API with token
    try {
      const response = await fetch('/api/auth/me', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      console.log('3. /api/auth/me status:', response.status);
    } catch (e) {
      console.log('3. ❌ API call failed:', e.message);
    }
  }
};

testToken();