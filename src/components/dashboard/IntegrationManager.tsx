import React, { useState } from 'react';
import {
  Webhook,
  Link,
  Code,
  Cloud,
  Database,
  Settings,
  Copy,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  BarChart,
  TrendingUp,
  Clock,
  Activity,
  Key,
} from 'lucide-react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Integration {
  id: string;
  name: string;
  type: 'crm' | 'storage' | 'webhook';
  status: 'active' | 'inactive' | 'error';
  description: string;
  lastSync?: string;
  icon: React.ReactNode;
}

interface WebhookType {
  id: string;
  url: string;
  events: string[];
  status: 'active' | 'inactive';
  lastTriggered?: string;
  successRate: number;
}

const integrations: Integration[] = [
  {
    id: '1',
    name: 'Salesforce CRM',
    type: 'crm',
    status: 'active',
    description: 'Sync contacts and documents with Salesforce',
    lastSync: '2024-03-15T10:00:00',
    icon: <Database className="h-6 w-6 text-blue-600" />,
  },
  {
    id: '2',
    name: 'Google Drive',
    type: 'storage',
    status: 'active',
    description: 'Store and sync documents with Google Drive',
    lastSync: '2024-03-15T09:30:00',
    icon: <Cloud className="h-6 w-6 text-green-600" />,
  },
  {
    id: '3',
    name: 'Slack Notifications',
    type: 'webhook',
    status: 'error',
    description: 'Send notifications to Slack channels',
    lastSync: '2024-03-14T15:00:00',
    icon: <Webhook className="h-6 w-6 text-purple-600" />,
  },
];

const webhooks: WebhookType[] = [
  {
    id: '1',
    url: 'https://api.example.com/webhook1',
    events: ['document.created', 'document.updated'],
    status: 'active',
    lastTriggered: '2024-03-15T10:30:00',
    successRate: 98.5,
  },
  {
    id: '2',
    url: 'https://api.example.com/webhook2',
    events: ['template.created'],
    status: 'inactive',
    lastTriggered: '2024-03-14T15:45:00',
    successRate: 100,
  },
];

const apiKey = 'sk_test_123456789';

interface ApiMetrics {
  requests: {
    date: string;
    total: number;
    success: number;
    error: number;
  }[];
  endpoints: {
    path: string;
    calls: number;
    avgLatency: number;
    errorRate: number;
  }[];
  summary: {
    totalRequests: number;
    avgLatency: string;
    errorRate: number;
    activeKeys: number;
  };
}

const apiMetrics: ApiMetrics = {
  requests: [
    { date: '2024-03-15', total: 1250, success: 1200, error: 50 },
    { date: '2024-03-14', total: 980, success: 950, error: 30 },
    { date: '2024-03-13', total: 1100, success: 1080, error: 20 },
    { date: '2024-03-12', total: 890, success: 870, error: 20 },
    { date: '2024-03-11', total: 1300, success: 1250, error: 50 },
    { date: '2024-03-10', total: 950, success: 920, error: 30 },
    { date: '2024-03-09', total: 1050, success: 1020, error: 30 },
  ],
  endpoints: [
    { path: '/api/documents', calls: 5600, avgLatency: 245, errorRate: 1.2 },
    { path: '/api/templates', calls: 3200, avgLatency: 180, errorRate: 0.8 },
    { path: '/api/users', calls: 2100, avgLatency: 150, errorRate: 0.5 },
    { path: '/api/analytics', calls: 1800, avgLatency: 200, errorRate: 1.5 },
  ],
  summary: {
    totalRequests: 12700,
    avgLatency: '195ms',
    errorRate: 1.1,
    activeKeys: 8,
  },
};

