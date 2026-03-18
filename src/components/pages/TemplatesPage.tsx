import { motion } from 'framer-motion';
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useResumeStore } from '@/store/resumeStore';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import { Image } from '@/components/ui/image';

const categories = ['All', 'Professional'];

const templates = [
  // Professional Templates (6) - Clean, simple, company-ready designs
  { id: 'professional-1', name: 'Sidebar Pro', category: 'Professional', preview: 'https://static.wixstatic.com/media/c2517c_061597bd153a44bd8ffba07f098c5f4e~mv2.png?originWidth=768&originHeight=1024' },
  { id: 'professional-2', name: 'Classic Corporate', category: 'Professional', preview: 'https://static.wixstatic.com/media/c2517c_e93ea2781a104d668f02639574d4e0ff~mv2.png?originWidth=768&originHeight=1024' },
  { id: 'professional-3', name: 'Modern Accent', category: 'Professional', preview: 'https://static.wixstatic.com/media/c2517c_d4731108d22f4d499b4e275193d81e5a~mv2.png?originWidth=768&originHeight=1024' },
  { id: 'professional-4', name: 'Minimalist Clean', category: 'Professional', preview: 'https://static.wixstatic.com/media/c2517c_a5882d719ac14a818a1d51c3fa5929e4~mv2.png?originWidth=768&originHeight=1024' },
  { id: 'professional-5', name: 'Executive Elegant', category: 'Professional', preview: 'https://static.wixstatic.com/media/c2517c_c4d776caca5f486da90b25b5f713cb06~mv2.png?originWidth=768&originHeight=1024' },
  { id: 'professional-6', name: 'Contemporary Pro', category: 'Professional', preview: 'https://static.wixstatic.com/media/c2517c_213f38f2cd9844d1b7a2b85db344bfda~mv2.png?originWidth=768&originHeight=1024' },
];

export default function TemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { selectedTemplate, setSelectedTemplate } = useResumeStore();
  const navigate = useNavigate();

  const filteredTemplates = selectedCategory === 'All'
    ? templates
    : templates.filter(t => t.category === selectedCategory);

  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplate(templateId);
    navigate('/builder');
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      <div className="pt-32 pb-20 px-8">
        <div className="max-w-[100rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="font-heading text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-accent-teal to-secondary bg-clip-text text-transparent">
              Professional Resume Templates
            </h1>
            <p className="font-paragraph text-xl text-foreground/70 max-w-3xl mx-auto">
              Choose from clean, company-ready resume templates with simple yet distinct formatting
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 mb-16"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-8 py-3 rounded-xl font-paragraph font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-primary to-accent-teal text-black'
                    : 'bg-glass-overlay backdrop-blur-md border border-white/10 text-foreground/70 hover:text-foreground hover:border-primary/30'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTemplates.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group relative"
              >
                <div className="relative p-6 rounded-2xl bg-glass-overlay backdrop-blur-md border border-white/10 hover:border-primary/50 transition-all duration-300 overflow-hidden">
                  {selectedTemplate === template.id && (
                    <div className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                      <Check className="w-5 h-5 text-black" />
                    </div>
                  )}

                  <div className="aspect-[3/4] bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl mb-4 flex items-center justify-center overflow-hidden">
                    <Image src={template.preview} alt={template.name} className="w-full h-full object-cover" />
                  </div>

                  <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                    {template.name}
                  </h3>
                  
                  <p className="font-paragraph text-sm text-foreground/60 mb-4">
                    {template.category}
                  </p>

                  <button
                    onClick={() => handleSelectTemplate(template.id)}
                    className="w-full py-3 rounded-xl font-paragraph font-semibold bg-gradient-to-r from-primary to-accent-teal text-black hover:opacity-90 transition-opacity"
                  >
                    Use Template
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
