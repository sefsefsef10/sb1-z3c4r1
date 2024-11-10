import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  FileText,
  ChevronRight,
  Download,
  Eye,
  Grid,
  List,
  Upload,
  Star,
  Clock,
  Filter,
  Search,
  Lock,
  TrendingUp,
  AlertCircle,
} from 'lucide-react';
import type { RootState } from '../../store';

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  premium: boolean;
  popularity: number;
  lastUsed?: string;
  estimatedTime: string;
  usageCount: number;
  variables: string[];
  preview?: string;
}

const templates: Template[] = [
  {
    id: '1',
    name: 'Employment Agreement',
    description: 'Standard employment contract with customizable terms',
    category: 'Employment',
    premium: false,
    popularity: 98,
    lastUsed: '2024-03-15',
    estimatedTime: '5-10 min',
    usageCount: 1234,
    variables: ['employeeName', 'position', 'salary', 'startDate'],
    preview: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: '2',
    name: 'Premium NDA Template',
    description: 'Advanced NDA with AI-powered customization',
    category: 'Legal',
    premium: true,
    popularity: 95,
    lastUsed: '2024-03-14',
    estimatedTime: '3-5 min',
    usageCount: 856,
    variables: ['partyNames', 'confidentialInfo', 'duration'],
    preview: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: '3',
    name: 'Service Agreement',
    description: 'Comprehensive service contract template',
    category: 'Business',
    premium: true,
    popularity: 92,
    lastUsed: '2024-03-13',
    estimatedTime: '10-15 min',
    usageCount: 645,
    variables: ['serviceProvider', 'client', 'services', 'payment'],
    preview: 'https://images.unsplash.com/photo-1554224154-22dec7ec8818?auto=format&fit=crop&w=300&q=80',
  },
];

const categories = ['All', 'Employment', 'Legal', 'Business', 'Financial'];

