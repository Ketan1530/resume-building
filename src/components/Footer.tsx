import { FileText, Github, Twitter, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="relative bg-background border-t border-white/10">
      <div className="max-w-[100rem] mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent-teal flex items-center justify-center">
                <FileText className="w-5 h-5 text-black" />
              </div>
              <span className="font-heading text-xl font-bold bg-gradient-to-r from-primary to-accent-teal bg-clip-text text-transparent">
                ResumeForge
              </span>
            </div>
            <p className="font-paragraph text-foreground/70 leading-relaxed">
              Transform your professional journey into stunning resumes with cutting-edge design and intelligent automation.
            </p>
          </div>

          <div>
            <h3 className="font-heading text-lg font-semibold text-foreground mb-4">Product</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/templates" className="font-paragraph text-foreground/70 hover:text-primary transition-colors">
                  Templates
                </Link>
              </li>
              <li>
                <Link to="/builder" className="font-paragraph text-foreground/70 hover:text-primary transition-colors">
                  Resume Builder
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-lg font-semibold text-foreground mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="font-paragraph text-foreground/70 hover:text-primary transition-colors">
                  Resume Tips
                </a>
              </li>
              <li>
                <a href="#" className="font-paragraph text-foreground/70 hover:text-primary transition-colors">
                  Career Advice
                </a>
              </li>
              <li>
                <a href="#" className="font-paragraph text-foreground/70 hover:text-primary transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-lg font-semibold text-foreground mb-4">Connect</h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-glass-overlay backdrop-blur-md border border-white/10 flex items-center justify-center text-foreground/70 hover:text-primary hover:border-primary/30 transition-all"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-glass-overlay backdrop-blur-md border border-white/10 flex items-center justify-center text-foreground/70 hover:text-primary hover:border-primary/30 transition-all"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-glass-overlay backdrop-blur-md border border-white/10 flex items-center justify-center text-foreground/70 hover:text-primary hover:border-primary/30 transition-all"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-paragraph text-foreground/60 text-sm">
              © 2026 ResumeForge. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="font-paragraph text-foreground/60 hover:text-primary text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="font-paragraph text-foreground/60 hover:text-primary text-sm transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
