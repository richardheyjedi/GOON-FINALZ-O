import React, { useEffect, useState } from 'react';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [slideUp, setSlideUp] = useState(false);

  useEffect(() => {
    // Random increment logic to simulate real data processing
    const interval = setInterval(() => {
      setProgress((prev) => {
        const increment = Math.floor(Math.random() * 5) + 1; // Random jump between 1-5%
        const next = prev + increment;
        
        if (next >= 100) {
          clearInterval(interval);
          // Wait a moment at 100% before triggering the slide up
          setTimeout(() => {
            setSlideUp(true);
            // Wait for the slide-up animation (800ms) to finish before unmounting
            setTimeout(onComplete, 800);
          }, 200);
          return 100;
        }
        return next;
      });
    }, 40); // Update speed

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-[9999] bg-black text-white flex flex-col justify-between p-4 md:p-8 transition-transform duration-700 ease-[cubic-bezier(0.87,0,0.13,1)] ${slideUp ? '-translate-y-full' : 'translate-y-0'}`}
    >
      {/* Top Status Bar */}
      <div className="w-full flex justify-between items-start font-mono text-[10px] md:text-xs uppercase tracking-widest opacity-70">
         <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
            Goon_System_v2.4
         </div>
         <div>{progress === 100 ? 'SYSTEM_READY' : 'INITIALIZING...'}</div>
      </div>

      {/* Main Percentage Counter */}
      <div className="flex-1 flex items-center justify-center relative overflow-hidden">
         <div className="relative">
            {/* Main Text - Pixel Font */}
            <span className="text-[12vw] md:text-[18vw] leading-none font-pixel select-none block text-center">
              {progress}%
            </span>
            {/* Decorative Glitch Duplicate */}
            <span 
              className="absolute top-0 left-0 text-[12vw] md:text-[18vw] leading-none font-pixel text-white opacity-20 select-none animate-pulse hidden md:block text-center w-full" 
              style={{ clipPath: 'inset(40% 0 61% 0)', transform: 'translateX(-4px)' }}
            >
              {progress}%
            </span>
         </div>
      </div>

      {/* Bottom Progress Bar & Info */}
      <div className="w-full">
         <div className="flex justify-between items-end mb-2">
            <span className="font-mono text-[10px] uppercase text-gray-500">Loading Assets</span>
            <span className="font-mono text-[10px] uppercase text-gray-500">{progress}/100</span>
         </div>
         <div className="w-full h-1 bg-white/20 relative overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-white transition-all duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            />
         </div>
         <div className="flex justify-between items-center mt-2 font-mono text-[10px] uppercase text-gray-500">
             <span>Memory: {Math.floor(progress * 12.4)} MB</span>
             <span>ID: GOON-X24</span>
         </div>
      </div>
    </div>
  );
};

export default Preloader;