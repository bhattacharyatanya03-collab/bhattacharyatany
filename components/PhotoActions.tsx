import React, { useState, useRef } from 'react';

interface PhotoActionsProps {
  onDownload: () => Promise<void>;
  onImageUpload: (file: File) => void;
}

const PhotoActions: React.FC<PhotoActionsProps> = ({ onDownload, onImageUpload }) => {
  const [downloadState, setDownloadState] = useState<'idle' | 'downloading' | 'success'>('idle');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDownloadClick = async () => {
    if (downloadState !== 'idle') return;

    setDownloadState('downloading');
    try {
      await onDownload();
      setDownloadState('success');
      setTimeout(() => setDownloadState('idle'), 2500); // Reset after success
    } catch (error) {
      console.error('Download failed:', error);
      alert('Download failed. Please check the console for more details.');
      setDownloadState('idle'); // Reset on error
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageUpload(file);
      // Reset the input value to allow uploading the same file again
      event.target.value = '';
    }
  };

  const buttonContent = {
    idle: {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
      ),
      text: 'Download',
      className: 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white hover:scale-105 active:scale-100',
    },
    downloading: {
      icon: (
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ),
      text: 'Downloading...',
      className: 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white opacity-75 cursor-wait',
    },
    success: {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      ),
      text: 'Downloaded!',
      className: 'bg-gradient-to-br from-green-500 to-emerald-600 text-white',
    },
  };
  
  const currentButtonState = buttonContent[downloadState];

  return (
    <div className="flex items-center justify-between space-x-2 pt-2 pb-1 px-1">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/png, image/jpeg, image/webp"
        style={{ display: 'none' }}
        aria-hidden="true"
      />
      <div className="flex items-center space-x-2">
        <button
          onClick={handleUploadClick}
          className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors bg-gray-100 hover:bg-blue-100 px-3 py-2 rounded-lg text-sm font-medium"
          aria-label="Upload an image"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          <span>Upload</span>
        </button>
        <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors bg-gray-100 hover:bg-blue-100 px-3 py-2 rounded-lg text-sm font-medium">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
          </svg>
          <span>Share</span>
        </button>
      </div>
      <button 
        onClick={handleDownloadClick}
        disabled={downloadState !== 'idle'}
        className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 w-36 ${currentButtonState.className}`}
        aria-label="Download image"
      >
        {currentButtonState.icon}
        <span>{currentButtonState.text}</span>
      </button>
    </div>
  );
};

export default PhotoActions;