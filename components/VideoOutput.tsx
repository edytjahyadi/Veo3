
import React from 'react';
import { DownloadIcon } from './icons';

interface VideoOutputProps {
  videoUrl: string;
}

export const VideoOutput: React.FC<VideoOutputProps> = ({ videoUrl }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg h-full flex flex-col">
      <h3 className="text-lg font-semibold text-white mb-4 border-b border-gray-700 pb-2">Generated Video</h3>
      <div className="flex-grow flex items-center justify-center bg-black rounded-md">
        <video src={videoUrl} controls autoPlay loop className="w-full h-auto max-h-[60vh] rounded-md">
          Your browser does not support the video tag.
        </video>
      </div>
      <a
        href={videoUrl}
        download="generated-video.mp4"
        className="mt-6 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-green-500 transition-colors"
      >
        <DownloadIcon className="w-5 h-5 mr-2" />
        Download Video
      </a>
    </div>
  );
};
