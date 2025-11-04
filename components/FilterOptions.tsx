import React from 'react';

interface FilterOptionsProps {
  imageUrl: string;
  onSelectFilter: (filter: string) => void;
  activeFilter: string;
}

const FilterOptions: React.FC<FilterOptionsProps> = ({ imageUrl, onSelectFilter, activeFilter }) => {
  const filters = [
    { name: 'None', key: 'none', className: '' },
    { name: 'Sepia', key: 'sepia', className: 'sepia' },
    { name: 'Grayscale', key: 'grayscale', className: 'grayscale' },
    { name: 'Vintage', key: 'vintage', className: 'saturate-50 contrast-125 brightness-90' },
    { name: 'Cool', key: 'cool', className: 'saturate-150 contrast-90 hue-rotate-[-15deg]' },
    { name: 'Invert', key: 'invert', className: 'invert' },
  ];

  return (
    <section>
      <h2 className="text-sm font-semibold text-gray-500 mb-3">FILTERS</h2>
      <div className="flex overflow-x-auto space-x-3 pb-3 -mx-5 px-5">
        {filters.map(filter => {
          const isSelected = filter.key === activeFilter;
          return (
            <button
              key={filter.key}
              onClick={() => onSelectFilter(filter.key)}
              className={`flex-shrink-0 flex flex-col items-center space-y-2 group focus:outline-none ${isSelected ? 'text-blue-600' : 'text-gray-700'}`}
              aria-label={`Apply ${filter.name} filter`}
            >
              <div
                className={`w-20 h-20 rounded-xl overflow-hidden ring-offset-2 transition-all duration-200 ${isSelected ? 'ring-2 ring-blue-500' : 'group-hover:ring-2 ring-blue-300'}`}
              >
                <img src={imageUrl} alt={`${filter.name} filter preview`} className={`w-full h-full object-cover ${filter.className}`} />
              </div>
              <span className="text-xs font-semibold">{filter.name}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default FilterOptions;