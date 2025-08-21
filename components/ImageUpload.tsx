
import React, { useRef } from 'react';
import { UploadIcon, XCircleIcon } from './icons';

interface ImageUploadProps {
  imageBase64: string | null;
  setImageBase64: (base64: string | null) => void;
  disabled: boolean;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ imageBase64, setImageBase64, disabled }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (disabled) return;
    const file = event.dataTransfer.files?.[0];
     if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };


  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const clearImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImageBase64(null);
    if(fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold text-white mb-4 border-b border-gray-700 pb-2">Reference Image (Optional)</h3>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
        disabled={disabled}
      />
      {imageBase64 ? (
        <div className="relative group">
          <img src={imageBase64} alt="Preview" className="w-full h-auto max-h-64 object-contain rounded-md" />
          <button
            onClick={clearImage}
            disabled={disabled}
            className="absolute top-2 right-2 p-1 bg-gray-900 bg-opacity-50 rounded-full text-white hover:bg-opacity-75 transition-opacity opacity-0 group-hover:opacity-100 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Remove image"
          >
            <XCircleIcon className="w-6 h-6" />
          </button>
        </div>
      ) : (
        <div
          onClick={triggerFileSelect}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className={`flex justify-center items-center w-full h-48 border-2 border-dashed border-gray-600 rounded-lg transition-colors ${!disabled ? 'cursor-pointer hover:border-indigo-400 hover:bg-gray-700' : 'cursor-not-allowed bg-gray-800'}`}
        >
          <div className="text-center text-gray-400">
            <UploadIcon className="mx-auto h-12 w-12" />
            <p className="mt-2 text-sm">Click to upload or drag & drop</p>
            <p className="text-xs">PNG, JPG, GIF up to 10MB</p>
          </div>
        </div>
      )}
    </div>
  );
};
