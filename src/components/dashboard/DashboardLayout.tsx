import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  LayoutDashboard,
  FileText,
  Settings,
  LogOut,
  Files,
  History,
  BarChart,
  Link as LinkIcon,
} from 'lucide-react';
import type { RootState } from '../../store';
import UpgradePrompt from '../upsell/UpgradePrompt';
import { useUpgradePrompts } from '../../hooks/useUpgradePrompts';

interface SidebarLinkProps {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  onClick: () => void;
  premium?: boolean;
}

const SidebarLink = ({ icon, text, active, onClick, premium }: SidebarLinkProps) => (
  <button
    onClick={onClick}
    className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition-colors ${
      active
        ? 'bg-indigo-50 text-indigo-600'
        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
    }`}
  >
    {icon}
    <span className="font-medium">{text}</span>
    {premium && (
      <span className="ml-auto inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800">
        Premium
      </span>
    )}
  </button>
);

interface DashboardLayoutProps {
  children: React.ReactNode;
  currentPage: string;
}

export default function DashboardLayout({ children, currentPage }: DashboardLayoutProps) {
  const navigate = useNavigate();
  const { showPrompt, promptType, metric, setShowPrompt } = useUpgradePrompts();
  const user = useSelector((state: RootState) => state.auth.user);

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="h-full flex flex-col">
          <div className="p-4">
            <h2 className="text-2xl font-bold text-indigo-600">LegalDocs</h2>
          </div>
          <nav className="flex-1 p-4 space-y-2">
            <SidebarLink
              icon={<LayoutDashboard size={20} />}
              text="Dashboard"
              active={currentPage === 'dashboard'}
              onClick={() => navigate('/dashboard')}
            />
            <SidebarLink
              icon={<FileText size={20} />}
              text="Generate"
              active={currentPage === 'generate'}
              onClick={() => navigate('/dashboard/generate')}
            />
            <SidebarLink
              icon={<Files size={20} />}
              text="Templates"
              active={currentPage === 'templates'}
              onClick={() => navigate('/dashboard/templates')}
            />
            <SidebarLink
              icon={<History size={20} />}
              text="History"
              active={currentPage === 'history'}
              onClick={() => navigate('/dashboard/history')}
            />
            <SidebarLink
              icon={<BarChart size={20} />}
              text="Analytics"
              active={currentPage === 'analytics'}
              onClick={() => navigate('/dashboard/analytics')}
              premium={user.role !== 'premium'}
            />
            <SidebarLink
              icon={<LinkIcon size={20} />}
              text="Integrations"
              active={currentPage === 'integrations'}
              onClick={() => navigate('/dashboard/integrations')}
              premium={user.role !== 'premium'}
            />
            <SidebarLink
              icon={<Settings size={20} />}
              text="Settings"
              active={currentPage === 'settings'}
              onClick={() => navigate('/dashboard/settings')}
            />
          </nav>
          <div className="p-4 border-t">
            <SidebarLink
              icon={<LogOut size={20} />}
              text="Logout"
              onClick={() => {
                // TODO: Implement logout logic
                navigate('/login');
              }}
            />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {showPrompt && (
            <div className="mb-6">
              <UpgradePrompt
                type={promptType}
                metric={metric}
                onClose={() => setShowPrompt(false)}
              />
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}