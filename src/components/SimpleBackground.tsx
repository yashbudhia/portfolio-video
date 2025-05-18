"use client";

import React from 'react';

export default function SimpleBackground() {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10">
      {/* Dark background */}
      <div className="absolute inset-0 bg-black"></div>
      
      {/* Simple gradient overlay */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(50, 50, 50, 0.8) 0%, rgba(0, 0, 0, 0.8) 100%)',
        }}
      ></div>
      
      {/* Static circles for visual interest */}
      <div 
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle at center, rgba(100, 100, 255, 0.5) 0%, rgba(50, 50, 150, 0) 70%)',
          filter: 'blur(40px)',
        }}
      ></div>
      
      <div 
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle at center, rgba(100, 100, 255, 0.5) 0%, rgba(50, 50, 150, 0) 70%)',
          filter: 'blur(40px)',
        }}
      ></div>
    </div>
  );
}
