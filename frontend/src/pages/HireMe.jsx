import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(ScrollTrigger, TextPlugin);
import { 
  Code, 
  Palette, 
  Server, 
  Smartphone,
  MessageCircle,
  CheckCircle,
  Rocket,
  Settings,
  Mail,
  Linkedin,
  Github,
  MessageSquare,
  Send,
  User,
  DollarSign,
  Briefcase
} from 'lucide-react';
import SEO from '../components/SEO';

const HireMe = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    budget: '',
    message: ''
  });

  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const processRef = useRef(null);
  const formRef = useRef(null);
  const contactRef = useRef(null);
  const cursorRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Custom cursor
    const cursor = cursorRef.current;
    const moveCursor = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      gsap.to(cursor, {
        x: e.clientX - 10,
        y: e.clientY - 10,
        duration: 0.1,
        ease: "power2.out"
      });
    };
    
    window.addEventListener('mousemove', moveCursor);

    // Hero animations
    const tl = gsap.timeline();
    tl.from('.hero-title', {
      y: 100,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out"
    })
    .from('.hero-subtitle', {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.5")
    .from('.hero-badge', {
      scale: 0,
      opacity: 0,
      duration: 0.6,
      ease: "back.out(1.7)"
    }, "-=0.8");

    // Floating elements
    gsap.to('.floating-1', {
      y: -20,
      rotation: 5,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });

    gsap.to('.floating-2', {
      y: 15,
      rotation: -3,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });

    // Services cards animation
    gsap.fromTo('.service-card', {
      y: 100,
      opacity: 0,
      scale: 0.8
    }, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: servicesRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    // Process timeline animation
    gsap.fromTo('.process-step', {
      x: -100,
      opacity: 0
    }, {
      x: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.3,
      ease: "power2.out",
      scrollTrigger: {
        trigger: processRef.current,
        start: "top 70%",
        toggleActions: "play none none reverse"
      }
    });

    // Form animation
    gsap.fromTo('.form-element', {
      y: 50,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: formRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });

    // Contact links animation
    gsap.fromTo('.contact-link', {
      scale: 0,
      rotation: 180
    }, {
      scale: 1,
      rotation: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: contactRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const services = [
    {
      icon: Code,
      title: 'Full Stack Web Development',
      description: 'Complete web applications with modern frontend and scalable backend solutions.',
      color: '#61DAFB',
      features: ['React/Next.js', 'Node.js', 'Database Design', 'API Development']
    },
    {
      icon: Palette,
      title: 'Frontend Development',
      description: 'Responsive, interactive user interfaces using React, Next.js, and modern CSS.',
      color: '#FF6B6B',
      features: ['React', 'TypeScript', 'Tailwind CSS', 'Animations']
    },
    {
      icon: Server,
      title: 'Backend Development',
      description: 'Robust APIs, databases, and server-side logic with Node.js and cloud services.',
      color: '#4ECDC4',
      features: ['Node.js', 'Express', 'MongoDB', 'AWS']
    },
    {
      icon: Smartphone,
      title: 'UI/UX Design',
      description: 'User-centered design with modern aesthetics and seamless user experience.',
      color: '#45B7D1',
      features: ['Figma', 'Prototyping', 'User Research', 'Design Systems']
    }
  ];

  const workProcess = [
    {
      step: 1,
      title: 'Requirement Discussion',
      description: 'Understanding your vision, goals, and project requirements in detail.',
      icon: MessageCircle,
      features: ['Project Scope', 'Timeline Planning', 'Budget Discussion', 'Goal Setting']
    },
    {
      step: 2,
      title: 'Planning & Design',
      description: 'Creating wireframes, mockups, and technical architecture planning.',
      icon: Settings,
      features: ['Wireframing', 'UI/UX Design', 'Architecture', 'Prototyping']
    },
    {
      step: 3,
      title: 'Development',
      description: 'Building your project with clean code, best practices, and regular updates.',
      icon: Code,
      features: ['Clean Code', 'Regular Updates', 'Testing', 'Code Review']
    },
    {
      step: 4,
      title: 'Deployment',
      description: 'Testing, optimization, and launching your project to production.',
      icon: Rocket,
      features: ['Performance Testing', 'Optimization', 'Launch', 'Support']
    }
  ];

  const contactLinks = [
    {
      name: 'Email',
      icon: Mail,
      link: 'mailto:durgeshkumar@example.com',
      color: '#EA4335',
      description: 'Send me an email'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      link: 'https://linkedin.com/in/durgeshkumar',
      color: '#0077B5',
      description: 'Connect professionally'
    },
    {
      name: 'GitHub',
      icon: Github,
      link: 'https://github.com/DURGESH103',
      color: '#333',
      description: 'View my code'
    },
    {
      name: 'WhatsApp',
      icon: MessageSquare,
      link: 'https://wa.me/1234567890',
      color: '#25D366',
      description: 'Quick chat'
    }
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Animate button
    gsap.to('.submit-btn', {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1
    });
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Success animation
    gsap.to('.form-element', {
      y: -20,
      opacity: 0.5,
      duration: 0.3,
      stagger: 0.05
    });
    
    setTimeout(() => {
      gsap.to('.form-element', {
        y: 0,
        opacity: 1,
        duration: 0.3,
        stagger: 0.05
      });
      setFormData({ name: '', email: '', projectType: '', budget: '', message: '' });
      setIsLoading(false);
    }, 1000);
  };

  return (
    <>
      <SEO 
        title="Hire Me - Durgesh Kumar | Full Stack Developer"
        description="Ready to bring your ideas to life? Hire me for full stack web development, UI/UX design, and modern web solutions."
        keywords="hire developer, full stack developer, web development services, freelance developer"
      />
      
      <div className="min-h-screen bg-[#0d0d0d] text-white relative overflow-hidden">
        {/* Custom Cursor */}
        <div 
          ref={cursorRef}
          className="fixed w-5 h-5 bg-gold/30 rounded-full pointer-events-none z-50 mix-blend-difference hidden lg:block"
          style={{ transform: 'translate(-50%, -50%)' }}
        />

        {/* Animated Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="floating-1 absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-gold/10 to-blue-500/10 rounded-full blur-3xl"></div>
          <div className="floating-2 absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-gold/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-conic from-gold/5 via-transparent to-blue-500/5 rounded-full blur-3xl animate-spin" style={{ animationDuration: '20s' }}></div>
        </div>
        {/* Section 1 - Enhanced Introduction */}
        <section ref={heroRef} className="pt-32 pb-20 relative min-h-screen flex items-center">
          <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
            <div className="hero-badge inline-block px-6 py-3 bg-gradient-to-r from-gold/20 to-transparent border border-gold/30 rounded-full text-gold font-medium mb-8 backdrop-blur-sm">
              <span className="flex items-center gap-2">
                🚀 Available for Projects
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </span>
            </div>
            
            <h1 className="hero-title font-serif text-6xl md:text-8xl font-bold mb-8 leading-tight">
              Let's Build Something
              <br />
              <span className="bg-gradient-to-r from-gold via-yellow-400 to-gold bg-clip-text text-transparent animate-pulse">
                Extraordinary
              </span>
            </h1>
            
            <p className="hero-subtitle text-xl md:text-2xl text-gray-300 leading-relaxed max-w-4xl mx-auto mb-12">
              Hi, I'm <span className="text-gold font-bold">Durgesh Kumar</span>, a Full Stack Developer specializing in 
              <span className="text-blue-400"> modern web applications</span>, 
              <span className="text-green-400"> responsive UI design</span>, and 
              <span className="text-purple-400"> scalable backend systems</span>.
            </p>

            {/* Animated Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
              {[
                { number: '50+', label: 'Projects' },
                { number: '5+', label: 'Years' },
                { number: '100%', label: 'Satisfaction' },
                { number: '24/7', label: 'Support' }
              ].map((stat, index) => (
                <div key={index} className="hero-stat glass p-4 rounded-xl border border-gold/20 hover:border-gold/40 transition-all duration-300">
                  <div className="text-2xl md:text-3xl font-bold text-gold mb-1">{stat.number}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-gold/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-gold rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </section>

        {/* Section 2 - Enhanced Services */}
        <section ref={servicesRef} className="py-24 bg-gradient-to-b from-[#141414] to-[#0d0d0d] relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <div className="inline-block px-4 py-2 bg-gold/10 text-gold rounded-full text-sm font-medium border border-gold/20 mb-6">
                💼 What I Offer
              </div>
              <h2 className="font-serif text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                My <span className="text-gold">Services</span>
              </h2>
              <p className="text-gray-400 text-xl max-w-3xl mx-auto">
                Comprehensive development solutions tailored to bring your vision to life
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="service-card group relative"
                  onMouseEnter={() => {
                    gsap.to(`.service-${index}`, {
                      scale: 1.05,
                      rotationY: 5,
                      duration: 0.3,
                      ease: "power2.out"
                    });
                  }}
                  onMouseLeave={() => {
                    gsap.to(`.service-${index}`, {
                      scale: 1,
                      rotationY: 0,
                      duration: 0.3,
                      ease: "power2.out"
                    });
                  }}
                >
                  <div className={`service-${index} glass p-8 rounded-3xl border border-white/5 hover:border-gold/30 transition-all duration-500 relative overflow-hidden backdrop-blur-xl`}>
                    {/* Animated Background */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl"
                      style={{ background: `radial-gradient(circle at 30% 30%, ${service.color}, transparent 70%)` }}
                    />
                    
                    {/* Floating Particles */}
                    <div className="absolute inset-0 overflow-hidden rounded-3xl">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-1 h-1 bg-gold/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          style={{
                            left: `${20 + i * 15}%`,
                            top: `${10 + i * 20}%`,
                            animationDelay: `${i * 0.2}s`
                          }}
                        />
                      ))}
                    </div>
                    
                    <div className="relative z-10">
                      <div className="w-20 h-20 mb-6 flex items-center justify-center rounded-2xl bg-gradient-to-br from-gold/20 to-transparent border border-gold/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                        <service.icon className="w-10 h-10 text-gold" />
                      </div>
                      
                      <h3 className="text-2xl font-bold mb-4 group-hover:text-gold transition-colors duration-300">
                        {service.title}
                      </h3>
                      
                      <p className="text-gray-400 leading-relaxed mb-6">
                        {service.description}
                      </p>

                      {/* Service Features */}
                      <div className="flex flex-wrap gap-2">
                        {service.features?.map((feature, i) => (
                          <span key={i} className="px-3 py-1 bg-gold/10 text-gold text-xs rounded-full border border-gold/20">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3 - Enhanced Work Process */}
        <section ref={processRef} className="py-24 bg-gradient-to-b from-[#0d0d0d] to-[#141414] relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <div className="inline-block px-4 py-2 bg-gold/10 text-gold rounded-full text-sm font-medium border border-gold/20 mb-6">
                ⚙️ How I Work
              </div>
              <h2 className="font-serif text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                My <span className="text-gold">Process</span>
              </h2>
              <p className="text-gray-400 text-xl max-w-3xl mx-auto">
                A proven methodology that ensures exceptional results every time
              </p>
            </div>

            {/* Timeline */}
            <div className="relative">
              {/* Connecting Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-gold via-gold/50 to-transparent hidden lg:block"></div>
              
              <div className="space-y-16">
                {workProcess.map((process, index) => (
                  <div key={index} className={`process-step flex items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} flex-col lg:gap-16 gap-8`}>
                    {/* Content */}
                    <div className="flex-1 lg:text-right lg:pr-8">
                      <div className="glass p-8 rounded-3xl border border-white/5 hover:border-gold/30 transition-all duration-500 backdrop-blur-xl">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-gold to-[#E6C78F] rounded-full flex items-center justify-center text-black font-bold text-lg">
                            {process.step}
                          </div>
                          <h3 className="text-2xl font-bold text-gold">
                            {process.title}
                          </h3>
                        </div>
                        <p className="text-gray-400 leading-relaxed text-lg">
                          {process.description}
                        </p>
                        
                        {/* Process Features */}
                        <div className="mt-6 flex flex-wrap gap-2">
                          {process.features?.map((feature, i) => (
                            <span key={i} className="px-3 py-1 bg-gold/10 text-gold text-xs rounded-full border border-gold/20">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {/* Icon */}
                    <div className="relative">
                      <div className="w-24 h-24 bg-gradient-to-br from-gold/20 to-transparent border-2 border-gold rounded-full flex items-center justify-center backdrop-blur-xl">
                        <process.icon className="w-12 h-12 text-gold" />
                      </div>
                      {/* Pulse Animation */}
                      <div className="absolute inset-0 w-24 h-24 bg-gold/20 rounded-full animate-ping"></div>
                    </div>
                    
                    {/* Spacer for opposite side */}
                    <div className="flex-1 hidden lg:block"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 4 - Enhanced Contact Form */}
        <section ref={formRef} className="py-24 bg-gradient-to-b from-[#141414] to-[#0d0d0d] relative">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-2 bg-gold/10 text-gold rounded-full text-sm font-medium border border-gold/20 mb-6">
                💬 Let's Talk
              </div>
              <h2 className="font-serif text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Start Your <span className="text-gold">Project</span>
              </h2>
              <p className="text-gray-400 text-xl max-w-3xl mx-auto">
                Ready to bring your vision to life? Let's discuss your project and create something amazing together.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="form-element relative group">
                    <User className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-gold transition-colors" />
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-4 bg-black/30 border border-white/10 rounded-2xl focus:border-gold/50 focus:outline-none transition-all duration-300 text-white placeholder-gray-400 backdrop-blur-sm hover:bg-black/40"
                      required
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-gold/10 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                  
                  <div className="form-element relative group">
                    <Mail className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-gold transition-colors" />
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-4 bg-black/30 border border-white/10 rounded-2xl focus:border-gold/50 focus:outline-none transition-all duration-300 text-white placeholder-gray-400 backdrop-blur-sm hover:bg-black/40"
                      required
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-gold/10 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="form-element relative group">
                    <Briefcase className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-gold transition-colors" />
                    <select
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-4 bg-black/30 border border-white/10 rounded-2xl focus:border-gold/50 focus:outline-none transition-all duration-300 text-white backdrop-blur-sm hover:bg-black/40"
                      required
                    >
                      <option value="" className="bg-black">Select Project Type</option>
                      <option value="full-stack" className="bg-black">Full Stack Development</option>
                      <option value="frontend" className="bg-black">Frontend Development</option>
                      <option value="backend" className="bg-black">Backend Development</option>
                      <option value="ui-ux" className="bg-black">UI/UX Design</option>
                    </select>
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-gold/10 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                  
                  <div className="form-element relative group">
                    <DollarSign className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-gold transition-colors" />
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-4 bg-black/30 border border-white/10 rounded-2xl focus:border-gold/50 focus:outline-none transition-all duration-300 text-white backdrop-blur-sm hover:bg-black/40"
                      required
                    >
                      <option value="" className="bg-black">Select Budget Range</option>
                      <option value="1k-5k" className="bg-black">$1,000 - $5,000</option>
                      <option value="5k-10k" className="bg-black">$5,000 - $10,000</option>
                      <option value="10k-25k" className="bg-black">$10,000 - $25,000</option>
                      <option value="25k+" className="bg-black">$25,000+</option>
                    </select>
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-gold/10 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                </div>

                <div className="form-element relative group">
                  <textarea
                    name="message"
                    placeholder="Tell me about your project vision, goals, and any specific requirements..."
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="6"
                    className="w-full p-4 bg-black/30 border border-white/10 rounded-2xl focus:border-gold/50 focus:outline-none transition-all duration-300 text-white placeholder-gray-400 resize-none backdrop-blur-sm hover:bg-black/40"
                    required
                  ></textarea>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-gold/10 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="submit-btn w-full py-4 bg-gradient-to-r from-gold to-[#E6C78F] text-black font-bold rounded-2xl hover:shadow-[0_0_40px_rgba(198,169,114,0.6)] transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden group disabled:opacity-70"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#E6C78F] to-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10 flex items-center gap-3">
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </span>
                </button>
              </form>

              {/* Contact Info */}
              <div className="space-y-8">
                <div className="glass p-8 rounded-3xl border border-white/5 backdrop-blur-xl">
                  <h3 className="text-2xl font-bold mb-6 text-gold">Why Choose Me?</h3>
                  <div className="space-y-4">
                    {[
                      { icon: CheckCircle, text: 'Fast Response Time (< 24 hours)' },
                      { icon: CheckCircle, text: 'Regular Project Updates' },
                      { icon: CheckCircle, text: '100% Client Satisfaction' },
                      { icon: CheckCircle, text: 'Post-Launch Support' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <item.icon className="w-5 h-5 text-green-400" />
                        <span className="text-gray-300">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="glass p-8 rounded-3xl border border-white/5 backdrop-blur-xl">
                  <h3 className="text-2xl font-bold mb-6 text-gold">Project Timeline</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Small Projects</span>
                      <span className="text-gold font-semibold">1-2 weeks</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Medium Projects</span>
                      <span className="text-gold font-semibold">3-6 weeks</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Large Projects</span>
                      <span className="text-gold font-semibold">2-3 months</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5 - Enhanced Direct Contact Links */}
        <section ref={contactRef} className="py-24 bg-gradient-to-b from-[#0d0d0d] to-black relative">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-2 bg-gold/10 text-gold rounded-full text-sm font-medium border border-gold/20 mb-6">
                📞 Quick Connect
              </div>
              <h2 className="font-serif text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Get In <span className="text-gold">Touch</span>
              </h2>
              <p className="text-gray-400 text-xl max-w-3xl mx-auto">
                Prefer direct contact? Choose your preferred communication channel
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {contactLinks.map((contact, index) => (
                <a
                  key={index}
                  href={contact.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link group relative"
                  onMouseEnter={() => {
                    gsap.to(`.contact-${index}`, {
                      scale: 1.1,
                      rotationY: 10,
                      duration: 0.3,
                      ease: "power2.out"
                    });
                  }}
                  onMouseLeave={() => {
                    gsap.to(`.contact-${index}`, {
                      scale: 1,
                      rotationY: 0,
                      duration: 0.3,
                      ease: "power2.out"
                    });
                  }}
                >
                  <div className={`contact-${index} glass p-8 rounded-3xl border border-white/5 hover:border-gold/30 transition-all duration-500 text-center backdrop-blur-xl relative overflow-hidden`}>
                    {/* Animated Background */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl"
                      style={{ background: `radial-gradient(circle at center, ${contact.color}, transparent 70%)` }}
                    />
                    
                    <div className="relative z-10">
                      <div 
                        className="w-20 h-20 mx-auto mb-6 rounded-3xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 backdrop-blur-sm"
                        style={{ backgroundColor: `${contact.color}20`, border: `2px solid ${contact.color}30` }}
                      >
                        <contact.icon 
                          className="w-10 h-10" 
                          style={{ color: contact.color }}
                        />
                      </div>
                      <h3 className="font-bold text-lg group-hover:text-gold transition-colors duration-300">
                        {contact.name}
                      </h3>
                      <p className="text-gray-400 text-sm mt-2">
                        {contact.description}
                      </p>
                    </div>

                    {/* Hover Effect */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </a>
              ))}
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <div className="glass p-8 rounded-3xl border border-white/5 backdrop-blur-xl max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold mb-4 text-gold">Ready to Start?</h3>
                <p className="text-gray-300 mb-6">
                  I'm excited to learn about your project and help bring your vision to life. 
                  Let's create something amazing together!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="#form" 
                    className="px-8 py-3 bg-gradient-to-r from-gold to-[#E6C78F] text-black font-semibold rounded-full hover:shadow-[0_0_30px_rgba(198,169,114,0.4)] transition-all duration-300"
                  >
                    Start Project
                  </a>
                  <a 
                    href="mailto:durgeshkumar@example.com" 
                    className="px-8 py-3 border border-gold/30 text-gold font-semibold rounded-full hover:bg-gold/10 transition-all duration-300"
                  >
                    Quick Email
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HireMe;