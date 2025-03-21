import React from 'react';

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-green-600 p-4">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
        </div>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" placeholder="you@example.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" placeholder="••••••••" />
          </div>
          <div className="flex items-center justify-between">
            <a href="#" className="text-sm text-green-600 hover:text-green-500">Forgot Password?</a>
          </div>
          <div>
            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              Login
            </button>
          </div>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don&apos;t have an account? <a href="/signup" className="font-medium text-green-600 hover:text-green-500">Sign Up</a>
          </p>
        </div>
        
      </div>
    </div>
  );
};

export default LoginPage;
