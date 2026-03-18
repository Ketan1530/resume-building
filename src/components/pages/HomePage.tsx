// HPI 1.7-G
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FileText, Zap, Download, Palette, Sparkles, ArrowRight, Layers, Terminal, Cpu, Globe } from 'lucide-react';
import { Image } from '@/components/ui/image';

// --- Canonical Data Sources ---
const FEATURES_DATA = [
  {
    icon: FileText,
    title: "50+ Templates",
    description: "Choose from a vast collection of professionally designed templates across multiple categories."
  },
  {
    icon: Zap,
    title: "Live Preview",
    description: "See your resume update in real-time as you type. Instant feedback for perfect results."
  },
  {
    icon: Download,
    title: "Export Options",
    description: "Download your resume as PDF or high-quality images. Ready for any application."
  },
  {
    icon: Palette,
    title: "Customizable Design",
    description: "Personalize colors, fonts, and layouts to match your unique professional brand."
  },
  {
    icon: Sparkles,
    title: "No Login Required",
    description: "Start building immediately. Completely free with no registration needed."
  },
  {
    icon: Layers,
    title: "Drag & Drop",
    description: "Reorder sections effortlessly with intuitive drag-and-drop functionality."
  }
];

const PLACEHOLDER_IMG = "https://static.wixstatic.com/media/c2517c_f84daefc1aad47ed9480380ea257b33d~mv2.png?originWidth=768&originHeight=960";

// --- Sub-components ---

const BlueprintGrid = () => (
  <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0" 
       style={{ 
         backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
         backgroundSize: '4rem 4rem'
       }} 
  />
);

