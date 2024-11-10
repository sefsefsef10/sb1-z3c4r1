import React, { useState } from 'react';
import {
  FileText,
  Shield,
  Clock,
  Bot,
  Database,
  Lock,
  Users,
  RefreshCw,
  FileCheck,
  ChevronRight,
} from 'lucide-react';
import FeatureCard from './FeatureCard';
import FeatureShowcase from './FeatureShowcase';

const features = [
  {
    title: 'AI-Powered Generation',
    description: 'Generate legally-sound documents in minutes using advanced AI technology.',
    icon: Bot,
    benefits: [
      'Smart template suggestions',
      'Automated data extraction',
      'Context-aware completions',
      'Multi-language support',
    ],
    showcase: {
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      stats: { accuracy: '99.9%', speed: '10x faster', satisfaction: '98%' },
    },
  },
  {
    title: 'Legal Compliance',
    description: 'Stay compliant with up-to-date legal requirements across jurisdictions.',
    icon: Shield,
    benefits: [
      'Real-time compliance checks',
      'Jurisdiction-specific templates',
      'Automatic updates',
      'Compliance reporting',
    ],
    showcase: {
      image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      stats: { coverage: '50+ countries', updates: 'Real-time', compliance: '100%' },
    },
  },
  {
    title: 'Time Saving',
    description: 'Reduce document creation time by up to 80% with automated workflows.',
    icon: Clock,
    benefits: [
      'Bulk document generation',
      'Template customization',
      'Automated workflows',
      'Quick turnaround',
    ],
    showcase: {
      image: 'https://images.unsplash.com/photo-1553484771-371a605b060b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      stats: { timeSaved: '80%', efficiency: '5x', productivity: '300%' },
    },
  },
];

export default function Features() {
  const [activeFeature, setActiveFeature] = useState(0);

  return (
    <div className="bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Powerful Features for Legal Document Generation
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Everything you need to streamline your legal document workflow
          </p>
        </div>

        {/* Feature Showcase */}
        <div className="mt-20">
          <FeatureShowcase feature={features[activeFeature]} />
        </div>

        {/* Feature Cards */}
        <div className="mt-20 grid grid-cols-1 gap-12 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="relative"
              onMouseEnter={() => setActiveFeature(index)}
            >
              <FeatureCard {...feature} />
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <a
            href="/signup"
            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:text-lg md:px-10"
          >
            Get Started Now
            <ChevronRight className="ml-2 h-5 w-5" />
          </a>
          <p className="mt-4 text-sm text-gray-500">
            No credit card required · 14-day free trial · Cancel anytime
          </p>
        </div>
      </div>
    </div>
  );
}