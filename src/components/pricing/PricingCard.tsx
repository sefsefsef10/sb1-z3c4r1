import React from 'react';
import { Check, Star } from 'lucide-react';

interface PricingFeature {
  text: string;
  included: boolean;
}

interface PricingCardProps {
  title: string;
  price: string | number;
  description: string;
  features: PricingFeature[];
  popular?: boolean;
  billing?: 'monthly' | 'annually';
  annualSavings?: {
    annualSavings: number;
    percentSavings: number;
  };
  limits?: {
    documents: number | string;
    storage: string;
    users: number | string;
  };
}

export default function PricingCard({
  title,
  price,
  description,
  features,
  popular = false,
  billing = 'monthly',
  annualSavings,
  limits,
}: PricingCardProps) {
  return (
    <div
      className={`rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 ${
        popular ? 'border-2 border-indigo-500 relative' : ''
      }`}
    >
      {popular && (
        <div className="absolute top-0 right-0 mt-4 mr-4">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-indigo-100 text-indigo-600">
            <Star className="w-4 h-4 mr-1" />
            Most Popular
          </div>
        </div>
      )}

      <div className="px-6 py-8 bg-white sm:p-10 sm:pb-6">
        <div className="flex justify-center">
          <span
            className={`inline-flex px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase ${
              popular ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-600'
            }`}
          >
            {title}
          </span>
        </div>
        <div className="mt-4 flex justify-center items-baseline text-6xl font-extrabold">
          <span className="text-2xl font-medium">$</span>
          {price}
          <span className="ml-1 text-2xl font-medium text-gray-500">/{billing}</span>
        </div>
        <p className="mt-4 text-sm text-gray-500 text-center">{description}</p>

        {/* Annual Savings Badge */}
        {annualSavings && (
          <div className="mt-4 flex justify-center">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              Save ${annualSavings.annualSavings.toLocaleString()} ({annualSavings.percentSavings}% off)
            </span>
          </div>
        )}
      </div>

      <div className="px-6 pt-6 pb-8 bg-gray-50 sm:p-10 sm:pt-6">
        {/* Usage Limits */}
        {limits && (
          <div className="mb-6 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Documents</span>
              <span className="font-medium text-gray-900">{limits.documents}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Storage</span>
              <span className="font-medium text-gray-900">{limits.storage}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Team Members</span>
              <span className="font-medium text-gray-900">{limits.users}</span>
            </div>
          </div>
        )}

        {/* Features */}
        <ul className="space-y-4">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <div className="flex-shrink-0">
                <Check
                  className={`h-6 w-6 ${
                    feature.included ? 'text-green-500' : 'text-gray-300'
                  }`}
                />
              </div>
              <p
                className={`ml-3 text-base ${
                  feature.included ? 'text-gray-700' : 'text-gray-500'
                }`}
              >
                {feature.text}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-6">
          <button
            className={`w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium transition-colors duration-200 ${
              popular
                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                : 'bg-white text-indigo-600 border-indigo-600 hover:bg-indigo-50'
            }`}
          >
            Get started
          </button>
        </div>

        {billing === 'annually' && (
          <p className="mt-4 text-xs text-center text-gray-500">
            Billed annually at ${(Number(price) * 12).toLocaleString()}
          </p>
        )}
      </div>
    </div>
  );
}