import React from 'react';
import { LucideIcon } from 'lucide-react';

interface EnterpriseFeatureProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function EnterpriseFeature({ icon: Icon, title, description }: EnterpriseFeatureProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 transform transition-all duration-300 hover:scale-105">
      <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
        <Icon className="h-6 w-6 text-indigo-600" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}