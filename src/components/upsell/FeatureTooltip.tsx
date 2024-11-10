import React, { useState } from 'react';
import { Info } from 'lucide-react';

interface FeatureTooltipProps {
  title: string;
  description: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  children: React.ReactNode;
}

export default function FeatureTooltip({
  title,
  description,
  position = 'top',
  children
}: FeatureTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2'
  };

  return (
    <div className="relative inline-block">
      <div
        className="inline-flex items-center cursor-help"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
        <Info className="ml-1 h-4 w-4 text-gray-400" />
      </div>

      {isVisible && (
        <div
          className={`absolute z-50 w-64 bg-gray-900 text-white p-3 rounded-lg shadow-lg ${
            positionClasses[position]
          }`}
        >
          <div className="font-medium mb-1">{title}</div>
          <div className="text-sm text-gray-300">{description}</div>
        </div>
      )}
    </div>
  );
}