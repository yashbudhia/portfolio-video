"use client";

import React, { useState, useEffect } from 'react';
import SimpleSmokeBackground from './SimpleSmokeBackground';

export default function FallbackBackground() {
  const [videoFailed, setVideoFailed] = useState(false);

  const handleVideoError = () => {
    console.log("Video failed to load, falling back to smoke animation");
    setVideoFailed(true);
  };

  return (
    <>
      {videoFailed ? (
        <SimpleSmokeBackground />
      ) : (
        <div className="fixed top-0 left-0 w-full h-full -z-10">
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black opacity-70 z-10"></div>

          {/* Video element with error handling */}
          <video
            className="absolute w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            onError={handleVideoError}
          >
            <source src="/editing.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </>
  );
}
