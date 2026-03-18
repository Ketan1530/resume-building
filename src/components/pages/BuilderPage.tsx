import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PersonalInfoForm from '@/components/forms/PersonalInfoForm';
import ExperienceForm from '@/components/forms/ExperienceForm';
import EducationForm from '@/components/forms/EducationForm';
import SkillsForm from '@/components/forms/SkillsForm';
import ProjectsForm from '@/components/forms/ProjectsForm';
import CertificationsForm from '@/components/forms/CertificationsForm';
import AchievementsForm from '@/components/forms/AchievementsForm';
import PhotoUpload from '@/components/PhotoUpload';
import SectionReorder from '@/components/SectionReorder';
import ResumeTemplate from '@/components/templates/ResumeTemplate';
import { useResumeStore } from '@/store/resumeStore';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Printer, FileText } from 'lucide-react';

export default function BuilderPage() {
  const { resumeData, selectedTemplate } = useResumeStore();
  const resumeRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const handleExportPDF = () => {
    // Use browser's print to PDF functionality
    window.print();
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      <div className="pt-32 pb-20 px-8">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="font-heading text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-accent-teal to-secondary bg-clip-text text-transparent">
              Build Your Resume
            </h1>
            <p className="font-paragraph text-xl text-foreground/70">
              Fill in your information and watch your resume come to life
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Side - Forms */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <div className="p-8 rounded-2xl bg-glass-overlay backdrop-blur-md border border-white/10">
                <Tabs defaultValue="personal" className="w-full">
                  <TabsList className="grid grid-cols-4 lg:grid-cols-7 gap-2 bg-background/50 p-2 rounded-xl mb-6">
                    <TabsTrigger value="personal" className="text-xs lg:text-sm">Personal</TabsTrigger>
                    <TabsTrigger value="experience" className="text-xs lg:text-sm">Experience</TabsTrigger>
                    <TabsTrigger value="education" className="text-xs lg:text-sm">Education</TabsTrigger>
                    <TabsTrigger value="skills" className="text-xs lg:text-sm">Skills</TabsTrigger>
                    <TabsTrigger value="projects" className="text-xs lg:text-sm">Projects</TabsTrigger>
                    <TabsTrigger value="certs" className="text-xs lg:text-sm">Certs</TabsTrigger>
                    <TabsTrigger value="achievements" className="text-xs lg:text-sm">Awards</TabsTrigger>
                  </TabsList>

                  <TabsContent value="personal" className="space-y-6">
                    <PersonalInfoForm />
                    <PhotoUpload />
                  </TabsContent>

                  <TabsContent value="experience">
                    <ExperienceForm />
                  </TabsContent>

                  <TabsContent value="education">
                    <EducationForm />
                  </TabsContent>

                  <TabsContent value="skills">
                    <SkillsForm />
                  </TabsContent>

                  <TabsContent value="projects">
                    <ProjectsForm />
                  </TabsContent>

                  <TabsContent value="certs">
                    <CertificationsForm />
                  </TabsContent>

                  <TabsContent value="achievements">
                    <AchievementsForm />
                  </TabsContent>
                </Tabs>
              </div>

              {/* Section Reorder */}
              <div className="p-8 rounded-2xl bg-glass-overlay backdrop-blur-md border border-white/10">
                <SectionReorder />
              </div>
            </motion.div>

            {/* Right Side - Preview */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:sticky lg:top-32 h-fit space-y-6"
            >
              {/* Export Buttons */}
              <div className="p-6 rounded-2xl bg-glass-overlay backdrop-blur-md border border-white/10 no-print">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-4">
                  Export Resume
                </h3>
                <div className="flex gap-3">
                  <Button
                    onClick={handleExportPDF}
                    className="flex-1 bg-gradient-to-r from-primary to-accent-teal text-black hover:opacity-90"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Print / Save as PDF
                  </Button>
                  <Button
                    onClick={handlePrint}
                    className="flex-1 border-2 border-primary text-primary hover:bg-primary/10"
                    variant="outline"
                  >
                    <Printer className="w-4 h-4 mr-2" />
                    Print
                  </Button>
                </div>
                <p className="text-xs text-foreground/60 mt-3">
                  Use your browser's print dialog to save as PDF or print directly
                </p>
              </div>

              {/* Resume Preview */}
              <div className="p-6 rounded-2xl bg-glass-overlay backdrop-blur-md border border-white/10">
                <div className="flex items-center justify-between mb-4 no-print">
                  <h3 className="font-heading text-lg font-semibold text-foreground">
                    Live Preview
                  </h3>
                  <div className="px-3 py-1 rounded-lg bg-primary/20 text-primary text-xs font-paragraph">
                    {selectedTemplate}
                  </div>
                </div>
                
                <div className="bg-white rounded-lg overflow-hidden shadow-2xl max-h-[800px] overflow-y-auto">
                  <div ref={resumeRef} id="resume-preview">
                    <ResumeTemplate data={resumeData} templateId={selectedTemplate} />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
