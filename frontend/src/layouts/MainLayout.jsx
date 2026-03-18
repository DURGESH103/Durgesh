import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollProgress from '../components/ScrollProgress';

const MainLayout = ({ children }) => {
  return (
    <div className="relative overflow-x-hidden">
      <ScrollProgress />
      <Navbar />
      <main className="relative">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
