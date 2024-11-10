import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { UserPlus, Building, Briefcase, ChevronRight } from 'lucide-react';

const signupSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  company: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(8, 'Must be at least 8 characters')
    .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Must contain at least one number')
    .required('Required'),
  companySize: Yup.string().required('Required'),
  industry: Yup.string().required('Required'),
});

const industries = [
  'Technology',
  'Legal Services',
  'Healthcare',
  'Finance',
  'Manufacturing',
  'Retail',
  'Other',
];

const companySizes = [
  '1-10 employees',
  '11-50 employees',
  '51-200 employees',
  '201-1000 employees',
  '1000+ employees',
];

const benefits = [
  {
    title: 'Instant Setup',
    description: 'Get started immediately after signup',
    icon: ChevronRight,
  },
  {
    title: 'Free Templates',
    description: 'Access to basic document templates',
    icon: Briefcase,
  },
  {
    title: 'Guided Tour',
    description: 'Interactive walkthrough of features',
    icon: UserPlus,
  },
];

export default function SignupForm() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              {step === 1 ? 'Create your account' : 'Tell us about your company'}
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              {step === 1
                ? 'Start generating legal documents in minutes'
                : 'Help us customize your experience'}
            </p>
          </div>

          <div className="flex justify-center space-x-4 mb-8">
            <div
              className={`w-3 h-3 rounded-full ${
                step === 1 ? 'bg-indigo-600' : 'bg-indigo-200'
              }`}
            />
            <div
              className={`w-3 h-3 rounded-full ${
                step === 2 ? 'bg-indigo-600' : 'bg-indigo-200'
              }`}
            />
          </div>

          <Formik
            initialValues={{
              name: '',
              email: '',
              password: '',
              company: '',
              companySize: '',
              industry: '',
            }}
            validationSchema={signupSchema}
            onSubmit={(values, { setSubmitting }) => {
              if (step === 1) {
                setStep(2);
                setSubmitting(false);
              } else {
                // TODO: Implement actual signup logic
                console.log(values);
                setSubmitting(false);
                navigate('/dashboard');
              }
            }}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form className="mt-8 space-y-6">
                {step === 1 ? (
                  <>
                    <div className="rounded-md shadow-sm -space-y-px">
                      <div>
                        <Field
                          name="name"
                          type="text"
                          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                          placeholder="Full name"
                        />
                        {errors.name && touched.name && (
                          <div className="text-red-500 text-xs mt-1">{errors.name}</div>
                        )}
                      </div>
                      <div>
                        <Field
                          name="email"
                          type="email"
                          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                          placeholder="Email address"
                        />
                        {errors.email && touched.email && (
                          <div className="text-red-500 text-xs mt-1">{errors.email}</div>
                        )}
                      </div>
                      <div>
                        <Field
                          name="password"
                          type="password"
                          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                          placeholder="Password"
                        />
                        {errors.password && touched.password && (
                          <div className="text-red-500 text-xs mt-1">{errors.password}</div>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="rounded-md shadow-sm -space-y-px">
                      <div>
                        <Field
                          name="company"
                          type="text"
                          className="appearance-none rounded-t-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                          placeholder="Company name"
                        />
                        {errors.company && touched.company && (
                          <div className="text-red-500 text-xs mt-1">{errors.company}</div>
                        )}
                      </div>
                      <div>
                        <Field
                          as="select"
                          name="industry"
                          className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        >
                          <option value="">Select Industry</option>
                          {industries.map((industry) => (
                            <option key={industry} value={industry}>
                              {industry}
                            </option>
                          ))}
                        </Field>
                        {errors.industry && touched.industry && (
                          <div className="text-red-500 text-xs mt-1">{errors.industry}</div>
                        )}
                      </div>
                      <div>
                        <Field
                          as="select"
                          name="companySize"
                          className="appearance-none rounded-b-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        >
                          <option value="">Select Company Size</option>
                          {companySizes.map((size) => (
                            <option key={size} value={size}>
                              {size}
                            </option>
                          ))}
                        </Field>
                        {errors.companySize && touched.companySize && (
                          <div className="text-red-500 text-xs mt-1">{errors.companySize}</div>
                        )}
                      </div>
                    </div>
                  </>
                )}

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                      {step === 1 ? (
                        <ChevronRight className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" />
                      ) : (
                        <UserPlus className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" />
                      )}
                    </span>
                    {step === 1 ? 'Continue' : 'Complete Signup'}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      {/* Right side - Benefits */}
      <div className="hidden lg:flex lg:flex-1 bg-indigo-700">
        <div className="flex flex-col justify-center px-12 py-12">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Start Creating Legal Documents Today
            </h2>
            <p className="text-indigo-200">
              Join thousands of businesses who trust LegalDocs for their document needs
            </p>
          </div>

          <div className="space-y-8">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="p-3 bg-indigo-800 rounded-lg">
                    <benefit.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">{benefit.title}</h3>
                  <p className="mt-1 text-indigo-200">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <div className="flex items-center space-x-4">
              <div className="flex -space-x-2">
                <img
                  className="w-10 h-10 rounded-full border-2 border-white"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
                <img
                  className="w-10 h-10 rounded-full border-2 border-white"
                  src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
                <img
                  className="w-10 h-10 rounded-full border-2 border-white"
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
              </div>
              <div className="text-indigo-200">
                <p>Joined by 10,000+ companies</p>
                <div className="flex items-center mt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="h-5 w-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 15.934L4.618 19.247l1.03-6.987-5.412-5.27 7.485-1.09L10 0l2.279 5.9 7.485 1.09-5.412 5.27 1.03 6.987L10 15.934z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}