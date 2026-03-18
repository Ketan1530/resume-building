import { useRef } from 'react';
import { useResumeStore } from '@/store/resumeStore';
import { Button } from '@/components/ui/button';
import { Camera, X } from 'lucide-react';
import { Image } from '@/components/ui/image';

export default function PhotoUpload() {
  const { resumeData, updatePersonalInfo } = useResumeStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updatePersonalInfo({ photo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    updatePersonalInfo({ photo: undefined });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="font-heading text-lg font-semibold text-foreground flex items-center gap-2">
        <Camera className="w-5 h-5 text-primary" />
        Profile Photo
      </h3>

      <div className="flex items-center gap-4">
        {resumeData.personalInfo.photo ? (
          <div className="relative">
            <Image src={resumeData.personalInfo.photo} alt="Profile" className="w-24 h-24 rounded-xl object-cover border-2 border-primary" />
            <button
              onClick={handleRemovePhoto}
              className="absolute -top-2 -right-2 w-6 h-6 bg-destructive rounded-full flex items-center justify-center text-white hover:bg-destructive/90 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="w-24 h-24 rounded-xl bg-glass-overlay backdrop-blur-md border-2 border-dashed border-white/20 flex items-center justify-center">
            <Camera className="w-8 h-8 text-foreground/30" />
          </div>
        )}

        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="photo-upload"
          />
          <label htmlFor="photo-upload">
            <Button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="bg-primary text-black hover:bg-primary/90"
            >
              <Camera className="w-4 h-4 mr-2" />
              Upload Photo
            </Button>
          </label>
          <p className="text-xs text-foreground/60 mt-2">
            Recommended: Square image, at least 400x400px
          </p>
        </div>
      </div>
    </div>
  );
}
