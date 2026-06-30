import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Play, Code, BookOpen, Users, Zap, Shield } from 'lucide-react';

const HomePage = () => {
  const features = [
    {
      icon: Play,
      title: 'Interactive Visualizations',
      description: 'Watch algorithms come to life with step-by-step animations',
    },
    {
      icon: Code,
      title: 'Code Playground',
      description: 'Write and test your own algorithm implementations',
    },
    {
      icon: BookOpen,
      title: 'Comprehensive Tutorials',
      description: 'Learn from detailed explanations and examples',
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Share and learn from other developers',
    },
    {
      icon: Zap,
      title: 'Real-time Execution',
      description: 'See immediate results as you modify parameters',
    },
    {
      icon: Shield,
      title: 'Best Practices',
      description: 'Learn optimal solutions and time complexities',
    },
  ];

  const algorithmCategories = [
    { name: 'Sorting', count: 8, color: 'bg-teal-500' },
    { name: 'Searching', count: 5, color: 'bg-emerald-500' },
    { name: 'Graph', count: 10, color: 'bg-cyan-500' },
    { name: 'Dynamic Programming', count: 12, color: 'bg-amber-500' },
    { name: 'Tree', count: 7, color: 'bg-orange-500' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Master Algorithms Through
            <span className="text-teal-600 dark:text-teal-400"> Interactive Visualization</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Learn, visualize, and implement algorithms with our comprehensive platform
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/algorithms"
              className="px-6 py-3 bg-gradient-to-r from-teal-600 to-amber-500 text-white rounded-lg hover:from-teal-700 hover:to-amber-600 transition-colors flex items-center gap-2"
            >
              <Play className="h-5 w-5" />
              Start Visualizing
            </Link>
            <Link
              to="/playground"
              className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-teal-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-2"
            >
              <Code className="h-5 w-5" />
              Code Playground
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12"
          >
            Why Choose AlgoForge?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <feature.icon className="h-12 w-12 text-teal-600 dark:text-teal-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Algorithm Categories */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12"
          >
            Explore Algorithm Categories
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {algorithmCategories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index }}
              >
                <Link
                  to={`/algorithms/${category.name.toLowerCase().replace(' ', '-')}`}
                  className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all hover:-translate-y-1"
                >
                  <div className={`h-2 w-full ${category.color} rounded mb-4`} />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {category.count} algorithms
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-blue-600 dark:bg-blue-700">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Master Algorithms?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of developers improving their algorithmic thinking
          </p>
          <Link
            to="/register"
            className="inline-block px-8 py-4 bg-white text-teal-700 rounded-lg font-semibold hover:bg-amber-50 transition-colors"
          >
            Get Started for Free
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default HomePage;