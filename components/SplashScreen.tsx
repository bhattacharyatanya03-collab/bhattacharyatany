import React from 'react';

const SplashScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-blue-900/50 to-gray-900 flex flex-col items-center justify-center z-50">
        <div className="flex flex-col items-center justify-center">
            <div className="w-24 h-24 mb-6 rounded-3xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center shadow-2xl shadow-blue-500/50 animate-pulse">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
            </div>
            <h1 className="text-4xl font-bold text-white tracking-wider">Photo Calener</h1>
        </div>
    </div>
  );
};

export default SplashScreen;
