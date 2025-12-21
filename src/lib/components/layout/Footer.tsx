import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-10 w-10 relative">
                <Image
                  src="/logo.png"
                  alt="ApniSec Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  ApniSec
                </span>
                <p className="text-sm text-gray-400">SECURITY as a Service</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Enterprise cybersecurity solutions protecting businesses worldwide.
            </p>
            <div className="text-sm text-gray-500">
              <span className="bg-green-900/30 text-green-400 px-2 py-1 rounded text-xs">
                WE ARE CERTIFIED
              </span>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {['Home', 'Solutions', 'Process', 'Report', 'Services', 'Careers', 'Bug Bounty'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {['Dark Eye Watcher', 'Cloud Security', 'Virtual CISO', 'Red Team Assessment', 'VAPT'].map((service) => (
                <li key={service}>
                  <Link href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} ApniSec. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}