import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, Clock, MessageCircle, CheckCircle2, Zap } from 'lucide-react';
import SEO from '../components/SEO';

gsap.registerPlugin(ScrollTrigger);

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('');
  const [focusedField, setFocusedField] = useState(null);
  const formRef = useRef(null);
  const contactRef = useRef(null);
  const cursorRef = useRef(null);

  useEffect(() => {
    // Custom cursor
    const cursor = cursorRef.current;
    const moveCursor = (e) => {
      gsap.to(cursor, {
        x: e.clientX - 10,
        y: e.clientY - 10,
        duration: 0.1,
        ease: "power2.out"
      });
    };
    
    window.addEventListener('mousemove', moveCursor);

    // Form animation
    gsap.fromTo('.form-field', {
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

    // Contact cards animation
    gsap.fromTo('.contact-card', {
      x: 50,
      opacity: 0
    }, {
      x: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.2,
      ease: "power2.out",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    
    // Animate form submission
    gsap.to('.submit-btn', {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1
    });
    
    // Simulate sending
    setTimeout(() => {
      setStatus('success');
      
      // Success animation
      gsap.fromTo('.success-message', {
        scale: 0,
        opacity: 0
      }, {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: "back.out(1.7)"
      });
      
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus(''), 5000);
    }, 2000);
  };

  const contactInfo = [
    { 
      icon: Mail, 
      label: 'Email', 
      value: 'hello@durgeshkumar.dev', 
      href: 'mailto:hello@durgeshkumar.dev',
      description: 'Send me an email anytime',
      color: '#EA4335'
    },
    { 
      icon: Phone, 
      label: 'Phone', 
      value: '+1 234 567 8900', 
      href: 'tel:+12345678900',
      description: 'Call for urgent matters',
      color: '#34A853'
    },
    { 
      icon: MapPin, 
      label: 'Location', 
      value: 'New York, USA', 
      href: null,
      description: 'Available for remote work',
      color: '#FBBC04'
    },
    {
      icon: Clock,
      label: 'Response Time',
      value: '< 24 hours',
      href: null,
      description: 'Quick response guaranteed',
      color: '#4285F4'
    }
  ];

  const socialLinks = [
    { icon: Github, label: 'GitHub', href: 'https://github.com/DURGESH103', color: '#333' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/durgeshkumar', color: '#0077B5' },
    { icon: Twitter, label: 'Twitter', href: 'https://twitter.com/durgeshkumar', color: '#1DA1F2' },
    { icon: MessageCircle, label: 'Discord', href: 'https://discord.com', color: '#5865F2' }
  ];

  return (
    <>
      <SEO 
        title="Contact"
        description="Get in touch with Durgesh Kumar — Full Stack MERN Developer. Available for freelance projects, full-time roles, and collaborations. Fast response guaranteed."
        keywords="Contact Durgesh Kumar, Hire MERN Developer, Freelance Developer India, Full Stack Developer Contact"
        url="/contact"
      />
      
      <div className="min-h-screen bg-[#0d0d0d] text-white relative overflow-hidden">
        {/* Custom Cursor */}
        <div 
          ref={cursorRef}
          className="fixed w-5 h-5 bg-gold/30 rounded-full pointer-events-none z-50 mix-blend-difference hidden lg:block"
        />

        {/* Animated Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-blue-500/5 to-gold/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-gold/5 to-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <section className="pt-32 pb-24 px-4 sm:px-6 relative z-10">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <div className="inline-block px-4 py-2 bg-gold/10 text-gold rounded-full text-sm font-medium border border-gold/20 mb-6">
                💬 Let's Connect
              </div>
              <h1 className="font-serif text-5xl sm:text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-gold to-white bg-clip-text text-transparent">
                Get In <span className="text-gold">Touch</span>
              </h1>
              <p className="text-gray-400 text-base sm:text-xl max-w-3xl mx-auto mb-8">
                Have a project in mind? Let's work together to create something extraordinary that exceeds your expectations.
              </p>
              
              {/* Quick Stats */}
              <div className="flex flex-wrap justify-center gap-8 max-w-2xl mx-auto">
                {[
                  { icon: Zap, label: 'Fast Response', value: '< 24h' },
                  { icon: CheckCircle2, label: 'Projects Completed', value: '50+' },
                  { icon: MessageCircle, label: 'Happy Clients', value: '100%' }
                ].map((stat, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-gray-400">
                    <stat.icon className="w-4 h-4 text-gold" />
                    <span>{stat.label}: <span className="text-gold font-semibold">{stat.value}</span></span>
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="grid lg:grid-cols-5 gap-12">
              {/* Contact Form */}
              <div className="lg:col-span-3">
                <div ref={formRef} className="glass p-8 rounded-3xl border border-white/5 backdrop-blur-xl relative overflow-hidden">
                  {/* Form Background Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-50"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-12 h-12 bg-gold/10 rounded-2xl flex items-center justify-center border border-gold/20">
                        <Send className="w-6 h-6 text-gold" />
                      </div>
                      <div>
                        <h2 className="font-serif text-2xl sm:text-3xl font-bold">Send Message</h2>
                        <p className="text-gray-400 text-sm">I'll get back to you within 24 hours</p>
                      </div>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="form-field relative group">
                          <label className="block text-sm font-medium mb-2 text-gray-300">Full Name</label>
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            onFocus={() => setFocusedField('name')}
                            onBlur={() => setFocusedField(null)}
                            className="w-full px-4 py-4 bg-black/30 border border-white/10 rounded-2xl focus:outline-none focus:border-gold/50 transition-all duration-300 text-white placeholder-gray-400 backdrop-blur-sm hover:bg-black/40"
                            placeholder="Enter your full name"
                            required
                          />
                          <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-gold/10 to-transparent opacity-0 transition-opacity duration-300 pointer-events-none ${focusedField === 'name' ? 'opacity-100' : ''}`}></div>
                        </div>

                        <div className="form-field relative group">
                          <label className="block text-sm font-medium mb-2 text-gray-300">Email Address</label>
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            onFocus={() => setFocusedField('email')}
                            onBlur={() => setFocusedField(null)}
                            className="w-full px-4 py-4 bg-black/30 border border-white/10 rounded-2xl focus:outline-none focus:border-gold/50 transition-all duration-300 text-white placeholder-gray-400 backdrop-blur-sm hover:bg-black/40"
                            placeholder="your.email@example.com"
                            required
                          />
                          <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-gold/10 to-transparent opacity-0 transition-opacity duration-300 pointer-events-none ${focusedField === 'email' ? 'opacity-100' : ''}`}></div>
                        </div>
                      </div>

                      <div className="form-field relative group">
                        <label className="block text-sm font-medium mb-2 text-gray-300">Subject</label>
                        <input
                          type="text"
                          value={formData.subject}
                          onChange={(e) => setFormData({...formData, subject: e.target.value})}
                          onFocus={() => setFocusedField('subject')}
                          onBlur={() => setFocusedField(null)}
                          className="w-full px-4 py-4 bg-black/30 border border-white/10 rounded-2xl focus:outline-none focus:border-gold/50 transition-all duration-300 text-white placeholder-gray-400 backdrop-blur-sm hover:bg-black/40"
                          placeholder="What's this about?"
                          required
                        />
                        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-gold/10 to-transparent opacity-0 transition-opacity duration-300 pointer-events-none ${focusedField === 'subject' ? 'opacity-100' : ''}`}></div>
                      </div>

                      <div className="form-field relative group">
                        <label className="block text-sm font-medium mb-2 text-gray-300">Message</label>
                        <textarea
                          value={formData.message}
                          onChange={(e) => setFormData({...formData, message: e.target.value})}
                          onFocus={() => setFocusedField('message')}
                          onBlur={() => setFocusedField(null)}
                          rows="6"
                          className="w-full px-4 py-4 bg-black/30 border border-white/10 rounded-2xl focus:outline-none focus:border-gold/50 transition-all duration-300 text-white placeholder-gray-400 resize-none backdrop-blur-sm hover:bg-black/40"
                          placeholder="Tell me about your project, ideas, or just say hello..."
                          required
                        />
                        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-gold/10 to-transparent opacity-0 transition-opacity duration-300 pointer-events-none ${focusedField === 'message' ? 'opacity-100' : ''}`}></div>
                      </div>

                      <button
                        type="submit"
                        disabled={status === 'sending'}
                        className="submit-btn w-full py-4 bg-gradient-to-r from-gold to-[#E6C78F] text-black font-bold rounded-2xl hover:shadow-[0_0_40px_rgba(198,169,114,0.6)] transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden group disabled:opacity-70"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-[#E6C78F] to-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <span className="relative z-10 flex items-center gap-3">
                          {status === 'sending' ? (
                            <>
                              <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                              Sending Message...
                            </>
                          ) : (
                            <>
                              <Send className="w-5 h-5" />
                              Send Message
                            </>
                          )}
                        </span>
                      </button>

                      {status === 'success' && (
                        <motion.div
                          className="success-message bg-green-500/10 border border-green-500/30 text-green-400 px-6 py-4 rounded-2xl text-center backdrop-blur-sm"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: "spring", damping: 15 }}
                        >
                          <CheckCircle2 className="w-5 h-5 inline mr-2" />
                          Message sent successfully! I'll get back to you soon.
                        </motion.div>
                      )}
                    </form>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="lg:col-span-2 space-y-6">
                <div ref={contactRef} className="space-y-6">
                  <div className="mb-8">
                    <h3 className="font-serif text-2xl font-bold mb-4 text-gold">Contact Information</h3>
                    <p className="text-gray-400">Choose your preferred way to reach out</p>
                  </div>
                  
                  {contactInfo.map((item, i) => (
                    <div key={i} className="contact-card group">
                      <div className="glass p-6 rounded-2xl hover:shadow-[0_15px_50px_rgba(198,169,114,0.15)] transition-all duration-500 border border-white/5 hover:border-gold/30 backdrop-blur-xl relative overflow-hidden">
                        {/* Background Effect */}
                        <div 
                          className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl"
                          style={{ background: `radial-gradient(circle at center, ${item.color}, transparent 70%)` }}
                        />
                        
                        <div className="relative z-10 flex items-start gap-4">
                          <div 
                            className="w-12 h-12 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border-2"
                            style={{ backgroundColor: `${item.color}20`, borderColor: `${item.color}30` }}
                          >
                            <item.icon className="w-6 h-6" style={{ color: item.color }} />
                          </div>
                          <div className="flex-1">
                            <div className="text-sm text-gray-400 mb-1">{item.label}</div>
                            {item.href ? (
                              <a href={item.href} className="text-lg font-semibold hover:text-gold transition-colors duration-300 block mb-1">
                                {item.value}
                              </a>
                            ) : (
                              <div className="text-lg font-semibold mb-1">{item.value}</div>
                            )}
                            <p className="text-sm text-gray-500">{item.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Social Links */}
                <div className="glass p-6 rounded-2xl border border-white/5 backdrop-blur-xl">
                  <h3 className="font-serif text-xl font-bold mb-4 text-gold">Follow Me</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {socialLinks.map((social, i) => (
                      <motion.a
                        key={i}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-3 p-3 glass rounded-xl hover:bg-white/5 transition-all duration-300 group"
                      >
                        <div 
                          className="w-8 h-8 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform"
                          style={{ backgroundColor: `${social.color}20` }}
                        >
                          <social.icon className="w-4 h-4" style={{ color: social.color }} />
                        </div>
                        <span className="text-sm font-medium group-hover:text-gold transition-colors">{social.label}</span>
                      </motion.a>
                    ))}
                  </div>
                </div>

                {/* CTA Card */}
                <div className="glass p-6 rounded-2xl bg-gradient-to-br from-gold/10 to-transparent border border-gold/20 backdrop-blur-xl">
                  <h3 className="font-serif text-xl font-bold mb-3 text-gold">Let's Work Together</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    I'm always excited to take on new challenges and collaborate on innovative projects.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gold">
                    <Zap className="w-4 h-4" />
                    <span>Available for new projects</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ContactPage;
