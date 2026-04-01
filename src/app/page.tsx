export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="max-w-3xl space-y-6">
        <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight sm:text-6xl">
          Welcome to <span className="text-blue-600">AIUB FST</span>
        </h1>
        <p className="text-xl text-gray-600">
          Faculty of Science and Technology. This is a fresh starting point for the new application.
        </p>
        
        <div className="flex items-center justify-center gap-4 pt-8">
          <div className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium shadow-sm hover:bg-blue-700 transition-colors cursor-pointer">
            Get Started
          </div>
          <div className="px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg font-medium shadow-sm hover:bg-gray-50 transition-colors cursor-pointer">
            Documentation
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16 text-left">
          <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Modern Stack</h3>
            <p className="text-gray-500 text-sm">Built with Next.js 14, React 18, and Tailwind CSS for rapid development.</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Clean Architecture</h3>
            <p className="text-gray-500 text-sm">Pre-configured folder structure ready for large-scale application development.</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Ready to Build</h3>
            <p className="text-gray-500 text-sm">Just start adding your components, pages, and logic to build out the platform.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
