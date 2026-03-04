import { motion } from 'framer-motion';
import { Mail, MapPin, Phone } from 'lucide-react';

const Contact = () => {
  const contactInfo = [
    { icon: <Mail className="w-5 h-5" />, label: 'Email', value: 'hello@portfolio.com' },
    { icon: <Phone className="w-5 h-5" />, label: 'Phone', value: '+1 (555) 123-4567' },
    { icon: <MapPin className="w-5 h-5" />, label: 'Location', value: 'New York, USA' },
  ];

  return (
    <section id="contact" className="py-32 px-6 bg-[#111111]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="font-serif text-5xl md:text-6xl font-bold mb-6">Let's <span className="text-[#C6A972]">Connect</span></h2>
          <p className="text-gray-400 text-lg">Have a project in mind? Let's create something amazing together</p>
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <h3 className="font-serif text-3xl font-semibold mb-8">Get in Touch</h3>
            <div className="space-y-6">
              {contactInfo.map((info, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="text-[#C6A972]">{info.icon}</div>
                  <div>
                    <p className="text-sm text-gray-500">{info.label}</p>
                    <p className="text-lg">{info.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.form initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="space-y-6">
            <input type="text" placeholder="Your Name" className="w-full px-6 py-4 bg-[#0d0d0d] border border-gray-800 rounded-lg focus:border-[#C6A972] focus:outline-none transition-colors" />
            <input type="email" placeholder="Your Email" className="w-full px-6 py-4 bg-[#0d0d0d] border border-gray-800 rounded-lg focus:border-[#C6A972] focus:outline-none transition-colors" />
            <textarea rows="6" placeholder="Your Message" className="w-full px-6 py-4 bg-[#0d0d0d] border border-gray-800 rounded-lg focus:border-[#C6A972] focus:outline-none transition-colors resize-none" />
            <button type="submit" className="w-full px-8 py-4 bg-[#C6A972] text-[#0d0d0d] font-medium rounded-lg hover:shadow-[0_0_40px_rgba(198,169,114,0.5)] transition-all duration-300 hover:scale-[1.02]">
              Send Message
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
