'use client';

import { Target, Shield, Users, AlertTriangle, BarChart3, CheckCircle, Zap, Globe, FileText } from 'lucide-react';
import Navbar from '@/lib/components/layout/Navbar';
import Footer from '@/lib/components/layout/Footer';
import Link from 'next/link';
import { useState } from 'react';

export default function RedTeamAssessmentPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const assessments = [
    {
      icon: Users,
      title: 'Social Engineering',
      desc: 'Phishing, Vishing, Smishing campaigns to test employee awareness',
      metrics: { campaigns: 9, riskIndex: '78/100', clickRate: '80%' }
    },
    {
      icon: Shield,
      title: 'Network Penetration',
      desc: 'External and internal network penetration testing',
      metrics: { vulnerabilities: 24, critical: 3, resolved: 18 }
    },
    {
      icon: Globe,
      title: 'Web Application',
      desc: 'Comprehensive web and API security testing',
      metrics: { apps: 12, findings: 47, risk: 'High' }
    },
    {
      icon: FileText,
      title: 'Physical Security',
      desc: 'On-site security assessment and access control testing',
      metrics: { breaches: 2, weaknesses: 8, score: '65%' }
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 via-transparent to-orange-900/20" />
        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-red-900/30 border border-red-500/50 mb-6">
                <Target className="h-5 w-5 text-red-400 mr-2" />
                <span className="text-red-300 font-medium">Red Team Assessment</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="block bg-gradient-to-r from-red-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                  Realistic Simulation
                </span>
                <span className="block text-white mt-2">Of Cyberattacks To Test</span>
                <span className="block text-red-300 mt-2">Your Security Defenses</span>
              </h1>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                Ethical Hackers Emulate Adversaries, Targeting Systems, Networks, And Personnel To Uncover Vulnerabilities. 
                The Exercise Evaluates Detection, Response, And Mitigation Capabilities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/get-quote" 
                  className="inline-flex items-center justify-center px-8 py-3.5 text-lg font-semibold rounded-lg bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 transition-all transform hover:scale-105"
                >
                  Request Assessment
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link 
                  href="#methodology" 
                  className="inline-flex items-center justify-center px-8 py-3.5 text-lg font-semibold rounded-lg border-2 border-gray-600 text-gray-300 hover:border-red-400 hover:text-red-400 transition-all"
                >
                  View Methodology
                </Link>
              </div>
            </div>

            {/* Assessment Dashboard */}
            <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white">Assessment Overview</h3>
                  <p className="text-gray-400 text-sm">Last Tested: May 26, 2025</p>
                </div>
                <div className="px-3 py-1 rounded-full bg-red-900/30 border border-red-500/50">
                  <span className="text-red-400 text-sm font-medium">Critical Risk</span>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-white">9</div>
                  <div className="text-gray-400 text-sm">Total Campaigns</div>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-white">78/100</div>
                  <div className="text-gray-400 text-sm">Org Risk Index</div>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-white">80%</div>
                  <div className="text-gray-400 text-sm">Click Rate</div>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-white">4</div>
                  <div className="text-gray-400 text-sm">Campaign Types</div>
                </div>
              </div>

              {/* Campaign Types */}
              <div>
                <h4 className="text-white font-medium mb-3">Campaign Distribution</h4>
                <div className="space-y-2">
                  {[
                    { type: 'Phishing', count: 5, color: 'bg-red-500' },
                    { type: 'Vishing', count: 2, color: 'bg-orange-500' },
                    { type: 'Smishing', count: 1, color: 'bg-yellow-500' },
                    { type: 'Physical', count: 1, color: 'bg-purple-500' }
                  ].map((campaign) => (
                    <div key={campaign.type} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full ${campaign.color} mr-2`} />
                        <span className="text-gray-300 text-sm">{campaign.type}</span>
                      </div>
                      <span className="text-white font-medium">{campaign.count} campaigns</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2">
            {['overview', 'methodology', 'assessments', 'reports', 'faq'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${activeTab === tab ? 'bg-red-900/30 text-red-400 border border-red-500/50' : 'text-gray-400 hover:text-white hover:bg-gray-800/50'}`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Assessments Grid */}
      <section id="methodology" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Comprehensive Assessment Services
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto">
              Multi-faceted approach to testing your organization's security posture
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {assessments.map((assessment, index) => (
              <div key={index} className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-red-500 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="p-3 rounded-lg bg-red-900/30 mr-4">
                      <assessment.icon className="h-8 w-8 text-red-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{assessment.title}</h3>
                      <p className="text-gray-400 text-sm mt-1">{assessment.desc}</p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-2 mt-6">
                  {Object.entries(assessment.metrics).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div className="text-lg font-bold text-white">{value}</div>
                      <div className="text-gray-400 text-xs capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Red Team Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Why Blue Team Isn't Enough?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="p-3 rounded-lg bg-red-900/30 mr-4">
                  <Target className="h-8 w-8 text-red-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-white">Adversarial Perspective</h3>
                  <p className="text-gray-400">
                    Blue Teams often lack the attacker's mindset, making it harder to predict sophisticated tactics 
                    and identify overlooked vulnerabilities that real adversaries would exploit.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="p-3 rounded-lg bg-orange-900/30 mr-4">
                  <Zap className="h-8 w-8 text-orange-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-white">Evolving Threat Landscape</h3>
                  <p className="text-gray-400">
                    New and advanced threats require continuous testing. A Blue Team alone may not effectively 
                    simulate modern attack techniques used by sophisticated threat actors.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex items-start">
                <div className="p-3 rounded-lg bg-yellow-900/30 mr-4">
                  <AlertTriangle className="h-8 w-8 text-yellow-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-white">Real World Attack Scenarios</h3>
                  <p className="text-gray-400">
                    Blue Teams typically defend against known attack patterns. Red Teams simulate evolving 
                    and unknown attacks, helping identify weaknesses that may not be discovered otherwise.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="p-3 rounded-lg bg-purple-900/30 mr-4">
                  <BarChart3 className="h-8 w-8 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-white">Compliance & Validation</h3>
                  <p className="text-gray-400">
                    Many compliance frameworks require independent penetration testing. Red Team assessments 
                    validate security controls and demonstrate due diligence to stakeholders.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Our Methodology</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Reconnaissance',
                desc: 'Information gathering and target identification'
              },
              {
                step: '02',
                title: 'Weaponization',
                desc: 'Developing attack vectors and payloads'
              },
              {
                step: '03',
                title: 'Delivery & Exploitation',
                desc: 'Executing attacks and gaining access'
              },
              {
                step: '04',
                title: 'Reporting & Remediation',
                desc: 'Detailed findings and actionable recommendations'
              }
            ].map((phase, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-red-900 to-orange-900 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">{phase.step}</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{phase.title}</h3>
                <p className="text-gray-400">{phase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-red-900/30 border border-red-500/50 mb-6">
            <Target className="h-5 w-5 text-red-400 mr-2" />
            <span className="text-red-300 font-medium">Red Team Assessment</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Evaluate Your Security Defenses
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Get a realistic assessment of your organization's ability to detect, respond to, and mitigate advanced cyber threats.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/get-quote"
              className="inline-flex items-center justify-center px-8 py-3.5 text-lg font-semibold rounded-lg bg-gradient-to-r from-red-500 to-orange-600 text-white hover:opacity-90 transition-opacity"
            >
              Request Assessment
            </Link>
            <Link 
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3.5 text-lg font-semibold rounded-lg border-2 border-gray-600 text-gray-300 hover:border-red-400 hover:text-red-400 transition-all"
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