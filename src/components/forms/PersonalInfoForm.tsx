import { useResumeStore } from '@/store/resumeStore';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { User, Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';

export default function PersonalInfoForm() {
  const { resumeData, updatePersonalInfo } = useResumeStore();
  const { personalInfo } = resumeData;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-heading text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
          <User className="w-6 h-6 text-primary" />
          Personal Information
        </h3>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="fullName" className="font-paragraph text-foreground/80 mb-2 block">
            Full Name *
          </Label>
          <Input
            id="fullName"
            value={personalInfo.fullName}
            onChange={(e) => updatePersonalInfo({ fullName: e.target.value })}
            placeholder="John Doe"
            className="bg-glass-overlay backdrop-blur-md border-white/10 text-foreground"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="email" className="font-paragraph text-foreground/80 mb-2 block flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email *
            </Label>
            <Input
              id="email"
              type="email"
              value={personalInfo.email}
              onChange={(e) => updatePersonalInfo({ email: e.target.value })}
              placeholder="john@example.com"
              className="bg-glass-overlay backdrop-blur-md border-white/10 text-foreground"
            />
          </div>

          <div>
            <Label htmlFor="phone" className="font-paragraph text-foreground/80 mb-2 block flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Phone *
            </Label>
            <Input
              id="phone"
              value={personalInfo.phone}
              onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
              placeholder="+1 (555) 123-4567"
              className="bg-glass-overlay backdrop-blur-md border-white/10 text-foreground"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="location" className="font-paragraph text-foreground/80 mb-2 block flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Location
          </Label>
          <Input
            id="location"
            value={personalInfo.location}
            onChange={(e) => updatePersonalInfo({ location: e.target.value })}
            placeholder="San Francisco, CA"
            className="bg-glass-overlay backdrop-blur-md border-white/10 text-foreground"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="linkedin" className="font-paragraph text-foreground/80 mb-2 block flex items-center gap-2">
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </Label>
            <Input
              id="linkedin"
              value={personalInfo.linkedin}
              onChange={(e) => updatePersonalInfo({ linkedin: e.target.value })}
              placeholder="linkedin.com/in/johndoe"
              className="bg-glass-overlay backdrop-blur-md border-white/10 text-foreground"
            />
          </div>

          <div>
            <Label htmlFor="github" className="font-paragraph text-foreground/80 mb-2 block flex items-center gap-2">
              <Github className="w-4 h-4" />
              GitHub
            </Label>
            <Input
              id="github"
              value={personalInfo.github}
              onChange={(e) => updatePersonalInfo({ github: e.target.value })}
              placeholder="github.com/johndoe"
              className="bg-glass-overlay backdrop-blur-md border-white/10 text-foreground"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="summary" className="font-paragraph text-foreground/80 mb-2 block">
            Professional Summary
          </Label>
          <Textarea
            id="summary"
            value={personalInfo.summary}
            onChange={(e) => updatePersonalInfo({ summary: e.target.value })}
            placeholder="Brief overview of your professional background and key achievements..."
            rows={4}
            className="bg-glass-overlay backdrop-blur-md border-white/10 text-foreground resize-none"
          />
        </div>
      </div>
    </div>
  );
}
