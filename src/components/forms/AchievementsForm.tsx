import { useState } from 'react';
import { useResumeStore, Achievement } from '@/store/resumeStore';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Trophy, Plus, Trash2, Edit2 } from 'lucide-react';

export default function AchievementsForm() {
  const { resumeData, addAchievement, updateAchievement, deleteAchievement } = useResumeStore();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Achievement, 'id'>>({
    title: '',
    description: '',
    date: '',
  });

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      date: '',
    });
    setIsAdding(false);
    setEditingId(null);
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.description) return;

    if (editingId) {
      updateAchievement(editingId, formData);
    } else {
      addAchievement({ ...formData, id: crypto.randomUUID() });
    }
    resetForm();
  };

  const handleEdit = (achievement: Achievement) => {
    setFormData(achievement);
    setEditingId(achievement.id);
    setIsAdding(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-2xl font-semibold text-foreground flex items-center gap-2">
          <Trophy className="w-6 h-6 text-primary" />
          Achievements
        </h3>
        {!isAdding && (
          <Button
            onClick={() => setIsAdding(true)}
            className="bg-primary text-black hover:bg-primary/90"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Achievement
          </Button>
        )}
      </div>

      {isAdding && (
        <div className="p-6 rounded-xl bg-glass-overlay backdrop-blur-md border border-white/10 space-y-4">
          <div>
            <Label className="font-paragraph text-foreground/80 mb-2 block">Achievement Title *</Label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Employee of the Year"
              className="bg-background/50 border-white/10 text-foreground"
            />
          </div>

          <div>
            <Label className="font-paragraph text-foreground/80 mb-2 block">Description *</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the achievement and its impact..."
              rows={3}
              className="bg-background/50 border-white/10 text-foreground resize-none"
            />
          </div>

          <div>
            <Label className="font-paragraph text-foreground/80 mb-2 block">Date</Label>
            <Input
              type="month"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="bg-background/50 border-white/10 text-foreground"
            />
          </div>

          <div className="flex gap-3">
            <Button onClick={handleSubmit} className="bg-primary text-black hover:bg-primary/90">
              {editingId ? 'Update' : 'Add'} Achievement
            </Button>
            <Button onClick={resetForm} variant="outline" className="border-white/10 text-foreground">
              Cancel
            </Button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {resumeData.achievements.map((achievement) => (
          <div
            key={achievement.id}
            className="p-6 rounded-xl bg-glass-overlay backdrop-blur-md border border-white/10 hover:border-primary/30 transition-all"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-heading text-lg font-semibold text-foreground">{achievement.title}</h4>
                <p className="font-paragraph text-sm text-foreground/60">{achievement.date}</p>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleEdit(achievement)}
                  className="text-foreground/70 hover:text-primary"
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => deleteAchievement(achievement.id)}
                  className="text-foreground/70 hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <p className="font-paragraph text-sm text-foreground/70 whitespace-pre-line">
              {achievement.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
