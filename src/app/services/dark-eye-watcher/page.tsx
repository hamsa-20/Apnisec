'use client';

import { useState } from 'react';
import { Globe, Shield, AlertTriangle, BarChart3, Download, CheckCircle, Zap, Server, FileText, Database } from 'lucide-react';
import Navbar from '@/lib/components/layout/Navbar';
import Footer from '@/lib/components/layout/Footer';
import Link from 'next/link';

export default function DarkEyeWatcherPage() {
  const [domain, setDomain] = useState('');

  const features = [
    {
      icon: Globe,
      title: 'Threat Intelligence',
      desc: 'Continuous Surveillance On Deep Web With Scraping Organization Keywords'
    },
    {
      icon: Zap,
      title: 'AI-Powered Alerts',
      desc: 'Advanced Algorithms Detect And Notify You About Suspicious Activity'
    },
    {
      icon: FileText,
      title: 'Leaks Classification',
      desc: 'Leaked Credentials, Corporate Accounts, Sensitive Documents, Cookies, PII Data'
    },
    {
      icon: Database,
      title: '200+ Sources',
      desc: 'Discord, IRC, Telegram, Darknet, Bot Forums, Private Channels'
    },
    {
      icon: Shield,
      title: 'Incidents Mitigation',
      desc: 'Access Tokens And Cookies Promptly Revoked, Credentials Handled Within SLAs'
    },
    {
      icon: BarChart3,
      title: 'Reporting',
      desc: 'Monthly Statistics On Active Validation And Detection On Compromised Data'
    }
  ];

  const stats = [
    { value: '280Bn+', label: 'Records Scraped' },
    { value: '500K+', label: 'Compromised Credit Cards' },
    { value: '200TB+', label: 'Data Analysed' },
    { value: '950M+', label: 'Corporate Accounts' }
  ];

  const pricingPlans = [
    { 
      name: 'Standard', 
      price: '₹49,999', 
      domains: '10 Domains or Keywords', 
      highlight: false,
      features: ['24/7 Monitoring', 'Basic Reports', 'Email Support', 'Monthly Statistics']
    },
    { 
      name: 'Gold', 
      price: '₹69,999', 
      domains: '15 Domains or Keywords', 
      highlight: false,
      features: ['24/7 Monitoring', 'Advanced Reports', 'Priority Support', 'Weekly Updates']
    },
    { 
      name: 'Premium', 
      price: '₹89,999', 
      domains: '20 Domains or Keywords', 
      highlight: true,
      features: ['24/7 Monitoring', 'Detailed Analytics', 'Dedicated Support', 'Real-time Alerts']
    },
    { 
      name: 'Platinum', 
      price: '₹99,999', 
      domains: '25+ Domains or Keywords', 
      highlight: false,
      features: ['24/7 Monitoring', 'Executive Reports', '24/7 Phone Support', 'Custom Integration']
    }
  ];

  const leakTypes = [
    { type: 'Cookies', count: 299, color: 'bg-blue-500' },
    { type: 'Documents', count: 258, color: 'bg-green-500' },
    { type: 'Plain Text Password', count: 79, color: 'bg-yellow-500' },
    { type: 'PII Data', count: 12, color: 'bg-orange-500' },
    { type: 'Hashed Password', count: 283, color: 'bg-purple-500' },
    { type: 'Generic', count: 76, color: 'bg-pink-500' },
    { type: 'All', count: 39, color: 'bg-cyan-500' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900">
      <Navbar />

      {/* Hero Section - Exact as PDF */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/20 via-transparent to-blue-900/20" />
        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-cyan-900/30 border border-cyan-500/50 mb-6">
                <Globe className="h-5 w-5 text-cyan-400 mr-2" />
                <span className="text-cyan-300 font-medium">Dark Eye Watcher</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Monitor And Secure
                </span>
                <span className="block text-white mt-2">Your Organization Against</span>
                <span className="block text-cyan-300 mt-2">Emerging Threats</span>
              </h1>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                With Advanced Intelligence To Filter Valid Credentials And Leaks From The Dark Web. 
                Comprehensive surveillance to protect your brand reputation and sensitive data.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/get-quote" 
                  className="inline-flex items-center justify-center px-8 py-3.5 text-lg font-semibold rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 transition-all transform hover:scale-105"
                >
                  Get Quote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link 
                  href="#free-report" 
                  className="inline-flex items-center justify-center px-8 py-3.5 text-lg font-semibold rounded-lg border-2 border-gray-600 text-gray-300 hover:border-cyan-400 hover:text-cyan-400 transition-all"
                >
                  Free Dark Web Report
                </Link>
              </div>
            </div>

            {/* Dashboard Preview */}
            <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white">Dark Eye Watcher Dashboard</h3>
                  <p className="text-gray-400 text-sm">Last Tested: May 24, 2025 | Risk Score: 78/100</p>
                </div>
                <button className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-sm font-medium">
                  Download Report
                </button>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-white">2,138</div>
                  <div className="text-gray-400 text-sm">Total Alerts</div>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-white">5,237</div>
                  <div className="text-gray-400 text-sm">Records Analyzed</div>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-white">497</div>
                  <div className="text-gray-400 text-sm">Corporate Accounts</div>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-white">601</div>
                  <div className="text-gray-400 text-sm">Credentials</div>
                </div>
              </div>

              {/* Leak Types */}
              <div>
                <h4 className="text-white font-medium mb-3">Leak Types Distribution</h4>
                <div className="space-y-2">
                  {leakTypes.map((leak) => (
                    <div key={leak.type} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full ${leak.color} mr-2`} />
                        <span className="text-gray-300 text-sm">{leak.type}</span>
                      </div>
                      <span className="text-white font-medium">{leak.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Comprehensive Protection At Your Fingertips
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto">
              Advanced monitoring and intelligence platform designed for enterprise security
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-cyan-500 transition-all">
                <div className="p-3 rounded-lg bg-cyan-900/30 w-fit mb-4">
                  <feature.icon className="h-8 w-8 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Our Impact in Numbers
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Real data from monitoring millions of records across the dark web
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-8 text-center border border-gray-700 hover:border-cyan-500 transition-all">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-3">
                  {stat.value}
                </div>
                <p className="text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">How We Do It</h2>
          </div>

          <div className="grid md:grid-cols-5 gap-4">
            {[
              'Define unique keywords, domain list, Third Party Dashboards',
              'Advanced AI filters identify working credentials',
              'Continuous scanning of dark web forums & marketplaces',
              'Instant alerts and Monthly reports',
              '24/7 Support for Detailed leak analysis'
            ].map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-gray-800/50 rounded-lg p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-cyan-900/30 flex items-center justify-center">
                    <span className="text-cyan-400 font-bold">{index + 1}</span>
                  </div>
                  <p className="text-gray-300 text-sm">{step}</p>
                </div>
                {index < 4 && (
                  <div className="hidden md:block absolute top-1/2 right-0 w-4 h-0.5 bg-gray-700 transform translate-x-2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Pricing Plans</h2>
            <p className="text-gray-400">All plans include 24/7 monitoring and support</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingPlans.map((plan, index) => (
              <div 
                key={index} 
                className={`rounded-2xl p-6 border transition-all ${plan.highlight ? 'border-cyan-500 bg-gray-800/50 scale-105' : 'border-gray-700 bg-gray-800/30'}`}
              >
                <h3 className="text-xl font-bold mb-2 text-white">{plan.name}</h3>
                <div className="text-3xl font-bold mb-4 text-cyan-400">{plan.price}<span className="text-sm text-gray-400">/month</span></div>
                <p className="text-gray-300 mb-6">{plan.domains} • 24/7 Monitoring</p>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-300">
                      <CheckCircle className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link 
                  href="/get-quote"
                  className={`block w-full py-3 text-center rounded-lg font-semibold transition-all ${plan.highlight ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:opacity-90' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free Report Section */}
      <section id="free-report" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-900 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-cyan-900/30 border border-cyan-500/50 mb-6">
            <Download className="h-5 w-5 text-cyan-400 mr-2" />
            <span className="text-cyan-300 font-medium">Free Report</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Get Free Dark Web Exposure Report
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Comprehensive evaluation to identify vulnerabilities and provide actionable insights for risk mitigation.
          </p>
          
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input 
                  type="text" 
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  placeholder="Type Your Domain" 
                  className="w-full px-6 py-4 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                />
              </div>
              <button className="px-8 py-4 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:opacity-90 transition-opacity">
                Get Your Dark Web Report
              </button>
            </div>
            <p className="text-gray-400 text-sm mt-4">No credit card required. Get instant insights.</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

const ArrowRight = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);