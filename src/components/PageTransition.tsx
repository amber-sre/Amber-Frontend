import React from 'react';
import { motion } from 'framer-motion';

interface PageTransitionProps {
  isActive: boolean;
  isSplitting: boolean;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ isActive, isSplitting }) => {
  if (!isActive) return null;

  return (
    <div 
      aria-hidden="true"
      className="fixed inset-0 z-[999999] pointer-events-auto flex overflow-hidden select-none"
    >
      {/* Left Shutter: White panel carrying AMBER to the left */}
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: isSplitting ? '-100%' : '0%' }}
        transition={{
          duration: 0.65,
          ease: [0.76, 0, 0.24, 1], // Cinematic luxury shutter curve
        }}
        className="w-1/2 h-full bg-white flex items-center justify-end pr-2 sm:pr-4 md:pr-6 lg:pr-8 overflow-hidden shadow-[15px_0_35px_rgba(0,0,0,0.15)]"
      >
        <span className="font-black text-4xl sm:text-6xl md:text-8xl lg:text-[10vw] xl:text-[11vw] tracking-[-0.07em] text-[#d97809] uppercase leading-none">
          AMBER
        </span>
      </motion.div>

      {/* Right Shutter: White panel carrying ENGINE to the right */}
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: isSplitting ? '100%' : '0%' }}
        transition={{
          duration: 0.65,
          ease: [0.76, 0, 0.24, 1],
        }}
        className="w-1/2 h-full bg-white flex items-center justify-start pl-2 sm:pl-4 md:pl-6 lg:pl-8 overflow-hidden shadow-[-15px_0_35px_rgba(0,0,0,0.15)]"
      >
        <span className="font-black text-4xl sm:text-6xl md:text-8xl lg:text-[10vw] xl:text-[11vw] tracking-[-0.07em] text-[#0c0a09] uppercase leading-none">
          ENGINE
        </span>
      </motion.div>
    </div>
  );
};
