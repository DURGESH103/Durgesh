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
        title="DK Portfolio - Web Designer & Developer"
        description="Professional web designer and developer creating premium digital experiences with elegant design and cutting-edge technology."
        keywords="web design, web development, UI/UX, portfolio, react developer, frontend developer"
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
