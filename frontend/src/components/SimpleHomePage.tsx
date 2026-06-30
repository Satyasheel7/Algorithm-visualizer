import { Link } from 'react-router-dom';
import { algorithmCategories } from '../data/algorithms';
import { useState, useEffect } from 'react';

const SimpleHomePage = () => {
  const [activeCategory, setActiveCategory] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCategory((prev) => (prev + 1) % algorithmCategories.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Interactive Visualizations',
      description: 'Step through algorithms with real-time controls and animations',
      color: 'from-teal-500 to-cyan-400'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: 'Performance Metrics',
      description: 'See time and space complexity analysis in real-time',
      color: 'from-amber-500 to-orange-500'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: 'Comprehensive Learning',
      description: 'Learn with detailed explanations and step-by-step tutorials',
      color: 'from-emerald-500 to-lime-500'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      title: 'Code Playground',
      description: 'Write, test, and visualize your own implementations with AI-powered code fixing',
      color: 'from-slate-700 to-teal-600'
    }
  ];

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-20 lg:py-32">
          <div className="text-center max-w-5xl mx-auto">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
              <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float" style={{ animationDelay: '4s' }}></div>
            </div>

            {/* Main Content */}
            <div className="relative z-10">
              <h1 className="text-5xl lg:text-7xl font-bold mb-6">
                <span className="text-gradient">Build Algorithms</span>
                <br />
                <span className="text-gray-800 dark:text-white">Through Motion</span>
              </h1>

              <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                Experience algorithms with interactive visualizations,
                real-time motion, and focused explanations.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link to="/algorithms" className="btn-primary text-lg">
                  <span className="flex items-center justify-center">
                    Explore Algorithms
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </Link>
                <Link to="/playground" className="btn-secondary text-lg">
                  <span className="flex items-center justify-center">
                    Try Playground
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gradient">50+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Algorithms</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gradient">6</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Categories</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gradient">∞</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Visualizations</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gradient">100%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Free</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="text-gradient">Why Choose AlgoForge?</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Everything you need to master algorithms and data structures
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative"
              >
                <div className="modern-card modern-card-hover p-8 h-full">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} p-4 text-white mb-6 transform group-hover:scale-110 transition-transform`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Algorithm Categories Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="text-gradient">Algorithm Categories</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Explore our comprehensive collection of algorithms across multiple categories
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {algorithmCategories.map((category, index) => (
              <div
                key={category.id}
                className={`algorithm-card ${activeCategory === index ? 'ring-2 ring-blue-500' : ''}`}
                onMouseEnter={() => setActiveCategory(index)}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-gradient">
                    {category.name}
                  </h3>
                  <span className="badge badge-blue">
                    {category.algorithms.length} algorithms
                  </span>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {category.description}
                </p>

                <div className="space-y-3 mb-6">
                  {category.algorithms.slice(0, 3).map((algorithm) => (
                    <div key={algorithm.id} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {algorithm.name}
                      </span>
                      <div className="flex gap-2">
                        <span className="text-xs font-mono text-blue-600 dark:text-blue-400">
                          {algorithm.complexity.time}
                        </span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs font-mono text-purple-600 dark:text-purple-400">
                          {algorithm.complexity.space}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <Link
                  to={`/algorithms/${category.id}`}
                  className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold group"
                >
                  View All Algorithms
                  <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-700 via-cyan-600 to-amber-500 opacity-90"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Build Better Algorithms?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Start your journey today with our interactive visualizations and comprehensive tutorials.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/algorithms" className="btn-secondary text-lg">
                Get Started Now
              </Link>
              <Link to="/tutorials" className="btn-outline text-white border-white hover:bg-white hover:text-blue-600 text-lg">
                View Tutorials
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SimpleHomePage;
