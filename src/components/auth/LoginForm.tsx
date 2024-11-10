import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {
  LogIn,
  Github,
  Mail,
  Lock,
  EyeOff,
  Eye,
  AlertCircle,
  ArrowRight,
} from 'lucide-react';

const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().required('Password is required'),
  rememberMe: Yup.boolean(),
});

export default function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [showResetForm, setShowResetForm] = useState(false);

  const handleSocialLogin = (provider: string) => {
    // TODO: Implement social login
    console.log(`Login with ${provider}`);
  };

  const handlePasswordReset = (email: string) => {
    // TODO: Implement password reset
    console.log(`Reset password for ${email}`);
    setShowResetForm(false);
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Welcome back
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Sign in to access your documents
            </p>
          </div>

          {!showResetForm ? (
            <>
              {/* Social Login */}
              <div className="flex flex-col space-y-3">
                <button
                  onClick={() => handleSocialLogin('google')}
                  className="group relative w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <svg className="h-5 w-5 text-gray-500" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                      />
                    </svg>
                  </span>
                  Continue with Google
                </button>

                <button
                  onClick={() => handleSocialLogin('github')}
                  className="group relative w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <Github className="h-5 w-5 text-gray-500" />
                  </span>
                  Continue with GitHub
                </button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-50 text-gray-500">Or continue with</span>
                </div>
              </div>

              {/* Email Login Form */}
              <Formik
                initialValues={{ email: '', password: '', rememberMe: false }}
                validationSchema={loginSchema}
                onSubmit={(values, { setSubmitting }) => {
                  // TODO: Implement actual login logic
                  console.log(values);
                  setSubmitting(false);
                  navigate('/dashboard');
                }}
              >
                {({ errors, touched, isSubmitting }) => (
                  <Form className="mt-8 space-y-6">
                    <div className="rounded-md shadow-sm -space-y-px">
                      <div className="relative">
                        <Field
                          name="email"
                          type="email"
                          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm pl-10"
                          placeholder="Email address"
                        />
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        {errors.email && touched.email && (
                          <div className="absolute right-0 pr-3 top-1/2 transform -translate-y-1/2">
                            <AlertCircle className="h-5 w-5 text-red-500" />
                          </div>
                        )}
                      </div>
                      <div className="relative">
                        <Field
                          name="password"
                          type={showPassword ? 'text' : 'password'}
                          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm pl-10"
                          placeholder="Password"
                        />
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5 text-gray-400" />
                          ) : (
                            <Eye className="h-5 w-5 text-gray-400" />
                          )}
                        </button>
                      </div>
                    </div>

                    {(errors.email && touched.email) || (errors.password && touched.password) ? (
                      <div className="text-sm text-red-600">
                        {errors.email || errors.password}
                      </div>
                    ) : null}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Field
                          type="checkbox"
                          name="rememberMe"
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label
                          htmlFor="remember-me"
                          className="ml-2 block text-sm text-gray-900"
                        >
                          Remember me
                        </label>
                      </div>

                      <button
                        type="button"
                        onClick={() => setShowResetForm(true)}
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Forgot your password?
                      </button>
                    </div>

                    <div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                          <LogIn className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" />
                        </span>
                        {isSubmitting ? 'Signing in...' : 'Sign in'}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>

              <p className="mt-2 text-center text-sm text-gray-600">
                Don't have an account?{' '}
                <Link
                  to="/signup"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Sign up now
                </Link>
              </p>
            </>
          ) : (
            /* Password Reset Form */
            <div className="mt-8 space-y-6">
              <div className="rounded-md shadow-sm -space-y-px">
                <div className="relative">
                  <input
                    type="email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm pl-10"
                    placeholder="Enter your email address"
                  />
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
              </div>

              <div>
                <button
                  onClick={() => handlePasswordReset(resetEmail)}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <ArrowRight className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" />
                  </span>
                  Reset Password
                </button>
              </div>

              <button
                onClick={() => setShowResetForm(false)}
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                Back to login
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Right side - Benefits */}
      <div className="hidden lg:flex lg:flex-1 bg-indigo-700">
        <div className="flex flex-col justify-center px-12 py-12">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Welcome to LegalDocs
            </h2>
            <p className="text-indigo-200">
              Access your legal documents securely from anywhere
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-indigo-800 rounded-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">Secure Access</h3>
                <p className="mt-1 text-indigo-200">
                  Enterprise-grade security for your documents
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="p-3 bg-indigo-800 rounded-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">Team Collaboration</h3>
                <p className="mt-1 text-indigo-200">
                  Work together seamlessly with your team
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="p-3 bg-indigo-800 rounded-lg">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">24/7 Access</h3>
                <p className="mt-1 text-indigo-200">
                  Access your documents anytime, anywhere
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}