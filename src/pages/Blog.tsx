import React from 'react';
import { Calendar, User, Tag, ArrowRight } from 'lucide-react';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'The Future of Education: Blending Traditional and Digital Learning',
      excerpt: 'Explore how modern educational practices are evolving to combine the best of both worlds...',
      author: 'Dr. Sarah Wilson',
      date: 'March 15, 2024',
      category: 'Education Trends',
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 2,
      title: 'Essential Study Tips for Academic Success',
      excerpt: 'Discover proven strategies to enhance your learning experience and achieve better results...',
      author: 'Mark Thompson',
      date: 'March 12, 2024',
      category: 'Study Tips',
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 3,
      title: 'The Impact of Technology in Modern Education',
      excerpt: 'Understanding how digital tools are reshaping the way we teach and learn...',
      author: 'Tech Education Team',
      date: 'March 10, 2024',
      category: 'EdTech',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-secondary mb-6">Educational Insights & Resources</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest educational trends, teaching methodologies, and expert insights.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article key={post.id} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {post.author}
                  </span>
                </div>
                <h2 className="text-xl font-bold mb-2 text-secondary">{post.title}</h2>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-sm text-primary">
                    <Tag className="w-4 h-4" />
                    {post.category}
                  </span>
                  <button className="flex items-center text-primary hover:text-primary-dark transition-colors">
                    Read More
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button className="bg-primary text-secondary px-8 py-3 rounded-md font-bold hover:bg-primary-dark transition-colors inline-flex items-center">
            View All Articles
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Blog;