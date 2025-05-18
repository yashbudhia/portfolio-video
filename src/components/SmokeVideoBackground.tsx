"use client";

import { useEffect, useRef } from "react";

export default function SmokeVideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Ensure video plays continuously
    const video = videoRef.current;
    if (video) {
      // Play the video
      const playVideo = () => {
        video.play().catch(err => {
          console.error("Failed to play video:", err);
          // Try again after a short delay
          setTimeout(playVideo, 1000);
        });
      };

      playVideo();

      // Add event listeners to ensure continuous playback
      video.addEventListener('ended', () => {
        // Reset the currentTime to slightly before the end to avoid black frames
        video.currentTime = 0;
        video.play();
      });

      // Handle timeupdate to prevent reaching the very end where black frames might be
      video.addEventListener('timeupdate', () => {
        // If we're near the end of the video (within last 0.2 seconds), loop back
        // This helps avoid any black frames that might appear at the very end
        if (video.duration > 0 && video.currentTime > video.duration - 0.2) {
          video.currentTime = 0;
        }
      });

      // Log when video starts playing
      video.addEventListener('playing', () => {
        console.log('Video is now playing');
      });

      // Log any errors
      video.addEventListener('error', (e) => {
        console.error('Video error:', e);
      });
    }
  }, []);

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
    }}>
      <video
        ref={videoRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.6
        }}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/editing.mp4" type="video/mp4" />
      </video>

      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.4)'
      }}></div>
    </div>
  );
}
