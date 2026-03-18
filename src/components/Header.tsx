import { Link, useLocation } from 'react-router-dom';
import { FileText, Home, Layout } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Header() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-white/10"
    >
      <div className="max-w-[120rem] mx-auto px-8 py-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent-teal flex items-center justify-center">
              <FileText className="w-6 h-6 text-black" />
            </div>
            <span className="font-heading text-2xl font-bold bg-gradient-to-r from-primary to-accent-teal bg-clip-text text-transparent">
              ResumeForge
            </span>
          </Link>

          <nav className="flex items-center gap-2">
            <Link to="/">
              <motion.button
                className={`px-6 py-3 rounded-xl font-paragraph font-medium transition-all flex items-center gap-2 ${
                  isActive('/')
                    ? 'bg-primary/20 text-primary border border-primary/30'
                    : 'text-foreground/70 hover:text-foreground hover:bg-white/5'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Home className="w-4 h-4" />
                Home
              </motion.button>
            </Link>

            <Link to="/templates">
              <motion.button
                className={`px-6 py-3 rounded-xl font-paragraph font-medium transition-all flex items-center gap-2 ${
                  isActive('/templates')
                    ? 'bg-primary/20 text-primary border border-primary/30'
                    : 'text-foreground/70 hover:text-foreground hover:bg-white/5'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Layout className="w-4 h-4" />
                Templates
              </motion.button>
            </Link>

            <Link to="/builder">
              <motion.button
                className="px-6 py-3 rounded-xl font-paragraph font-semibold"
                style={{
                  background: isActive('/builder')
                    ? 'linear-gradient(90deg, #00FFFF 0%, #A020F0 100%)'
                    : 'transparent',
                  color: isActive('/builder') ? '#000000' : '#00FFFF',
                  border: isActive('/builder') ? 'none' : '2px solid #00FFFF',
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FileText className="w-4 h-4 inline mr-2" />
                Build Resume
              </motion.button>
            </Link>
          </nav>
        </div>
      </div>
    </motion.header>
  );
}
