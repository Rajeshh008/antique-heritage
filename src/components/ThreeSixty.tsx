import React, { useState, useRef, useEffect } from 'react';
import { RotateCw, MoveHorizontal, ZoomIn, Compass } from 'lucide-react';

interface ThreeSixtyProps {
  imageUrl: string;
  productName: string;
}

export const ThreeSixty: React.FC<ThreeSixtyProps> = ({ imageUrl, productName }) => {
  const [rotationY, setRotationY] = useState(0);
  const [rotationX, setRotationX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [zoom, setZoom] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const rotationStartRef = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    rotationStartRef.current = { x: rotationY, y: rotationX };
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - dragStartRef.current.x;
    const deltaY = e.clientY - dragStartRef.current.y;
    
    // Convert drag pixel offset to degrees of rotation
    // 1px drag = 1.2 degrees Y rotation
    // Keep X rotation bounded between -15 and +15 degrees for realistic gallery display
    const newY = rotationStartRef.current.x + (deltaX * 1.2);
    const newX = Math.max(-15, Math.min(15, rotationStartRef.current.y - (deltaY * 0.4)));
    
    setRotationY(newY);
    setRotationX(newX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      dragStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      rotationStartRef.current = { x: rotationY, y: rotationX };
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    
    const deltaX = e.touches[0].clientX - dragStartRef.current.x;
    const deltaY = e.touches[0].clientY - dragStartRef.current.y;
    
    const newY = rotationStartRef.current.x + (deltaX * 1.2);
    const newX = Math.max(-15, Math.min(15, rotationStartRef.current.y - (deltaY * 0.4)));
    
    setRotationY(newY);
    setRotationX(newX);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  // Reset rotation to default view
  const handleReset = () => {
    setRotationY(0);
    setRotationX(0);
    setZoom(false);
  };

  // Format current degree for layout HUD
  const normalizedY = ((rotationY % 360) + 360) % 360;

  return (
    <div className="w-full max-w-2xl mx-auto bg-[#1E150F] border border-[#D4AF37]/30 rounded-lg p-6 md:p-8 shadow-2xl relative overflow-hidden flex flex-col items-center">
      {/* Decorative Golden Corners */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#D4AF37]/40 rounded-tl-md"></div>
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#D4AF37]/40 rounded-tr-md"></div>
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#D4AF37]/40 rounded-bl-md"></div>
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#D4AF37]/40 rounded-br-md"></div>

      {/* Header HUD */}
      <div className="w-full flex items-center justify-between border-b border-[#D4AF37]/15 pb-4 mb-6">
        <div className="flex items-center space-x-3 text-[#FAF7F2]">
          <Compass className="w-5 h-5 text-[#D4AF37]" />
          <div>
            <h4 className="font-luxury-serif text-sm md:text-base tracking-widest uppercase text-[#FAF7F2]">Interactive 360° Studio</h4>
            <p className="text-[10px] text-[#D4AF37]/75 uppercase tracking-[0.2em]">Phase 1 Sequence Simulator</p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-[10px] uppercase text-[#FAF7F2]/60 tracking-widest block">Rotation angle</span>
          <span className="font-mono text-sm text-[#D4AF37] font-semibold">{Math.round(normalizedY)}°</span>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        className={`w-full h-80 md:h-96 relative flex items-center justify-center cursor-grab active:cursor-grabbing select-none overflow-hidden bg-gradient-to-b from-[#120B06] to-[#251B12] rounded-md border border-[#D4AF37]/10 ${
          zoom ? 'h-96 md:h-[28rem]' : ''
        }`}
      >
        {/* Dynamic Studio Radial Light Highlight */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,transparent_70%)] pointer-events-none" />

        {/* The Rotated Object Wrapper */}
        <div
          className="relative w-64 h-64 md:w-80 md:h-80 transition-transform duration-100 ease-out flex items-center justify-center"
          style={{
            perspective: 800,
            transform: `rotateY(${rotationY}deg) rotateX(${rotationX}deg) scale(${zoom ? 1.3 : 1})`,
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Main Simulated 3D Image */}
          <img
            src={imageUrl}
            alt={productName}
            className="max-w-full max-h-full object-contain pointer-events-none drop-shadow-[0_20px_45px_rgba(0,0,0,0.85)] filter brightness-105"
            style={{
              backfaceVisibility: 'visible',
            }}
          />

          {/* Luxury Lens Reflection Overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#FAF7F2]/5 to-[#D4AF37]/10 mix-blend-overlay rounded-lg pointer-events-none" />
        </div>

        {/* Dynamic shadow system */}
        <div
          className="absolute bottom-10 w-44 h-5 bg-black/75 rounded-full filter blur-md pointer-events-none transition-transform duration-100"
          style={{
            transform: `scale(${1.2 - Math.abs(rotationX) / 100}) translateZ(-50px)`,
            opacity: 0.8 - Math.abs(rotationX) / 40,
          }}
        />

        {/* Drag Hint Indicator Overlay */}
        <div className="absolute bottom-4 left-4 bg-[#120B06]/85 border border-[#D4AF37]/20 rounded px-3 py-1.5 flex items-center space-x-2 text-[10px] uppercase text-[#D4AF37] tracking-widest pointer-events-none backdrop-blur-sm">
          <MoveHorizontal className="w-3.5 h-3.5 animate-pulse" />
          <span>Click & Drag to Rotate</span>
        </div>

        {/* Reset control */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleReset();
          }}
          className="absolute bottom-4 right-4 bg-[#120B06]/85 border border-[#D4AF37]/20 hover:bg-[#D4AF37] hover:text-[#120B06] rounded px-3 py-1.5 text-[10px] uppercase tracking-widest text-[#FAF7F2] transition-colors duration-300 font-medium cursor-pointer"
        >
          Reset View
        </button>
      </div>

      {/* Control Suite below */}
      <div className="w-full flex justify-between items-center mt-6 text-[#FAF7F2]">
        <div className="flex space-x-3">
          <button
            onClick={() => setZoom(!zoom)}
            className={`p-2.5 rounded-full border transition-all duration-300 ${
              zoom
                ? 'border-[#D4AF37] bg-[#D4AF37]/25 text-[#D4AF37]'
                : 'border-[#FAF7F2]/10 bg-[#FAF7F2]/5 hover:border-[#D4AF37] hover:text-[#D4AF37]'
            }`}
            title="Toggle Zoom"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              setRotationY(prev => prev + 45);
            }}
            className="p-2.5 rounded-full border border-[#FAF7F2]/10 bg-[#FAF7F2]/5 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-300"
            title="Rotate 45°"
          >
            <RotateCw className="w-4 h-4" />
          </button>
        </div>

        <span className="text-[10px] uppercase tracking-[0.2em] text-[#FAF7F2]/50 italic">
          High Fidelity 3D Render Emulation
        </span>
      </div>
    </div>
  );
};
