'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/lib/components/ui/button'
import { Shield, Menu, X, ChevronDown } from 'lucide-react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const navigation = {
    company: [
      { name: 'Home', href: '/' },
      { name: 'Solutions', href: '/solutions' },
      { name: 'Process', href: '/process' },
      { name: 'Reports', href: '/reports' },
      { name: 'Services', href: '/services' },
      { name: 'Careers', href: '/careers' },
      { name: 'Bug Bounty', href: '/bug-bounty' }
    ],
    services: [
      { 
        name: 'Dark Eye Watcher', 
        href: '/services/dark-eye-watcher',
        icon: '👁️',
        description: 'Dark Web Monitoring & Brand Protection'
      },
      { 
        name: 'Cloud Security', 
        href: '/services/cloud-security',
        icon: '☁️',
        description: 'Cloud Security Posture Management'
      },
      { 
        name: 'Virtual CISO', 
        href: '/services/virtual-ciso',
        icon: '🛡️',
        description: 'Virtual Chief Information Security Officer'
      },
      { 
        name: 'Red Team Assessment', 
        href: '/services/red-team-assessment',
        icon: '🔴',
        description: 'Advanced Penetration Testing'
      },
      { 
        name: 'VAPT', 
        href: '/services/vapt',
        icon: '🔍',
        description: 'Vulnerability Assessment & Penetration Testing'
      }
    ]
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Shield className="h-8 w-8 text-primary" />
            <Link href="/" className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-foreground">apni sec</span>
              <span className="text-xs text-muted-foreground">Security as a Service • WE ARE CERTIFIED</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {/* Company Dropdown */}
            <div className="relative group">
              <button 
                className="flex items-center gap-1 text-sm font-medium text-foreground hover:text-primary transition-colors"
                onClick={() => setOpenDropdown(openDropdown === 'company' ? null : 'company')}
              >
                Company
                <ChevronDown className="h-4 w-4" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 rounded-md border bg-popover shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-2">
                  {navigation.company.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Services Mega Menu */}
            <div className="relative group">
              <button className="flex items-center gap-1 text-sm font-medium text-foreground hover:text-primary transition-colors">
                Services
                <ChevronDown className="h-4 w-4" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-96 rounded-md border bg-popover shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="p-4 grid grid-cols-1 gap-2">
                  {navigation.services.map((service) => (
                    <Link
                      key={service.name}
                      href={service.href}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent transition-colors group"
                    >
                      <span className="text-xl">{service.icon}</span>
                      <div>
                        <p className="font-medium text-foreground group-hover:text-primary">
                          {service.name}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {service.description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Other Links */}
            <Link 
              href="/how-we-do-it" 
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              How We Do It
            </Link>
            <Link 
              href="/sample-reports" 
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Sample Reports
            </Link>
            <Link 
              href="/testimonials" 
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Testimonials
            </Link>

            {/* CTA Buttons */}
            <div className="flex items-center gap-3 ml-4">
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm" className="bg-primary hover:bg-primary/90">
                  Start Free Trial
                </Button>
              </Link>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t">
            <div className="py-4 space-y-4">
              {/* Company Links */}
              <div className="px-4">
                <h3 className="text-sm font-semibold text-muted-foreground mb-2">Company</h3>
                <div className="space-y-1">
                  {navigation.company.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block px-4 py-2 text-sm hover:bg-accent rounded-md transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Services Links */}
              <div className="px-4">
                <h3 className="text-sm font-semibold text-muted-foreground mb-2">Services</h3>
                <div className="space-y-2">
                  {navigation.services.map((service) => (
                    <Link
                      key={service.name}
                      href={service.href}
                      className="flex items-center gap-3 p-3 hover:bg-accent rounded-md transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="text-xl">{service.icon}</span>
                      <div>
                        <p className="font-medium">{service.name}</p>
                        <p className="text-xs text-muted-foreground">{service.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Other Mobile Links */}
              <div className="space-y-1 px-4">
                <Link
                  href="/how-we-do-it"
                  className="block px-4 py-2 text-sm hover:bg-accent rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  How We Do It
                </Link>
                <Link
                  href="/sample-reports"
                  className="block px-4 py-2 text-sm hover:bg-accent rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sample Reports
                </Link>
                <Link
                  href="/testimonials"
                  className="block px-4 py-2 text-sm hover:bg-accent rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Testimonials
                </Link>
              </div>

              {/* Mobile CTA Buttons */}
              <div className="flex flex-col gap-2 px-4 pt-4 border-t">
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Sign In
                  </Button>
                </Link>
                <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    Start Free Trial
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header