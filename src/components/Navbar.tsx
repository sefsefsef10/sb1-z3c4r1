import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Menu, X, HelpCircle } from 'lucide-react';
import type { RootState } from '../store';

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-indigo-600">LegalDocs</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/features" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md">
              Features
            </Link>
            <Link to="/pricing" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md">
              Pricing
            </Link>
            <Link to="/help" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md">
              <HelpCircle className="h-5 w-5" />
            </Link>
            {user ? (
              <Link
                to="/dashboard"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-indigo-600 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/features"
              className="block text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Features
            </Link>
            <Link
              to="/pricing"
              className="block text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Pricing
            </Link>
            <Link
              to="/help"
              className="block text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Help Center
            </Link>
            {user ? (
              <Link
                to="/dashboard"
                className="block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                  onClick={() => setIsOpen(false)}
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}