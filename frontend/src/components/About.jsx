import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const About = () => {
  const statsRef = useRef(null);
  const isInView = useInView(statsRef, { once: true });
  const [counts, setCounts] = useState({ projects: 0, clients: 0, years: 0 });

  const stats = [
    { label: 'Projects Completed', value: 150, key: 'projects' },
    { label: 'Happy Clients', value: 80, key: 'clients' },
    { label: 'Years Experience', value: 8, key: 'years' },
  ];

  useEffect(() => {
    if (isInView) {
      stats.forEach((stat) => {
        gsap.to(counts, {
          [stat.key]: stat.value, duration: 2, ease: 'power2.out',
          onUpdate: function () { setCounts({ ...this.targets()[0] }); }
        });
      });
    }
  }, [isInView]);

  return (
    <section id="about" className="py-32 px-6 bg-[#141414]">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <h2 className="font-serif text-5xl md:text-6xl font-bold mb-8">About <span className="text-[#C6A972]">Me</span></h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              I'm a passionate web designer and developer dedicated to creating exceptional digital experiences. With a keen eye for detail and a love for clean, elegant design, I transform ideas into reality.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              My approach combines aesthetic excellence with technical precision, ensuring every project not only looks stunning but performs flawlessly.
            </p>

            <div ref={statsRef} className="grid grid-cols-3 gap-8 mt-12">
              {stats.map((stat, i) => (
                <div key={i}>
                  <div className="text-4xl font-bold text-[#C6A972] mb-2">{Math.floor(counts[stat.key])}+</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative">
            <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} className="relative rounded-2xl overflow-hidden">
              <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=1000&fit=crop" alt="Workspace" className="w-full h-auto rounded-2xl" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d]/80 to-transparent" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
