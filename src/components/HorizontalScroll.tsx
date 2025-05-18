"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import VideoPlayer from "./VideoPlayer";
import Link from "next/link";
import React from "react";

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  videoUrl?: string;
  videoThumbnail?: string;
  client?: string;
  duration?: string;
  year?: number;
  featured?: boolean;
}

const projects: Project[] = [
  {
    id: 1,
    title: "SwipeSense- The clothing app of the future",
    category: "SaaS Launch",
    client: "SwipeSense",
    description: "Promotional launch video for SwipeSense, a clothing app that allows users to swipe through clothes and find the perfect fit. Visit: https://swipesense.in",
    image: "/image.jpg", // Local image
    videoThumbnail: "/swipesense.png", // Local image
    videoUrl: "/swipsesense-final.mp4", // Local video file
    year: 2025,
    featured: true,
  }
];

// Get unique categories from projects
const categories = ["All", ...Array.from(new Set(projects.map(project => project.category)))];

export default function HorizontalScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const slideRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragStart, setDragStart] = useState(0);
  const [dragEnd, setDragEnd] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // Filter projects when activeFilter changes
  useEffect(() => {
    if (activeFilter === "All") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.category === activeFilter));
    }
    // Reset current index when filter changes
    setCurrentIndex(0);
  }, [activeFilter]);

  // Function to navigate to the next slide
  const nextSlide = () => {
    if (currentIndex < filteredProjects.length - 1 && !isTransitioning) {
      setIsTransitioning(true);
      setDirection('right');

      // Small delay to allow animation to start
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);

        // Reset transition state after animation completes
        setTimeout(() => {
          setIsTransitioning(false);
          setDirection(null);
        }, 400);
      }, 50);
    } else if (!isTransitioning) {
      // Loop back to the first slide
      setIsTransitioning(true);
      setDirection('right');

      setTimeout(() => {
        setCurrentIndex(0);

        setTimeout(() => {
          setIsTransitioning(false);
          setDirection(null);
        }, 400);
      }, 50);
    }
  };

  // Function to navigate to the previous slide
  const prevSlide = () => {
    if (currentIndex > 0 && !isTransitioning) {
      setIsTransitioning(true);
      setDirection('left');

      // Small delay to allow animation to start
      setTimeout(() => {
        setCurrentIndex(currentIndex - 1);

        // Reset transition state after animation completes
        setTimeout(() => {
          setIsTransitioning(false);
          setDirection(null);
        }, 400);
      }, 50);
    } else if (!isTransitioning) {
      // Loop to the last slide
      setIsTransitioning(true);
      setDirection('left');

      setTimeout(() => {
        setCurrentIndex(filteredProjects.length - 1);

        setTimeout(() => {
          setIsTransitioning(false);
          setDirection(null);
        }, 400);
      }, 50);
    }
  };

  // Add global mouse/touch event listeners for dragging
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDragging && !isTransitioning) {
        e.preventDefault();
        setDragEnd(e.clientX);
        const dragDistance = e.clientX - dragStart;
        setDragOffset(dragDistance * 0.5);
      }
    };

    const handleGlobalMouseUp = () => {
      if (isDragging && !isTransitioning) {
        const dragDistance = dragEnd - dragStart;
        setDragOffset(0);

        if (Math.abs(dragDistance) > 50) {
          if (dragDistance > 0) {
            setDirection('left');
            prevSlide();
          } else {
            setDirection('right');
            nextSlide();
          }
        }

        setIsDragging(false);
      }
    };

    const handleGlobalTouchMove = (e: TouchEvent) => {
      if (isDragging && !isTransitioning) {
        setDragEnd(e.touches[0].clientX);
        const dragDistance = e.touches[0].clientX - dragStart;
        setDragOffset(dragDistance * 0.5);
      }
    };

    const handleGlobalTouchEnd = () => {
      if (isDragging && !isTransitioning) {
        const dragDistance = dragEnd - dragStart;
        setDragOffset(0);

        if (Math.abs(dragDistance) > 30) {
          if (dragDistance > 0) {
            setDirection('left');
            prevSlide();
          } else {
            setDirection('right');
            nextSlide();
          }
        }

        setIsDragging(false);
      }
    };

    // Add event listeners to document
    document.addEventListener('mousemove', handleGlobalMouseMove);
    document.addEventListener('mouseup', handleGlobalMouseUp);
    document.addEventListener('touchmove', handleGlobalTouchMove);
    document.addEventListener('touchend', handleGlobalTouchEnd);

    // Clean up
    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('touchmove', handleGlobalTouchMove);
      document.removeEventListener('touchend', handleGlobalTouchEnd);
    };
  }, [isDragging, isTransitioning, dragStart, dragEnd]);



  // Function to handle mouse down event
  const handleMouseDown = (e: React.MouseEvent) => {
    // Prevent if we're in transition
    if (isTransitioning) return;

    // Prevent default to avoid text selection
    e.preventDefault();

    setIsDragging(true);
    setDragStart(e.clientX);
    setDragEnd(e.clientX); // Initialize dragEnd to prevent undefined on quick clicks
    setDragOffset(0);
  };

  // Function to handle mouse move event
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && !isTransitioning) {
      e.preventDefault(); // Always prevent default during drag

      setDragEnd(e.clientX);

      // Calculate drag distance and update offset for visual feedback
      const dragDistance = e.clientX - dragStart;
      setDragOffset(dragDistance * 0.5); // Scale down the movement for smoother effect
    }
  };

  // Function to handle mouse up event
  const handleMouseUp = () => {
    if (isDragging && !isTransitioning) {
      const dragDistance = dragEnd - dragStart;

      // Reset drag offset
      setDragOffset(0);

      // If drag distance is significant, change slide
      if (Math.abs(dragDistance) > 50) {
        if (dragDistance > 0) {
          setDirection('left');
          prevSlide();
        } else {
          setDirection('right');
          nextSlide();
        }
      }

      setIsDragging(false);
    }
  };

  // Function to handle touch start event
  const handleTouchStart = (e: React.TouchEvent) => {
    // Prevent if we're in transition
    if (isTransitioning) return;

    setIsDragging(true);
    setDragStart(e.touches[0].clientX);
    setDragEnd(e.touches[0].clientX); // Initialize dragEnd to prevent undefined on quick taps
    setDragOffset(0);
  };

  // Function to handle touch move event
  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging && !isTransitioning) {
      // For touch events on mobile, we need to be careful with preventDefault
      // as it can block scrolling, but we still want to handle the drag

      setDragEnd(e.touches[0].clientX);

      // Calculate drag distance and update offset for visual feedback
      const dragDistance = e.touches[0].clientX - dragStart;

      // If drag is significant, prevent default page scrolling
      if (Math.abs(dragDistance) > 10) {
        e.preventDefault();
      }

      setDragOffset(dragDistance * 0.5); // Scale down the movement for smoother effect
    }
  };

  // Function to handle touch end event
  const handleTouchEnd = () => {
    if (isDragging && !isTransitioning) {
      const dragDistance = dragEnd - dragStart;

      // Reset drag offset
      setDragOffset(0);

      // If drag distance is significant, change slide
      if (Math.abs(dragDistance) > 30) { // Lower threshold for touch
        if (dragDistance > 0) {
          setDirection('left');
          prevSlide();
        } else {
          setDirection('right');
          nextSlide();
        }
      }

      setIsDragging(false);
    }
  };

  // Function to navigate to a specific slide
  const goToSlide = (index: number) => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setDirection(index > currentIndex ? 'right' : 'left');

      setTimeout(() => {
        setCurrentIndex(index);

        setTimeout(() => {
          setIsTransitioning(false);
          setDirection(null);
        }, 400);
      }, 50);
    }
  };

  // Function to parse description text and render links
  const renderDescriptionWithLinks = (description: string) => {
    // Regular expression to find URLs in text
    const urlRegex = /(https?:\/\/[^\s]+)/g;

    // Split the description by URLs
    const parts = description.split(urlRegex);

    // Find all URLs in the description
    const urls = description.match(urlRegex) || [];

    // Combine parts and URLs
    return parts.map((part, index) => {
      // If this part is a URL (matches with a URL we found)
      if (urls.indexOf(part) !== -1) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 hover:underline transition-colors"
            onClick={(e) => e.stopPropagation()} // Prevent card click when clicking the link
          >
            {part}
          </a>
        );
      }
      // Regular text
      return part;
    });
  };

  return (
    <section
      ref={containerRef}
      className="py-16 md:py-24 relative border-t border-b border-white/10"
      id="work"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Silver circular gradient at bottom - only 25% visible */}
        <div className="absolute bottom-[-600px] left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-r from-gray-400/15 via-gray-300/20 to-gray-200/15 blur-3xl opacity-30"></div>
        <div className="absolute top-0 left-1/3 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900/50 via-gray-900/20 to-transparent opacity-70"></div>
      </div>

      <div className="px-6 md:px-12 mb-10 relative z-10 text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-medium mb-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          SaaS Launch Videos
        </motion.h2>
        <motion.p
          className="text-muted max-w-lg mb-6 mx-auto text-sm md:text-base"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Showcasing my portfolio of high-impact SaaS product launch and demo videos
        </motion.p>

        <motion.div
          className="flex flex-wrap gap-3 mb-8 justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-4 py-2 text-sm rounded-full border transition-all duration-300 ${
                activeFilter === category
                  ? "bg-white text-black border-white"
                  : "bg-transparent text-white/70 border-white/20 hover:border-white/50"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>
      </div>

      {filteredProjects.length === 0 ? (
        <div className="flex items-center justify-center h-[45vh] w-full">
          <p className="text-white/60 text-lg">No videos found in this category</p>
        </div>
      ) : (
        <>
          {/* Carousel container */}
          <div
            className="relative w-full overflow-hidden px-4 md:px-12"
          >
            <div className={`flex justify-center items-center ${isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'}`}>
              {/* Left navigation arrow */}
              <button
                onClick={prevSlide}
                className="absolute left-4 md:left-12 z-10 w-12 h-12 rounded-full bg-black/70 backdrop-blur-sm flex items-center justify-center hover:bg-white/10 transition-colors border border-white/20"
                aria-label="Previous slide"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>

              {/* Carousel slides */}
              <div className="flex items-center justify-center w-full">
                {/* Previous slide (partially visible) */}
                {currentIndex > 0 && (
                  <motion.div
                    className="w-[20vw] md:w-[18vw] h-[25vh] opacity-40 scale-90 mr-6 hidden md:block overflow-hidden rounded-lg cursor-pointer"
                    animate={{
                      opacity: isTransitioning && direction === 'left' ? 0.8 : 0.4,
                      scale: isTransitioning && direction === 'left' ? 0.95 : 0.9,
                      x: isTransitioning && direction === 'left' ? 20 : 0
                    }}
                    transition={{ duration: 0.4 }}
                    onClick={() => prevSlide()}
                  >
                    <div
                      className="w-full h-full bg-cover bg-center bg-gray-900"
                      style={{
                        backgroundImage: `url("${filteredProjects[currentIndex - 1].videoThumbnail || filteredProjects[currentIndex - 1].image}")`,
                        backgroundSize: 'cover'
                      }}
                    />
                  </motion.div>
                )}

                {/* Current slide (center, fully visible) */}
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    ref={slideRef}
                    key={filteredProjects[currentIndex].id}
                    className="w-[70vw] md:w-[45vw] lg:w-[35vw] flex-shrink-0 z-20"
                    custom={direction}
                    initial={{
                      opacity: 0,
                      scale: 0.9,
                      x: direction === 'right' ? 100 : direction === 'left' ? -100 : 0
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      x: dragOffset // Apply the drag offset for visual feedback
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.9,
                      x: direction === 'right' ? -100 : direction === 'left' ? 100 : 0
                    }}
                    transition={{
                      duration: isDragging ? 0 : 0.4, // No transition during dragging for immediate feedback
                      ease: "easeOut"
                    }}
                  >
                    <div className="block group">
                      <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden select-none">
                        {/* Draggable area - top part of card */}
                        <div
                          className={`relative ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
                          onMouseDown={(e) => {
                            // Only handle drag in the image/top area
                            e.preventDefault();
                            e.stopPropagation();

                            // Set dragging state
                            setIsDragging(true);
                            setDragStart(e.clientX);
                            setDragEnd(e.clientX);
                            setDragOffset(0);
                          }}
                          onTouchStart={(e) => {
                            // Only handle drag in the image/top area
                            setIsDragging(true);
                            setDragStart(e.touches[0].clientX);
                            setDragEnd(e.touches[0].clientX);
                            setDragOffset(0);
                          }}
                        >
                          <div
                            className={`h-[35vh] bg-cover bg-center bg-gray-900 group-hover:scale-105 transition-transform duration-500 ${isDragging ? 'scale-[0.98]' : ''}`}
                            style={{
                              backgroundImage: `url("${filteredProjects[currentIndex].videoThumbnail || filteredProjects[currentIndex].image}")`,
                              backgroundSize: 'cover'
                            }}
                          />

                          {/* Play button overlay */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <button
                              className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 cursor-pointer"
                              onClick={(e) => {
                                // Prevent opening video if we're dragging
                                if (isDragging) {
                                  e.preventDefault();
                                  return;
                                }
                                // Open video player
                                e.stopPropagation();
                                setIsVideoOpen(true);
                              }}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white" className="ml-1">
                                <polygon points="5 3 19 12 5 21 5 3"></polygon>
                              </svg>
                            </button>
                          </div>

                          {/* Duration badge */}
                          {filteredProjects[currentIndex].duration && (
                            <div className="absolute bottom-4 right-4 px-2 py-1 bg-black/60 backdrop-blur-sm rounded text-xs text-white/90">
                              {filteredProjects[currentIndex].duration}
                            </div>
                          )}

                          {/* Featured badge */}
                          {filteredProjects[currentIndex].featured && (
                            <div className="absolute top-4 left-4 px-3 py-1 bg-white text-black text-xs font-medium rounded-full">
                              Featured
                            </div>
                          )}
                        </div>

                        {/* Content area - not draggable, clickable */}
                        <div
                          className="block cursor-pointer"
                          onClick={(e) => {
                            // Prevent opening video if we're dragging
                            if (isDragging) {
                              e.preventDefault();
                              return;
                            }
                            // Open video player
                            setIsVideoOpen(true);
                          }}
                        >
                          <div className="p-6">
                            <div className="flex justify-between items-start mb-3">
                              <span className="text-xs text-muted uppercase tracking-wider">{filteredProjects[currentIndex].category}</span>
                              {filteredProjects[currentIndex].year && (
                                <span className="text-xs text-white/60">{filteredProjects[currentIndex].year}</span>
                              )}
                            </div>

                            <h3 className="text-xl md:text-2xl font-medium mb-2 group-hover:text-white transition-colors">
                              {filteredProjects[currentIndex].title}
                            </h3>

                            {filteredProjects[currentIndex].client && (
                              <div className="text-sm text-white/80 mb-3">
                                Client: {filteredProjects[currentIndex].client}
                              </div>
                            )}

                            <p className="text-muted text-sm">
                              {renderDescriptionWithLinks(filteredProjects[currentIndex].description)}
                            </p>

                            <div className="mt-6 flex justify-between items-center">
                              <span className="text-xs text-white/60">Watch Video</span>
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/60 group-hover:translate-x-1 transition-transform">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                <polyline points="12 5 19 12 12 19"></polyline>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Next slide (partially visible) */}
                {currentIndex < filteredProjects.length - 1 && (
                  <motion.div
                    className="w-[20vw] md:w-[18vw] h-[25vh] opacity-40 scale-90 ml-6 hidden md:block overflow-hidden rounded-lg cursor-pointer"
                    animate={{
                      opacity: isTransitioning && direction === 'right' ? 0.8 : 0.4,
                      scale: isTransitioning && direction === 'right' ? 0.95 : 0.9,
                      x: isTransitioning && direction === 'right' ? -20 : 0
                    }}
                    transition={{ duration: 0.4 }}
                    onClick={() => nextSlide()}
                  >
                    <div
                      className="w-full h-full bg-cover bg-center bg-gray-900"
                      style={{
                        backgroundImage: `url("${filteredProjects[currentIndex + 1].videoThumbnail || filteredProjects[currentIndex + 1].image}")`,
                        backgroundSize: 'cover'
                      }}
                    />
                  </motion.div>
                )}
              </div>

              {/* Right navigation arrow */}
              <button
                onClick={nextSlide}
                className="absolute right-4 md:right-12 z-10 w-12 h-12 rounded-full bg-black/70 backdrop-blur-sm flex items-center justify-center hover:bg-white/10 transition-colors border border-white/20"
                aria-label="Next slide"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          </div>

          {/* Project description text below the carousel */}
          <AnimatePresence mode="wait">
            <motion.div
              className="text-center mt-6 px-6 md:px-0"
              initial={{
                opacity: 0,
                y: 10,
                x: direction === 'right' ? 20 : direction === 'left' ? -20 : 0
              }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              exit={{
                opacity: 0,
                y: -10,
                x: direction === 'right' ? -20 : direction === 'left' ? 20 : 0
              }}
              transition={{ duration: 0.4 }}
              key={`desc-${filteredProjects[currentIndex].id}`}
            >
              <h3 className="text-base md:text-lg font-medium mb-1">
                {filteredProjects[currentIndex].title}
              </h3>
              <p className="text-muted text-xs md:text-sm max-w-md mx-auto">
                {renderDescriptionWithLinks(filteredProjects[currentIndex].description)}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Navigation dots */}
          <div className="flex justify-center mt-6 gap-2">
            {filteredProjects.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === index
                    ? "bg-white w-8"
                    : "bg-white/30 hover:bg-white/50 w-2"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Drag instruction */}
          <div className="text-center mt-4 text-white/40 text-xs flex flex-col items-center">
            <span className="mb-1">Drag to navigate</span>
            <div className="flex items-center gap-1 mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-60">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
              <div className="w-16 h-1 bg-white/20 rounded-full"></div>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-60">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </div>
          </div>
        </>
      )}

      {/* Video Player Modal */}
      <VideoPlayer
        videoUrl={filteredProjects[currentIndex]?.videoUrl || ""}
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
      />
    </section>
  );
}
