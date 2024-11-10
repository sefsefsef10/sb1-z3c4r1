import React from 'react';
import { Shield, Users, Lock, BarChart, Server, Clock } from 'lucide-react';
import EnterpriseFeature from './EnterpriseFeature';
import EnterpriseContactForm from './EnterpriseContactForm';
import EnterpriseTestimonial from './EnterpriseTestimonial';

const features = [
  {
    icon: Shield,
    title: 'Enterprise-Grade Security',
    description: 'SOC 2 Type II certified with advanced encryption and security controls'
  },
  {
    icon: Users,
    title: 'Advanced Team Management',
    description: 'Granular permissions, SSO, and custom role management'
  },
  {
    icon: Lock,
    title: 'Compliance & Audit',
    description: 'Comprehensive audit logs and compliance reporting'
  },
  {
    icon: BarChart,
    title: 'Advanced Analytics',
    description: 'Custom reporting, usage insights, and performance metrics'
  },
  {
    icon: Server,
    title: 'Dedicated Infrastructure',
    description: 'Private cloud deployment with guaranteed uptime SLAs'
  },
  {
    icon: Clock,
    title: '24/7 Premium Support',
    description: 'Dedicated account manager and priority support'
  }
];

const testimonials = [
  {
    quote: "LegalDocs has transformed how we handle our legal document generation across our global offices.",
    author: "Sarah Chen",
    role: "Legal Operations Director",
    company: "Global Tech Solutions",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400"
  },
  {
    quote: "The enterprise features have helped us maintain compliance while scaling our operations.",
    author: "Michael Rodriguez",
    role: "Chief Legal Officer",
    company: "Enterprise Corp",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400"
  }
];

export default function EnterpriseLanding() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-indigo-600 to-indigo-800 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
              Enterprise-Grade Legal Document Solutions
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-indigo-100">
              Secure, scalable, and compliant document generation for enterprise organizations
            </p>
            <div className="mt-10">
              <a
                href="#contact"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50"
              >
                Contact Sales
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Enterprise Features
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Everything you need to scale your legal operations
            </p>
          </div>
          <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <EnterpriseFeature key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-16">
            Trusted by Industry Leaders
          </h2>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {testimonials.map((testimonial) => (
              <EnterpriseTestimonial key={testimonial.author} {...testimonial} />
            ))}
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div id="contact" className="py-24 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <EnterpriseContactForm />
        </div>
      </div>
    </div>
  );
}