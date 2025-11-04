import React from 'react';

interface HeaderProps {
  showInstallButton?: boolean;
  onInstallClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ showInstallButton, onInstallClick }) => {
  return (
    <header className="flex items-center justify-between p-5 sticky top-0 bg-white/80 backdrop-blur-sm z-10">
      <div className="flex items-center space-x-2">
         <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
               <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
         </div>
         <h1 className="text-xl font-bold text-gray-800">Photo Calener</h1>
      </div>
      <div className="flex items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        {showInstallButton && (
          <button
            onClick={onInstallClick}
            className="flex items-center space-x-2 text-blue-700 hover:text-blue-900 transition-colors bg-blue-100 hover:bg-blue-200 px-3 py-1.5 rounded-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-400"
            title="Install App"
            aria-label="Install Photo Calener App"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>Install</span>
          </button>
        )}
        <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors bg-gray-100 hover:bg-blue-100 px-3 py-1.5 rounded-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-400">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          <span>Login</span>
        </button>
      </div>
    </header>
  );
};

export default Header;