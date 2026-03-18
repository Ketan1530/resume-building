import { motion } from 'framer-motion';
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useResumeStore } from '@/store/resumeStore';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import { Image } from '@/components/ui/image';

const categories = ['All', 'Simple', 'Modern', 'Creative', 'Professional', 'Colorful'];

const templates = [
  // Modern Templates (10)
  { id: 'modern-1', name: 'Modern Pro', category: 'Modern', preview: 'https://static.wixstatic.com/media/c2517c_f18ccd0ab6c44f179f9d7a40a2db0aa1~mv2.png?originWidth=768&originHeight=1024' },
  { id: 'modern-2', name: 'Tech Elite', category: 'Modern', preview: 'https://static.wixstatic.com/media/c2517c_257af5a1a28a4bbb96929b737f260b13~mv2.png?originWidth=768&originHeight=1024' },
  { id: 'modern-3', name: 'Digital Edge', category: 'Modern', preview: 'https://static.wixstatic.com/media/c2517c_d7fe13c4d0014ee8ba57ab307243d858~mv2.png?originWidth=768&originHeight=1024' },
  { id: 'modern-4', name: 'Future Forward', category: 'Modern', preview: 'https://static.wixstatic.com/media/c2517c_8de7bb7f7b9a46a58fd13c84a6eb45ed~mv2.png?originWidth=768&originHeight=1024' },
  { id: 'modern-5', name: 'Sleek Design', category: 'Modern', preview: 'https://static.wixstatic.com/media/c2517c_4413b3b3a6a64a6db40c188ef402f3ec~mv2.png?originWidth=768&originHeight=1024' },
  { id: 'modern-6', name: 'Urban Style', category: 'Modern', preview: 'https://static.wixstatic.com/media/c2517c_c7250aa75f134449b168bbc2c3a4d89c~mv2.png?originWidth=768&originHeight=1024' },
  { id: 'modern-7', name: 'Metro Vibe', category: 'Modern', preview: 'https://static.wixstatic.com/media/c2517c_50838886dc5a47c98bf6ff61192eede9~mv2.png?originWidth=768&originHeight=1024' },
  { id: 'modern-8', name: 'Neon Pulse', category: 'Modern', preview: 'https://static.wixstatic.com/media/c2517c_5b3c6f3c8cb64f868c4f390c52df831c~mv2.png?originWidth=768&originHeight=1024' },
  { id: 'modern-9', name: 'Cyber Flow', category: 'Modern', preview: 'https://static.wixstatic.com/media/c2517c_dab7b7146d8f47e7a75c45aac4991aab~mv2.png?originWidth=768&originHeight=1024' },
  { id: 'modern-10', name: 'Quantum Leap', category: 'Modern', preview: 'https://static.wixstatic.com/media/c2517c_48676deda7b5495a91b694926a7be6da~mv2.png?originWidth=768&originHeight=1024' },
  
  // Simple Templates (10)
  { id: 'simple-1', name: 'Clean Slate', category: 'Simple', preview: 'https://static.wixstatic.com/media/c2517c_2bb0092c87544ab4b665d9e3f70cdf59~mv2.png?originWidth=768&originHeight=1024' },
  { id: 'simple-2', name: 'Minimal Classic', category: 'Simple', preview: 'https://static.wixstatic.com/media/c2517c_3faed6ccc6194232ad310170507ede7b~mv2.png?originWidth=768&originHeight=1024' },
  { id: 'simple-3', name: 'Basic Pro', category: 'Simple', preview: 'https://static.wixstatic.com/media/c2517c_c3db442cc3ba4e87af50d712293f9920~mv2.png?originWidth=768&originHeight=1024' },
  { id: 'simple-4', name: 'Essential', category: 'Simple', preview: 'https://static.wixstatic.com/media/c2517c_cc96e7b1a77349f89fe10a02cb78684f~mv2.png?originWidth=768&originHeight=1024' },
  { id: 'simple-5', name: 'Pure Form', category: 'Simple', preview: 'https://static.wixstatic.com/media/c2517c_388cc242006648b0b5e95e56bfc7aaeb~mv2.png?originWidth=768&originHeight=1024' },
  { id: 'simple-6', name: 'Clarity', category: 'Simple', preview: 'https://static.wixstatic.com/media/c2517c_bc6af9527cac4abfaab42a7960b8d5ed~mv2.png?originWidth=768&originHeight=1024' },
  { id: 'simple-7', name: 'Straightforward', category: 'Simple', preview: 'https://static.wixstatic.com/media/c2517c_01232ee6b668429a9bf43ad177ef1871~mv2.png?originWidth=768&originHeight=1024' },
  { id: 'simple-8', name: 'Direct', category: 'Simple', preview: 'https://static.wixstatic.com/media/c2517c_7661c2d3cf0942f48dccdeec17a1a382~mv2.png?originWidth=768&originHeight=1024' },
  { id: 'simple-9', name: 'Plain Elegant', category: 'Simple', preview: 'https://static.wixstatic.com/media/c2517c_d17753ff59f44944b644dbcca2b37e8c~mv2.png?originWidth=768&originHeight=1024' },
  { id: 'simple-10', name: 'Bare Essentials', category: 'Simple', preview: 'https://static.wixstatic.com/media/c2517c_3f179bcc1b884da1bb6213cb982ba93e~mv2.png?originWidth=768&originHeight=1024' },
  
  // Creative Templates (10)
  { id: 'creative-1', name: 'Artistic Vision', category: 'Creative', preview: 'https://static.wixstatic.com/media/c2517c_5aac79fb306f4ca39500c0ae1b209817~mv2.png?originWidth=768&originHeight=1024' },
  { id: 'creative-2', name: 'Bold Expression', category: 'Creative', preview: 'https://static.wixstatic.com/media/c2517c_80fa4d8b07e340dbafc2394241a0d820~mv2.png?originWidth=768&originHeight=1024' },
  { id: 'creative-3', name: 'Designer\'s Choice', category: 'Creative', preview: 'https://static.wixstatic.com/media/c2517c_e83dea287ce043c1aa4dac41244090a0~mv2.png?originWidth=768&originHeight=1024' },
  { id: 'creative-4', name: 'Innovative Layout', category: 'Creative', preview: 'https://static.wixstatic.com/media/c2517c_1113a86817034c388dc9c54e084bdb5f~mv2.png?originWidth=768&originHeight=1024' },
  { id: 'creative-5', name: 'Unique Style', category: 'Creative', preview: 'https://static.wixstatic.com/media/c2517c_761f42b9f48e4075a9bb71aa6636c256~mv2.png?originWidth=768&originHeight=1024' },
  { id: 'creative-6', name: 'Expressive', category: 'Creative', preview: 'https://static.wixstatic.com/media/c2517c_9fe71ce322e142b3a6d278a9477bad4a~mv2.png?originWidth=768&originHeight=1024' },
  { id: 'creative-7', name: 'Imaginative', category: 'Creative', preview: 'https://static.wixstatic.com/media/c2517c_53a4e00db6344ff2967b7a14e7a0508f~mv2.png?originWidth=768&originHeight=1024' },
  { id: 'creative-8', name: 'Avant-Garde', category: 'Creative', preview: 'https://static.wixstatic.com/media/c2517c_14fdada57d2d43669f7790a63e103cce~mv2.png?originWidth=768&originHeight=1024' },
  { id: 'creative-9', name: 'Unconventional', category: 'Creative', preview: 'https://static.wixstatic.com/media/c2517c_50d1090b42974d689126df4205e673c3~mv2.png?originWidth=768&originHeight=1024' },
  { id: 'creative-10', name: 'Artistic Flow', category: 'Creative', preview: 'https://static.wixstatic.com/media/c2517c_0f98645161d74fe9a1adeb96e19afe3b~mv2.png?originWidth=768&originHeight=1024' },
  
  // Professional Templates (10)
  { id: 'professional-1', name: 'Executive', category: 'Professional', preview: 'https://static.wixstatic.com/media/c2517c_0c6c958121744ffa89c113ff5ad4d4ac~mv2.png?originWidth=768&originHeight=1024' },
  { id: 'professional-2', name: 'Corporate Elite', category: 'Professional', preview: 'https://static.wixstatic.com/media/c2517c_3dbd01bd293a45dc84f1636b0baa2729~mv2.png?originWidth=768&originHeight=1024' },
  { id: 'professional-3', name: 'Business Class', category: 'Professional', preview: 'https://static.wixstatic.com/media/c2517c_7bc01d84ec154cbaa450891db9bb5eea~mv2.png?originWidth=768&originHeight=1024' },
  { id: 'professional-4', name: 'Formal Elegance', category: 'Professional', preview: 'https://static.wixstatic.com/media/c2517c_d7671804757f4a8a8a05eb047c51ac41~mv2.png?originWidth=768&originHeight=1024' },
  { id: 'professional-5', name: 'Senior Level', category: 'Professional', preview: 'https://static.wixstatic.com/media/c2517c_8da2adbdf7f345fc9d71d7990bbef3fa~mv2.png?originWidth=768&originHeight=1024' },
  { id: 'professional-6', name: 'Management Pro', category: 'Professional', preview: 'https://static.wixstatic.com/media/c2517c_2528a3dee5ba4f468126b8bcf2798fff~mv2.png?originWidth=768&originHeight=1024' },
  { id: 'professional-7', name: 'Leadership', category: 'Professional', preview: 'https://static.wixstatic.com/media/c2517c_0196f4789c30410ebb619273a88a8f9b~mv2.png?originWidth=768&originHeight=1024' },
  { id: 'professional-8', name: 'Distinguished', category: 'Professional', preview: 'https://static.wixstatic.com/media/c2517c_4d832c6a01704f3c91c81f881ab4544e~mv2.png?originWidth=768&originHeight=1024' },
  { id: 'professional-9', name: 'Prestigious', category: 'Professional', preview: 'https://static.wixstatic.com/media/c2517c_5bb6ed41c2904870bab126c9b2a20225~mv2.png?originWidth=768&originHeight=1024' },
  { id: 'professional-10', name: 'Authority', category: 'Professional', preview: 'https://static.wixstatic.com/media/c2517c_1ff79876bb3b4ed2bdf6602d6e8c8074~mv2.png?originWidth=768&originHeight=1024' },
  
  // Colorful Templates (10)
  { id: 'colorful-1', name: 'Vibrant Energy', category: 'Colorful', preview: 'https://static.wixstatic.com/media/c2517c_d7614046fa4e44778bac53963386e601~mv2.png?originWidth=768&originHeight=1024' },
  { id: 'colorful-2', name: 'Rainbow Spectrum', category: 'Colorful', preview: 'https://static.wixstatic.com/media/c2517c_10f49c2fe7354df08368f936ee687068~mv2.png?originWidth=768&originHeight=1024' },
  { id: 'colorful-3', name: 'Bright Future', category: 'Colorful', preview: 'https://static.wixstatic.com/media/c2517c_5caeced9b9594f2ab857dc47140e9bf2~mv2.png?originWidth=768&originHeight=1024' },
  { id: 'colorful-4', name: 'Bold Colors', category: 'Colorful', preview: 'https://static.wixstatic.com/media/c2517c_47e862d32828476d96dd644034b02dfa~mv2.png?originWidth=768&originHeight=1024' },
  { id: 'colorful-5', name: 'Dynamic Hues', category: 'Colorful', preview: 'https://static.wixstatic.com/media/c2517c_f93d89a146bf49569dc69b1aa39070be~mv2.png?originWidth=768&originHeight=1024' },
  { id: 'colorful-6', name: 'Chromatic', category: 'Colorful', preview: 'https://static.wixstatic.com/media/c2517c_d04db4f8a6db4dc3826de70902422601~mv2.png?originWidth=768&originHeight=1024' },
  { id: 'colorful-7', name: 'Vivid Palette', category: 'Colorful', preview: 'https://static.wixstatic.com/media/c2517c_98147d8039ad490b93752e44126d6fdc~mv2.png?originWidth=768&originHeight=1024' },
  { id: 'colorful-8', name: 'Radiant', category: 'Colorful', preview: 'https://static.wixstatic.com/media/c2517c_24612519e3734680a9a5641b1f4c15ad~mv2.png?originWidth=768&originHeight=1024' },
  { id: 'colorful-9', name: 'Luminous', category: 'Colorful', preview: 'https://static.wixstatic.com/media/c2517c_402f56611db04048a403839079eec05d~mv2.png?originWidth=768&originHeight=1024' },
  { id: 'colorful-10', name: 'Prismatic', category: 'Colorful', preview: 'https://static.wixstatic.com/media/c2517c_92fad3d908cd4e1086c23a503e8771a5~mv2.png?originWidth=768&originHeight=1024' },
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
              Choose Your Template
            </h1>
            <p className="font-paragraph text-xl text-foreground/70 max-w-3xl mx-auto">
              Select from 50+ professionally designed templates to match your style and industry
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
