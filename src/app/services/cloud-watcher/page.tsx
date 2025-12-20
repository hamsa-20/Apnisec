'use client';

import { Cloud, Shield, Lock, Server, BarChart3, CheckCircle, Database, Cpu, Globe, Users } from 'lucide-react';
import Navbar from '@/lib/components/layout/Navbar';
import Footer from '@/lib/components/layout/Footer';
import Link from 'next/link';

export default function CloudWatcherPage() {
  const features = [
    {
      icon: Shield,
      title: 'Cloud Security Posture Management',
      desc: 'Identify And Remediate Security Vulnerabilities In Your Cloud Infrastructure'
    },
    {
      icon: Lock,
      title: 'Compliance Alignment',
      desc: 'Ensures Compliance With Industry Standards Like GDPR, HIPAA, PCI DSS, SOC2'
    },
    {
      icon: Server,
      title: 'Multi-cloud Support',
      desc: 'Unified Security Management Across AWS, Azure, GCP, And Hybrid Environments'
    },
    {
      icon: BarChart3,
      title: 'Real-time Monitoring',
      desc: 'Continuous Monitoring Of Cloud Assets With Automated Alerts And Insights'
    }
  ];

  const challenges = [
    {
      icon: Database,
      title: 'Hybrid Cloud Complexity',
      desc: 'Multiple Cloud Services Accounts And Resources Left Vulnerable Without Proper Visibility'
    },
    {
      icon: Cpu,
      title: 'Misconfigurations',
      desc: 'With Cloud Services Like AWS, Azure & GCP, Misconfigurations Are Just A Click Away'
    },
    {
      icon: Globe,
      title: 'Compliance Requirements',
      desc: 'Meeting Regulatory Requirements Like GDPR, HIPAA, PCI DSS Can Be Complex In Cross-border Deployments'
    },
    {
      icon: Users,
      title: 'Skill Gap',
      desc: 'Lack Of In-house Expertise For Proper Cloud Security Configuration And Management'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-transparent to-cyan-900/20" />
        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-900/30 border border-blue-500/50 mb-6">
                <Cloud className="h-5 w-5 text-blue-400 mr-2" />
                <span className="text-blue-300 font-medium">Cloud Watcher</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  Cloud Security Posture
                </span>
                <span className="block text-white mt-2">Management To Identify</span>
                <span className="block text-blue-300 mt-2">And Remediate Vulnerabilities</span>
              </h1>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                Ensures Compliance With Industry Standards, Detects Misconfigurations, And Enforces Best Practices. 
                With Automated Alerts And Actionable Insights, CSPM Helps Prevent Breaches And Strengthens Your Cloud Security Posture.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/get-quote" 
                  className="inline-flex items-center justify-center px-8 py-3.5 text-lg font-semibold rounded-lg bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 transition-all transform hover:scale-105"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link 
                  href="#demo" 
                  className="inline-flex items-center justify-center px-8 py-3.5 text-lg font-semibold rounded-lg border-2 border-gray-600 text-gray-300 hover:border-blue-400 hover:text-blue-400 transition-all"
                >
                  Schedule Demo
                </Link>
              </div>
            </div>

            {/* Dashboard Preview */}
            <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white">Cloud Security Dashboard</h3>
                  <p className="text-gray-400 text-sm">Active Monitoring • 27 Assets</p>
                </div>
                <div className="px-3 py-1 rounded-full bg-green-900/30 border border-green-500/50">
                  <span className="text-green-400 text-sm font-medium">Good</span>
                </div>
              </div>

              {/* Cloud Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-white">27</div>
                  <div className="text-gray-400 text-sm">Current Assets</div>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-white">98%</div>
                  <div className="text-gray-400 text-sm">Compliance Score</div>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-white">3</div>
                  <div className="text-gray-400 text-sm">Critical Issues</div>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-white">24/7</div>
                  <div className="text-gray-400 text-sm">Monitoring</div>
                </div>
              </div>

              {/* Cloud Providers */}
              <div>
                <h4 className="text-white font-medium mb-3">Cloud Providers</h4>
                <div className="space-y-2">
                  {[
                    { provider: 'AWS', count: 12, color: 'bg-orange-500' },
                    { provider: 'Azure', count: 8, color: 'bg-blue-500' },
                    { provider: 'GCP', count: 5, color: 'bg-green-500' },
                    { provider: 'Other', count: 2, color: 'bg-gray-500' }
                  ].map((cloud) => (
                    <div key={cloud.provider} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full ${cloud.color} mr-2`} />
                        <span className="text-gray-300 text-sm">{cloud.provider}</span>
                      </div>
                      <span className="text-white font-medium">{cloud.count} instances</span>
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
              Why Cloud Security Is Critical
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto">
              Modern challenges require comprehensive cloud security solutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {challenges.map((challenge, index) => (
              <div key={index} className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-all">
                <div className="p-3 rounded-lg bg-blue-900/30 w-fit mb-4">
                  <challenge.icon className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{challenge.title}</h3>
                <p className="text-gray-400">{challenge.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Our Cloud Security Solutions
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                <div className="p-3 rounded-lg bg-blue-900/30 w-fit mb-4">
                  <feature.icon className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { value: '15K+', label: 'Assets Monitored', icon: Server },
              { value: '99.9%', label: 'Uptime SLA', icon: Shield },
              { value: '500+', label: 'Protected Businesses', icon: Users },
              { value: '24/7', label: 'Security Monitoring', icon: BarChart3 }
            ].map((stat, index) => (
              <div key={index} className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-8 text-center border border-gray-700">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-900/30 mb-4">
                  <stat.icon className="h-8 w-8 text-blue-400" />
                </div>
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-3">
                  {stat.value}
                </div>
                <p className="text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="demo" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-900/30 border border-blue-500/50 mb-6">
            <Cloud className="h-5 w-5 text-blue-400 mr-2" />
            <span className="text-blue-300 font-medium">Cloud Security Assessment</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Secure Your Cloud Infrastructure Today
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Get a comprehensive assessment of your cloud security posture and identify critical vulnerabilities.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/get-quote"
              className="inline-flex items-center justify-center px-8 py-3.5 text-lg font-semibold rounded-lg bg-gradient-to-r from-blue-500 to-cyan-600 text-white hover:opacity-90 transition-opacity"
            >
              Request Assessment
            </Link>
            <Link 
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3.5 text-lg font-semibold rounded-lg border-2 border-gray-600 text-gray-300 hover:border-blue-400 hover:text-blue-400 transition-all"
            >
              Talk to Expert
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