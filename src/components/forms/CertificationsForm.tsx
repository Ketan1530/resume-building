import { useState } from 'react';
import { useResumeStore, Certification } from '@/store/resumeStore';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Award, Plus, Trash2, Edit2 } from 'lucide-react';

export default function CertificationsForm() {
  const { resumeData, addCertification, updateCertification, deleteCertification } = useResumeStore();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Certification, 'id'>>({
    name: '',
    issuer: '',
    date: '',
    credentialId: '',
    link: '',
  });

  const resetForm = () => {
    setFormData({
      name: '',
      issuer: '',
      date: '',
      credentialId: '',
      link: '',
    });
    setIsAdding(false);
    setEditingId(null);
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.issuer) return;

    if (editingId) {
      updateCertification(editingId, formData);
    } else {
      addCertification({ ...formData, id: crypto.randomUUID() });
    }
    resetForm();
  };

  const handleEdit = (cert: Certification) => {
    setFormData(cert);
    setEditingId(cert.id);
    setIsAdding(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-2xl font-semibold text-foreground flex items-center gap-2">
          <Award className="w-6 h-6 text-primary" />
          Certifications
        </h3>
        {!isAdding && (
          <Button
            onClick={() => setIsAdding(true)}
            className="bg-primary text-black hover:bg-primary/90"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Certification
          </Button>
        )}
      </div>

      {isAdding && (
        <div className="p-6 rounded-xl bg-glass-overlay backdrop-blur-md border border-white/10 space-y-4">
          <div>
            <Label className="font-paragraph text-foreground/80 mb-2 block">Certification Name *</Label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="AWS Certified Solutions Architect"
              className="bg-background/50 border-white/10 text-foreground"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="font-paragraph text-foreground/80 mb-2 block">Issuing Organization *</Label>
              <Input
                value={formData.issuer}
                onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                placeholder="Amazon Web Services"
                className="bg-background/50 border-white/10 text-foreground"
              />
            </div>
            <div>
              <Label className="font-paragraph text-foreground/80 mb-2 block">Issue Date</Label>
              <Input
                type="month"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="bg-background/50 border-white/10 text-foreground"
              />
            </div>
          </div>

          <div>
            <Label className="font-paragraph text-foreground/80 mb-2 block">Credential ID</Label>
            <Input
              value={formData.credentialId}
              onChange={(e) => setFormData({ ...formData, credentialId: e.target.value })}
              placeholder="ABC123XYZ"
              className="bg-background/50 border-white/10 text-foreground"
            />
          </div>

          <div>
            <Label className="font-paragraph text-foreground/80 mb-2 block">Credential URL</Label>
            <Input
              value={formData.link}
              onChange={(e) => setFormData({ ...formData, link: e.target.value })}
              placeholder="https://www.credential.net/..."
              className="bg-background/50 border-white/10 text-foreground"
            />
          </div>

          <div className="flex gap-3">
            <Button onClick={handleSubmit} className="bg-primary text-black hover:bg-primary/90">
              {editingId ? 'Update' : 'Add'} Certification
            </Button>
            <Button onClick={resetForm} variant="outline" className="border-white/10 text-foreground">
              Cancel
            </Button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {resumeData.certifications.map((cert) => (
          <div
            key={cert.id}
            className="p-6 rounded-xl bg-glass-overlay backdrop-blur-md border border-white/10 hover:border-primary/30 transition-all"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-heading text-lg font-semibold text-foreground">{cert.name}</h4>
                <p className="font-paragraph text-primary">{cert.issuer}</p>
                <p className="font-paragraph text-sm text-foreground/60">
                  {cert.date}
                  {cert.credentialId && ` • ID: ${cert.credentialId}`}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleEdit(cert)}
                  className="text-foreground/70 hover:text-primary"
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => deleteCertification(cert.id)}
                  className="text-foreground/70 hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            {cert.link && (
              <a
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="font-paragraph text-sm text-primary hover:underline"
              >
                View Credential
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
