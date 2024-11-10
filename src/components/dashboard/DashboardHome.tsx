import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  FileText,
  Clock,
  AlertCircle,
  TrendingUp,
  CheckCircle,
  XCircle,
  BarChart,
  Users,
  Lock,
  Zap,
  Crown,
  ArrowRight,
} from 'lucide-react';
import type { RootState } from '../../store';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    positive: boolean;
  };
  description?: string;
  limit?: {
    current: number;
    max: number;
  };
}

const StatCard = ({ title, value, icon, trend, description, limit }: StatCardProps) => (
  <div className="bg-white rounded-lg shadow p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-semibold text-gray-900 mt-1">{value}</p>
        {trend && (
          <div className="flex items-center mt-2">
            {trend.positive ? (
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            ) : (
              <TrendingUp className="w-4 h-4 text-red-500 mr-1 transform rotate-180" />
            )}
            <span
              className={`text-sm font-medium ${
                trend.positive ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {trend.value}%
            </span>
          </div>
        )}
        {description && (
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        )}
        {limit && (
          <div className="mt-2">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>{limit.current} of {limit.max} used</span>
              <span>{Math.round((limit.current / limit.max) * 100)}%</span>
            </div>
            <div className="mt-1 h-2 bg-gray-200 rounded-full">
              <div
                className={`h-2 rounded-full ${
                  (limit.current / limit.max) > 0.9
                    ? 'bg-red-500'
                    : (limit.current / limit.max) > 0.7
                    ? 'bg-yellow-500'
                    : 'bg-green-500'
                }`}
                style={{ width: `${Math.min((limit.current / limit.max) * 100, 100)}%` }}
              />
            </div>
          </div>
        )}
      </div>
      <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
        {icon}
      </div>
    </div>
  </div>
);

interface ActivityItem {
  id: string;
  type: 'document' | 'template' | 'error' | 'team';
  title: string;
  timestamp: string;
  status: 'completed' | 'failed' | 'pending';
  user?: string;
  details?: string;
}

const RecentActivity = ({ activity }: { activity: ActivityItem }) => (
  <div className="flex items-center space-x-4 py-3">
    <div
      className={`w-8 h-8 rounded-lg flex items-center justify-center ${
        activity.type === 'document'
          ? 'bg-blue-100'
          : activity.type === 'template'
          ? 'bg-green-100'
          : activity.type === 'team'
          ? 'bg-purple-100'
          : 'bg-red-100'
      }`}
    >
      {activity.type === 'document' ? (
        <FileText className="w-4 h-4 text-blue-600" />
      ) : activity.type === 'template' ? (
        <FileText className="w-4 h-4 text-green-600" />
      ) : activity.type === 'team' ? (
        <Users className="w-4 h-4 text-purple-600" />
      ) : (
        <AlertCircle className="w-4 h-4 text-red-600" />
      )}
    </div>
    <div className="flex-1">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-900">{activity.title}</p>
        <p className="text-xs text-gray-500">{activity.timestamp}</p>
      </div>
      {activity.user && (
        <p className="text-xs text-gray-500">by {activity.user}</p>
      )}
      {activity.details && (
        <p className="text-xs text-gray-500 mt-1">{activity.details}</p>
      )}
    </div>
    <div>
      {activity.status === 'completed' ? (
        <CheckCircle className="w-5 h-5 text-green-500" />
      ) : activity.status === 'failed' ? (
        <XCircle className="w-5 h-5 text-red-500" />
      ) : (
        <Clock className="w-5 h-5 text-yellow-500" />
      )}
    </div>
  </div>
);

export default function DashboardHome() {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);

  const recentActivity: ActivityItem[] = [
    {
      id: '1',
      type: 'document',
      title: 'Employment Agreement generated',
      timestamp: '2 minutes ago',
      status: 'completed',
      user: 'Sarah Wilson',
      details: 'Generated for TechCorp Inc.',
    },
    {
      id: '2',
      type: 'team',
      title: 'New team member joined',
      timestamp: '1 hour ago',
      status: 'completed',
      user: 'Mike Johnson',
      details: 'Added to Legal Team',
    },
    {
      id: '3',
      type: 'error',
      title: 'Document generation failed',
      timestamp: '2 hours ago',
      status: 'failed',
      user: 'Alex Chen',
      details: 'Invalid input data format',
    },
  ];

  const quickActions = [
    {
      title: 'Generate Document',
      icon: FileText,
      path: '/dashboard/generate',
      primary: true,
    },
    {
      title: 'Invite Team Member',
      icon: Users,
      path: '/dashboard/team',
      premium: true,
    },
    {
      title: 'View Analytics',
      icon: BarChart,
      path: '/dashboard/analytics',
      premium: true,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section with Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
            <p className="mt-1 text-sm text-gray-600">
              Here's what's happening with your documents
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {quickActions.map((action) => (
              <button
                key={action.title}
                onClick={() => navigate(action.path)}
                className={`inline-flex items-center px-4 py-2 rounded-md text-sm font-medium ${
                  action.premium && user?.role !== 'premium'
                    ? 'bg-gray-100 text-gray-700'
                    : action.primary
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                <action.icon className="h-5 w-5 mr-2" />
                {action.title}
                {action.premium && user?.role !== 'premium' && (
                  <Lock className="h-4 w-4 ml-2" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Usage Limits Alert */}
      {user?.role !== 'premium' && (
        <div className="bg-indigo-50 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <Crown className="h-5 w-5 text-indigo-600" />
            </div>
            <div className="ml-3 flex-1 md:flex md:justify-between">
              <p className="text-sm text-indigo-700">
                You've used 80% of your monthly document limit. Upgrade to Premium for unlimited documents.
              </p>
              <p className="mt-3 text-sm md:mt-0 md:ml-6">
                <button
                  onClick={() => navigate('/pricing')}
                  className="whitespace-nowrap font-medium text-indigo-700 hover:text-indigo-600"
                >
                  Upgrade now <span aria-hidden="true">&rarr;</span>
                </button>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Documents Generated"
          value="156"
          icon={<FileText className="w-6 h-6 text-indigo-600" />}
          trend={{ value: 12, positive: true }}
          limit={user?.role !== 'premium' ? { current: 156, max: 200 } : undefined}
        />
        <StatCard
          title="Team Members"
          value="8"
          icon={<Users className="w-6 h-6 text-indigo-600" />}
          description={user?.role !== 'premium' ? "2 seats remaining" : undefined}
          limit={user?.role !== 'premium' ? { current: 8, max: 10 } : undefined}
        />
        <StatCard
          title="Storage Used"
          value="2.4 GB"
          icon={<BarChart className="w-6 h-6 text-indigo-600" />}
          trend={{ value: 5, positive: false }}
          limit={user?.role !== 'premium' ? { current: 2.4, max: 5 } : undefined}
        />
        <StatCard
          title="Time Saved"
          value="45h"
          icon={<Clock className="w-6 h-6 text-indigo-600" />}
          trend={{ value: 15, positive: true }}
          description="This month"
        />
      </div>

      {/* Premium Features Showcase */}
      {user?.role !== 'premium' && (
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
          <h2 className="text-lg font-semibold mb-4">Unlock Premium Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start space-x-3">
              <Zap className="h-6 w-6 text-yellow-400" />
              <div>
                <h3 className="font-medium">Unlimited Documents</h3>
                <p className="text-sm text-indigo-100">Generate as many documents as you need</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Users className="h-6 w-6 text-yellow-400" />
              <div>
                <h3 className="font-medium">Team Collaboration</h3>
                <p className="text-sm text-indigo-100">Add unlimited team members</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <BarChart className="h-6 w-6 text-yellow-400" />
              <div>
                <h3 className="font-medium">Advanced Analytics</h3>
                <p className="text-sm text-indigo-100">Get detailed usage insights</p>
              </div>
            </div>
          </div>
          <button
            onClick={() => navigate('/pricing')}
            className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
          >
            Upgrade to Premium
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </div>
      )}

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
            <button className="text-sm text-indigo-600 hover:text-indigo-900">View all</button>
          </div>
        </div>
        <div className="p-6 space-y-3">
          {recentActivity.map((activity) => (
            <RecentActivity key={activity.id} activity={activity} />
          ))}
        </div>
      </div>
    </div>
  );
}