import { useState } from 'react';
import { useResumeStore } from '@/store/resumeStore';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Code, Plus, X } from 'lucide-react';

export default function SkillsForm() {
  const { resumeData, addSkill, removeSkill } = useResumeStore();
  const [newSkill, setNewSkill] = useState('');

  const handleAddSkill = () => {
    if (newSkill.trim() && !resumeData.skills.includes(newSkill.trim())) {
      addSkill(newSkill.trim());
      setNewSkill('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-heading text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
          <Code className="w-6 h-6 text-primary" />
          Skills
        </h3>
      </div>

      <div className="flex gap-3">
        <div className="flex-1">
          <Label className="font-paragraph text-foreground/80 mb-2 block">Add Skill</Label>
          <Input
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="e.g., JavaScript, Project Management, Adobe Photoshop"
            className="bg-glass-overlay backdrop-blur-md border-white/10 text-foreground"
          />
        </div>
        <div className="flex items-end">
          <Button
            onClick={handleAddSkill}
            className="bg-primary text-black hover:bg-primary/90"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {resumeData.skills.map((skill, index) => (
          <div
            key={index}
            className="group px-4 py-2 rounded-xl bg-glass-overlay backdrop-blur-md border border-white/10 hover:border-primary/30 transition-all flex items-center gap-2"
          >
            <span className="font-paragraph text-foreground">{skill}</span>
            <button
              onClick={() => removeSkill(skill)}
              className="text-foreground/50 hover:text-destructive transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {resumeData.skills.length === 0 && (
        <div className="text-center py-12 px-6 rounded-xl bg-glass-overlay backdrop-blur-md border border-white/10 border-dashed">
          <Code className="w-12 h-12 text-foreground/30 mx-auto mb-3" />
          <p className="font-paragraph text-foreground/60">
            No skills added yet. Start adding your skills above.
          </p>
        </div>
      )}
    </div>
  );
}
