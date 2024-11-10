import React, { useState } from 'react';
import { Book, ChevronRight, Search } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  views: number;
  lastUpdated: string;
  readTime: string;
}

const articles: Article[] = [
  {
    id: '1',
    title: 'Getting Started with Document Generation',
    category: 'Getting Started',
    excerpt: 'Learn how to create your first legal document using our platform.',
    views: 1234,
    lastUpdated: '2024-03-15',
    readTime: '5 min'
  },
  {
    id: '2',
    title: 'Managing Templates and Variables',
    category: 'Templates',
    excerpt: 'Master template customization and variable management.',
    views: 987,
    lastUpdated: '2024-03-14',
    readTime: '8 min'
  },
  {
    id: '3',
    title: 'Understanding Document Permissions',
    category: 'Security',
    excerpt: 'Learn about role-based access control and document sharing.',
    views: 756,
    lastUpdated: '2024-03-13',
    readTime: '6 min'
  },
  {
    id: '4',
    title: 'Advanced Template Features',
    category: 'Templates',
    excerpt: 'Discover conditional logic and dynamic content in templates.',
    views: 543,
    lastUpdated: '2024-03-12',
    readTime: '10 min'
  }
];

interface KnowledgeBaseProps {
  searchQuery: string;
}

export default function KnowledgeBase({ searchQuery }: KnowledgeBaseProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', 'Getting Started', 'Templates', 'Security', 'Integrations'];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Knowledge Base</h2>
        <div className="flex space-x-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {filteredArticles.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {filteredArticles.map((article) => (
              <li key={article.id}>
                <a
                  href={`/help/article/${article.id}`}
                  className="block hover:bg-gray-50 transition-colors"
                >
                  <div className="px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center">
                          <Book className="h-5 w-5 text-indigo-600" />
                          <h3 className="ml-3 text-lg font-medium text-gray-900">
                            {article.title}
                          </h3>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">{article.excerpt}</p>
                        <div className="mt-2 flex items-center space-x-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                            {article.category}
                          </span>
                          <span className="text-xs text-gray-500">
                            {article.views} views
                          </span>
                          <span className="text-xs text-gray-500">
                            {article.readTime} read
                          </span>
                          <span className="text-xs text-gray-500">
                            Updated {new Date(article.lastUpdated).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-12">
            <Book className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No articles found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
}