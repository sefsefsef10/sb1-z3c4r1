import React from 'react';
import { Quote } from 'lucide-react';

interface EnterpriseTestimonialProps {
  quote: string;
  author: string;
  role: string;
  company: string;
  image: string;
}

export default function EnterpriseTestimonial({
  quote,
  author,
  role,
  company,
  image
}: EnterpriseTestimonialProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="flex items-center space-x-4 mb-6">
        <Quote className="h-8 w-8 text-indigo-600" />
      </div>
      <blockquote className="text-xl text-gray-900 mb-6">{quote}</blockquote>
      <div className="flex items-center">
        <img
          src={image}
          alt={author}
          className="h-12 w-12 rounded-full object-cover"
        />
        <div className="ml-4">
          <div className="text-lg font-medium text-gray-900">{author}</div>
          <div className="text-gray-600">
            {role} at {company}
          </div>
        </div>
      </div>
    </div>
  );
}