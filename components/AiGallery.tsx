import React from 'react';

interface AiGalleryProps {
  images: { url: string; title: string }[];
  onSelect: (image: { url: string; title: string }) => void;
  currentImageUrl: string;
}

const AiGallery: React.FC<AiGalleryProps> = ({ images, onSelect, currentImageUrl }) => {
  if (images.length === 0) {
    return null;
  }

  return (
    <section>
      <h2 className="text-sm font-semibold text-gray-500 mb-3">AI GALLERY</h2>
      <div className="flex overflow-x-auto space-x-3 pb-3 -mx-5 px-5 items-center min-h-[120px]" role="listbox" aria-label="AI Generated Images">
        {images.map((image, index) => {
          const isSelected = image.url === currentImageUrl;
          return (
            <button
              key={index}
              onClick={() => onSelect(image)}
              className={`
                flex-shrink-0 rounded-xl overflow-hidden relative group
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                transition-all duration-300 ease-in-out
                ${isSelected ? 'w-28 h-28 ring-4 ring-blue-500 shadow-lg' : 'w-24 h-24 opacity-75 hover:opacity-100'}
              `}
              aria-label={`Select image: ${image.title}`}
              role="option"
              aria-selected={isSelected}
            >
              <img src={image.url} alt={image.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <p className="absolute bottom-1.5 left-2 right-2 text-white text-[10px] font-semibold truncate opacity-0 group-hover:opacity-100 transition-opacity duration-300">{image.title}</p>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default AiGallery;