import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Image } from '@/components/ui/image';
import { useResumeStore } from '@/store/resumeStore';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const categories = ['All', 'Professional'];

const templates = [
  // Professional Templates (50) - Clean, simple, company-ready designs
  { id: 'professional-1', name: 'Sidebar Pro', category: 'Professional', preview: 'https://static.wixstatic.com/media/c2517c_061597bd153a44bd8ffba07f098c5f4e~mv2.png?originWidth=768&originHeight=1024' },
  { id: 'professional-2', name: 'Classic Corporate', category: 'Professional', preview: 'https://static.wixstatic.com/media/c2517c_e93ea2781a104d668f02639574d4e0ff~mv2.png?originWidth=768&originHeight=1024' },
  { id: 'professional-3', name: 'Modern Accent', category: 'Professional', preview: 'https://static.wixstatic.com/media/c2517c_d4731108d22f4d499b4e275193d81e5a~mv2.png?originWidth=768&originHeight=1024' },
  { id: 'professional-4', name: 'Minimalist Clean', category: 'Professional', preview: 'https://static.wixstatic.com/media/c2517c_a5882d719ac14a818a1d51c3fa5929e4~mv2.png?originWidth=768&originHeight=1024' },
  { id: 'professional-5', name: 'Executive Elegant', category: 'Professional', preview: 'https://static.wixstatic.com/media/c2517c_c4d776caca5f486da90b25b5f713cb06~mv2.png?originWidth=768&originHeight=1024' },
  { id: 'professional-6', name: 'Contemporary Pro', category: 'Professional', preview: 'https://static.wixstatic.com/media/c2517c_213f38f2cd9844d1b7a2b85db344bfda~mv2.png?originWidth=768&originHeight=1024' },
  { id: 'professional-7', name: 'Bold Statement', category: 'Professional', preview: 'https://static.wixstatic.com/media/c2517c_b713dd331f4c44d0b2b60a6c1ddba7f3~mv2.png?originWidth=768&originHeight=1024' },
  { id: 'professional-8', name: 'Tech Forward', category: 'Professional', preview: 'https://static.wixstatic.com/media/c2517c_d4b377ad115240ea9c6ee64f06f0c920~mv2.png?originWidth=768&originHeight=1024' },
  { id: 'professional-9', name: 'Creative Edge', category: 'Professional', preview: 'https://static.wixstatic.com/media/c2517c_6c628258368a4274a4aa86543a1a3991~mv2.png?originWidth=768&originHeight=1024' },
  { id: 'professional-10', name: 'Elegant Minimal', category: 'Professional', preview: 'https://static.wixstatic.com/media/c2517c_baa52bc13d27432ab196e986f1ac303c~mv2.png?originWidth=768&originHeight=1024' },
  { id: 'professional-11', name: 'Dynamic Layout', category: 'Professional', preview: 'https://static.wixstatic.com/media/c2517c_5d3f429402484f28be9e6e64dc2be0fa~mv2.png?originWidth=768&originHeight=1024' },
  { id: 'professional-12', name: 'Professional Plus', category: 'Professional', preview: 'https://static.wixstatic.com/media/c2517c_db9d7da9e53b447d9414f1e80a4773dd~mv2.png?originWidth=768&originHeight=1024' },
  { id: 'professional-13', name: 'Sleek Modern', category: 'Professional', preview: 'https://static.wixstatic.com/media/c2517c_dd35c36ef776487882ae85d9d6c04142~mv2.png?originWidth=768&originHeight=1024' },
  { id: 'professional-14', name: 'Refined Classic', category: 'Professional', preview: 'https://static.wixstatic.com/media/c2517c_f69220e72a8f4451bb3aa6e61f4d8a7f~mv2.png?originWidth=768&originHeight=1024' },
  { id: 'professional-15', name: 'Sharp Focus', category: 'Professional', preview: 'https://static.wixstatic.com/media/c2517c_f8d47ccbd7dd44ceba8a599b28c1c0a3~mv2.png?originWidth=768&originHeight=1024' },
  { id: 'professional-16', name: 'Balanced Pro', category: 'Professional', preview: 'https://static.wixstatic.com/media/c2517c_b040a4237d58434aa7ef8ebb11564757~mv2.png?originWidth=768&originHeight=1024' },
  { id: 'professional-17', name: 'Sophisticated', category: 'Professional', preview: 'https://static.wixstatic.com/media/c2517c_b592a2fbc6b541fdaf1a3eea05862347~mv2.png?originWidth=768&originHeight=1024' },
  { id: 'professional-18', name: 'Clean Slate', category: 'Professional', preview: 'https://static.wixstatic.com/media/c2517c_a4a1d4ca2c6545b7b68fc0fe11036de8~mv2.png?originWidth=768&originHeight=1024' },
  { id: 'professional-19', name: 'Modern Flex', category: 'Professional', preview: 'https://static.wixstatic.com/media/c2517c_17806e2e9cc84fe5a194df595a0807a9~mv2.png?originWidth=768&originHeight=1024' },
  { id: 'professional-20', name: 'Timeless Design', category: 'Professional', preview: 'https://static.wixstatic.com/media/c2517c_eb1fecab3c384c77b802f855034f03e5~mv2.png?originWidth=768&originHeight=1024' },
  { id: 'professional-21', name: 'Precision Layout', category: 'Professional', preview: 'https://static.wixstatic.com/media/c2517c_4f1d5f6bf139496e9355ac62e404a3f4~mv2.png?originWidth=768&originHeight=1024' },
  { id: 'professional-22', name: 'Executive Suite', category: 'Professional', preview: 'https://static.wixstatic.com/media/c2517c_960a84c11cb04910a50aa6dcd359f59a~mv2.png?originWidth=768&originHeight=1024' },
  { id: 'professional-23', name: 'Streamlined Pro', category: 'Professional', preview: 'https://static.wixstatic.com/media/c2517c_82f90a60c9e44317a572b272c2af50a3~mv2.png?originWidth=768&originHeight=1024' },
  { id: 'professional-24', name: 'Polished Edge', category: 'Professional', preview: 'https://static.wixstatic.com/media/c2517c_beda6a8bf4874fc282ab35a5ef7ff83c~mv2.png?originWidth=768&originHeight=1024' },
  { id: 'professional-25', name: 'Structured Pro', category: 'Professional', preview: 'https://static.wixstatic.com/media/c2517c_eb0187bc0c494cd7ab6895e25fea0f75~mv2.png?originWidth=768&originHeight=1024' },
  { id: 'professional-26', name: 'Refined Edge', category: 'Professional', preview: 'https://static.wixstatic.com/media/c2517c_749b4808ce7542c3848aaea971e76e1a~mv2.png?originWidth=768&originHeight=1024' },
  { id: 'professional-27', name: 'Clarity Focus', category: 'Professional', preview: 'https://static.wixstatic.com/media/c2517c_be0056dabb2946e2932809d6db9e0496~mv2.png?originWidth=768&originHeight=1024' },
  { id: 'professional-28', name: 'Modern Harmony', category: 'Professional', preview: 'https://static.wixstatic.com/media/c2517c_a17524fa82d049239f2a6f02db03d090~mv2.png?originWidth=768&originHeight=1024' },
  { id: 'professional-29', name: 'Bold Professional', category: 'Professional', preview: 'https://static.wixstatic.com/media/c2517c_51432c310eac4b74a8b776b76fab10cd~mv2.png?originWidth=768&originHeight=1024' },
  { id: 'professional-30', name: 'Elegant Flow', category: 'Professional', preview: 'https://static.wixstatic.com/media/c2517c_4b7d1a4ed09a4ec088b1037927091352~mv2.png?originWidth=768&originHeight=1024' },
  { id: 'professional-31', name: 'Smart Layout', category: 'Professional', preview: 'https://static.wixstatic.com/media/c2517c_8dd3c2dcde4743de9f89e37677408b02~mv2.png?originWidth=768&originHeight=1024' },
  { id: 'professional-32', name: 'Refined Pro', category: 'Professional', preview: 'https://static.wixstatic.com/media/c2517c_c5e36c188f6e418cb52f148661b57c12~mv2.png?originWidth=768&originHeight=1024' },
  { id: 'professional-33', name: 'Sleek Pro', category: 'Professional', preview: 'https://static.wixstatic.com/media/c2517c_7dec187cf1b442ebb360fb2a2d307169~mv2.png?originWidth=768&originHeight=1024' },
  { id: 'professional-34', name: 'Balanced Design', category: 'Professional', preview: 'https://static.wixstatic.com/media/c2517c_35f870eea3534dcca604a4728b9372a8~mv2.png?originWidth=768&originHeight=1024' },
  { id: 'professional-35', name: 'Focused Pro', category: 'Professional', preview: 'https://static.wixstatic.com/media/c2517c_9607c90ed5b0447fad732245f2581934~mv2.png?originWidth=768&originHeight=1024' },
  { id: 'professional-36', name: 'Sophisticated Pro', category: 'Professional', preview: 'https://static.wixstatic.com/media/c2517c_386876b8f2924b54aa813cc93aad62e9~mv2.png?originWidth=768&originHeight=1024' },
  { id: 'professional-37', name: 'Modern Classic', category: 'Professional', preview: 'https://static.wixstatic.com/media/c2517c_4f396ae20bf74f628538c675fa12ae6e~mv2.png?originWidth=768&originHeight=1024' },
  { id: 'professional-38', name: 'Precision Pro', category: 'Professional', preview: 'https://static.wixstatic.com/media/c2517c_ac9eb54a0b424afdb7797d375df632a9~mv2.png?originWidth=768&originHeight=1024' },
  { id: 'professional-39', name: 'Elegant Pro', category: 'Professional', preview: 'https://static.wixstatic.com/media/c2517c_f1e82731e7c64325a5e871d6a116b611~mv2.png?originWidth=768&originHeight=1024' },
  { id: 'professional-40', name: 'Dynamic Pro', category: 'Professional', preview: 'https://static.wixstatic.com/media/c2517c_58ff7fd3ca024be1b4397b111e96bc6f~mv2.png?originWidth=768&originHeight=1024' },
  { id: 'professional-41', name: 'Streamlined', category: 'Professional', preview: 'https://static.wixstatic.com/media/c2517c_47c25b777a264ba58cfda12f862279a3~mv2.png?originWidth=768&originHeight=1024' },
  { id: 'professional-42', name: 'Polished Pro', category: 'Professional', preview: 'https://static.wixstatic.com/media/c2517c_d1da29405e0c4166bee76c62d66c7cc3~mv2.png?originWidth=768&originHeight=1024' },
  { id: 'professional-43', name: 'Structured', category: 'Professional', preview: 'https://static.wixstatic.com/media/c2517c_e4811c33aab440c9b6de68c7ce0d020f~mv2.png?originWidth=768&originHeight=1024' },
  { id: 'professional-44', name: 'Refined', category: 'Professional', preview: 'https://static.wixstatic.com/media/c2517c_4f8b46bce3a94802ac0be1ccf744ccc1~mv2.png?originWidth=768&originHeight=1024' },
  { id: 'professional-45', name: 'Clarity', category: 'Professional', preview: 'https://static.wixstatic.com/media/c2517c_8ca3e61f35104346869f9b11f96d3658~mv2.png?originWidth=768&originHeight=1024' },
  { id: 'professional-46', name: 'Harmony', category: 'Professional', preview: 'https://static.wixstatic.com/media/c2517c_56095d9f1f834b57b60c627377504010~mv2.png?originWidth=768&originHeight=1024' },
  { id: 'professional-47', name: 'Bold', category: 'Professional', preview: 'https://static.wixstatic.com/media/c2517c_072a93ac99e5449681b41314c6791449~mv2.png?originWidth=768&originHeight=1024' },
  { id: 'professional-48', name: 'Flow', category: 'Professional', preview: 'https://static.wixstatic.com/media/c2517c_101c26393f1b419eb398b55efab9d9a9~mv2.png?originWidth=768&originHeight=1024' },
  { id: 'professional-49', name: 'Smart', category: 'Professional', preview: 'https://static.wixstatic.com/media/c2517c_6df905ceb3d946f1b4285c254dbab1f5~mv2.png?originWidth=768&originHeight=1024' },
  { id: 'professional-50', name: 'Pro Plus', category: 'Professional', preview: 'https://static.wixstatic.com/media/c2517c_ce301bc0c33d411e9d8e102a31287e14~mv2.png?originWidth=768&originHeight=1024' },
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
