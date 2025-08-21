
import React from 'react';
import { MagicWandIcon } from './icons';

interface LoaderProps {
  message: string;
}

export const Loader: React.FC<LoaderProps> = ({ message }) => {
  return (
    <div className="absolute inset-0 bg-gray-900 bg-opacity-80 backdrop-blur-sm flex flex-col justify-center items-center z-50">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-indigo-400"></div>
      <MagicWandIcon className="w-10 h-10 text-white absolute" />
      <p className="text-lg text-gray-300 mt-6 font-semibold text-center px-4">{message}</p>
    </div>
  );
};
