import { Shield, Lock, Globe, Target, Users, Zap, BarChart3, CheckCircle } from 'lucide-react';
import Navbar from '@/lib/components/layout/Navbar';
import Footer from '@/lib/components/layout/Footer';
import Link from 'next/link';
import ServiceCard from '@/lib/classes/services/ServiceCard';

export default function Home() {
  const services = [
    {
      title: 'Dark Eye Watcher',
      description: 'Monitor dark web for compromised data',
      icon: Globe,
      features: [
        '24/7 Dark Web Monitoring',
        'Threat Intelligence Platform',
        'Data Loss Prevention',
        'Brand Protection Services'
      ],
      href: '/services/dark-eye-watcher',
      color: 'cyan' as const
    },
    {
      title: 'Cloud Watcher',
      description: 'Cloud security posture management',
      icon: Shield,
      features: [
        'Asset Monitoring',
        'Cloud Security Posture Management',
        'Microservices Security',
        'Cloud Attack Emulation'
      ],
      href: '/services/cloud-watcher',
      color: 'blue' as const
    },
    {
      title: 'Red Team Assessment',
      description: 'Evaluate security team & processes',
      icon: Target,
      features: [
        'Social Engineering Simulations',
        'Network & Firewall Audits',
        'Cloud Attack Emulation',
        'Security Team Evaluation'
      ],
      href: '/services/red-team-assessment',
      color: 'red' as const
    },
    {
      title: 'VAPT',
      description: 'Vulnerability Assessment & Penetration Testing',
      icon: Zap,
      features: [
        'Web & Mobile App Security',
        'Secure Code Review',
        'Network Penetration Testing',
        'Detailed Audit Reports'
      ],
      href: '/services/vapt',
      color: 'purple' as const
    },
    {
      title: 'Virtual CISO',
      description: 'Your in-house security team',
      icon: Users,
      features: [
        'Continuous Vulnerability Scanning',
        'DevSecOps Implementation',
        'Threat Modelling',
        'Compliance Management'
      ],
      href: '/services/virtual-ciso',
      color: 'green' as const
    }
  ];

  const stats = [
    { value: '849M+', label: 'Lines Of Code Reviewed' },
    { value: '3Bn+', label: 'Records Scraped' },
    { value: '15K+', label: 'Assets Monitored' },
    { value: '99.99%', label: 'Threat Mitigation' },
    { value: '200TB+', label: 'Data Analysed' },
    { value: '100+', label: 'Organizations Secured' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-transparent to-cyan-900/20" />
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="block bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
                Defend Against
              </span>
              <span className="block text-white mt-2">Cyber Threats</span>
              <span className="block text-3xl md:text-4xl text-cyan-300 mt-4">Before They Strike</span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-10 leading-relaxed">
              Elevate Your Security Posture With Advanced Security Solutions And In-Depth Vulnerability Assessments, 
              Aligned With The Trusted Frameworks Of OWASP, NIST, SANS, CERT, And NIC.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link 
                href="/get-quote" 
                className="group relative px-8 py-4 text-lg font-semibold rounded-xl overflow-hidden"
              >
                <div className="absolute inset-0 cyber-gradient group-hover:opacity-90 transition-opacity" />
                <span className="relative flex items-center justify-center">
                  <Download className="h-5 w-5 mr-2" />
                  Download Free Report
                </span>
              </Link>
              <Link 
                href="/contact" 
                className="px-8 py-4 text-lg font-semibold rounded-xl border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 transition-all"
              >
                Get Quote
              </Link>
            </div>

            {/* Trusted Brands */}
            <div className="mb-12">
              <p className="text-gray-400 mb-8 text-lg">Trusted by 100+ Organizations Worldwide</p>
              <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
                {['yahoo', 'zomato', 'Paytm', 'SONY', 'CYBARY', 'Jackerone'].map((brand) => (
                  <div 
                    key={brand} 
                    className="text-2xl font-bold text-gray-300 hover:text-cyan-300 transition-colors cursor-pointer"
                  >
                    {brand}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Comprehensive Cybersecurity Solutions
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto text-lg">
              End-to-end security services tailored for modern enterprises
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Numbers Don't Lie
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Data speaks for itself, make informed decisions with our all-in-one cyber defence platform
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 text-center border border-gray-700 hover:border-cyan-500 transition-all"
              >
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              How We Do It
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Identify Critical Assets', desc: 'Primary Customer And Internet Facing Applications' },
              { step: '02', title: 'Watcher Onboarding', desc: 'Asset Monitoring, SCM, Dark Eye Watcher For Overall Monitoring' },
              { step: '03', title: 'Vulnerability Assessment', desc: 'Security Testing By Expertise Team Of Certified Hackers' },
              { step: '04', title: 'vCISO', desc: 'Acting As A Security Team With Regular Threat Modelling' }
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full cyber-gradient flex items-center justify-center text-2xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Ready to Secure Your Business?
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Join hundreds of companies that trust ApniSec with their cybersecurity needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/register" 
              className="group relative px-8 py-4 text-lg font-semibold rounded-xl overflow-hidden"
            >
              <div className="absolute inset-0 cyber-gradient group-hover:opacity-90 transition-opacity" />
              <span className="relative">Start Free Trial</span>
            </Link>
            <Link 
              href="/contact" 
              className="px-8 py-4 text-lg font-semibold rounded-xl border-2 border-gray-600 text-gray-300 hover:border-cyan-400 hover:text-cyan-400 transition-all"
            >
              Schedule Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

// Add missing Download icon component
const Download = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);