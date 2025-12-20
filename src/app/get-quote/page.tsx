'use client';

import { useState } from 'react';
import { FileText, Calculator, CheckCircle, Shield, Users, Globe } from 'lucide-react';
import Navbar from '@/lib/components/layout/Navbar';
import Footer from '@/lib/components/layout/Footer';

export default function GetQuotePage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    organization: '',
    phone: '',
    services: [] as string[],
    applications: '0',
    hasBreach: '',
    domains: '',
    subdomains: '0',
    cloudAccounts: '0',
    employees: '',
    securityTeam: '0',
    budget: '',
    timeline: '',
    additional: ''
  });

  const services = [
    { id: 'dark-eye', label: 'Dark Eye Watcher', icon: Globe },
    { id: 'cloud', label: 'Cloud Security', icon: Shield },
    { id: 'vapt', label: 'VAPT', icon: FileText },
    { id: 'red-team', label: 'Red Team Assessment', icon: Users },
    { id: 'vciso', label: 'Virtual CISO', icon: Users },
    { id: 'compliance', label: 'Compliance', icon: CheckCircle }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Quote request:', formData);
    // Add quote submission logic here
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleServiceToggle = (serviceId: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(serviceId)
        ? prev.services.filter(id => id !== serviceId)
        : [...prev.services, serviceId]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-transparent to-cyan-900/20" />
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-900/30 border border-blue-500/50 mb-6">
              <Calculator className="h-5 w-5 text-blue-400 mr-2" />
              <span className="text-blue-300 font-medium">Get Quote</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Request Custom Quote
              </span>
              <span className="block text-white mt-2">For Your Security Needs</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
              Get a personalized quote based on your specific security requirements and business needs.
            </p>
          </div>
        </div>
      </section>

      {/* Quote Form */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
            <h2 className="text-2xl font-bold mb-6 text-white">Tell us about your needs</h2>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-white">Contact Information</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-300 mb-2">First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                      placeholder="Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                      placeholder="john@company.com"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>
              </div>

              {/* Organization Information */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-white">Organization Details</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-gray-300 mb-2">Organization Name *</label>
                    <input
                      type="text"
                      name="organization"
                      value={formData.organization}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                      placeholder="Your Company"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">Size of the Organization</label>
                    <select
                      name="employees"
                      value={formData.employees}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="">Select size</option>
                      <option value="small">Small (0-50 employees)</option>
                      <option value="medium">Medium (51-500 employees)</option>
                      <option value="large">Large (501-5000 employees)</option>
                      <option value="enterprise">Enterprise (5000+ employees)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">Size of the Security Team</label>
                    <input
                      type="number"
                      name="securityTeam"
                      value={formData.securityTeam}
                      onChange={handleChange}
                      min="0"
                      className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>

              {/* Services Selection */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-white">Services Interested In *</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {services.map((service) => (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => handleServiceToggle(service.id)}
                      className={`flex items-center px-4 py-3 rounded-lg border transition-all ${formData.services.includes(service.id) ? 'bg-blue-900/30 border-blue-500 text-blue-400' : 'bg-gray-900 border-gray-700 text-gray-300 hover:border-blue-500'}`}
                    >
                      <service.icon className="h-5 w-5 mr-2" />
                      {service.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Technical Details */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-white">Technical Requirements</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-300 mb-2">Number of Customer Facing Applications</label>
                    <input
                      type="number"
                      name="applications"
                      value={formData.applications}
                      onChange={handleChange}
                      min="0"
                      className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Domain(s) owned by the Organization</label>
                    <input
                      type="text"
                      name="domains"
                      value={formData.domains}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                      placeholder="example.com, app.example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Estimated Total Subdomain Count</label>
                    <input
                      type="number"
                      name="subdomains"
                      value={formData.subdomains}
                      onChange={handleChange}
                      min="0"
                      className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Number of Cloud Accounts</label>
                    <input
                      type="number"
                      name="cloudAccounts"
                      value={formData.cloudAccounts}
                      onChange={handleChange}
                      min="0"
                      className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-gray-300 mb-2">Have you had a breach in the last 12 months?</label>
                  <div className="flex gap-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="hasBreach"
                        value="yes"
                        checked={formData.hasBreach === 'yes'}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      <span className="text-gray-300">Yes</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="hasBreach"
                        value="no"
                        checked={formData.hasBreach === 'no'}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      <span className="text-gray-300">No</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Budget & Timeline */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-white">Budget & Timeline</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-300 mb-2">Budget Range</label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="">Select budget</option>
                      <option value="under-50k">Under ₹50,000</option>
                      <option value="50k-1l">₹50,000 - ₹1,00,000</option>
                      <option value="1l-5l">₹1,00,000 - ₹5,00,000</option>
                      <option value="5l+">₹5,00,000+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Expected Timeline</label>
                    <select
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="">Select timeline</option>
                      <option value="immediate">Immediately</option>
                      <option value="1month">Within 1 month</option>
                      <option value="3months">Within 3 months</option>
                      <option value="6months">Within 6 months</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div>
                <label className="block text-gray-300 mb-2">
                  Anything else you'd like us to know about your security requirements?
                </label>
                <textarea
                  name="additional"
                  value={formData.additional}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                  placeholder="Please provide any additional details that will help us provide an accurate quote..."
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-semibold hover:opacity-90 transition-opacity"
              >
                Request Quote
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}