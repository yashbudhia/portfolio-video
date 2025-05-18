"use client";

import { useEffect, useRef } from "react";

export default function DirectVideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error("Video autoplay failed:", error);
      });
    }
  }, []);

  return (
    <>
      <style jsx global>{`
        .video-background {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
          overflow: hidden;
        }

        .video-background video {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.6;
        }

        .video-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
        }
      `}</style>

      <div className="video-background">
        <div className="video-overlay"></div>
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/editing.mp4" type="video/mp4" />
        </video>
      </div>
    </>
  );
}
