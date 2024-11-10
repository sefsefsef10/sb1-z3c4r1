import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ShowcaseStats {
  [key: string]: string;
}

interface FeatureShowcaseProps {
  feature: {
    title: string;
    description: string;
    icon: LucideIcon;
    benefits: string[];
    showcase: {
      image: string;
      stats: ShowcaseStats;
    };
  };
}

export default function FeatureShowcase({ feature }: FeatureShowcaseProps) {
  const Icon = feature.icon;

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Content */}
        <div className="p-8 lg:p-12">
          <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-8">
            <Icon className="h-6 w-6 text-indigo-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
          <p className="text-lg text-gray-600 mb-8">{feature.description}</p>
          
          <div className="grid grid-cols-2 gap-6">
            {Object.entries(feature.showcase.stats).map(([key, value]) => (
              <div key={key}>
                <p className="text-3xl font-bold text-indigo-600">{value}</p>
                <p className="text-sm text-gray-500 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Key Benefits</h4>
            <ul className="space-y-3">
              {feature.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <svg
                    className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-600">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Image */}
        <div className="relative h-64 lg:h-auto">
          <img
            src={feature.showcase.image}
            alt={feature.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-purple-600/20" />
        </div>
      </div>
    </div>
  );
}