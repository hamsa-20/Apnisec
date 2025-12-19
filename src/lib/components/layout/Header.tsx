import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-blue-600"></div>
          <Link href="/" className="text-xl font-bold text-blue-700">
            ApniSec
          </Link>
        </div>
        
        <nav className="hidden md:flex gap-6">
          <Link href="/" className="text-sm font-medium hover:text-blue-600">
            Home
          </Link>
          <Link href="/#services" className="text-sm font-medium hover:text-blue-600">
            Services
          </Link>
          <Link href="/#about" className="text-sm font-medium hover:text-blue-600">
            About
          </Link>
          <Link href="/#contact" className="text-sm font-medium hover:text-blue-600">
            Contact
          </Link>
        </nav>
        
        <div className="flex items-center gap-4">
          <Link href="/login">
            <button className="px-4 py-2 text-blue-600 hover:text-blue-800">
              Login
            </button>
          </Link>
          <Link href="/register">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}