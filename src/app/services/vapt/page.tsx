'use client';

import { Shield, Zap, AlertTriangle, CheckCircle, FileText, Globe, Server, Code, BarChart3 } from 'lucide-react';
import Navbar from '@/lib/components/layout/Navbar';
import Footer from '@/lib/components/layout/Footer';
import Link from 'next/link';
import { useState } from 'react';

export default function VAPTPage() {
  const [activeTab, setActiveTab] = useState('web');

  const services = [
    {
      icon: Globe,
      title: 'Web Application VAPT',
      desc: 'Comprehensive security testing for web applications and APIs',
      tests: ['OWASP Top 10', 'Business Logic Flaws', 'Authentication Testing', 'API Security']
    },
    {
      icon: Server,
      title: 'Network VAPT',
      desc: 'Internal and external network penetration testing',
      tests: ['Firewall Testing', 'IDS/IPS Evasion', 'Wireless Security', 'Router/Switch Security']
    },
    {
      icon: Code,
      title: 'Mobile App VAPT',
      desc: 'Security assessment for iOS and Android applications',
      tests: ['Reverse Engineering', 'Data Storage Security', 'Network Communication', 'Platform Security']
    },
    {
      icon: FileText,
      title: 'Cloud VAPT',
      desc: 'Security testing for cloud infrastructure and services',
      tests: ['Configuration Review', 'IAM Testing', 'Storage Security', 'Container Security']
    }
  ];

  const vulnerabilities = [
    { severity: 'Critical', count: 12, color: 'bg-red-500' },
    { severity: 'High', count: 24, color: 'bg-orange-500' },
    { severity: 'Medium', count: 35, color: 'bg-yellow-500' },
    { severity: 'Low', count: 18, color: 'bg-green-500' },
    { severity: 'Info', count: 42, color: 'bg-blue-500' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-transparent to-violet-900/20" />
        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-900/30 border border-purple-500/50 mb-6">
                <Shield className="h-5 w-5 text-purple-400 mr-2" />
                <span className="text-purple-300 font-medium">Vulnerability Assessment & Penetration Testing</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="block bg-gradient-to-r from-purple-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
                  Comprehensive Security
                </span>
                <span className="block text-white mt-2">Assessments For Web, Mobile,</span>
                <span className="block text-purple-300 mt-2">API, And Network</span>
              </h1>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                Identify security vulnerabilities before attackers do. Our certified ethical hackers perform 
                thorough assessments and provide detailed reports with actionable remediation guidance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/get-quote" 
                  className="inline-flex items-center justify-center px-8 py-3.5 text-lg font-semibold rounded-lg bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 transition-all transform hover:scale-105"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link 
                  href="#services" 
                  className="inline-flex items-center justify-center px-8 py-3.5 text-lg font-semibold rounded-lg border-2 border-gray-600 text-gray-300 hover:border-purple-400 hover:text-purple-400 transition-all"
                >
                  View Sample Report
                </Link>
              </div>
            </div>

            {/* Dashboard Preview */}
            <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white">VAPT Dashboard</h3>
                  <p className="text-gray-400 text-sm">Last Tested: May 24, 2025 | 7 Applications</p>
                </div>
                <button className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-sm font-medium">
                  Download Report
                </button>
              </div>

              {/* Severity Chart */}
              <div className="mb-6">
                <h4 className="text-white font-medium mb-3">Vulnerability Severity</h4>
                <div className="space-y-2">
                  {vulnerabilities.map((vuln) => (
                    <div key={vuln.severity} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full ${vuln.color} mr-2`} />
                        <span className="text-gray-300 text-sm">{vuln.severity}</span>
                      </div>
                      <span className="text-white font-medium">{vuln.count} findings</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tested Applications */}
              <div>
                <h4 className="text-white font-medium mb-3">Applications Tested</h4>
                <div className="space-y-1">
                  {[
                    'example.com',
                    'app.example.io',
                    'api.local.example.com',
                    'dashboard.example.com',
                    'admin.example.com'
                  ].map((app) => (
                    <div key={app} className="flex items-center text-gray-400 text-sm">
                      <CheckCircle className="h-3 w-3 text-green-400 mr-2" />
                      {app}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Tabs */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2">
            {['web', 'network', 'mobile', 'cloud', 'api'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${activeTab === tab ? 'bg-purple-900/30 text-purple-400 border border-purple-500/50' : 'text-gray-400 hover:text-white hover:bg-gray-800/50'}`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)} VAPT
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Comprehensive VAPT Services
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto">
              End-to-end security testing across all attack surfaces
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition-all">
                <div className="flex items-start mb-4">
                  <div className="p-3 rounded-lg bg-purple-900/30 mr-4">
                    <service.icon className="h-8 w-8 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{service.title}</h3>
                    <p className="text-gray-400 text-sm mt-1">{service.desc}</p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h4 className="text-white font-medium mb-2">Testing Includes:</h4>
                  <ul className="space-y-1">
                    {service.tests.map((test, idx) => (
                      <li key={idx} className="flex items-center text-gray-300 text-sm">
                        <CheckCircle className="h-3 w-3 text-green-400 mr-2" />
                        {test}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Our VAPT Methodology
            </h2>
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            {[
              {
                step: '01',
                title: 'Reconnaissance',
                desc: 'Information gathering and scope definition'
              },
              {
                step: '02',
                title: 'Scanning',
                desc: 'Automated and manual vulnerability discovery'
              },
              {
                step: '03',
                title: 'Gaining Access',
                desc: 'Exploitation of identified vulnerabilities'
              },
              {
                step: '04',
                title: 'Maintaining Access',
                desc: 'Testing persistence mechanisms'
              },
              {
                step: '05',
                title: 'Analysis & Reporting',
                desc: 'Detailed findings and remediation guidance'
              }
            ].map((phase, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-900 to-violet-900 flex items-center justify-center">
                  <span className="text-xl font-bold text-white">{phase.step}</span>
                </div>
                <h3 className="text-lg font-bold mb-2 text-white">{phase.title}</h3>
                <p className="text-gray-400 text-sm">{phase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { value: '670+', label: 'Vulnerabilities Discovered', icon: AlertTriangle },
              { value: '99%', label: 'Remediation Rate', icon: CheckCircle },
              { value: '24/7', label: 'Security Testing', icon: Zap },
              { value: '50+', label: 'Certified Experts', icon: BarChart3 }
            ].map((stat, index) => (
              <div key={index} className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-8 text-center border border-gray-700">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-900/30 mb-4">
                  <stat.icon className="h-8 w-8 text-purple-400" />
                </div>
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent mb-3">
                  {stat.value}
                </div>
                <p className="text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-900/30 border border-purple-500/50 mb-6">
            <Shield className="h-5 w-5 text-purple-400 mr-2" />
            <span className="text-purple-300 font-medium">Security Assessment</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Secure Your Applications Today
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Get a comprehensive security assessment and protect your digital assets from potential threats.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/get-quote"
              className="inline-flex items-center justify-center px-8 py-3.5 text-lg font-semibold rounded-lg bg-gradient-to-r from-purple-500 to-violet-600 text-white hover:opacity-90 transition-opacity"
            >
              Request Assessment
            </Link>
            <Link 
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3.5 text-lg font-semibold rounded-lg border-2 border-gray-600 text-gray-300 hover:border-purple-400 hover:text-purple-400 transition-all"
            >
              Download Sample Report
            </Link>
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