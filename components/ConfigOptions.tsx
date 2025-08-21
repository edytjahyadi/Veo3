
import React from 'react';
import { AspectRatio, Resolution } from '../types';

interface ConfigOptionsProps {
  aspectRatio: AspectRatio;
  setAspectRatio: (ratio: AspectRatio) => void;
  resolution: Resolution;
  setResolution: (res: Resolution) => void;
  enableSound: boolean;
  setEnableSound: (enabled: boolean) => void;
  disabled: boolean;
}

const OptionButton: React.FC<{
  onClick: () => void;
  isActive: boolean;
  disabled: boolean;
  children: React.ReactNode;
}> = ({ onClick, isActive, disabled, children }) => {
  const baseClasses = "px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500";
  const activeClasses = "bg-indigo-600 text-white shadow-md";
  const inactiveClasses = "bg-gray-700 text-gray-300 hover:bg-gray-600";
  const disabledClasses = "bg-gray-800 text-gray-500 cursor-not-allowed";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${disabled ? disabledClasses : (isActive ? activeClasses : inactiveClasses)}`}
    >
      {children}
    </button>
  );
};

export const ConfigOptions: React.FC<ConfigOptionsProps> = ({
  aspectRatio,
  setAspectRatio,
  resolution,
  setResolution,
  enableSound,
  setEnableSound,
  disabled
}) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-6">
      <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">Configuration</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Aspect Ratio</label>
        <div className="flex space-x-2">
          <OptionButton onClick={() => setAspectRatio('16:9')} isActive={aspectRatio === '16:9'} disabled={disabled}>16:9</OptionButton>
          <OptionButton onClick={() => setAspectRatio('9:16')} isActive={aspectRatio === '9:16'} disabled={disabled}>9:16</OptionButton>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Resolution</label>
        <div className="flex space-x-2">
          <OptionButton onClick={() => setResolution('720p')} isActive={resolution === '720p'} disabled={disabled}>720p</OptionButton>
          <OptionButton onClick={() => setResolution('1080p')} isActive={resolution === '1080p'} disabled={disabled}>1080p</OptionButton>
        </div>
      </div>

      <div>
        <label className="flex items-center space-x-3 cursor-pointer">
          <span className="text-sm font-medium text-gray-300">Sound</span>
          <div className="relative">
            <input type="checkbox" className="sr-only peer" checked={enableSound} onChange={(e) => setEnableSound(e.target.checked)} disabled={disabled} />
            <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-focus:ring-4 peer-focus:ring-indigo-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
          </div>
        </label>
      </div>
    </div>
  );
};