const GlowingOrb = ({ className, color }: { className: string, color: string }) => (
  <div className={`absolute rounded-full blur-[120px] opacity-40 pointer-events-none ${className}`} style={{ backgroundColor: color }} />
);

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  // Smooth out the scroll progress for parallax effects
  const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 100 });
  
  // Parallax transforms
  const heroY = useTransform(smoothProgress, [0, 0.2], ["0%", "20%"]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0]);
  
  const breatherImgY = useTransform(smoothProgress, [0.1, 0.4], ["-20%", "20%"]);
  
  return (
    <div ref={containerRef} className="relative min-h-screen bg-background text-foreground overflow-clip selection:bg-primary/30 selection:text-primary-foreground">
      
      <style>
        {`
          .text-gradient-electric {
            background: linear-gradient(135deg, #00FFFF 0%, #00F0FF 50%, #A020F0 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          .glass-panel {
            background: rgba(255, 255, 255, 0.03);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.05);
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
          }
          .glass-panel-interactive {
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          }
          .glass-panel-interactive:hover {
            background: rgba(255, 255, 255, 0.08);
            border-color: rgba(0, 255, 255, 0.3);
            transform: translateY(-8px) scale(1.02);
            box-shadow: 0 20px 40px rgba(0, 255, 255, 0.1);
          }
          .marquee-container {
            display: flex;
            width: max-content;
            animation: marquee 40s linear infinite;
          }
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>

      <BlueprintGrid />

      {/* --- HERO SECTION --- */}
      <section className="relative w-full min-h-[100vh] flex items-center justify-center pt-20 pb-32 overflow-hidden">
        <GlowingOrb className="top-[-10%] left-[-10%] w-[50vw] h-[50vw]" color="#A020F0" />
        <GlowingOrb className="bottom-[-20%] right-[-10%] w-[60vw] h-[60vw]" color="#00FFFF" />
        <GlowingOrb className="top-[40%] left-[40%] w-[30vw] h-[30vw]" color="#FF00FF" />

        <motion.div 
          className="relative z-10 w-full max-w-[120rem] mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center gap-16"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          {/* Hero Content */}
          <div className="flex-1 flex flex-col items-start text-left">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass-panel border-primary/30 mb-8"
            >
              <Terminal className="w-4 h-4 text-primary" />
              <span className="text-xs font-paragraph tracking-widest uppercase text-primary font-semibold">System Online // V 2.0</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              className="font-heading text-6xl md:text-8xl lg:text-[8rem] leading-[0.9] font-bold mb-8 tracking-tight"
            >
              Forge <br/>
              <span className="text-gradient-electric">Your Future</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="font-paragraph text-lg md:text-2xl text-foreground/70 max-w-2xl mb-12 leading-relaxed border-l-2 border-primary/50 pl-6"
            >
              Transform your professional journey into a stunning, modern artifact that commands attention. Powered by cutting-edge design and intelligent automation.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto"
            >
              <Link to="/builder" className="w-full sm:w-auto">
                <button className="group relative w-full sm:w-auto px-10 py-5 rounded-xl font-paragraph font-bold text-lg overflow-hidden bg-primary text-primary-foreground transition-all hover:shadow-[0_0_40px_rgba(0,255,255,0.4)]">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    Initialize Builder
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </Link>

              <Link to="/templates" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto px-10 py-5 rounded-xl font-paragraph font-semibold text-lg glass-panel hover:bg-white/5 transition-all border border-white/20 hover:border-primary/50 text-foreground flex items-center justify-center gap-3">
                  <Cpu className="w-5 h-5 text-accent-purple" />
                  Browse Schematics
                </button>
              </Link>
            </motion.div>
          </div>

          {/* Hero Visual */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.2, delay: 0.2, type: "spring" }}
            className="flex-1 relative w-full aspect-[4/5] max-w-lg lg:max-w-none perspective-1000"
          >
            <div className="absolute inset-0 glass-panel rounded-3xl overflow-hidden border border-primary/20 transform-gpu rotate-y-[-5deg] rotate-x-[5deg] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              <Image 
                src={PLACEHOLDER_IMG} 
                alt="Resume Builder Interface Preview" 
                className="w-full h-full object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
              />
              {/* Overlay UI Elements */}
              <div className="absolute top-6 left-6 right-6 flex justify-between items-center">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-destructive/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-[10px] font-paragraph text-primary">
                  LIVE_PREVIEW.EXE
                </div>
              </div>
              
              {/* Floating Data Cards */}
              <motion.div 
                animate={{ y: [-10, 10, -10] }} 
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-10 left-[-20px] glass-panel p-4 rounded-xl border-l-4 border-l-accent-teal flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-full bg-accent-teal/20 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-accent-teal" />
                </div>
                <div>
                  <div className="text-xs text-foreground/60 font-paragraph uppercase tracking-wider">Status</div>
                  <div className="text-sm font-heading font-bold text-foreground">Optimization Complete</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* --- VISUAL BREATHER (PARALLAX IMAGE) --- */}
      <section className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden border-y border-white/10">
        <motion.div 
          className="absolute inset-0 w-full h-[140%]"
          style={{ y: breatherImgY }}
        >
          <Image 
            src={PLACEHOLDER_IMG} 
            alt="Abstract technological background" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
          <div className="absolute inset-0 bg-primary/5 mix-blend-overlay" />
        </motion.div>
        
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <h2 className="font-heading text-4xl md:text-7xl font-bold text-white/10 uppercase tracking-[0.2em] text-center mix-blend-overlay">
            Precision <br/> Engineered
          </h2>
        </div>
      </section>

      {/* --- FEATURES SECTION (STICKY SCROLL) --- */}
      <section className="relative w-full max-w-[120rem] mx-auto px-6 md:px-12 py-32">
        <div className="flex flex-col lg:flex-row gap-16 relative">
          
          {/* Sticky Left Column */}
          <div className="w-full lg:w-1/3 lg:sticky lg:top-32 h-fit">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border-accent-purple/30 mb-6">
                <Cpu className="w-4 h-4 text-accent-purple" />
                <span className="text-xs font-paragraph tracking-widest uppercase text-accent-purple font-semibold">Core Capabilities</span>
              </div>
              <h2 className="font-heading text-5xl md:text-6xl font-bold mb-6 text-foreground leading-tight">
                Architectural <br/> <span className="text-primary">Advantages</span>
              </h2>
              <p className="font-paragraph text-lg text-foreground/60 mb-8">
                Our platform is built on a foundation of advanced features designed to give you absolute control over your professional narrative.
              </p>
              
              <div className="hidden lg:block w-full h-[1px] bg-gradient-to-r from-primary/50 to-transparent mt-12" />
            </motion.div>
          </div>

          {/* Scrolling Right Column */}
          <div className="w-full lg:w-2/3 flex flex-col gap-8">
            {FEATURES_DATA.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-panel glass-panel-interactive p-8 md:p-10 rounded-2xl relative overflow-hidden group"
              >
                {/* Hover Gradient Reveal */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent-purple/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
                  <div className="w-16 h-16 shrink-0 rounded-xl bg-background border border-white/10 flex items-center justify-center group-hover:border-primary/50 group-hover:shadow-[0_0_20px_rgba(0,255,255,0.2)] transition-all duration-300">
                    <feature.icon className="w-8 h-8 text-foreground group-hover:text-primary transition-colors" />
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-4 mb-3">
                      <span className="font-paragraph text-xs text-primary/50 font-mono">0{index + 1}</span>
                      <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
                        {feature.title}
                      </h3>
                    </div>
                    <p className="font-paragraph text-foreground/70 leading-relaxed text-lg">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* --- PROCESS / NARRATIVE SECTION --- */}
      <section className="relative w-full py-32 bg-black/40 border-y border-white/5 overflow-hidden">
        <GlowingOrb className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] opacity-20" color="#00F0FF" />
        
        <div className="max-w-[100rem] mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center mb-24">
            <h2 className="font-heading text-4xl md:text-6xl font-bold mb-6">The Synthesis Protocol</h2>
            <p className="font-paragraph text-xl text-foreground/60 max-w-2xl mx-auto">Three phases to construct your ultimate professional profile.</p>
          </div>

          <div className="relative">
            {/* Central Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-primary/30 to-transparent md:-translate-x-1/2" />

            {[
              { step: "01", title: "Data Ingestion", desc: "Input your raw professional history into our structured data matrix.", align: "right" },
              { step: "02", title: "Algorithmic Formatting", desc: "Our system automatically aligns and structures your data for maximum impact.", align: "left" },
              { step: "03", title: "Visual Output", desc: "Select a schematic and generate a high-fidelity document ready for deployment.", align: "right" }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className={`relative flex flex-col md:flex-row items-start md:items-center gap-8 mb-24 last:mb-0 ${item.align === 'left' ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Node */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-primary shadow-[0_0_15px_#00FFFF] md:-translate-x-1/2 mt-2 md:mt-0 z-10" />
                
                <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${item.align === 'left' ? 'md:pr-16 md:text-right' : 'md:pl-16 text-left'}`}>
                  <div className="glass-panel p-8 rounded-2xl border-l-2 border-l-primary hover:bg-white/5 transition-colors">
                    <span className="font-mono text-primary text-sm mb-2 block">PHASE {item.step}</span>
                    <h4 className="font-heading text-2xl font-bold mb-4">{item.title}</h4>
                    <p className="font-paragraph text-foreground/70">{item.desc}</p>
                  </div>
                </div>
                <div className="hidden md:block w-1/2" /> {/* Spacer */}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- TEMPLATES SHOWCASE (INFINITE MARQUEE) --- */}
      <section className="relative w-full py-32 overflow-hidden">
        <div className="max-w-[120rem] mx-auto px-6 md:px-12 mb-16 flex flex-col md:flex-row justify-between items-end gap-8">
          <div>
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">Schematic Library</h2>
            <p className="font-paragraph text-lg text-foreground/60 max-w-xl">Access over 50+ meticulously crafted layouts designed to bypass ATS filters and capture human attention.</p>
          </div>
          <Link to="/templates">
            <button className="px-6 py-3 rounded-full border border-white/20 hover:border-primary text-sm font-paragraph uppercase tracking-wider transition-colors flex items-center gap-2">
              View All Schematics <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>

        {/* Marquee Track */}
        <div className="relative w-full overflow-hidden flex">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          
          <div className="marquee-container gap-8 px-4">
            {/* Double the items for seamless loop */}
            {[...Array(8)].map((_, i) => (
              <div key={i} className="w-[300px] md:w-[400px] aspect-[3/4] shrink-0 glass-panel rounded-2xl overflow-hidden group relative">
                <Image 
                  src={PLACEHOLDER_IMG} 
                  alt={`Template Preview ${i}`} 
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500 grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div className="w-full flex justify-between items-center">
                    <span className="font-heading font-bold text-lg">Model_0{i+1}</span>
                    <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center backdrop-blur-sm">
                      <ArrowRight className="w-4 h-4 text-primary" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="relative w-full py-32 px-6 md:px-12">
        <div className="max-w-[80rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative p-12 md:p-24 rounded-[3rem] glass-panel overflow-hidden text-center border border-primary/30"
          >
            {/* Animated Background inside CTA */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent-purple/10" />
            <GlowingOrb className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-30" color="#00FFFF" />
            
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-background border border-white/10 mb-8 shadow-[0_0_30px_rgba(0,255,255,0.2)]">
                <Globe className="w-10 h-10 text-primary" />
              </div>
              
              <h2 className="font-heading text-5xl md:text-7xl font-bold mb-6 text-foreground">
                Deploy Your <br/> <span className="text-gradient-electric">Potential</span>
              </h2>
              
              <p className="font-paragraph text-xl text-foreground/70 max-w-2xl mx-auto mb-12">
                Join the network of professionals who have upgraded their career trajectory. No registration required. Instant access.
              </p>

              <Link to="/builder">
                <button className="group relative px-12 py-6 rounded-2xl font-paragraph font-bold text-xl overflow-hidden bg-foreground text-background transition-all hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent-teal to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="relative z-10 flex items-center gap-3 group-hover:text-black transition-colors">
                    Commence Build Sequence
                    <Zap className="w-6 h-6" />
                  </span>
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}