"use client";

export default function BasicVideoBackground() {
  return (
    <div
      className="fixed top-0 left-0 w-full h-full -z-10"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        overflow: 'hidden'
      }}
    >
      {/* Dark overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'black',
          opacity: 0.5,
          zIndex: 1
        }}
      ></div>

      {/* Video */}
      <video
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.6,
          zIndex: 0
        }}
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/editing.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
