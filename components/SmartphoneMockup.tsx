import React, { useState } from 'react';
import Header from './Header';
import PhotoEditingTools from './PhotoEditingTools';
import CalendarWidget from './CalendarWidget';
import AiMagicTool from './AiMagicTool';
import PhotoActions from './PhotoActions';
import AiGallery from './AiGallery';
import FilterOptions from './FilterOptions';

interface SmartphoneMockupProps {
  showInstallButton?: boolean;
  onInstallClick?: () => void;
}

const SmartphoneMockup: React.FC<SmartphoneMockupProps> = ({ showInstallButton, onInstallClick }) => {
  const [imageUrl, setImageUrl] = useState("https://i.imgur.com/zAe45cl.jpeg");
  const [imageTitle, setImageTitle] = useState("Summer Memories");
  const [isLoading, setIsLoading] = useState(false);
  const [galleryImages, setGalleryImages] = useState<{url: string, title: string}[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilter, setActiveFilter] = useState('none');

  const filterClasses: { [key: string]: string } = {
    none: '',
    sepia: 'sepia',
    grayscale: 'grayscale',
    vintage: 'saturate-50 contrast-125 brightness-90',
    cool: 'saturate-150 contrast-90 hue-rotate-[-15deg]',
    invert: 'invert',
  };

  const addImageToGallery = (url: string, title: string) => {
    // Add to the beginning of the array and keep a reasonable number of recent images
    setGalleryImages(prev => [{ url, title }, ...prev].slice(0, 15));
  };
  
  const handleSelectFromGallery = (image: {url: string, title: string}) => {
    setImageUrl(image.url);
    setImageTitle(image.title);
  };

  const handleDownload = (): Promise<void> => new Promise((resolve, reject) => {
    if (!imageUrl) {
      return reject(new Error("No image URL to download."));
    }

    const triggerDownloadFromBlob = (blob: Blob) => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const sanitizedTitle = imageTitle.replace(/[^a-z0-9]/gi, '_').toLowerCase() || 'download';
      const extension = blob.type.split('/')[1] || 'png';
      link.setAttribute('download', `${sanitizedTitle}.${extension}`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    };

    try {
      const img = new Image();
      // Handle CORS for external images
      if (!imageUrl.startsWith('data:')) {
        img.crossOrigin = 'Anonymous';
      }

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          return reject(new Error("Could not get 2D context from canvas."));
        }

        canvas.width = img.width;
        canvas.height = img.height;

        // Apply filter if one is active
        if (activeFilter !== 'none') {
          const filterString = filterClasses[activeFilter].split(' ')
            .map(f => {
              if (f.startsWith('saturate')) return `saturate(${parseInt(f.split('-')[1]) / 100})`;
              if (f.startsWith('contrast')) return `contrast(${parseInt(f.split('-')[1]) / 100})`;
              if (f.startsWith('brightness')) return `brightness(${parseInt(f.split('-')[1]) / 100})`;
              if (f.startsWith('hue-rotate')) return `hue-rotate(${f.split('-')[2]})`;
              return f;
            }).join(' ');
          ctx.filter = filterString;
        }
        
        ctx.drawImage(img, 0, 0);

        canvas.toBlob((blob) => {
          if (blob) {
            triggerDownloadFromBlob(blob);
            resolve();
          } else {
            console.error("Canvas toBlob returned null, trying direct fetch fallback.");
            // Fallback inside onload
            fetch(imageUrl)
              .then(res => res.blob())
              .then(blob => {
                triggerDownloadFromBlob(blob);
                resolve();
              }).catch(reject);
          }
        }, 'image/png');
      };

      img.onerror = () => {
        // Fallback for when canvas loading fails (e.g., CORS)
        console.error("CORS or image load error, trying direct fetch fallback.");
        fetch(imageUrl)
          .then(response => {
            if (!response.ok) throw new Error(`Network response was not ok: ${response.statusText}`);
            return response.blob();
          })
          .then(blob => {
            triggerDownloadFromBlob(blob);
            resolve();
          })
          .catch(err => {
            console.error("Direct download fallback failed:", err);
            reject(err);
          });
      };

      img.src = imageUrl;

    } catch (error) {
      console.error("Download failed:", error);
      reject(error);
    }
  });

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result === 'string') {
        setImageUrl(result);
        setImageTitle(file.name);
        addImageToGallery(result, `Uploaded: ${file.name}`);
        // Reset filter when a new image is uploaded
        setActiveFilter('none');
      }
    };
    reader.onerror = (error) => {
      console.error("Error reading file:", error);
      alert("There was an error uploading the image.");
    };
    reader.readAsDataURL(file);
  };


  return (
    <div className="relative mx-auto h-[780px] w-[380px] rounded-[60px] shadow-2xl shadow-blue-500/40">
      {/* Phone Bezel */}
      <div className="h-full w-full rounded-[60px] border-[14px] border-gray-800 bg-gray-800 overflow-hidden">
        {/* Phone Screen */}
        <div className="h-full w-full rounded-[46px] bg-white dark:bg-gray-50 overflow-y-auto">
          <div className="relative flex flex-col h-full">
            <Header showInstallButton={showInstallButton} onInstallClick={onInstallClick} />
            <div className="flex-grow p-5 space-y-6">
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg bg-gray-200">
                {isLoading ? (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
                  </div>
                ) : (
                  <img src={imageUrl} alt={imageTitle} className={`w-full h-full object-cover transition-all duration-300 ${filterClasses[activeFilter]}`}/>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <p className="absolute bottom-3 left-4 text-white font-semibold text-lg truncate pr-4">{imageTitle}</p>
              </div>
              
              <PhotoActions onDownload={handleDownload} onImageUpload={handleImageUpload} />

              <AiMagicTool
                setImageUrl={setImageUrl}
                setImageTitle={setImageTitle}
                setIsLoading={setIsLoading}
                isLoading={isLoading}
                addImageToGallery={addImageToGallery}
              />

              <AiGallery images={galleryImages} onSelect={handleSelectFromGallery} currentImageUrl={imageUrl} />

              <PhotoEditingTools onFilterClick={() => setShowFilters(prev => !prev)} />
              
              {showFilters && (
                <FilterOptions 
                  imageUrl={imageUrl}
                  onSelectFilter={setActiveFilter}
                  activeFilter={activeFilter}
                />
              )}

              <CalendarWidget />
            </div>
          </div>
        </div>
      </div>
      {/* Dynamic Island / Notch */}
      <div className="absolute top-[26px] left-1/2 -translate-x-1/2 h-[32px] w-[120px] bg-gray-800 rounded-full"></div>
    </div>
  );
};

export default SmartphoneMockup;