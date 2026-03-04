import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CinematicShowcase2 = () => {
  const sectionRef = useRef(null);
  const laptopRef = useRef(null);
  const mobileRef = useRef(null);
  const titleRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.from(titleRef.current.children, {
        y: 100,
        opacity: 0,
        stagger: 0.2,
        duration: 1.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      });

      // Laptop animation
      gsap.from(laptopRef.current, {
        y: 150,
        opacity: 0,
        scale: 0.8,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        }
      });

      // Mobile animation
      gsap.from(mobileRef.current, {
        y: 200,
        x: 50,
        opacity: 0,
        scale: 0.9,
        duration: 1.5,
        delay: 0.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        }
      });

      // Parallax effect
      gsap.to(laptopRef.current, {
        y: -50,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        }
      });

      gsap.to(mobileRef.current, {
        y: -80,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        }
      });

      // Glow pulse
      gsap.to(glowRef.current, {
        scale: 1.2,
        opacity: 0.15,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-gradient-to-b from-black via-[#0a0a0a] to-black overflow-hidden flex items-center py-20">
      {/* Grain */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")' }} 
      />

      {/* Animated Glow */}
      <div ref={glowRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-radial from-purple-500/10 via-blue-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="absolute top-3/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="absolute left-1/4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />
        <div className="absolute right-1/4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />
      </div>

      <div className="relative max-w-[1600px] mx-auto px-6 lg:px-12 w-full">
        {/* Top Labels */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex justify-between mb-16 text-[9px] tracking-[0.25em] text-white/30 uppercase"
        >
          <span>Featured Project — 2024</span>
          <span className="hidden md:block">Full-Stack Development</span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Typography */}
          <div className="space-y-10">
            <div ref={titleRef} className="space-y-2">
              <div className="overflow-hidden">
                <h2 className="text-[clamp(3rem,10vw,7rem)] font-bold leading-[0.9] tracking-tighter text-white">
                  Modern
                </h2>
              </div>
              <div className="overflow-hidden">
                <h2 className="text-[clamp(3rem,10vw,7rem)] font-bold leading-[0.9] tracking-tighter bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                  Portfolio
                </h2>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-px bg-gradient-to-r from-purple-500 to-transparent" />
                <p className="text-xs tracking-[0.15em] text-white/40 uppercase">Case Study</p>
              </div>
              <p className="text-white/60 leading-relaxed max-w-lg">
                A premium portfolio website showcasing modern web development with React, GSAP animations, 
                and a full-stack CMS backend. Features include dynamic content management, authentication, 
                and responsive design.
              </p>
              <div className="flex flex-wrap gap-2 pt-4">
                {['React', 'GSAP', 'Node.js', 'MongoDB', 'Tailwind'].map((tech) => (
                  <span key={tech} className="px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-xs text-white/70 hover:bg-white/10 transition-colors">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: 3D Mockups */}
          <div className="relative h-[600px] lg:h-[700px]">
            {/* Spotlight */}
            <div className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-bl from-purple-500/20 to-transparent rounded-full blur-3xl" />

            {/* Laptop */}
            <div ref={laptopRef} className="absolute top-10 left-0 lg:left-10 w-[80%] z-10">
              <div className="relative">
                {/* Screen Glow */}
                <div className="absolute inset-0 bg-gradient-to-t from-purple-500/30 via-blue-500/20 to-transparent blur-2xl scale-105" />
                
                {/* Laptop Frame */}
                <div className="relative bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-t-2xl p-3 shadow-2xl">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl" />
                  
                  <div className="bg-black rounded-xl overflow-hidden aspect-[16/10] border border-zinc-700">
                    <div className="w-full h-full bg-gradient-to-br from-zinc-900 via-black to-zinc-900 flex items-center justify-center">
                      <div className="text-center space-y-4 p-8">
                        <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                          <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                          </svg>
                        </div>
                        <div className="space-y-2">
                          <div className="h-2 bg-white/10 rounded w-32 mx-auto" />
                          <div className="h-2 bg-white/5 rounded w-24 mx-auto" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Base */}
                <div className="h-2 bg-gradient-to-b from-zinc-700 to-zinc-800 rounded-b-2xl shadow-xl" />
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[85%] h-6 bg-black/50 blur-xl rounded-full" />
              </div>
            </div>

            {/* Mobile */}
            <div ref={mobileRef} className="absolute bottom-10 right-0 lg:right-10 w-[32%] z-20">
              <div className="relative">
                {/* Phone Glow */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-500/30 to-purple-500/20 blur-xl" />
                
                {/* Phone Frame */}
                <div className="relative bg-zinc-900 rounded-[2.5rem] p-2 shadow-2xl border border-zinc-800">
                  <div className="bg-black rounded-[2.2rem] overflow-hidden aspect-[9/19.5]">
                    <div className="w-full h-full bg-gradient-to-b from-zinc-900 to-black flex flex-col items-center justify-center p-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 mb-3" />
                      <div className="space-y-1.5 w-full">
                        <div className="h-1.5 bg-white/10 rounded w-3/4 mx-auto" />
                        <div className="h-1.5 bg-white/5 rounded w-1/2 mx-auto" />
                      </div>
                    </div>
                  </div>
                  {/* Notch */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-5 bg-black rounded-full" />
                </div>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[70%] h-4 bg-black/50 blur-lg rounded-full" />
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-20 right-0 w-2 h-2 bg-purple-500/50 rounded-full blur-sm"
            />
            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute bottom-32 left-0 w-1.5 h-1.5 bg-blue-500/50 rounded-full blur-sm"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CinematicShowcase2;
