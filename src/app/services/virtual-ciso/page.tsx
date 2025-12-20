'use client';

import { Users, Shield, CheckCircle, BarChart3, Target, FileText, Globe, Server, Zap, Lock } from 'lucide-react';
import Navbar from '@/lib/components/layout/Navbar';
import Footer from '@/lib/components/layout/Footer';
import Link from 'next/link';

export default function VirtualCISOPage() {
  const services = [
    {
      icon: Shield,
      title: 'Continuous Vulnerability Scanning',
      desc: 'Regular scanning of assets and weekly feature releases'
    },
    {
      icon: Target,
      title: 'Threat Modelling',
      desc: 'Analysis of potential vulnerabilities and attack vectors'
    },
    {
      icon: FileText,
      title: 'Security Policy Development',
      desc: 'Information security policy and cyber risk maturity planning'
    },
    {
      icon: Globe,
      title: 'Compliance Management',
      desc: 'ISO 27001, SOC2, GDPR, HIPAA, PCI DSS, RBI audits'
    },
    {
      icon: Server,
      title: 'Secure Architecture Review',
      desc: 'Regular review of system architecture and design'
    },
    {
      icon: Zap,
      title: 'Bug Bounty Program Management',
      desc: 'End-to-end management of bug bounty programs'
    }
  ];

  const benefits = [
    '24/7 Security Leadership',
    'Cost-effective (70% less than full-time CISO)',
    'Access to Expert Team',
    'Proactive Security Strategy',
    'Regulatory Compliance',
    'Incident Response Planning'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/20 via-transparent to-emerald-900/20" />
        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-900/30 border border-green-500/50 mb-6">
                <Users className="h-5 w-5 text-green-400 mr-2" />
                <span className="text-green-300 font-medium">Virtual CISO</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="block bg-gradient-to-r from-green-400 via-emerald-400 to-green-400 bg-clip-text text-transparent">
                  Build DevSecOps Culture
                </span>
                <span className="block text-white mt-2">With Your Own In-house</span>
                <span className="block text-green-300 mt-2">Security Team</span>
              </h1>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                Act as your dedicated security leadership team with regular threat modelling, 
                architecture reviews, and continuous security monitoring. Proactive security 
                strategy without the cost of a full-time executive.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/get-quote" 
                  className="inline-flex items-center justify-center px-8 py-3.5 text-lg font-semibold rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 transition-all transform hover:scale-105"
                >
                  Setup Your Team Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link 
                  href="#services" 
                  className="inline-flex items-center justify-center px-8 py-3.5 text-lg font-semibold rounded-lg border-2 border-gray-600 text-gray-300 hover:border-green-400 hover:text-green-400 transition-all"
                >
                  View Services
                </Link>
              </div>
            </div>

            {/* Dashboard Preview */}
            <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 shadow-2xl">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">Welcome Org!</h3>
                    <p className="text-gray-400 text-sm">Last login: 03:06:1991 - July 2025</p>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-green-900/30 border border-green-500/50">
                    <span className="text-green-400 text-sm font-medium">Active</span>
                  </div>
                </div>
              </div>

              {/* Security Metrics */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <div className="text-lg font-bold text-white">Good</div>
                  <div className="text-gray-400 text-sm">Security Posture</div>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <div className="text-lg font-bold text-white">12</div>
                  <div className="text-gray-400 text-sm">Active Risks</div>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <div className="text-lg font-bold text-white">27</div>
                  <div className="text-gray-400 text-sm">Assets Monitored</div>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <div className="text-lg font-bold text-white">98%</div>
                  <div className="text-gray-400 text-sm">Compliance</div>
                </div>
              </div>

              {/* Quick Actions */}
              <div>
                <h4 className="text-white font-medium mb-3">Quick Actions</h4>
                <div className="space-y-2">
                  {[
                    'Review Security Posture',
                    'Check Compliance Status',
                    'View Threat Alerts',
                    'Schedule Architecture Review'
                  ].map((action) => (
                    <button
                      key={action}
                      className="w-full text-left px-3 py-2 rounded bg-gray-900/50 hover:bg-gray-800 text-gray-300 text-sm"
                    >
                      {action}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Comprehensive vCISO Services
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto">
              Full-spectrum security leadership and management services
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-green-500 transition-all">
                <div className="p-3 rounded-lg bg-green-900/30 w-fit mb-4">
                  <service.icon className="h-8 w-8 text-green-400" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{service.title}</h3>
                <p className="text-gray-400">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                Why Choose Virtual CISO?
              </h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <div className="p-2 rounded-lg bg-green-900/30 mr-3">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    </div>
                    <span className="text-gray-300">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
              <h3 className="text-2xl font-bold mb-6 text-white">Cost Comparison</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300">Full-time CISO</span>
                    <span className="text-xl font-bold text-red-400">₹3,000,000/year</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-red-500" style={{ width: '100%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300">Virtual CISO</span>
                    <span className="text-xl font-bold text-green-400">₹900,000/year</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500" style={{ width: '30%' }} />
                  </div>
                </div>
              </div>
              <p className="text-gray-400 text-sm mt-6">
                Save 70% while getting access to an entire team of security experts
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Our Engagement Process
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Assessment',
                desc: 'Comprehensive security assessment and gap analysis'
              },
              {
                step: '02',
                title: 'Strategy',
                desc: 'Develop customized security roadmap and policies'
              },
              {
                step: '03',
                title: 'Implementation',
                desc: 'Execute security controls and processes'
              },
              {
                step: '04',
                title: 'Management',
                desc: 'Ongoing monitoring, review, and optimization'
              }
            ].map((phase, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-green-900 to-emerald-900 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">{phase.step}</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{phase.title}</h3>
                <p className="text-gray-400">{phase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-900/30 border border-green-500/50 mb-6">
            <Users className="h-5 w-5 text-green-400 mr-2" />
            <span className="text-green-300 font-medium">Virtual CISO Service</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Get Your Security Leadership Team
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Transform your security posture with dedicated expert leadership at a fraction of the cost.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/get-quote"
              className="inline-flex items-center justify-center px-8 py-3.5 text-lg font-semibold rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:opacity-90 transition-opacity"
            >
              Start Free Consultation
            </Link>
            <Link 
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3.5 text-lg font-semibold rounded-lg border-2 border-gray-600 text-gray-300 hover:border-green-400 hover:text-green-400 transition-all"
            >
              Download Service Catalog
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