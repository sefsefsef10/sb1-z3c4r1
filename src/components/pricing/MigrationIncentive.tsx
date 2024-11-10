import React from 'react';
import { ArrowRight } from 'lucide-react';

interface MigrationIncentiveProps {
  setIsAnnual: (value: boolean) => void;
}

export default function MigrationIncentive({ setIsAnnual }: MigrationIncentiveProps) {
  return (
    <div className="mt-8 bg-indigo-50 rounded-lg p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <ArrowRight className="h-5 w-5 text-indigo-400" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-indigo-800">
            Special Offer: Switch to Annual Billing
          </h3>
          <div className="mt-2 text-sm text-indigo-700">
            <p>
              Switch now and get an additional month free! Limited time offer.
            </p>
          </div>
          <div className="mt-4">
            <button
              onClick={() => setIsAnnual(true)}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
            >
              Switch to Annual
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}