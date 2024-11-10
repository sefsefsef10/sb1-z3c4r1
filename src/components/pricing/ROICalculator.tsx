import React from 'react';
import { Calculator } from 'lucide-react';

interface ROICalculatorProps {
  calculatorData: {
    currentPlan: string;
    documentsPerMonth: number;
    hoursPerDocument: number;
    hourlyRate: number;
  };
  setCalculatorData: (data: any) => void;
  savings: {
    annualSavings: number;
    timesSaved: number;
    roi: string;
  };
}

export default function ROICalculator({ calculatorData, setCalculatorData, savings }: ROICalculatorProps) {
  return (
    <div className="mt-16 bg-white rounded-lg shadow-lg p-8">
      <div className="flex items-center space-x-4 mb-6">
        <div className="p-3 bg-indigo-100 rounded-lg">
          <Calculator className="h-6 w-6 text-indigo-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">ROI Calculator</h3>
          <p className="text-sm text-gray-500">See how much you can save with annual billing</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Current Billing
          </label>
          <select
            value={calculatorData.currentPlan}
            onChange={(e) => setCalculatorData({
              ...calculatorData,
              currentPlan: e.target.value
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="monthly">Monthly Billing</option>
            <option value="annual">Annual Billing</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Documents per month
          </label>
          <input
            type="number"
            value={calculatorData.documentsPerMonth}
            onChange={(e) => setCalculatorData({
              ...calculatorData,
              documentsPerMonth: parseInt(e.target.value)
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Hours per document
          </label>
          <input
            type="number"
            value={calculatorData.hoursPerDocument}
            onChange={(e) => setCalculatorData({
              ...calculatorData,
              hoursPerDocument: parseInt(e.target.value)
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Hourly rate ($)
          </label>
          <input
            type="number"
            value={calculatorData.hourlyRate}
            onChange={(e) => setCalculatorData({
              ...calculatorData,
              hourlyRate: parseInt(e.target.value)
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 bg-green-50 rounded-lg">
          <h4 className="font-medium text-green-900">Annual Savings</h4>
          <p className="text-3xl font-bold text-green-600">
            ${savings.annualSavings.toLocaleString()}
          </p>
          {calculatorData.currentPlan === 'monthly' && (
            <p className="mt-1 text-sm text-green-600">
              Switch to annual billing to save more
            </p>
          )}
        </div>
        <div className="p-4 bg-indigo-50 rounded-lg">
          <h4 className="font-medium text-indigo-900">Hours Saved</h4>
          <p className="text-3xl font-bold text-indigo-600">
            {savings.timesSaved.toLocaleString()}h
          </p>
        </div>
        <div className="p-4 bg-purple-50 rounded-lg">
          <h4 className="font-medium text-purple-900">ROI</h4>
          <p className="text-3xl font-bold text-purple-600">
            {savings.roi}x
          </p>
        </div>
      </div>
    </div>
  );
}