export default function DocumentGenerator() {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const [step, setStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'popularity' | 'recent'>('popularity');
  const [bulkMode, setBulkMode] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const handleTemplateSelect = (template: Template) => {
    if (template.premium && user?.role !== 'premium') {
      setShowUpgradeModal(true);
      return;
    }
    setSelectedTemplate(template);
    setStep(2);
  };

  const handleBulkUpload = (files: FileList | null) => {
    if (!files) return;
    if (user?.role !== 'premium') {
      setShowUpgradeModal(true);
      return;
    }
    // Handle bulk upload logic
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium text-gray-900">Generate Document</h2>
            <p className="mt-1 text-sm text-gray-500">
              Create professional legal documents in minutes
            </p>
          </div>
          {step === 1 && (
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setBulkMode(!bulkMode)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <Upload className="h-5 w-5 mr-2 text-gray-500" />
                Bulk Generate
              </button>
              <div className="flex rounded-md shadow-sm">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-2 rounded-l-md border ${
                    viewMode === 'grid'
                      ? 'bg-indigo-50 border-indigo-500 text-indigo-600'
                      : 'border-gray-300 text-gray-500'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-2 rounded-r-md border-t border-r border-b ${
                    viewMode === 'list'
                      ? 'bg-indigo-50 border-indigo-500 text-indigo-600'
                      : 'border-gray-300 text-gray-500'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="p-6">
        {step === 1 && (
          <div className="space-y-6">
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search templates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="flex space-x-4">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'popularity' | 'recent')}
                  className="rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="popularity">Most Popular</option>
                  <option value="recent">Recently Used</option>
                </select>
              </div>
            </div>

            {/* Recommended Templates */}
            {!bulkMode && (
              <div className="bg-indigo-50 rounded-lg p-4 mb-6">
                <h3 className="text-sm font-medium text-indigo-900 mb-4">
                  Recommended for You
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {templates
                    .filter((t) => t.popularity > 90)
                    .slice(0, 3)
                    .map((template) => (
                      <div
                        key={template.id}
                        className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => handleTemplateSelect(template)}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="flex-shrink-0">
                            <FileText className="h-6 w-6 text-indigo-600" />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">
                              {template.name}
                            </h4>
                            <p className="text-xs text-gray-500">
                              {template.usageCount} uses
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Templates Grid/List */}
            {bulkMode ? (
              <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                <input
                  type="file"
                  multiple
                  onChange={(e) => handleBulkUpload(e.target.files)}
                  className="hidden"
                  id="bulk-upload"
                />
                <label
                  htmlFor="bulk-upload"
                  className="cursor-pointer inline-flex flex-col items-center"
                >
                  <Upload className="h-12 w-12 text-gray-400" />
                  <span className="mt-2 text-sm font-medium text-gray-900">
                    Upload data files for bulk generation
                  </span>
                  <span className="mt-1 text-sm text-gray-500">
                    Drag and drop or click to select files
                  </span>
                </label>
              </div>
            ) : (
              <div
                className={`grid ${
                  viewMode === 'grid'
                    ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                    : 'grid-cols-1'
                } gap-6`}
              >
                {templates.map((template) => (
                  <div
                    key={template.id}
                    className={`relative bg-white rounded-lg border border-gray-200 hover:border-indigo-500 hover:shadow-md transition-all cursor-pointer ${
                      viewMode === 'list' ? 'flex items-center' : ''
                    }`}
                    onClick={() => handleTemplateSelect(template)}
                  >
                    {template.premium && (
                      <div className="absolute top-4 right-4">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                          <Star className="w-3 h-3 mr-1" />
                          Premium
                        </span>
                      </div>
                    )}
                    {viewMode === 'grid' ? (
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                            <FileText className="h-6 w-6 text-indigo-600" />
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-500">
                              {template.estimatedTime}
                            </span>
                          </div>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          {template.name}
                        </h3>
                        <p className="text-sm text-gray-500 mb-4">
                          {template.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                            {template.category}
                          </span>
                          <div className="flex items-center text-sm text-gray-500">
                            <TrendingUp className="w-4 h-4 mr-1" />
                            {template.usageCount} uses
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between w-full p-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                            <FileText className="h-5 w-5 text-indigo-600" />
                          </div>
                          <div className="ml-4">
                            <h3 className="text-sm font-medium text-gray-900">
                              {template.name}
                            </h3>
                            <p className="text-sm text-gray-500">{template.category}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="text-sm text-gray-500">
                            {template.usageCount} uses
                          </span>
                          <ChevronRight className="h-5 w-5 text-gray-400" />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Step 2: Document Details Form */}
        {step === 2 && selectedTemplate && (
          <div className="max-w-3xl mx-auto">
            {/* Template Preview */}
            <div className="mb-8">
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                {selectedTemplate.preview ? (
                  <img
                    src={selectedTemplate.preview}
                    alt={selectedTemplate.name}
                    className="object-cover"
                  />
                ) : (
                  <div className="bg-gray-100 flex items-center justify-center">
                    <FileText className="h-12 w-12 text-gray-400" />
                  </div>
                )}
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-6">
              {selectedTemplate.variables.map((variable) => (
                <div key={variable}>
                  <label className="block text-sm font-medium text-gray-700">
                    {variable
                      .replace(/([A-Z])/g, ' $1')
                      .replace(/^./, (str) => str.toUpperCase())}
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              ))}

              <div className="flex justify-between pt-6">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                >
                  Generate Document
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
            <div className="text-center">
              <Lock className="mx-auto h-12 w-12 text-indigo-600" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                Unlock Premium Features
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Upgrade to access premium templates, bulk generation, and more.
              </p>
            </div>
            <div className="mt-6 space-y-4">
              <button
                onClick={() => navigate('/pricing')}
                className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
              >
                View Pricing
              </button>
              <button
                onClick={() => setShowUpgradeModal(false)}
                className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}