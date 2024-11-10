import React from 'react';
import { Lock, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PremiumFeaturePreviewProps {
  title: string;
  description: string;
  image?: string;
  planName?: string;
}

export default function PremiumFeaturePreview({
  title,
  description,
  image,
  planName = 'Professional'
}: PremiumFeaturePreviewProps) {
  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm rounded-lg flex items-center justify-center">
        <div className="text-center p-6">
          <div className="bg-white/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-white font-semibold mb-2">{title}</h3>
          <p className="text-white/80 text-sm mb-4">{description}</p>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Star className="h-4 w-4 text-yellow-400" />
            <span className="text-white text-sm">Available in {planName} Plan</span>
          </div>
          <Link
            to="/pricing"
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
          >
            Upgrade to Access
          </Link>
        </div>
      </div>
      {image && (
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover rounded-lg filter blur-sm"
        />
      )}
    </div>
  );
}