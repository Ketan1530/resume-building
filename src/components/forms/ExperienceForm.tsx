import { useState } from 'react';
import { useResumeStore, Experience } from '@/store/resumeStore';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Briefcase, Plus, Trash2, Edit2 } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

export default function ExperienceForm() {
  const { resumeData, addExperience, updateExperience, deleteExperience } = useResumeStore();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Experience, 'id'>>({
    company: '',
    position: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
  });

  const resetForm = () => {
    setFormData({
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    });
    setIsAdding(false);
    setEditingId(null);
  };

  const handleSubmit = () => {
    if (!formData.company || !formData.position) return;

    if (editingId) {
      updateExperience(editingId, formData);
    } else {
      addExperience({ ...formData, id: crypto.randomUUID() });
    }
    resetForm();
  };

  const handleEdit = (exp: Experience) => {
    setFormData(exp);
    setEditingId(exp.id);
    setIsAdding(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-2xl font-semibold text-foreground flex items-center gap-2">
          <Briefcase className="w-6 h-6 text-primary" />
          Work Experience
        </h3>
        {!isAdding && (
          <Button
            onClick={() => setIsAdding(true)}
            className="bg-primary text-black hover:bg-primary/90"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Experience
          </Button>
        )}
      </div>

      {isAdding && (
        <div className="p-6 rounded-xl bg-glass-overlay backdrop-blur-md border border-white/10 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="font-paragraph text-foreground/80 mb-2 block">Company *</Label>
              <Input
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="Company Name"
                className="bg-background/50 border-white/10 text-foreground"
              />
            </div>
            <div>
              <Label className="font-paragraph text-foreground/80 mb-2 block">Position *</Label>
              <Input
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                placeholder="Job Title"
                className="bg-background/50 border-white/10 text-foreground"
              />
            </div>
          </div>

          <div>
            <Label className="font-paragraph text-foreground/80 mb-2 block">Location</Label>
            <Input
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="City, State"
              className="bg-background/50 border-white/10 text-foreground"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="font-paragraph text-foreground/80 mb-2 block">Start Date</Label>
              <Input
                type="month"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="bg-background/50 border-white/10 text-foreground"
              />
            </div>
            <div>
              <Label className="font-paragraph text-foreground/80 mb-2 block">End Date</Label>
              <Input
                type="month"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                disabled={formData.current}
                className="bg-background/50 border-white/10 text-foreground"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="current"
              checked={formData.current}
              onCheckedChange={(checked) => setFormData({ ...formData, current: checked as boolean })}
            />
            <Label htmlFor="current" className="font-paragraph text-foreground/80 cursor-pointer">
              I currently work here
            </Label>
          </div>

          <div>
            <Label className="font-paragraph text-foreground/80 mb-2 block">Description</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe your responsibilities and achievements..."
              rows={4}
              className="bg-background/50 border-white/10 text-foreground resize-none"
            />
          </div>

          <div className="flex gap-3">
            <Button onClick={handleSubmit} className="bg-primary text-black hover:bg-primary/90">
              {editingId ? 'Update' : 'Add'} Experience
            </Button>
            <Button onClick={resetForm} variant="outline" className="border-white/10 text-foreground">
              Cancel
            </Button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {resumeData.experience.map((exp) => (
          <div
            key={exp.id}
            className="p-6 rounded-xl bg-glass-overlay backdrop-blur-md border border-white/10 hover:border-primary/30 transition-all"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-heading text-lg font-semibold text-foreground">{exp.position}</h4>
                <p className="font-paragraph text-primary">{exp.company}</p>
                <p className="font-paragraph text-sm text-foreground/60">
                  {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  {exp.location && ` • ${exp.location}`}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleEdit(exp)}
                  className="text-foreground/70 hover:text-primary"
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => deleteExperience(exp.id)}
                  className="text-foreground/70 hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            {exp.description && (
              <p className="font-paragraph text-sm text-foreground/70 whitespace-pre-line">
                {exp.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
