import React, { useState, useRef, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface TiltEffectProps {
  children: ReactNode;
  className?: string;
  perspective?: number;
  tiltMaxAngleX?: number;
  tiltMaxAngleY?: number;
  scale?: number;
  transitionSpeed?: number;
  glareOpacity?: number;
  glareColor?: string;
  reset?: boolean;
}

export const TiltEffect: React.FC<TiltEffectProps> = ({
  children,
  className = '',
  perspective = 1000,
  tiltMaxAngleX = 8,
  tiltMaxAngleY = 8,
  scale = 1.05,
  transitionSpeed = 0.4,
  glareOpacity = 0.15,
  glareColor = "rgba(255, 255, 255, 0.75)",
  reset = true
}) => {
  const [tiltX, setTiltX] = useState(0);
  const [tiltY, setTiltY] = useState(0);
  const [glarePosition, setGlarePosition] = useState({ x: 0, y: 0 });
  
  const tiltRef = useRef<HTMLDivElement>(null);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tiltRef.current) return;
    
    const rect = tiltRef.current.getBoundingClientRect();
    
    // Calculate center of the element
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate mouse position relative to center
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    // Calculate rotation (reversed for natural feeling)
    const rotateX = tiltMaxAngleY * mouseY / (rect.height / 2);
    const rotateY = -tiltMaxAngleX * mouseX / (rect.width / 2);
    
    // Calculate glare position
    const glareX = (mouseX / rect.width) * 100;
    const glareY = (mouseY / rect.height) * 100;
    
    setTiltX(rotateX);
    setTiltY(rotateY);
    setGlarePosition({ x: glareX, y: glareY });
  };
  
  const handleMouseLeave = () => {
    if (reset) {
      setTiltX(0);
      setTiltY(0);
    }
  };
  
  return (
    <motion.div
      ref={tiltRef}
      className={`tilt-effect-wrapper ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        transformStyle: 'preserve-3d',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        // Set initial perspective value to make it animatable
        perspective: perspective
      }}
      animate={{
        rotateX: tiltX,
        rotateY: tiltY,
        scale: scale
        // Removed perspective from animate as it's now set in style
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
        duration: transitionSpeed
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
          transform: 'translateZ(0)'
        }}
      >
        {/* Glare effect */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `radial-gradient(
              circle at ${glarePosition.x}% ${glarePosition.y}%,
              ${glareColor} 0%,
              transparent 80%
            )`,
            opacity: glareOpacity,
            pointerEvents: 'none',
            mixBlendMode: 'overlay',
            zIndex: 1
          }}
        />
      </div>
      
      {/* Content container */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transform: 'translateZ(50px)',
          zIndex: 2
        }}
      >
        {children}
      </div>
    </motion.div>
  );
};

export default TiltEffect;