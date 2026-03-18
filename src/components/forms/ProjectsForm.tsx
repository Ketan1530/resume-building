import { useState } from 'react';
import { useResumeStore, Project } from '@/store/resumeStore';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { FolderGit2, Plus, Trash2, Edit2 } from 'lucide-react';

export default function ProjectsForm() {
  const { resumeData, addProject, updateProject, deleteProject } = useResumeStore();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Project, 'id'>>({
    name: '',
    description: '',
    technologies: '',
    link: '',
    startDate: '',
    endDate: '',
  });

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      technologies: '',
      link: '',
      startDate: '',
      endDate: '',
    });
    setIsAdding(false);
    setEditingId(null);
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.description) return;

    if (editingId) {
      updateProject(editingId, formData);
    } else {
      addProject({ ...formData, id: crypto.randomUUID() });
    }
    resetForm();
  };

  const handleEdit = (project: Project) => {
    setFormData(project);
    setEditingId(project.id);
    setIsAdding(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-2xl font-semibold text-foreground flex items-center gap-2">
          <FolderGit2 className="w-6 h-6 text-primary" />
          Projects
        </h3>
        {!isAdding && (
          <Button
            onClick={() => setIsAdding(true)}
            className="bg-primary text-black hover:bg-primary/90"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Project
          </Button>
        )}
      </div>

      {isAdding && (
        <div className="p-6 rounded-xl bg-glass-overlay backdrop-blur-md border border-white/10 space-y-4">
          <div>
            <Label className="font-paragraph text-foreground/80 mb-2 block">Project Name *</Label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="E-commerce Platform"
              className="bg-background/50 border-white/10 text-foreground"
            />
          </div>

          <div>
            <Label className="font-paragraph text-foreground/80 mb-2 block">Description *</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the project, your role, and key achievements..."
              rows={4}
              className="bg-background/50 border-white/10 text-foreground resize-none"
            />
          </div>

          <div>
            <Label className="font-paragraph text-foreground/80 mb-2 block">Technologies Used</Label>
            <Input
              value={formData.technologies}
              onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
              placeholder="React, Node.js, MongoDB, AWS"
              className="bg-background/50 border-white/10 text-foreground"
            />
          </div>

          <div>
            <Label className="font-paragraph text-foreground/80 mb-2 block">Project Link</Label>
            <Input
              value={formData.link}
              onChange={(e) => setFormData({ ...formData, link: e.target.value })}
              placeholder="https://github.com/username/project"
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
                className="bg-background/50 border-white/10 text-foreground"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <Button onClick={handleSubmit} className="bg-primary text-black hover:bg-primary/90">
              {editingId ? 'Update' : 'Add'} Project
            </Button>
            <Button onClick={resetForm} variant="outline" className="border-white/10 text-foreground">
              Cancel
            </Button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {resumeData.projects.map((project) => (
          <div
            key={project.id}
            className="p-6 rounded-xl bg-glass-overlay backdrop-blur-md border border-white/10 hover:border-primary/30 transition-all"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-heading text-lg font-semibold text-foreground">{project.name}</h4>
                {project.technologies && (
                  <p className="font-paragraph text-sm text-primary">{project.technologies}</p>
                )}
                <p className="font-paragraph text-sm text-foreground/60">
                  {project.startDate} - {project.endDate}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleEdit(project)}
                  className="text-foreground/70 hover:text-primary"
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => deleteProject(project.id)}
                  className="text-foreground/70 hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <p className="font-paragraph text-sm text-foreground/70 whitespace-pre-line mb-2">
              {project.description}
            </p>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="font-paragraph text-sm text-primary hover:underline"
              >
                {project.link}
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
