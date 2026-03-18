import { useState } from 'react';
import { useResumeStore, Education } from '@/store/resumeStore';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { GraduationCap, Plus, Trash2, Edit2 } from 'lucide-react';

export default function EducationForm() {
  const { resumeData, addEducation, updateEducation, deleteEducation } = useResumeStore();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Education, 'id'>>({
    institution: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
    gpa: '',
    description: '',
  });

  const resetForm = () => {
    setFormData({
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      gpa: '',
      description: '',
    });
    setIsAdding(false);
    setEditingId(null);
  };

  const handleSubmit = () => {
    if (!formData.institution || !formData.degree) return;

    if (editingId) {
      updateEducation(editingId, formData);
    } else {
      addEducation({ ...formData, id: crypto.randomUUID() });
    }
    resetForm();
  };

  const handleEdit = (edu: Education) => {
    setFormData(edu);
    setEditingId(edu.id);
    setIsAdding(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-2xl font-semibold text-foreground flex items-center gap-2">
          <GraduationCap className="w-6 h-6 text-primary" />
          Education
        </h3>
        {!isAdding && (
          <Button
            onClick={() => setIsAdding(true)}
            className="bg-primary text-black hover:bg-primary/90"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Education
          </Button>
        )}
      </div>

      {isAdding && (
        <div className="p-6 rounded-xl bg-glass-overlay backdrop-blur-md border border-white/10 space-y-4">
          <div>
            <Label className="font-paragraph text-foreground/80 mb-2 block">Institution *</Label>
            <Input
              value={formData.institution}
              onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
              placeholder="University Name"
              className="bg-background/50 border-white/10 text-foreground"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="font-paragraph text-foreground/80 mb-2 block">Degree *</Label>
              <Input
                value={formData.degree}
                onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                placeholder="Bachelor of Science"
                className="bg-background/50 border-white/10 text-foreground"
              />
            </div>
            <div>
              <Label className="font-paragraph text-foreground/80 mb-2 block">Field of Study</Label>
              <Input
                value={formData.field}
                onChange={(e) => setFormData({ ...formData, field: e.target.value })}
                placeholder="Computer Science"
                className="bg-background/50 border-white/10 text-foreground"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                className="bg-background/50 border-white/10 text-foreground"
              />
            </div>
            <div>
              <Label className="font-paragraph text-foreground/80 mb-2 block">GPA</Label>
              <Input
                value={formData.gpa}
                onChange={(e) => setFormData({ ...formData, gpa: e.target.value })}
                placeholder="3.8/4.0"
                className="bg-background/50 border-white/10 text-foreground"
              />
            </div>
          </div>

          <div>
            <Label className="font-paragraph text-foreground/80 mb-2 block">Description</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Relevant coursework, honors, activities..."
              rows={3}
              className="bg-background/50 border-white/10 text-foreground resize-none"
            />
          </div>

          <div className="flex gap-3">
            <Button onClick={handleSubmit} className="bg-primary text-black hover:bg-primary/90">
              {editingId ? 'Update' : 'Add'} Education
            </Button>
            <Button onClick={resetForm} variant="outline" className="border-white/10 text-foreground">
              Cancel
            </Button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {resumeData.education.map((edu) => (
          <div
            key={edu.id}
            className="p-6 rounded-xl bg-glass-overlay backdrop-blur-md border border-white/10 hover:border-primary/30 transition-all"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-heading text-lg font-semibold text-foreground">{edu.degree}</h4>
                <p className="font-paragraph text-primary">{edu.institution}</p>
                <p className="font-paragraph text-sm text-foreground/60">
                  {edu.field && `${edu.field} • `}
                  {edu.startDate} - {edu.endDate}
                  {edu.gpa && ` • GPA: ${edu.gpa}`}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleEdit(edu)}
                  className="text-foreground/70 hover:text-primary"
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => deleteEducation(edu.id)}
                  className="text-foreground/70 hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            {edu.description && (
              <p className="font-paragraph text-sm text-foreground/70 whitespace-pre-line">
                {edu.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
