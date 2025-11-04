import React from 'react';

interface FeatureIconProps {
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

const FeatureIcon: React.FC<FeatureIconProps> = ({ label, icon, onClick }) => {
  return (
    <button onClick={onClick} className="flex flex-col items-center space-y-2 group focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-lg">
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-blue-600 transition-transform duration-300 group-hover:scale-105 group-hover:shadow-lg">
        {icon}
      </div>
      <span className="text-xs font-medium text-gray-700">{label}</span>
    </button>
  );
};

export default FeatureIcon;