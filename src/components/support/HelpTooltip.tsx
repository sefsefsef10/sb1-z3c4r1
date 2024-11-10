import React, { useState } from 'react';
import { HelpCircle, X, ChevronRight } from 'lucide-react';

interface TooltipContent {
  title: string;
  content: string;
  link?: string;
}

const tooltips: Record<string, TooltipContent> = {
  documentGeneration: {
    title: 'Document Generation',
    content: 'Create legal documents by selecting a template and filling in required information.',
    link: '/help/document-generation'
  },
  templateManagement: {
    title: 'Template Management',
    content: 'Manage and customize document templates to suit your needs.',
    link: '/help/templates'
  },
  integrations: {
    title: 'Integrations',
    content: 'Connect with your favorite tools and services.',
    link: '/help/integrations'
  },
  analytics: {
    title: 'Analytics',
    content: 'Track document usage and team performance.',
    link: '/help/analytics'
  }
};

export default function HelpTooltip() {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const showTooltip = (id: string) => {
    setActiveTooltip(id);
    setIsExpanded(true);
  };

  const hideTooltip = () => {
    setActiveTooltip(null);
    setIsExpanded(false);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="relative">
        <button
          className="bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <X className="h-6 w-6" />
          ) : (
            <HelpCircle className="h-6 w-6" />
          )}
        </button>

        {isExpanded && (
          <div className="absolute bottom-full right-0 mb-4 w-72 bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="p-4 bg-indigo-600">
              <h4 className="text-lg font-medium text-white">Need Help?</h4>
              <p className="text-sm text-indigo-200">Click a topic to learn more</p>
            </div>
            <div className="divide-y divide-gray-200">
              {Object.entries(tooltips).map(([id, tooltip]) => (
                <button
                  key={id}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                  onClick={() => showTooltip(id)}
                >
                  <h5 className="text-sm font-medium text-gray-900">{tooltip.title}</h5>
                  {activeTooltip === id && (
                    <div className="mt-1">
                      <p className="text-sm text-gray-500">{tooltip.content}</p>
                      {tooltip.link && (
                        <a
                          href={tooltip.link}
                          className="mt-2 inline-flex items-center text-sm text-indigo-600 hover:text-indigo-500"
                        >
                          Learn more
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </a>
                      )}
                    </div>
                  )}
                </button>
              ))}
            </div>
            <div className="p-4 bg-gray-50">
              <a
                href="/help"
                className="text-sm text-indigo-600 hover:text-indigo-500 font-medium"
              >
                Visit Help Center
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}