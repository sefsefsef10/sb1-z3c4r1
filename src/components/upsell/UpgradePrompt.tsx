import React from 'react';
import { ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

interface UpgradePromptProps {
  title: string;
  description: string;
  features: string[];
  ctaText?: string;
  planName?: string;
}

export default function UpgradePrompt({
  title,
  description,
  features,
  ctaText = 'Upgrade Now',
  planName = 'Professional'
}: UpgradePromptProps) {
  return (
    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-xl p-6 text-white">
      <div className="flex items-start space-x-4">
        <div className="p-2 bg-white/10 rounded-lg">
          <Star className="h-6 w-6 text-yellow-300" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-white/80 mb-4">{description}</p>
          
          <ul className="space-y-2 mb-6">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-yellow-300 rounded-full" />
                <span className="text-sm text-white/90">{feature}</span>
              </li>
            ))}
          </ul>

          <Link
            to="/pricing"
            className="inline-flex items-center px-4 py-2 bg-white text-indigo-600 rounded-lg font-medium text-sm hover:bg-indigo-50 transition-colors"
          >
            {ctaText}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}