import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { useMobileOptimization } from './hooks/useMobileOptimization';
import ErrorBoundary from './components/ErrorBoundary';
import Loading from './components/Loading';
import MainLayout from './layouts/MainLayout';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import { preloadImage } from './utils/imageOptimization';

const Home = lazy(() => import(/* webpackChunkName: "home" */ './pages/Home'));
const Projects = lazy(() => import(/* webpackChunkName: "projects" */ './pages/Projects'));
const ProjectDetail = lazy(() => import(/* webpackChunkName: "project-detail" */ './pages/ProjectDetail'));
const SkillsPage = lazy(() => import(/* webpackChunkName: "skills" */ './pages/SkillsPage'));
const CertificationsPage = lazy(() => import(/* webpackChunkName: "certifications" */ './pages/CertificationsPage'));
const GalleryPage = lazy(() => import(/* webpackChunkName: "gallery" */ './pages/GalleryPage'));
const AboutPage = lazy(() => import(/* webpackChunkName: "about" */ './pages/AboutPage'));
const ContactPage = lazy(() => import(/* webpackChunkName: "contact" */ './pages/ContactPage'));
const Login = lazy(() => import(/* webpackChunkName: "login" */ './pages/Login'));
const Register = lazy(() => import(/* webpackChunkName: "register" */ './pages/Register'));
const NotFound = lazy(() => import(/* webpackChunkName: "notfound" */ './pages/NotFound'));
const AdminLogin = lazy(() => import(/* webpackChunkName: "admin-login" */ './pages/admin/AdminLogin'));
const AdminDashboard = lazy(() => import(/* webpackChunkName: "admin-dashboard" */ './pages/admin/AdminDashboard'));

function App() {
  useSmoothScroll();
  useMobileOptimization();

  useEffect(() => {
    // Preload critical images
    preloadImage('/profile.png');
  }, []);

  return (
    <AuthProvider>
      <ErrorBoundary>
        <Router>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<MainLayout><Home /></MainLayout>} />
              <Route path="/projects" element={<MainLayout><Projects /></MainLayout>} />
              <Route path="/project/:slug" element={<MainLayout><ProjectDetail /></MainLayout>} />
              <Route path="/skills" element={<MainLayout><SkillsPage /></MainLayout>} />
              <Route path="/certifications" element={<MainLayout><CertificationsPage /></MainLayout>} />
              <Route path="/gallery" element={<MainLayout><GalleryPage /></MainLayout>} />
              <Route path="/about" element={<MainLayout><AboutPage /></MainLayout>} />
              <Route path="/contact" element={<MainLayout><ContactPage /></MainLayout>} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Router>
      </ErrorBoundary>
    </AuthProvider>
  );
}

export default App;
