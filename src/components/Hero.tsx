"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import SmokeVideoBackground from "./SmokeVideoBackground";
import GlowButton from "./ui/GlowButton";
export default function Hero() {



  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.2,
        duration: 0.8,
        ease: [0.23, 1, 0.32, 1],
      },
    }),
  };

  return (
    <section className="min-h-[80vh] flex flex-col justify-center items-center px-6 pt-20 pb-10 md:px-12 relative overflow-hidden">
      {/* Smoke Video Background */}
      <div className="opacity-40">
        <SmokeVideoBackground />
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Available for work badge */}
        <motion.div
          className="inline-flex items-center mb-5"
          initial="hidden"
          animate="visible"
          variants={fadeInUpVariants}
          custom={0}
        >
          <span className="w-2.5 h-2.5 bg-green-500 rounded-full mr-2"></span>
          <span className="text-sm">available for work</span>
        </motion.div>

        {/* Profile Image with dark circular background */}
        <motion.div
          className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-8 relative"
          initial="hidden"
          animate="visible"
          variants={fadeInUpVariants}
          custom={1}
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.3 }
          }}
        >
          {/* Dark circular background */}
          <div className="absolute inset-0 rounded-full bg-black/80 transform scale-105"></div>

          {/* Glow effect that appears on hover */}
          <motion.div
            className="absolute inset-0 rounded-full bg-white/5"
            initial={{ opacity: 0 }}
            whileHover={{
              opacity: 1,
              boxShadow: '0 0 25px rgba(255, 255, 255, 0.3)'
            }}
            transition={{ duration: 0.3 }}
          ></motion.div>

          {/* Main profile image */}
          <Image
            src="/image.jpg"
            alt="Yash Budhia"
            width={160}
            height={160}
            className="rounded-full object-cover relative transition-all duration-300"
            style={{ boxShadow: '0 0 15px rgba(0, 0, 0, 0.5)' }}
          />
        </motion.div>

        {/* Name and Title */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUpVariants}
          custom={2}
          className="mb-4"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-2">
            Yash <span className="font-bold italic">Budhia</span>
          </h1>
          <p className="text-base md:text-lg text-gray-400">
            Software Launch/Promo Video expert.
          </p>
        </motion.div>

        {/* Social Icons */}
        <motion.div
          className="flex justify-center space-x-5 mb-8"
          initial="hidden"
          animate="visible"
          variants={fadeInUpVariants}
          custom={3}
        >
          {/* X (Twitter) */}
          <Link href="https://x.com/yashbudhiya" className="w-10 h-10 rounded-full flex items-center justify-center border border-white/20 hover:bg-white/10 transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
            </svg>
          </Link>
          {/* Instagram */}
          <Link href="#" className="w-10 h-10 rounded-full flex items-center justify-center border border-white/20 hover:bg-white/10 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </Link>
          {/* YouTube */}
          <Link href="https://youtube.com/@yashbudhia" className="w-10 h-10 rounded-full flex items-center justify-center border border-white/20 hover:bg-white/10 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
              <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
            </svg>
          </Link>
        </motion.div>

        {/* Contact Button with GlowButton */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUpVariants}
          custom={4}
          className="relative"
        >
          <GlowButton
            href="#contact"
            variant="primary"
            size="md"
            glowIntensity="high"
            className="cursor-pointer hover:cursor-pointer"
            icon={
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-80">
                <path d="M7 17L17 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7 7H17V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            }
          >
            Contact Me
          </GlowButton>

          {/* Bottom glow that expands on hover */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[60%] h-[40px]">
            <div className="w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent blur-xl opacity-30"></div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator with click functionality */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        onClick={() => {
          // Scroll to the next section smoothly
          const nextSection = document.querySelector('section:nth-of-type(2)');
          if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-bounce">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <polyline points="19 12 12 19 5 12"></polyline>
        </svg>
      </motion.div>

      {/* Circular gradient at the bottom */}
      <motion.div
        className="absolute bottom-[-200px] left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-gradient-to-r from-gray-400/15 via-gray-300/20 to-gray-400/15 blur-3xl opacity-30 pointer-events-none"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.25, 0.35, 0.25]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      ></motion.div>

      {/* Silver circular gradient with 25% appearing from top */}
      <div className="absolute bottom-0 left-0 right-0 h-[25vh] pointer-events-none">
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] h-[100%] opacity-90"
          style={{
            background: 'radial-gradient(ellipse at center bottom, rgba(200, 200, 200, 0.2) 0%, rgba(100, 100, 100, 0.1) 40%, transparent 70%)',
            transform: 'translateY(25%)'
          }}
        ></div>
      </div>

      {/* Background wave effect */}
      <div className="absolute bottom-0 left-0 w-full h-[300px] opacity-20 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-gray-500/10 to-transparent"></div>
      </div>
    </section>
  );
}
