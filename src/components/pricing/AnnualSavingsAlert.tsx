import React from 'react';
import { TrendingUp } from 'lucide-react';

export default function AnnualSavingsAlert() {
  return (
    <div className="mt-8 max-w-3xl mx-auto bg-green-50 rounded-lg p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <TrendingUp className="h-5 w-5 text-green-400" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-green-800">
            Save up to 25% with annual plans
          </h3>
          <div className="mt-2 text-sm text-green-700">
            <div>Switch to annual billing and get:</div>
            <ul className="mt-1 ml-4 list-disc">
              <li>15% off Starter plans</li>
              <li>20% off Professional plans</li>
              <li>25% off Enterprise plans</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}