'use client';

import { Shield, CheckCircle, FileText, Globe, Users, BarChart3, Lock, Target } from 'lucide-react';
import Navbar from '@/lib/components/layout/Navbar';
import Footer from '@/lib/components/layout/Footer';
import Link from 'next/link';

export default function CompliancePage() {
  const standards = [
    {
      icon: Shield,
      title: 'ISO 27001',
      desc: 'Information Security Management System',
      features: ['Risk Assessment', 'Security Controls', 'Continuous Improvement']
    },
    {
      icon: Globe,
      title: 'SOC 2',
      desc: 'Service Organization Control',
      features: ['Security', 'Availability', 'Confidentiality', 'Privacy']
    },
    {
      icon: Lock,
      title: 'GDPR',
      desc: 'General Data Protection Regulation',
      features: ['Data Protection', 'Privacy Rights', 'Breach Notification']
    },
    {
      icon: FileText,
      title: 'HIPAA',
      desc: 'Health Insurance Portability',
      features: ['PHI Protection', 'Security Rule', 'Privacy Rule']
    },
    {
      icon: Target,
      title: 'PCI DSS',
      desc: 'Payment Card Industry',
      features: ['Cardholder Data', 'Network Security', 'Access Control']
    },
    {
      icon: Users,
      title: 'RBI Guidelines',
      desc: 'Reserve Bank of India',
      features: ['Cyber Security', 'IT Governance', 'Incident Response']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/20 via-transparent to-blue-900/20" />
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-900/30 border border-indigo-500/50 mb-6">
              <Shield className="h-5 w-5 text-indigo-400 mr-2" />
              <span className="text-indigo-300 font-medium">Compliance Solutions</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="block bg-gradient-to-r from-indigo-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Validate Compliance
              </span>
              <span className="block text-white mt-2">Reduce Risk, Pass Your Audits</span>
              <span className="block text-indigo-300 mt-2">Guaranteed</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
              ISO 27001, SOC2, GDPR, HIPAA, PCI DSS, and RBI compliance made simple. 
              Streamline your regulatory requirements with expert solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/get-quote" 
                className="inline-flex items-center justify-center px-8 py-3.5 text-lg font-semibold rounded-lg bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 transition-all transform hover:scale-105"
              >
                Start Compliance Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link 
                href="#standards" 
                className="inline-flex items-center justify-center px-8 py-3.5 text-lg font-semibold rounded-lg border-2 border-gray-600 text-gray-300 hover:border-indigo-400 hover:text-indigo-400 transition-all"
              >
                View Standards
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Standards Grid */}
      <section id="standards" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Compliance Standards We Cover
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto">
              Comprehensive coverage across industry and regulatory standards
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {standards.map((standard, index) => (
              <div key={index} className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-indigo-500 transition-all">
                <div className="flex items-start mb-4">
                  <div className="p-3 rounded-lg bg-indigo-900/30 mr-4">
                    <standard.icon className="h-8 w-8 text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{standard.title}</h3>
                    <p className="text-gray-400 text-sm mt-1">{standard.desc}</p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h4 className="text-white font-medium mb-2">Key Areas:</h4>
                  <ul className="space-y-1">
                    {standard.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-300 text-sm">
                        <CheckCircle className="h-3 w-3 text-green-400 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Our Compliance Process
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Gap Analysis',
                desc: 'Assess current state against requirements'
              },
              {
                step: '02',
                title: 'Remediation',
                desc: 'Implement necessary controls and processes'
              },
              {
                step: '03',
                title: 'Documentation',
                desc: 'Prepare policies, procedures, and evidence'
              },
              {
                step: '04',
                title: 'Certification',
                desc: 'Audit support and certification attainment'
              }
            ].map((phase, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-indigo-900 to-blue-900 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">{phase.step}</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{phase.title}</h3>
                <p className="text-gray-400">{phase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { value: '100%', label: 'Audit Success Rate', icon: CheckCircle },
              { value: '50+', label: 'Certified Auditors', icon: Users },
              { value: '200+', label: 'Organizations Certified', icon: BarChart3 }
            ].map((stat, index) => (
              <div key={index} className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-8 text-center border border-gray-700">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-900/30 mb-4">
                  <stat.icon className="h-8 w-8 text-indigo-400" />
                </div>
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent mb-3">
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
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-900/30 border border-indigo-500/50 mb-6">
            <Shield className="h-5 w-5 text-indigo-400 mr-2" />
            <span className="text-indigo-300 font-medium">Compliance Assessment</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Get Compliant Today
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Meet your regulatory requirements with confidence and ensure business continuity.
          </p>
          
          <Link 
            href="/get-quote"
            className="inline-flex items-center justify-center px-8 py-3.5 text-lg font-semibold rounded-lg bg-gradient-to-r from-indigo-500 to-blue-600 text-white hover:opacity-90 transition-opacity"
          >
            Start Your Compliance Journey
          </Link>
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