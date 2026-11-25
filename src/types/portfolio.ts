export type Language = 'en' | 'id';

export type ProjectCategory = 'web' | '3d' | 'mod';

export interface ProjectLink {
  label: string;
  href: string;
  primary?: boolean;
}

export interface LocalizedProjectContent {
  categoryLabel: string;
  title: string;
  role: string;
  status: string;
  summary: string;
  highlights: string[];
  tags: string[];
  links: ProjectLink[];
}

export interface Project {
  id: string;
  categories: ProjectCategory[];
  featured: boolean;
  visualType: 'cytune' | 'grainox' | 'orbitry' | 'filra' | 'bookshelf';
  en: LocalizedProjectContent;
  id_lang: LocalizedProjectContent;
}

export interface RenderItem {
  id: string;
  category: 'environment' | 'character' | 'architecture' | 'prop' | 'animation';
  categoryLabelEn: string;
  categoryLabelId: string;
  titleEn: string;
  titleId: string;
  subtitleEn?: string;
  subtitleId?: string;
  descEn: string;
  descId: string;
  image: string;
  images: string[];
  video?: string;
  renderEngine: 'Cycles' | 'Eevee';
  blenderVersion?: string;
  year: '2025' | '2026';
  badge?: string;
  tags: string[];
}

export interface ExperienceItem {
  id: string;
  roleEn: string;
  roleId: string;
  orgEn: string;
  orgId: string;
  date: string;
  dateEn?: string;
  dateId?: string;
  bulletsEn: string[];
  bulletsId: string[];
  isCurrent?: boolean;
}

export interface SkillCategory {
  titleEn: string;
  titleId: string;
  iconName: 'web' | '3d' | 'sys';
  skills: string[];
}
