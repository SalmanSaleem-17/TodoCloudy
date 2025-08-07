import React from 'react';

const Newsletter: React.FC = () => {
  return (
    <section className="border-t border-blue-100 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-blue-100 shadow-lg">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-bold mb-4 text-gray-900">
              Stay Updated
            </h3>
            <p className="text-gray-600 mb-6 text-sm sm:text-base">
              Get the latest updates, tips, and exclusive features delivered to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md mx-auto">
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl bg-white border border-blue-200 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm text-sm sm:text-base"
              />
              <button
                type="submit"
                className="px-4 sm:px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 whitespace-nowrap text-sm sm:text-base"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
