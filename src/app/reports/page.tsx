'use client';

import { FileText, Download, Eye, BarChart3, Shield, CheckCircle, Calendar, Users } from 'lucide-react';
import Navbar from '@/lib/components/layout/Navbar';
import Footer from '@/lib/components/layout/Footer';
import Link from 'next/link';
import { useState } from 'react';

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState<string | null>(null);

  const sampleReports = [
    {
      id: 'dark-eye-2025-q1',
      title: 'Dark Eye Watcher Q1 2025',
      type: 'Dark Web Monitoring',
      date: 'Mar 31, 2025',
      size: '2.4 MB',
      pages: 24,
      status: 'Completed',
      color: 'cyan'
    },
    {
      id: 'cloud-security-audit',
      title: 'Cloud Security Audit Report',
      type: 'Cloud Security',
      date: 'Apr 15, 2025',
      size: '3.1 MB',
      pages: 32,
      status: 'Completed',
      color: 'blue'
    },
    {
      id: 'vapt-web-app',
      title: 'Web Application VAPT Report',
      type: 'VAPT',
      date: 'May 10, 2025',
      size: '4.2 MB',
      pages: 45,
      status: 'Completed',
      color: 'purple'
    },
    {
      id: 'red-team-assessment',
      title: 'Red Team Assessment Findings',
      type: 'Red Team',
      date: 'May 25, 2025',
      size: '5.8 MB',
      pages: 56,
      status: 'In Progress',
      color: 'red'
    },
    {
      id: 'compliance-audit',
      title: 'ISO 27001 Compliance Audit',
      type: 'Compliance',
      date: 'Jun 5, 2025',
      size: '6.3 MB',
      pages: 68,
      status: 'Completed',
      color: 'green'
    },
    {
      id: 'vciso-monthly',
      title: 'vCISO Monthly Security Report',
      type: 'Virtual CISO',
      date: 'Jun 20, 2025',
      size: '1.9 MB',
      pages: 18,
      status: 'Completed',
      color: 'emerald'
    }
  ];

  const reportTypes = [
    { type: 'All', count: 24 },
    { type: 'Dark Web', count: 6 },
    { type: 'Cloud Security', count: 4 },
    { type: 'VAPT', count: 8 },
    { type: 'Red Team', count: 3 },
    { type: 'Compliance', count: 2 },
    { type: 'vCISO', count: 1 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-transparent to-cyan-900/20" />
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-900/30 border border-blue-500/50 mb-6">
              <FileText className="h-5 w-5 text-blue-400 mr-2" />
              <span className="text-blue-300 font-medium">Reports & Analytics</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Comprehensive Security
              </span>
              <span className="block text-white mt-2">Reports & Analytics</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
              Access detailed security reports, audit findings, and actionable insights 
              to strengthen your organization's security posture.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="#sample-reports" 
                className="inline-flex items-center justify-center px-8 py-3.5 text-lg font-semibold rounded-lg bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 transition-all transform hover:scale-105"
              >
                View Sample Reports
                <Eye className="ml-2 h-5 w-5" />
              </Link>
              <Link 
                href="/contact" 
                className="inline-flex items-center justify-center px-8 py-3.5 text-lg font-semibold rounded-lg border-2 border-gray-600 text-gray-300 hover:border-blue-400 hover:text-blue-400 transition-all"
              >
                Request Custom Report
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { value: '500+', label: 'Reports Generated', icon: FileText },
              { value: '98%', label: 'Client Satisfaction', icon: Users },
              { value: '24/7', label: 'Report Access', icon: Calendar },
              { value: '100%', label: 'Confidentiality', icon: Shield }
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

      {/* Report Types */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Report Categories
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto">
              Browse reports by category and type
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {reportTypes.map((reportType, index) => (
              <button
                key={index}
                onClick={() => setSelectedReport(reportType.type === 'All' ? null : reportType.type)}
                className={`p-4 rounded-xl border transition-all ${selectedReport === reportType.type || (reportType.type === 'All' && !selectedReport) ? 'bg-blue-900/30 border-blue-500 text-blue-400' : 'bg-gray-800/30 border-gray-700 text-gray-300 hover:border-blue-500'}`}
              >
                <div className="text-lg font-bold">{reportType.count}</div>
                <div className="text-sm">{reportType.type}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Reports */}
      <section id="sample-reports" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Sample Reports
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto">
              Download sample reports to see our detailed analysis and findings
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sampleReports.map((report) => (
              <div key={report.id} className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mb-2 ${getColorClass(report.color)}`}>
                      {report.type}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{report.title}</h3>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs ${report.status === 'Completed' ? 'bg-green-900/30 text-green-400' : 'bg-yellow-900/30 text-yellow-400'}`}>
                    {report.status}
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Date:</span>
                    <span className="text-gray-300">{report.date}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Size:</span>
                    <span className="text-gray-300">{report.size}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Pages:</span>
                    <span className="text-gray-300">{report.pages}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white font-medium text-sm flex items-center justify-center">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </button>
                  <button className="flex-1 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-medium text-sm flex items-center justify-center">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Report Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              What's Included in Our Reports
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: FileText,
                title: 'Executive Summary',
                desc: 'High-level overview of findings and business impact'
              },
              {
                icon: BarChart3,
                title: 'Detailed Analysis',
                desc: 'Technical details, evidence, and risk assessment'
              },
              {
                icon: Shield,
                title: 'Remediation Guidance',
                desc: 'Step-by-step instructions for fixing vulnerabilities'
              },
              {
                icon: CheckCircle,
                title: 'Compliance Mapping',
                desc: 'Mapping to regulatory standards and frameworks'
              }
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-900/30 mb-6">
                  <feature.icon className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-900 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-900/30 border border-blue-500/50 mb-6">
            <FileText className="h-5 w-5 text-blue-400 mr-2" />
            <span className="text-blue-300 font-medium">Get Your Reports</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Access Comprehensive Security Insights
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Get detailed, actionable security reports tailored to your organization's needs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/get-quote"
              className="inline-flex items-center justify-center px-8 py-3.5 text-lg font-semibold rounded-lg bg-gradient-to-r from-blue-500 to-cyan-600 text-white hover:opacity-90 transition-opacity"
            >
              Request Custom Report
            </Link>
            <Link 
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3.5 text-lg font-semibold rounded-lg border-2 border-gray-600 text-gray-300 hover:border-blue-400 hover:text-blue-400 transition-all"
            >
              Schedule Demo
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function getColorClass(color: string) {
  const colors: Record<string, string> = {
    cyan: 'bg-cyan-900/30 text-cyan-400',
    blue: 'bg-blue-900/30 text-blue-400',
    purple: 'bg-purple-900/30 text-purple-400',
    red: 'bg-red-900/30 text-red-400',
    green: 'bg-green-900/30 text-green-400',
    emerald: 'bg-emerald-900/30 text-emerald-400'
  };
  return colors[color] || colors.blue;
}