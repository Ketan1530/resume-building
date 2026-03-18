import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  location: string;
  summary: string;
  photo?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  description: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string;
  link?: string;
  startDate: string;
  endDate: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
  link?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  education: Education[];
  experience: Experience[];
  skills: string[];
  projects: Project[];
  certifications: Certification[];
  achievements: Achievement[];
  sectionOrder: string[];
}

interface ResumeStore {
  resumeData: ResumeData;
  selectedTemplate: string;
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;
  addEducation: (education: Education) => void;
  updateEducation: (id: string, education: Partial<Education>) => void;
  deleteEducation: (id: string) => void;
  addExperience: (experience: Experience) => void;
  updateExperience: (id: string, experience: Partial<Experience>) => void;
  deleteExperience: (id: string) => void;
  addSkill: (skill: string) => void;
  removeSkill: (skill: string) => void;
  updateSkills: (skills: string[]) => void;
  addProject: (project: Project) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  addCertification: (certification: Certification) => void;
  updateCertification: (id: string, certification: Partial<Certification>) => void;
  deleteCertification: (id: string) => void;
  addAchievement: (achievement: Achievement) => void;
  updateAchievement: (id: string, achievement: Partial<Achievement>) => void;
  deleteAchievement: (id: string) => void;
  updateSectionOrder: (order: string[]) => void;
  setSelectedTemplate: (template: string) => void;
  clearResume: () => void;
}

const initialResumeData: ResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    linkedin: '',
    github: '',
    location: '',
    summary: '',
  },
  education: [],
  experience: [],
  skills: [],
  projects: [],
  certifications: [],
  achievements: [],
  sectionOrder: ['experience', 'education', 'skills', 'projects', 'certifications', 'achievements'],
};

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set) => ({
      resumeData: initialResumeData,
      selectedTemplate: 'professional-1',

      updatePersonalInfo: (info) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            personalInfo: { ...state.resumeData.personalInfo, ...info },
          },
        })),

      addEducation: (education) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            education: [...state.resumeData.education, education],
          },
        })),

      updateEducation: (id, education) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            education: state.resumeData.education.map((edu) =>
              edu.id === id ? { ...edu, ...education } : edu
            ),
          },
        })),

      deleteEducation: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            education: state.resumeData.education.filter((edu) => edu.id !== id),
          },
        })),

      addExperience: (experience) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            experience: [...state.resumeData.experience, experience],
          },
        })),

      updateExperience: (id, experience) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            experience: state.resumeData.experience.map((exp) =>
              exp.id === id ? { ...exp, ...experience } : exp
            ),
          },
        })),

      deleteExperience: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            experience: state.resumeData.experience.filter((exp) => exp.id !== id),
          },
        })),

      addSkill: (skill) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            skills: [...state.resumeData.skills, skill],
          },
        })),

      removeSkill: (skill) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            skills: state.resumeData.skills.filter((s) => s !== skill),
          },
        })),

      updateSkills: (skills) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            skills,
          },
        })),

      addProject: (project) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            projects: [...state.resumeData.projects, project],
          },
        })),

      updateProject: (id, project) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            projects: state.resumeData.projects.map((proj) =>
              proj.id === id ? { ...proj, ...project } : proj
            ),
          },
        })),

      deleteProject: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            projects: state.resumeData.projects.filter((proj) => proj.id !== id),
          },
        })),

      addCertification: (certification) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            certifications: [...state.resumeData.certifications, certification],
          },
        })),

      updateCertification: (id, certification) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            certifications: state.resumeData.certifications.map((cert) =>
              cert.id === id ? { ...cert, ...certification } : cert
            ),
          },
        })),

      deleteCertification: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            certifications: state.resumeData.certifications.filter((cert) => cert.id !== id),
          },
        })),

      addAchievement: (achievement) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            achievements: [...state.resumeData.achievements, achievement],
          },
        })),

      updateAchievement: (id, achievement) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            achievements: state.resumeData.achievements.map((ach) =>
              ach.id === id ? { ...ach, ...achievement } : ach
            ),
          },
        })),

      deleteAchievement: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            achievements: state.resumeData.achievements.filter((ach) => ach.id !== id),
          },
        })),

      updateSectionOrder: (order) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            sectionOrder: order,
          },
        })),

      setSelectedTemplate: (template) =>
        set({ selectedTemplate: template }),

      clearResume: () =>
        set({ resumeData: initialResumeData }),
    }),
    {
      name: 'resume-storage',
    }
  )
);
