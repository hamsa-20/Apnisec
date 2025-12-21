'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 bg-gray-900/90 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-10 w-10 relative">
              <Image
                src="/logo.png"
                alt="ApniSec Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                ApniSec
              </span>
              <span className="text-xs text-gray-400 -mt-1">
                Security as a Service
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className={`hover:text-cyan-400 transition-colors ${pathname === '/' ? 'text-cyan-400' : 'text-gray-300'}`}
            >
              Home
            </Link>
            <Link 
              href="#services" 
              className="text-gray-300 hover:text-cyan-400 transition-colors"
            >
              Services
            </Link>
            <Link 
              href="#features" 
              className="text-gray-300 hover:text-cyan-400 transition-colors"
            >
              Features
            </Link>
            <Link 
              href="#about" 
              className="text-gray-300 hover:text-cyan-400 transition-colors"
            >
              About
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <Link
              href="/login"
              className="px-4 py-2 text-gray-300 hover:text-cyan-400 transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 transition-all"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}