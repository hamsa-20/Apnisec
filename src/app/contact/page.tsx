'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Users, Shield } from 'lucide-react';
import Navbar from '@/lib/components/layout/Navbar';
import Footer from '@/lib/components/layout/Footer';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add form submission logic here
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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
              <Mail className="h-5 w-5 text-blue-400 mr-2" />
              <span className="text-blue-300 font-medium">Contact Us</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Get In Touch
              </span>
              <span className="block text-white mt-2">With Our Security Experts</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
              Have questions about our services? Need a custom security solution? 
              Our team is ready to help you secure your business.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
              <h2 className="text-2xl font-bold mb-6 text-white">Send us a message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-300 mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                      placeholder="John Doe"
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
                      className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-300 mb-2">Company Name</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                      placeholder="Your Company"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Service Interested In</label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option value="">Select a service</option>
                    <option value="dark-eye">Dark Eye Watcher</option>
                    <option value="cloud">Cloud Watcher</option>
                    <option value="red-team">Red Team Assessment</option>
                    <option value="vapt">VAPT</option>
                    <option value="vciso">Virtual CISO</option>
                    <option value="compliance">Compliance</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    placeholder="Tell us about your security needs..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-semibold hover:opacity-90 transition-opacity flex items-center justify-center"
                >
                  Send Message
                  <Send className="ml-2 h-5 w-5" />
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold mb-8 text-white">Contact Information</h2>
              
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="p-3 rounded-lg bg-blue-900/30 mr-4">
                    <Mail className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1 text-white">Email Us</h3>
                    <p className="text-gray-400">contact@apnisec.com</p>
                    <p className="text-gray-400">support@apnisec.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="p-3 rounded-lg bg-cyan-900/30 mr-4">
                    <Phone className="h-6 w-6 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1 text-white">Call Us</h3>
                    <p className="text-gray-400">+91 98765 43210</p>
                    <p className="text-gray-400">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="p-3 rounded-lg bg-green-900/30 mr-4">
                    <MapPin className="h-6 w-6 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1 text-white">Visit Us</h3>
                    <p className="text-gray-400">Cyber Security Hub</p>
                    <p className="text-gray-400">Bangalore, Karnataka 560001</p>
                    <p className="text-gray-400">India</p>
                  </div>
                </div>

                <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700">
                  <div className="flex items-center mb-4">
                    <div className="p-3 rounded-lg bg-purple-900/30 mr-4">
                      <Users className="h-6 w-6 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">24/7 Support</h3>
                      <p className="text-gray-400 text-sm">Available for emergency incidents</p>
                    </div>
                  </div>
                  <p className="text-gray-300">
                    For critical security incidents, contact our 24/7 emergency response team.
                  </p>
                </div>

                <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700">
                  <div className="flex items-center mb-4">
                    <div className="p-3 rounded-lg bg-orange-900/30 mr-4">
                      <Shield className="h-6 w-6 text-orange-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Business Hours</h3>
                      <p className="text-gray-400 text-sm">Monday - Friday</p>
                    </div>
                  </div>
                  <p className="text-gray-300">
                    9:00 AM - 6:00 PM IST<br />
                    Response time: Within 2 business hours
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}