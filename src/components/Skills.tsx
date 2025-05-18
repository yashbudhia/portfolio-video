"use client";

import { motion } from "framer-motion";

// Skills are now hardcoded in the JSX for exact layout control

// Experience data is now hardcoded in the JSX for exact layout control

export default function Skills() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="py-16 md:py-24 relative border-t border-b border-white/10 bg-black" id="skills">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Silver circular gradient at bottom - only 25% visible */}
        <div className="absolute bottom-[-600px] left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-r from-gray-400/15 via-gray-300/20 to-gray-200/15 blur-3xl opacity-30"></div>

        {/* Grid background with proper containment and enhanced edge blurring */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-grid-small opacity-[0.15] mask-radial-faded"
            style={{
              transform: 'scale(1.02)',
              backgroundSize: '20px 20px', /* Smaller grid cells */
              backgroundImage: `
                linear-gradient(to right, rgba(255, 255, 255, 0.25) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255, 255, 255, 0.25) 1px, transparent 1px)
              `
            }}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section title */}
        <div className="flex justify-center mb-12">
          <motion.div
            className="text-center relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-[1px] bg-white/20"></div>
              <h2 className="text-sm uppercase tracking-widest text-white/60">Skills & Experience</h2>
              <div className="w-12 h-[1px] bg-white/20"></div>
            </div>
          </motion.div>
        </div>

        {/* Skills tags */}
        <motion.div
          className="mb-20 bg-[#111111] rounded-lg p-6 border border-white/5 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-wrap gap-3 justify-center">
            <div className="flex flex-wrap gap-3 justify-center">
              <span className="px-4 py-2 bg-black rounded-full text-sm">Adobe Premiere Pro</span>
              <span className="px-4 py-2 bg-black rounded-full text-sm">After Effects</span>
              <span className="px-4 py-2 bg-black rounded-full text-sm">Animations</span>
              <span className="px-4 py-2 bg-black rounded-full text-sm">Photoshop</span>
              <span className="px-4 py-2 bg-black rounded-full text-sm">Illustrator</span>
              <span className="px-4 py-2 bg-black rounded-full text-sm">React</span>
            </div>
            <div className="flex flex-wrap gap-3 justify-center mt-3">
              <span className="px-4 py-2 bg-black rounded-full text-sm">NodeJS</span>
              <span className="px-4 py-2 bg-black rounded-full text-sm">ElectronJS</span>
              <span className="px-4 py-2 bg-black rounded-full text-sm">Product Design </span>
              <span className="px-4 py-2 bg-black rounded-full text-sm">UI/UX Design</span>
              <span className="px-4 py-2 bg-black rounded-full text-sm">Motion Graphics</span>
              <span className="px-4 py-2 bg-black rounded-full text-sm">AI</span>
            </div>
          </div>
        </motion.div>

        {/* Experience timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="space-y-8">
            <motion.div variants={itemVariants} className="grid grid-cols-3 border-b border-white/10 pb-6">
              <div className="col-span-1">
                <div className="text-white/80">Freelance</div>
              </div>
              <div className="col-span-1">
                <div className="text-white/80">yashbudhia.com</div>
              </div>
              <div className="col-span-1 text-right">
                <div className="text-white/60">May 2025 - Present</div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-3 border-b border-white/10 pb-6 pt-6">
              <div className="col-span-1">
                <div className="text-white/80">Frontend Developer</div>
              </div>
              <div className="col-span-1">
                <div className="text-white/80">Emmetra</div>
              </div>
              <div className="col-span-1 text-right">
                <div className="text-white/60">Nov 2024 - April 2025</div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-3 pt-6">
              <div className="col-span-1">
                <div className="text-white/80">Video Editor</div>
              </div>
              <div className="col-span-1">
                <div className="text-white/80">Musirhythm</div>
              </div>
              <div className="col-span-1 text-right">
                <div className="text-white/60">June 2018 - Aug 2022</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
