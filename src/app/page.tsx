
'use client';
import { Shield, Lock, Globe, Target, Users, Zap, BarChart3, CheckCircle, Linkedin, Quote, Star, ChevronDown, ChevronUp } from 'lucide-react';
import Navbar from '@/lib/components/layout/Navbar';
import Footer from '@/lib/components/layout/Footer';
import Link from 'next/link';
import ServiceCard from '@/lib/classes/services/ServiceCard';
import { useState } from 'react';

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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

  const faqs = [
    {
      question: 'How often are alerts generated?',
      answer: 'Alerts are generated in real-time based on our 24/7 monitoring systems. Critical alerts are sent immediately, while summary reports are delivered daily or weekly based on your preference.'
    },
    {
      question: 'What is the average response time?',
      answer: 'Our average response time for critical security incidents is under 15 minutes. For non-critical issues, we respond within 2 business hours during working days.'
    },
    {
      question: 'Can I customize the alerts?',
      answer: 'Yes, our platform allows complete customization of alert thresholds, notification methods (email, SMS, Slack), and escalation policies based on your organizational structure.'
    },
    {
      question: 'What platforms are supported?',
      answer: 'We support AWS, Azure, Google Cloud, on-premise infrastructure, hybrid environments, and all major operating systems including Windows, Linux, and macOS.'
    },
    {
      question: 'Is there a trial period available?',
      answer: 'Yes, we offer a 14-day free trial for all our services. You get full access to our platform with limited monitoring scope to evaluate our capabilities.'
    },
    {
      question: 'How do you ensure data privacy?',
      answer: 'We follow GDPR, CCPA, and other global data privacy regulations. All data is encrypted at rest and in transit, and we never share client data with third parties.'
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
     <section className="relative overflow-hidden pt-20 pb-32 px-4 sm:px-6 lg:px-8">
  {/* Background Image ONLY for hero */}
  <div 
    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
    style={{ backgroundImage: "url('/bk2.png')" }}
  />
  <div className="absolute inset-0 bg-black/60" />
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

      {/* Meet Our Team Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Meet Our Team
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our team of cybersecurity experts with decades of combined experience
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Rajat Moury - Founder */}
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 text-center border border-gray-700 hover:border-blue-500 transition-all group">
              <div className="relative mx-auto w-32 h-32 mb-6 rounded-full overflow-hidden border-4 border-gray-700 group-hover:border-blue-500">
                <div className="w-full h-full bg-gradient-to-br from-blue-900/30 to-cyan-900/30 flex items-center justify-center">
                  <span className="text-4xl font-bold text-blue-400">RM</span>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-1 text-white">Rajat Moury</h3>
              <p className="text-blue-400 font-medium mb-3">Founder</p>
              <p className="text-gray-400 text-sm mb-4">
                Cybersecurity visionary with 15+ years experience in enterprise security
              </p>
              <div className="flex justify-center">
                <button className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-blue-400 transition-colors">
                  <Linkedin className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Muthu D - Security Engineer */}
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 text-center border border-gray-700 hover:border-green-500 transition-all group">
              <div className="relative mx-auto w-32 h-32 mb-6 rounded-full overflow-hidden border-4 border-gray-700 group-hover:border-green-500">
                <div className="w-full h-full bg-gradient-to-br from-green-900/30 to-emerald-900/30 flex items-center justify-center">
                  <span className="text-4xl font-bold text-green-400">MD</span>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-1 text-white">Muthu D</h3>
              <p className="text-green-400 font-medium mb-3">Security Engineer</p>
              <p className="text-gray-400 text-sm mb-4">
                Expert in penetration testing, vulnerability assessment and threat intelligence
              </p>
              <div className="flex justify-center">
                <button className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-green-400 transition-colors">
                  <Linkedin className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Atish Thakur - Software Engineer */}
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 text-center border border-gray-700 hover:border-cyan-500 transition-all group">
              <div className="relative mx-auto w-32 h-32 mb-6 rounded-full overflow-hidden border-4 border-gray-700 group-hover:border-cyan-500">
                <div className="w-full h-full bg-gradient-to-br from-cyan-900/30 to-blue-900/30 flex items-center justify-center">
                  <span className="text-4xl font-bold text-cyan-400">AT</span>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-1 text-white">Atish Thakur</h3>
              <p className="text-cyan-400 font-medium mb-3">Software Engineer</p>
              <p className="text-gray-400 text-sm mb-4">
                Full-stack developer specializing in secure application development and DevSecOps
              </p>
              <div className="flex justify-center">
                <button className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-cyan-400 transition-colors">
                  <Linkedin className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Nishan Agarwal - UI/UX Designer */}
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 text-center border border-gray-700 hover:border-purple-500 transition-all group">
              <div className="relative mx-auto w-32 h-32 mb-6 rounded-full overflow-hidden border-4 border-gray-700 group-hover:border-purple-500">
                <div className="w-full h-full bg-gradient-to-br from-purple-900/30 to-violet-900/30 flex items-center justify-center">
                  <span className="text-4xl font-bold text-purple-400">NA</span>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-1 text-white">Nishan Agarwal</h3>
              <p className="text-purple-400 font-medium mb-3">UI/UX Designer</p>
              <p className="text-gray-400 text-sm mb-4">
                Creating intuitive and secure user experiences for cybersecurity platforms
              </p>
              <div className="flex justify-center">
                <button className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-purple-400 transition-colors">
                  <Linkedin className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client Reviews Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              What Our Clients Say
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Trusted by hundreds of organizations worldwide
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Review 1 */}
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-blue-500 transition-all">
              <div className="flex items-center mb-6">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white">Sunil D'Monte</h3>
                  <p className="text-gray-400 text-sm">Technical Architect at RangDe</p>
                </div>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
              <Quote className="h-8 w-8 text-blue-400 mb-4" />
              <p className="text-gray-300 mb-6 italic">
                "ApniSec has been RangDe's security partners for 2 years now. With ApniSec, there is a reason I used the word 'partners' - they are on board and involved in our security all the time."
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">April 2024</span>
                <Link href="#" className="text-blue-400 hover:text-blue-300 text-sm">
                  Read Full Review →
                </Link>
              </div>
            </div>

            {/* Review 2 */}
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-green-500 transition-all">
              <div className="flex items-center mb-6">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white">Sneha Pathak</h3>
                  <p className="text-gray-400 text-sm">Process Engineer at BlackBuck</p>
                </div>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
              <Quote className="h-8 w-8 text-green-400 mb-4" />
              <p className="text-gray-300 mb-6 italic">
                "We've been working with ApniSec for over 3 years, and they've completely changed the way we handle cybersecurity. Their tools make us confident that our data is safe and compliant with industry rules."
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">March 2024</span>
                <Link href="#" className="text-green-400 hover:text-green-300 text-sm">
                  Read Full Review →
                </Link>
              </div>
            </div>

            {/* Review 3 */}
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-purple-500 transition-all">
              <div className="flex items-center mb-6">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white">Rahul Sharma</h3>
                  <p className="text-gray-400 text-sm">CTO at Zomato</p>
                </div>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
              <Quote className="h-8 w-8 text-purple-400 mb-4" />
              <p className="text-gray-300 mb-6 italic">
                "ApniSec is proactive, skilled and vigilant, anticipating and mitigating risks to protect our organization. They communicate effectively and stay innovative in the ever-evolving security landscape."
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">February 2024</span>
                <Link href="#" className="text-purple-400 hover:text-purple-300 text-sm">
                  Read Full Review →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Get answers to common questions about our cybersecurity services
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-700 rounded-xl overflow-hidden">
                <button
                  className="w-full px-6 py-4 text-left flex items-center justify-between bg-gray-800/30 hover:bg-gray-800/50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className="text-lg font-medium text-white">{faq.question}</span>
                  {openFaq === index ? (
                    <ChevronUp className="h-5 w-5 text-cyan-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-6 py-4 bg-gray-900/30">
                    <p className="text-gray-300">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-400 mb-6">
              Still have questions? We're here to help!
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 text-lg font-semibold rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 transition-all"
            >
              Contact Our Team
            </Link>
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