/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from "react";
import { ArrowLeftRight } from "lucide-react";

interface BeforeAfterImageProps {
  beforeUrl: string;
  afterUrl: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export default function BeforeAfterImage({
  beforeUrl,
  afterUrl,
  beforeLabel = "Before (Raw Site)",
  afterLabel = "After (Engineered Pad)",
}: BeforeAfterImageProps) {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage (0 - 100)
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    // Only drag when mouse is pressed (or hover fallback depends on design preference, drag is standard)
    if (e.buttons === 1) {
      handleMove(e.clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onClick={(e) => handleMove(e.clientX)}
      className="relative w-full h-[320px] rounded-[2px] overflow-hidden cursor-ew-resize select-none border border-neutral-850 shadow-lg"
    >
      {/* 1. After Image (Background) */}
      <img 
        src={afterUrl} 
        alt="After site preparation" 
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />
      <div className="absolute bottom-3 right-3 bg-[#1C1C1C]/95 text-[#E67E22] text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-[2px] border border-white/10 z-10 font-bold">
        {afterLabel}
      </div>

      {/* 2. Before Image (Foreground, Clipped) */}
      <div 
        className="absolute inset-y-0 left-0 overflow-hidden pointer-events-none"
        style={{ width: `${sliderPosition}%` }}
      >
        <img 
          src={beforeUrl} 
          alt="Before site preparation" 
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover max-w-none pointer-events-none"
          style={{ width: containerRef.current?.getBoundingClientRect().width }}
        />
        <div className="absolute bottom-3 left-3 bg-[#E67E22]/95 text-white text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-[2px] border border-white/10 z-10 font-bold">
          {beforeLabel}
        </div>
      </div>

      {/* 3. Slider Handle Line & Circle */}
      <div 
        className="absolute inset-y-0 w-1 bg-[#E67E22] pointer-events-none flex items-center justify-center"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="w-10 h-10 bg-[#E67E22] border-2 border-white rounded-full flex items-center justify-center text-white shadow-xl flex-shrink-0 -ml-0.5">
          <ArrowLeftRight className="w-4 h-4" />
        </div>
      </div>

      {/* 4. Drag Instructions overlay */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-[#1C1C1C]/90 backdrop-blur-md px-3.5 py-1 text-[10px] font-mono uppercase tracking-wider text-zinc-350 pointer-events-none rounded-[2px] border border-white/10">
        ← Drag slider to compare →
      </div>
    </div>
  );
}
