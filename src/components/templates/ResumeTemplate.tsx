import { ResumeData } from '@/store/resumeStore';
import { Mail, Phone, MapPin, Linkedin, Github, ExternalLink } from 'lucide-react';

interface ResumeTemplateProps {
  data: ResumeData;
  templateId: string;
}

export default function ResumeTemplate({ data, templateId }: ResumeTemplateProps) {
  const { personalInfo, sectionOrder } = data;

  const renderSection = (sectionName: string) => {
    switch (sectionName) {
      case 'experience':
        return data.experience.length > 0 ? (
          <div className="mb-6">
            <h2 className="text-xl font-heading font-bold text-primary border-b-2 border-primary pb-2 mb-4">
              EXPERIENCE
            </h2>
            {data.experience.map((exp) => (
              <div key={exp.id} className="mb-4">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-heading font-semibold text-foreground">{exp.position}</h3>
                  <span className="text-sm text-foreground/60">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <p className="text-primary font-paragraph mb-1">{exp.company}</p>
                {exp.location && <p className="text-sm text-foreground/60 mb-2">{exp.location}</p>}
                {exp.description && (
                  <p className="text-sm text-foreground/80 whitespace-pre-line">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        ) : null;

      case 'education':
        return data.education.length > 0 ? (
          <div className="mb-6">
            <h2 className="text-xl font-heading font-bold text-primary border-b-2 border-primary pb-2 mb-4">
              EDUCATION
            </h2>
            {data.education.map((edu) => (
              <div key={edu.id} className="mb-4">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-heading font-semibold text-foreground">{edu.degree}</h3>
                  <span className="text-sm text-foreground/60">
                    {edu.startDate} - {edu.endDate}
                  </span>
                </div>
                <p className="text-primary font-paragraph mb-1">{edu.institution}</p>
                {edu.field && <p className="text-sm text-foreground/70 mb-1">{edu.field}</p>}
                {edu.gpa && <p className="text-sm text-foreground/60 mb-2">GPA: {edu.gpa}</p>}
                {edu.description && (
                  <p className="text-sm text-foreground/80 whitespace-pre-line">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        ) : null;

      case 'skills':
        return data.skills.length > 0 ? (
          <div className="mb-6">
            <h2 className="text-xl font-heading font-bold text-primary border-b-2 border-primary pb-2 mb-4">
              SKILLS
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-primary/20 text-foreground rounded-lg text-sm font-paragraph"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ) : null;

      case 'projects':
        return data.projects.length > 0 ? (
          <div className="mb-6">
            <h2 className="text-xl font-heading font-bold text-primary border-b-2 border-primary pb-2 mb-4">
              PROJECTS
            </h2>
            {data.projects.map((project) => (
              <div key={project.id} className="mb-4">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-heading font-semibold text-foreground">{project.name}</h3>
                  <span className="text-sm text-foreground/60">
                    {project.startDate} - {project.endDate}
                  </span>
                </div>
                {project.technologies && (
                  <p className="text-sm text-primary font-paragraph mb-1">{project.technologies}</p>
                )}
                <p className="text-sm text-foreground/80 whitespace-pre-line mb-1">{project.description}</p>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline inline-flex items-center gap-1"
                  >
                    View Project <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            ))}
          </div>
        ) : null;

      case 'certifications':
        return data.certifications.length > 0 ? (
          <div className="mb-6">
            <h2 className="text-xl font-heading font-bold text-primary border-b-2 border-primary pb-2 mb-4">
              CERTIFICATIONS
            </h2>
            {data.certifications.map((cert) => (
              <div key={cert.id} className="mb-3">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-heading font-semibold text-foreground">{cert.name}</h3>
                  <span className="text-sm text-foreground/60">{cert.date}</span>
                </div>
                <p className="text-primary font-paragraph text-sm mb-1">{cert.issuer}</p>
                {cert.credentialId && (
                  <p className="text-sm text-foreground/60">ID: {cert.credentialId}</p>
                )}
                {cert.link && (
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline inline-flex items-center gap-1"
                  >
                    View Credential <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            ))}
          </div>
        ) : null;

      case 'achievements':
        return data.achievements.length > 0 ? (
          <div className="mb-6">
            <h2 className="text-xl font-heading font-bold text-primary border-b-2 border-primary pb-2 mb-4">
              ACHIEVEMENTS
            </h2>
            {data.achievements.map((achievement) => (
              <div key={achievement.id} className="mb-3">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-heading font-semibold text-foreground">{achievement.title}</h3>
                  <span className="text-sm text-foreground/60">{achievement.date}</span>
                </div>
                <p className="text-sm text-foreground/80 whitespace-pre-line">{achievement.description}</p>
              </div>
            ))}
          </div>
        ) : null;

      default:
        return null;
    }
  };

  return (
    <div className="bg-white text-gray-900 p-8 shadow-lg rounded-lg max-w-4xl mx-auto font-paragraph">
      {/* Header */}
      <div className="mb-6 pb-6 border-b-4 border-primary">
        <h1 className="text-4xl font-heading font-bold text-gray-900 mb-2">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          {personalInfo.email && (
            <div className="flex items-center gap-1">
              <Mail className="w-4 h-4" />
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{personalInfo.location}</span>
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="flex items-center gap-1">
              <Linkedin className="w-4 h-4" />
              <span>{personalInfo.linkedin}</span>
            </div>
          )}
          {personalInfo.github && (
            <div className="flex items-center gap-1">
              <Github className="w-4 h-4" />
              <span>{personalInfo.github}</span>
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="mb-6">
          <h2 className="text-xl font-heading font-bold text-primary border-b-2 border-primary pb-2 mb-4">
            PROFESSIONAL SUMMARY
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
            {personalInfo.summary}
          </p>
        </div>
      )}

      {/* Dynamic Sections */}
      {sectionOrder.map((section) => (
        <div key={section}>{renderSection(section)}</div>
      ))}
    </div>
  );
}
