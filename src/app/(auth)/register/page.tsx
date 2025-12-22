// import RegisterForm from '@/lib/components/auth/RegisterForm';
// import Link from 'next/link';

// export default function RegisterPage() {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
//       <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl">
//         <div>
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//             Create your ApniSec account
//           </h2>
//           <p className="mt-2 text-center text-sm text-gray-600">
//             Already have an account?{' '}
//             <a href="/login" className="font-medium text-blue-600 hover:text-blue-500">
//               Sign in
//             </a>
//           </p>
//         </div>
        
//         <form className="mt-8 space-y-6">
//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Full Name (Optional)
//               </label>
//               <input
//                 type="text"
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="John Doe"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 required
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="hi@gmail.com"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 required
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="Create a password"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Confirm Password
//               </label>
//               <input
//                 type="password"
//                 required
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="Confirm your password"
//               />
//             </div>
//           </div>

//           <button
//             type="submit"
//             className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//           >
//             Create Account
//           </button>
//         </form>

//         <div className="text-center">
//           <p className="text-sm text-gray-600">
//             Already have an account?{' '}
//             <a href="/login" className="text-blue-600 hover:text-blue-500">
//               Sign in
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }
import RegisterForm from '@/lib/components/auth/RegisterForm';

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100">
          Create your ApniSec account
        </h2>
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
          Start managing your security issues
        </p>

        <RegisterForm />
      </div>
    </div>
  );
}
