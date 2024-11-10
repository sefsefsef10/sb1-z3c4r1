import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Navbar from './components/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/Hero';
import Features from './components/features/Features';
import Pricing from './components/pricing/Pricing';
import LoginForm from './components/auth/LoginForm';
import SignupForm from './components/auth/SignupForm';
import DashboardLayout from './components/dashboard/DashboardLayout';
import DashboardHome from './components/dashboard/DashboardHome';
import DocumentGenerator from './components/dashboard/DocumentGenerator';
import DocumentHistory from './components/dashboard/DocumentHistory';
import EnterpriseLanding from './components/enterprise/EnterpriseLanding';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Routes>
            {/* Public routes */}
            <Route
              path="/"
              element={
                <>
                  <Navbar />
                  <main className="flex-grow">
                    <Hero />
                    <Features />
                    <Pricing />
                  </main>
                  <Footer />
                </>
              }
            />
            <Route
              path="/features"
              element={
                <>
                  <Navbar />
                  <main className="flex-grow">
                    <Features />
                  </main>
                  <Footer />
                </>
              }
            />
            <Route
              path="/pricing"
              element={
                <>
                  <Navbar />
                  <main className="flex-grow">
                    <Pricing />
                  </main>
                  <Footer />
                </>
              }
            />
            <Route
              path="/enterprise"
              element={
                <>
                  <Navbar />
                  <main className="flex-grow">
                    <EnterpriseLanding />
                  </main>
                  <Footer />
                </>
              }
            />
            <Route
              path="/login"
              element={
                <>
                  <Navbar />
                  <main className="flex-grow">
                    <LoginForm />
                  </main>
                  <Footer />
                </>
              }
            />
            <Route
              path="/signup"
              element={
                <>
                  <Navbar />
                  <main className="flex-grow">
                    <SignupForm />
                  </main>
                  <Footer />
                </>
              }
            />

            {/* Dashboard routes */}
            <Route
              path="/dashboard"
              element={
                <DashboardLayout currentPage="dashboard">
                  <DashboardHome />
                </DashboardLayout>
              }
            />
            <Route
              path="/dashboard/generate"
              element={
                <DashboardLayout currentPage="generate">
                  <DocumentGenerator />
                </DashboardLayout>
              }
            />
            <Route
              path="/dashboard/history"
              element={
                <DashboardLayout currentPage="history">
                  <DocumentHistory />
                </DashboardLayout>
              }
            />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;