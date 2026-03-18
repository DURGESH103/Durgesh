import SEO from '../components/SEO';
import Hero from '../components/Hero';
import CinematicShowcase2 from '../components/CinematicShowcase2';
import CredibilityMetrics from '../components/CredibilityMetrics';
import Services from '../components/Services';
import FeaturedCaseStudy from '../components/FeaturedCaseStudy';
import Work from '../components/Work';
import Process from '../components/Process';
import TechStack from '../components/TechStack';
import Testimonials from '../components/Testimonials';
import CTA from '../components/CTA';

const Home = () => {
  return (
    <>
      <SEO
        title="Home"
        description="Durgesh Kumar — Full Stack MERN Developer from India. I build fast, scalable web apps with React, Node.js, Express, and MongoDB. Available for freelance and full-time roles."
        keywords="Durgesh Kumar, Full Stack Developer, MERN Stack, React Developer, Node.js Developer, Portfolio, India"
        url="/"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Durgesh Kumar Portfolio',
          url: 'https://durgeshkumar.dev',
          description: 'Full Stack MERN Developer Portfolio',
          author: { '@type': 'Person', name: 'Durgesh Kumar' }
        }}
      />
      <Hero />
      <CredibilityMetrics />
      <CinematicShowcase2 />
      <Services />
      <FeaturedCaseStudy />
      <Work />
      <Process />
      <TechStack />
      <Testimonials />
      <CTA />
    </>
  );
};

export default Home;
