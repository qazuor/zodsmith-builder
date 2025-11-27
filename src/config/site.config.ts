import { Braces, Github, Linkedin, type LucideIcon } from 'lucide-react';

interface Language {
  code: string;
  name: string;
  flag: string;
}

interface SocialLink {
  name: string;
  url: string;
  icon: LucideIcon;
}

interface FreelanceLink {
  name: string;
  url: string;
  icon?: LucideIcon;
}

interface Author {
  name: string;
  url: string;
  location: string;
}

interface AppConfig {
  icon: LucideIcon;
}

interface StorageConfig {
  history: string;
  language: string;
}

interface SiteConfig {
  name: string;
  description: string;
  app: AppConfig;
  author: Author;
  languages: Language[];
  storage: StorageConfig;
  socialLinks: SocialLink[];
  freelanceLinks: FreelanceLink[];
  techStack: string[];
  mobileTechStack: string[];
}

export const siteConfig: SiteConfig = {
  name: 'ZodSmith',
  description: 'Visual Zod Schema Builder',
  app: {
    icon: Braces,
  },
  author: {
    name: 'Qazuor',
    url: 'https://github.com/qazuor',
    location: 'Argentina',
  },
  languages: [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
  ],
  storage: {
    history: 'zodsmith-store',
    language: 'zodsmith-language',
  },
  socialLinks: [
    {
      name: 'GitHub',
      url: 'https://github.com/qazuor',
      icon: Github,
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/qazuor',
      icon: Linkedin,
    },
  ],
  freelanceLinks: [],
  techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Zod', 'Zustand'],
  mobileTechStack: ['React', 'TS', 'Tailwind'],
};
