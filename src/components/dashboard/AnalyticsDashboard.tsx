import React, { useState, useEffect } from 'react';
import {
  BarChart as BarChartIcon,
  PieChart as PieChartIcon,
  TrendingUp,
  Users,
  FileText,
  Clock,
  Download,
  Calendar,
  Filter,
  ChevronRight,
} from 'lucide-react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface AnalyticsData {
  documentsByType: {
    type: string;
    count: number;
    trend: number;
  }[];
  userActivity: {
    date: string;
    documents: number;
    templates: number;
  }[];
  topUsers: {
    name: string;
    documents: number;
    avatar: string;
  }[];
  metrics: {
    totalDocuments: number;
    activeUsers: number;
    averageTime: string;
    completionRate: number;
  };
}

const analyticsData: AnalyticsData = {
  documentsByType: [
    { type: 'Employment', count: 156, trend: 12 },
    { type: 'NDA', count: 98, trend: 8 },
    { type: 'Service', count: 67, trend: -3 },
    { type: 'Legal', count: 45, trend: 15 },
  ],
  userActivity: [
    { date: '2024-03-15', documents: 24, templates: 3 },
    { date: '2024-03-14', documents: 18, templates: 2 },
    { date: '2024-03-13', documents: 22, templates: 4 },
    { date: '2024-03-12', documents: 15, templates: 1 },
  ],
  topUsers: [
    {
      name: 'Sarah Wilson',
      documents: 45,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      name: 'Michael Chen',
      documents: 32,
      avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      name: 'Emma Thompson',
      documents: 28,
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  ],
  metrics: {
    totalDocuments: 366,
    activeUsers: 28,
    averageTime: '8m 45s',
    completionRate: 94.5,
  },
};

export default function AnalyticsDashboard() {
  const [dateRange, setDateRange] = useState('7d');
  const [chartData, setChartData] = useState<any>(null);
  const [pieData, setPieData] = useState<any>(null);

  useEffect(() => {
    // Prepare bar chart data
    const barData = {
      labels: analyticsData.userActivity.map(item => 
        new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      ),
      datasets: [
        {
          label: 'Documents',
          data: analyticsData.userActivity.map(item => item.documents),
          backgroundColor: 'rgba(99, 102, 241, 0.8)',
          borderColor: 'rgb(99, 102, 241)',
          borderWidth: 1,
        },
        {
          label: 'Templates',
          data: analyticsData.userActivity.map(item => item.templates),
          backgroundColor: 'rgba(99, 102, 241, 0.4)',
          borderColor: 'rgb(99, 102, 241)',
          borderWidth: 1,
        },
      ],
    };

    // Prepare pie chart data
    const pieData = {
      labels: analyticsData.documentsByType.map(item => item.type),
      datasets: [
        {
          data: analyticsData.documentsByType.map(item => item.count),
          backgroundColor: [
            'rgba(99, 102, 241, 0.8)',
            'rgba(99, 102, 241, 0.6)',
            'rgba(99, 102, 241, 0.4)',
            'rgba(99, 102, 241, 0.2)',
          ],
          borderColor: 'white',
          borderWidth: 2,
        },
      ],
    };

    setChartData(barData);
    setPieData(pieData);
  }, [dateRange]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium text-gray-900">Analytics Dashboard</h2>
            <p className="mt-1 text-sm text-gray-500">
              Track your document generation metrics and user activity
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <Download className="h-5 w-5 mr-2 text-gray-500" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 bg-indigo-100 rounded-lg">
              <FileText className="h-6 w-6 text-indigo-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Documents</p>
              <p className="text-2xl font-semibold text-gray-900">
                {analyticsData.metrics.totalDocuments}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Active Users</p>
              <p className="text-2xl font-semibold text-gray-900">
                {analyticsData.metrics.activeUsers}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Average Time</p>
              <p className="text-2xl font-semibold text-gray-900">
                {analyticsData.metrics.averageTime}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Completion Rate</p>
              <p className="text-2xl font-semibold text-gray-900">
                {analyticsData.metrics.completionRate}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Document Types Distribution */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-6">Documents by Type</h3>
          <div className="h-64">
            {pieData && <Pie data={pieData} options={chartOptions} />}
          </div>
          <div className="mt-6 space-y-4">
            {analyticsData.documentsByType.map((type) => (
              <div key={type.type} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-indigo-600 mr-2" />
                  <span className="text-sm text-gray-600">{type.type}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-900 mr-2">
                    {type.count}
                  </span>
                  <span
                    className={`text-xs ${
                      type.trend > 0 ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {type.trend > 0 ? '+' : ''}
                    {type.trend}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* User Activity */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-6">User Activity</h3>
          <div className="h-64">
            {chartData && <Bar data={chartData} options={chartOptions} />}
          </div>
        </div>
      </div>

      {/* Top Users */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Top Users</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {analyticsData.topUsers.map((user, index) => (
            <div key={user.name} className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-900 w-8">
                    #{index + 1}
                  </span>
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-8 w-8 rounded-full"
                  />
                  <span className="ml-3 text-sm font-medium text-gray-900">
                    {user.name}
                  </span>
                </div>
                <div className="flex items-center">
                  <FileText className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-500">{user.documents} documents</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}