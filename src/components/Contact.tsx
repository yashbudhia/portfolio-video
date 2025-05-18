"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import GlowButton from "./ui/GlowButton";

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  const gradientControls1 = useAnimation();
  const borderControls = useAnimation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
    // Reset status when user starts typing again
    if (submitStatus !== 'idle') {
      setSubmitStatus('idle');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // First try AJAX submission
      const response = await fetch('https://formsubmit.co/ajax/yeshbudhia@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Origin': window.location.origin,
        },
        mode: 'cors',
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          message: formState.message,
          _subject: `New message from ${formState.name}`,
          _captcha: 'false', // Disable captcha for better UX
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        // Reset form
        setFormState({
          name: "",
          email: "",
          message: "",
        });
        setSubmitStatus('success');
        // Show success message
        alert("Thanks for your message! I'll get back to you soon.");
      } else {
        throw new Error('Form submission returned unsuccessful status');
      }
    } catch (error) {
      console.error("Error submitting form via AJAX:", error);

      // Fallback to traditional form submission if AJAX fails
      try {
        if (formRef.current) {
          // Create a hidden form and submit it
          const fallbackForm = document.createElement('form');
          fallbackForm.method = 'POST';
          fallbackForm.action = 'https://formsubmit.co/yeshbudhia@gmail.com';
          fallbackForm.style.display = 'none';

          // Add form fields
          for (const [key, value] of Object.entries(formState)) {
            const input = document.createElement('input');
            input.type = 'text';
            input.name = key;
            input.value = value as string;
            fallbackForm.appendChild(input);
          }

          // Add subject field
          const subjectInput = document.createElement('input');
          subjectInput.type = 'hidden';
          subjectInput.name = '_subject';
          subjectInput.value = `New message from ${formState.name}`;
          fallbackForm.appendChild(subjectInput);

          // Add captcha field
          const captchaInput = document.createElement('input');
          captchaInput.type = 'hidden';
          captchaInput.name = '_captcha';
          captchaInput.value = 'false';
          fallbackForm.appendChild(captchaInput);

          // Add redirect field to come back to the site
          const redirectInput = document.createElement('input');
          redirectInput.type = 'hidden';
          redirectInput.name = '_next';
          redirectInput.value = window.location.href;
          fallbackForm.appendChild(redirectInput);

          // Append to body and submit
          document.body.appendChild(fallbackForm);
          fallbackForm.submit();

          // Reset form state
          setFormState({
            name: "",
            email: "",
            message: "",
          });

          setSubmitStatus('success');
          return; // Exit early as we're redirecting
        }
      } catch (fallbackError) {
        console.error("Fallback submission also failed:", fallbackError);
      }

      setSubmitStatus('error');
      alert("Something went wrong with the form submission. Please try again later or contact directly via email.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animate gradients and borders
  useEffect(() => {
    const animateElements = async () => {
      await Promise.all([
        gradientControls1.start({
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.35, 0.3],
          transition: { duration: 8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }
        }),
        borderControls.start({
          opacity: [0.05, 0.15, 0.05],
          transition: { duration: 5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }
        })
      ]);
    };

    animateElements();
  }, [gradientControls1, borderControls]);

  return (
    <section className="relative py-24 md:py-36 px-6 md:px-12 border-t border-white/10 bg-black overflow-hidden" id="contact">
      {/* Circular gradient - positioned at bottom with only upper half visible */}
      <motion.div
        className="absolute bottom-[-300px] left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-r from-gray-400/15 via-amber-200/10 to-gray-300/15 blur-3xl opacity-30 pointer-events-none"
        animate={gradientControls1}
      ></motion.div>

      {/* Silver border lines */}
      <motion.div
        className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-400/20 to-transparent"
        animate={borderControls}
      ></motion.div>
      <motion.div
        className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-300/20 to-transparent"
        animate={borderControls}
      ></motion.div>
      <motion.div
        className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-gray-400/20 to-transparent"
        animate={borderControls}
      ></motion.div>
      <motion.div
        className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-gray-300/20 to-transparent"
        animate={borderControls}
      ></motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-medium mb-4">Get in Touch</h2>
            <p className="text-gray-400 max-w-md mb-8">
              Have a project in mind? Let's talk about how I can help bring your ideas to life.
            </p>

            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium uppercase tracking-wider mb-2 text-gray-300">Email</h4>
                <a href="mailto:yeshbudhia@gmail.com" className="text-lg hover:underline text-gray-200">
                  yeshbudhia@gmail.com
                </a>
              </div>

              <div>
                <h4 className="text-sm font-medium uppercase tracking-wider mb-2 text-gray-300">Phone</h4>
                <a href="tel:+917879310513" className="text-lg hover:underline text-gray-200">
                  +91 7879310513
                </a>
              </div>

              <div>
                <h4 className="text-sm font-medium uppercase tracking-wider mb-2 text-gray-300">Location</h4>
                <address className="text-lg not-italic text-gray-200">
                  Bangalore, India
                </address>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-300">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full bg-[#0a0a0a] backdrop-blur-sm border border-gray-700/50 rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-gray-400/30 transition-all duration-300 text-gray-200"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full bg-[#0a0a0a] backdrop-blur-sm border border-gray-700/50 rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-gray-400/30 transition-all duration-300 text-gray-200"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-300">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  rows={5}
                  className="w-full bg-[#0a0a0a] backdrop-blur-sm border border-gray-700/50 rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-gray-400/30 transition-all duration-300 text-gray-200"
                />
              </div>

              {submitStatus === 'success' && (
                <div className="py-2 px-4 bg-green-900/20 border border-green-500/30 rounded-lg text-green-300">
                  Message sent successfully! I'll get back to you soon.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="py-2 px-4 bg-red-900/20 border border-red-500/30 rounded-lg text-red-300">
                  There was an error sending your message. Please try again or <a href="mailto:yeshbudhia@gmail.com?subject=Contact%20from%20Website" className="underline hover:text-red-200">contact me directly via email</a>.
                </div>
              )}

              <GlowButton
                type="submit"
                variant="primary"
                size="md"
                glowIntensity="high"
                disabled={isSubmitting}
                icon={
                  isSubmitting ? (
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-80">
                      <path d="M7 17L17 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M7 7H17V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )
                }
              >
                {isSubmitting ? "Sending..." : "Contact Me"}
              </GlowButton>

              {/* Hidden honeypot field to prevent spam */}
              <div className="hidden">
                <input type="text" name="_honey" tabIndex={-1} autoComplete="off" />
              </div>
            </form>

            {/* Subtle form decoration */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-full bg-gradient-to-r from-gray-500/5 via-amber-300/5 to-gray-400/5 blur-xl opacity-50 pointer-events-none"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
