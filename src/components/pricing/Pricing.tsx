import React, { useState } from 'react';
import PricingCard from './PricingCard';
import AnnualSavingsAlert from './AnnualSavingsAlert';
import BillingToggle from './BillingToggle';
import ROICalculator from './ROICalculator';
import MigrationIncentive from './MigrationIncentive';

// Annual discount tiers based on plan
const annualDiscounts = {
  starter: 0.15, // 15% discount
  professional: 0.20, // 20% discount
  enterprise: 0.25, // 25% discount
};

const plans = [
  {
    title: 'Starter',
    monthlyPrice: 49,
    description: 'Perfect for small businesses and startups',
    features: [
      { text: '50 Documents per month', included: true },
      { text: 'Basic templates', included: true },
      { text: 'Email support', included: true },
      { text: 'API access', included: false },
      { text: 'Custom templates', included: false },
      { text: 'Advanced analytics', included: false },
    ],
    limits: {
      documents: 50,
      storage: '5GB',
      users: 5
    },
    discountTier: 'starter'
  },
  {
    title: 'Professional',
    monthlyPrice: 99,
    description: 'For growing businesses with advanced needs',
    features: [
      { text: 'Unlimited Documents', included: true },
      { text: 'All templates', included: true },
      { text: 'Priority support', included: true },
      { text: 'API access', included: true },
      { text: 'Custom templates', included: true },
      { text: 'Advanced analytics', included: false },
    ],
    popular: true,
    limits: {
      documents: 'Unlimited',
      storage: '25GB',
      users: 10
    },
    discountTier: 'professional'
  },
  {
    title: 'Enterprise',
    monthlyPrice: 299,
    description: 'Custom solutions for large organizations',
    features: [
      { text: 'Unlimited Everything', included: true },
      { text: 'Custom Template Development', included: true },
      { text: '24/7 Premium Support', included: true },
      { text: 'Dedicated Account Manager', included: true },
      { text: 'Custom Integration Development', included: true },
      { text: 'Advanced Security Features', included: true },
    ],
    limits: {
      documents: 'Unlimited',
      storage: 'Unlimited',
      users: 'Unlimited'
    },
    discountTier: 'enterprise'
  },
];

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true);
  const [calculatorData, setCalculatorData] = useState({
    currentPlan: 'monthly',
    documentsPerMonth: 50,
    hoursPerDocument: 2,
    hourlyRate: 150,
  });

  const calculateAnnualSavings = (plan) => {
    const monthlyPrice = plan.monthlyPrice;
    const annualDiscount = annualDiscounts[plan.discountTier];
    const annualPrice = monthlyPrice * 12 * (1 - annualDiscount);
    const monthlyCost = monthlyPrice * 12;
    return {
      annualSavings: monthlyCost - annualPrice,
      percentSavings: annualDiscount * 100,
      monthlyEquivalent: annualPrice / 12
    };
  };

  const calculateROI = () => {
    const currentCost = 
      calculatorData.documentsPerMonth * 
      calculatorData.hoursPerDocument * 
      calculatorData.hourlyRate;
    
    const annualCurrentCost = currentCost * 12;
    const planCost = calculatorData.currentPlan === 'monthly' 
      ? plans[1].monthlyPrice * 12 
      : plans[1].monthlyPrice * 12 * (1 - annualDiscounts.professional);
    
    return {
      annualSavings: annualCurrentCost - planCost,
      timesSaved: calculatorData.documentsPerMonth * calculatorData.hoursPerDocument * 0.75 * 12,
      roi: ((annualCurrentCost - planCost) / planCost * 100).toFixed(0)
    };
  };

  const savings = calculateROI();

  return (
    <div className="bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Choose the perfect plan for your business
          </p>
        </div>

        <AnnualSavingsAlert />
        <BillingToggle isAnnual={isAnnual} setIsAnnual={setIsAnnual} />

        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => {
            const annualSavings = calculateAnnualSavings(plan);
            return (
              <PricingCard
                key={plan.title}
                {...plan}
                price={isAnnual ? annualSavings.monthlyEquivalent.toFixed(0) : plan.monthlyPrice}
                annualSavings={isAnnual ? annualSavings : null}
                billing={isAnnual ? 'annually' : 'monthly'}
              />
            );
          })}
        </div>

        <ROICalculator
          calculatorData={calculatorData}
          setCalculatorData={setCalculatorData}
          savings={savings}
        />

        {!isAnnual && <MigrationIncentive setIsAnnual={setIsAnnual} />}
      </div>
    </div>
  );
}