"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <section className="py-10 md:py-16 px-6 md:px-12 relative border-t border-white/10 overflow-hidden" id="about">
      {/* Dark background base - reduced opacity to make grid more visible */}
      <div className="absolute inset-0 bg-black/90" />

      {/* Silver gradient similar to reference image */}
      <div className="absolute inset-0">
        <div
          className="absolute left-0 right-0 bottom-0 h-[70%] opacity-30"
          style={{
            background: 'radial-gradient(ellipse at center bottom, rgba(200, 200, 200, 0.2) 0%, rgba(30, 30, 30, 0.1) 50%, transparent 100%)',
          }}
        />
      </div>

      {/* Grid background with proper containment and enhanced edge blurring */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-grid-small opacity-[0.2] mask-radial-faded"
          style={{
            transform: 'scale(1.02)',
            backgroundSize: '15px 15px', /* Smaller grid cells */
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.2) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.2) 1px, transparent 1px)
            `
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:pr-8"
          >
            <h2 className="text-3xl md:text-4xl font-medium mb-4">
              More about <span className="italic">myself</span>
            </h2>
            <p className="text-muted mb-4">
              Hi, I'm Yash Budhia, a passionate video producer specializing in
              high-quality SaaS launch videos that capture and retain viewer attention.
            </p>
            <p className="text-muted mb-6">
              In today's technological era, attention is the new oil. My videos are designed
              to leave a lasting impression, with viewers watching them an average of 3 times.
              I combine creative storytelling with technical expertise to deliver
              memorable videos that exceed client expectations.
            </p>

          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-full flex items-center justify-center lg:justify-end"
          >
            <motion.div
              className="relative w-[95%] md:w-[90%] lg:w-[95%] mx-auto lg:mr-0"
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.4, ease: "easeOut" }
              }}
            >
              {/* Silver gradient glow effect behind image */}
              <motion.div
                className="absolute -inset-1 bg-gradient-to-br from-gray-400/10 via-gray-300/5 to-gray-500/10 rounded-xl blur-md"
                initial={{ opacity: 0.5 }}
                whileHover={{
                  opacity: 1,
                  scale: 1.05,
                  filter: "blur(8px)"
                }}
                transition={{ duration: 0.4 }}
              ></motion.div>

              {/* Silver circular gradient at bottom */}
              <motion.div
                className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[120%] h-[200px] bg-gradient-to-t from-gray-400/20 via-gray-300/10 to-transparent rounded-full blur-xl opacity-30"
                whileHover={{
                  opacity: 0.5,
                  width: "130%",
                  height: "220px"
                }}
                transition={{ duration: 0.4 }}
              ></motion.div>

              {/* Image container with hover effect */}
              <div className="relative overflow-hidden rounded-lg border border-white/20 shadow-xl shadow-black/50 group">
                <Image
                  src="/editing2.png"
                  alt="Yash working on video production"
                  width={500}
                  height={250}
                  className="relative z-10 object-cover w-full h-auto aspect-[16/9] transition-transform duration-700 group-hover:scale-105"
                  style={{
                    transformOrigin: "center center"
                  }}
                />

                {/* Overlay that appears on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    <span className="text-sm font-medium"></span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
