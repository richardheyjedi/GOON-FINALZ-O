import React, { ReactNode } from 'react';
import { X, Minus, Square } from 'lucide-react';

interface RetroWindowProps {
  title: string;
  children: ReactNode;
  className?: string;
  isAlert?: boolean;
}

const RetroWindow: React.FC<RetroWindowProps> = ({ title, children, className = '', isAlert = false }) => {
  return (
    <div className={`bg-white border-2 border-black shadow-hard flex flex-col ${className}`}>
      {/* Title Bar */}
      <div className={`
        flex items-center justify-between px-2 py-1 border-b-2 border-black
        ${isAlert ? 'bg-red-600 text-white' : 'bg-retro-blue text-white'}
      `}>
        <span className="font-bold text-sm tracking-widest uppercase truncate pr-4">
          {title}
        </span>
        <div className="flex space-x-1">
          <button aria-label="Minimize" title="Minimize" className="bg-retro-gray border border-black p-0.5 hover:bg-white transition-colors">
            <Minus size={10} className="text-black" />
          </button>
          <button aria-label="Maximize" title="Maximize" className="bg-retro-gray border border-black p-0.5 hover:bg-white transition-colors">
            <Square size={10} className="text-black" />
          </button>
          <button aria-label="Close" title="Close" className="bg-retro-gray border border-black p-0.5 hover:bg-red-500 hover:text-white transition-colors">
            <X size={10} className="text-black hover:text-white" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-grow overflow-hidden relative">
        {children}
      </div>
    </div>
  );
};

export default RetroWindow;