export default function IntegrationManager() {
  const [showApiKey, setShowApiKey] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'integrations' | 'webhooks' | 'api'>('integrations');
  const [apiTimeRange, setApiTimeRange] = useState('7d');

  const copyApiKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Prepare chart data
  const requestsChartData = {
    labels: apiMetrics.requests.map(r => new Date(r.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Total Requests',
        data: apiMetrics.requests.map(r => r.total),
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.5)',
        tension: 0.4,
      },
      {
        label: 'Errors',
        data: apiMetrics.requests.map(r => r.error),
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.5)',
        tension: 0.4,
      },
    ],
  };

  const endpointChartData = {
    labels: apiMetrics.endpoints.map(e => e.path),
    datasets: [
      {
        label: 'API Calls',
        data: apiMetrics.endpoints.map(e => e.calls),
        backgroundColor: 'rgba(99, 102, 241, 0.8)',
      },
    ],
  };

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
            <h2 className="text-lg font-medium text-gray-900">Integrations & API</h2>
            <p className="mt-1 text-sm text-gray-500">
              Manage your integrations, webhooks, and API access
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('integrations')}
              className={`py-4 px-6 border-b-2 font-medium text-sm ${
                activeTab === 'integrations'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Integrations
            </button>
            <button
              onClick={() => setActiveTab('webhooks')}
              className={`py-4 px-6 border-b-2 font-medium text-sm ${
                activeTab === 'webhooks'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Webhooks
            </button>
            <button
              onClick={() => setActiveTab('api')}
              className={`py-4 px-6 border-b-2 font-medium text-sm ${
                activeTab === 'api'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              API Access
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'integrations' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {integrations.map((integration) => (
                  <div
                    key={integration.id}
                    className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          {integration.icon}
                        </div>
                        <div className="ml-3">
                          <h3 className="text-lg font-medium text-gray-900">
                            {integration.name}
                          </h3>
                          <p className="text-sm text-gray-500">{integration.type}</p>
                        </div>
                      </div>
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          integration.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : integration.status === 'inactive'
                            ? 'bg-gray-100 text-gray-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {integration.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">{integration.description}</p>
                    {integration.lastSync && (
                      <div className="flex items-center text-sm text-gray-500">
                        <RefreshCw className="h-4 w-4 mr-1" />
                        Last synced: {new Date(integration.lastSync).toLocaleString()}
                      </div>
                    )}
                    <div className="mt-4 flex justify-end">
                      <button className="text-sm text-indigo-600 hover:text-indigo-900">
                        Configure
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'webhooks' && (
            <div className="space-y-6">
              <div className="flex justify-end">
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
                  <Webhook className="h-5 w-5 mr-2" />
                  Add Webhook
                </button>
              </div>

              <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                  {webhooks.map((webhook) => (
                    <li key={webhook.id}>
                      <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center">
                              <code className="text-sm font-mono text-gray-600">
                                {webhook.url}
                              </code>
                              <span
                                className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  webhook.status === 'active'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-gray-100 text-gray-800'
                                }`}
                              >
                                {webhook.status}
                              </span>
                            </div>
                            <div className="mt-2">
                              <div className="flex items-center text-sm text-gray-500">
                                <div className="flex space-x-2">
                                  {webhook.events.map((event) => (
                                    <span
                                      key={event}
                                      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800"
                                    >
                                      {event}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="text-sm text-gray-500">
                              Success Rate: {webhook.successRate}%
                            </div>
                            <button className="text-indigo-600 hover:text-indigo-900">
                              <Settings className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'api' && (
            <div className="space-y-6">
              {/* API Key Section */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">API Key</h3>
                  <button
                    onClick={copyApiKey}
                    className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    {copied ? (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <input
                      type={showApiKey ? 'text' : 'password'}
                      value={apiKey}
                      readOnly
                      className="block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <button
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    {showApiKey ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              {/* API Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className="p-3 bg-indigo-100 rounded-lg">
                      <Activity className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">Total Requests</p>
                      <p className="text-2xl font-semibold text-gray-900">
                        {apiMetrics.summary.totalRequests.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <Clock className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">Avg. Latency</p>
                      <p className="text-2xl font-semibold text-gray-900">
                        {apiMetrics.summary.avgLatency}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className="p-3 bg-red-100 rounded-lg">
                      <AlertCircle className="h-6 w-6 text-red-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">Error Rate</p>
                      <p className="text-2xl font-semibold text-gray-900">
                        {apiMetrics.summary.errorRate}%
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className="p-3 bg-yellow-100 rounded-lg">
                      <Key className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">Active Keys</p>
                      <p className="text-2xl font-semibold text-gray-900">
                        {apiMetrics.summary.activeKeys}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* API Usage Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-medium text-gray-900">Request Volume</h3>
                    <select
                      value={apiTimeRange}
                      onChange={(e) => setApiTimeRange(e.target.value)}
                      className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    >
                      <option value="7d">Last 7 days</option>
                      <option value="30d">Last 30 days</option>
                      <option value="90d">Last 90 days</option>
                    </select>
                  </div>
                  <div className="h-64">
                    <Line data={requestsChartData} options={chartOptions} />
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-6">
                    Endpoint Usage
                  </h3>
                  <div className="h-64">
                    <Bar data={endpointChartData} options={chartOptions} />
                  </div>
                </div>
              </div>

              {/* Endpoint Performance */}
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">
                    Endpoint Performance
                  </h3>
                </div>
                <div className="divide-y divide-gray-200">
                  {apiMetrics.endpoints.map((endpoint) => (
                    <div key={endpoint.path} className="px-6 py-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">
                            {endpoint.path}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {endpoint.calls.toLocaleString()} calls
                          </p>
                        </div>
                        <div className="flex items-center space-x-6">
                          <div>
                            <p className="text-sm text-gray-500">Avg. Latency</p>
                            <p className="text-sm font-medium text-gray-900">
                              {endpoint.avgLatency}ms
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Error Rate</p>
                            <p
                              className={`text-sm font-medium ${
                                endpoint.errorRate > 1
                                  ? 'text-red-600'
                                  : 'text-green-600'
                              }`}
                            >
                              {endpoint.errorRate}%
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}