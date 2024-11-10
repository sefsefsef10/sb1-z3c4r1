import React, { useState } from 'react';
import { FileText, Plus, Search, Filter, Download, Edit, Trash2, Share2, Star, Grid, List, TrendingUp, Clock } from 'lucide-react';

interface Template {
  id: string;
  name: string;
  category: string;
  description: string;
  usageCount: number;
  lastModified: string;
  status: 'published' | 'draft' | 'archived';
  isCustom: boolean;
  premium: boolean;
  price?: number;
  rating?: number;
  downloads?: number;
  author?: string;
  preview?: string;
}

const templates: Template[] = [
  {
    id: '1',
    name: 'Employment Agreement',
    category: 'HR & Employment',
    description: 'Standard employment contract template with customizable terms',
    usageCount: 245,
    lastModified: '2024-03-15',
    status: 'published',
    isCustom: false,
    premium: true,
    price: 29,
    rating: 4.8,
    downloads: 1200,
    author: 'LegalDocs',
    preview: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: '2',
    name: 'Non-Disclosure Agreement',
    category: 'Legal',
    description: 'Comprehensive NDA template for business relationships',
    usageCount: 189,
    lastModified: '2024-03-14',
    status: 'published',
    isCustom: false,
    premium: false,
    downloads: 890,
    author: 'LegalDocs',
    preview: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: '3',
    name: 'Service Agreement',
    category: 'Business',
    description: 'Professional services agreement template',
    usageCount: 156,
    lastModified: '2024-03-13',
    status: 'published',
    isCustom: true,
    premium: true,
    price: 49,
    rating: 4.9,
    downloads: 750,
    author: 'Sarah Wilson',
    preview: 'https://images.unsplash.com/photo-1554224154-22dec7ec8818?auto=format&fit=crop&w=300&q=80',
  },
];

export default function TemplateManager() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'popular' | 'recent' | 'rating'>('popular');

  const categories = Array.from(new Set(templates.map(template => template.category)));
  const statuses = ['published', 'draft', 'archived'];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || template.category === selectedCategory;
    const matchesStatus = !selectedStatus || template.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const sortedTemplates = [...filteredTemplates].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return (b.downloads || 0) - (a.downloads || 0);
      case 'recent':
        return new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime();
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      default:
        return 0;
    }
  });

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b flex justify-between items-center">
        <div>
          <h2 className="text-lg font-medium text-gray-900">Template Marketplace</h2>
          <p className="mt-1 text-sm text-gray-500">Browse and manage document templates</p>
        </div>
        <div className="flex items-center space-x-4">
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
          <button className="flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
            <Plus className="w-4 h-4 mr-2" />
            Create Template
          </button>
        </div>
      </div>

      <div className="p-6">
        {/* Search and Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <select
              value={selectedCategory || ''}
              onChange={(e) => setSelectedCategory(e.target.value || null)}
              className="border rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'popular' | 'recent' | 'rating')}
              className="border rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="popular">Most Popular</option>
              <option value="recent">Recently Added</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Templates Grid/List */}
        <div className={`grid ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'grid-cols-1 gap-4'
        }`}>
          {sortedTemplates.map((template) => (
            <div
              key={template.id}
              className={`border rounded-lg ${
                viewMode === 'grid' ? 'p-0' : 'p-4'
              } hover:border-indigo-500 hover:shadow-md transition-all`}
            >
              {viewMode === 'grid' ? (
                <div>
                  {template.preview && (
                    <div className="relative h-48 rounded-t-lg overflow-hidden">
                      <img
                        src={template.preview}
                        alt={template.name}
                        className="w-full h-full object-cover"
                      />
                      {template.premium && (
                        <div className="absolute top-4 right-4">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                            <Star className="w-3 h-3 mr-1" />
                            Premium
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-gray-900">{template.name}</h3>
                      {template.price && (
                        <span className="text-lg font-bold text-indigo-600">${template.price}</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-4">{template.description}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center">
                        <Download className="w-4 h-4 mr-1" />
                        <span>{template.downloads} downloads</span>
                      </div>
                      {template.rating && (
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 mr-1" />
                          <span>{template.rating}</span>
                        </div>
                      )}
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm text-gray-500">By {template.author}</span>
                      <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
                        {template.premium ? 'Purchase' : 'Use Template'}
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center flex-1">
                    <FileText className="w-10 h-10 text-indigo-600" />
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">{template.name}</h3>
                      <p className="text-sm text-gray-500">{template.description}</p>
                      <div className="mt-2 flex items-center space-x-4">
                        <span className="text-sm text-gray-500">{template.downloads} downloads</span>
                        {template.rating && (
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 mr-1" />
                            <span>{template.rating}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    {template.price && (
                      <span className="text-lg font-bold text-indigo-600">${template.price}</span>
                    )}
                    <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
                      {template.premium ? 'Purchase' : 'Use Template'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}