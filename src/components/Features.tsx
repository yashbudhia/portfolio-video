"use client";

import { motion } from "framer-motion";

const features = [
  {
    id: 1,
    title: "Minimalist Design",
    description: "Clean and modern aesthetics that focus on content and user experience.",
  },
  {
    id: 2,
    title: "Smooth Animations",
    description: "Elegant transitions and animations that enhance the overall feel of your website.",
  },
  {
    id: 3,
    title: "Responsive Layout",
    description: "Fully responsive design that works beautifully on all devices and screen sizes.",
  },
  {
    id: 4,
    title: "Easy Customization",
    description: "Simple to customize and adapt to your brand's unique style and requirements.",
  },
];

export default function Features() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  };

  return (
    <section className="py-20 md:py-32 px-6 md:px-12 bg-[#0f0f0f]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-medium mb-4">Key Features</h2>
          <p className="text-muted max-w-xl mx-auto">
            Our template comes with everything you need to create a stunning website.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              className="bg-[#161616] p-8 rounded-lg"
              variants={itemVariants}
            >
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-6">
                <span className="text-xl font-medium">{feature.id}</span>
              </div>
              <h3 className="text-xl font-medium mb-3">{feature.title}</h3>
              <p className="text-muted">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
