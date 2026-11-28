'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import {
  ALL_BLENDER_ARCHIVES,
  EXPERIENCES,
  PROJECTS,
  QUICK_PROFILE,
  RENDERS_SHOWCASE,
  SKILL_CATEGORIES,
} from '@/data/portfolioData';
import { ExperienceItem, Project, RenderItem, SkillCategory } from '@/types/portfolio';
import { getSupabaseClient, isSupabaseConfigured } from '@/lib/supabase';

export interface QuickProfileData {
  name: string;
  roleEn: string;
  roleId: string;
  focusEn: string;
  focusId: string;
  interestsEn: string;
  interestsId: string;
  locationEn: string;
  locationId: string;
  availability?: string;
}

export interface RenderItemWithOrder extends RenderItem {
  isFeatured?: boolean;
  sortOrder?: number;
}

export interface ProjectWithOrder extends Project {
  sortOrder?: number;
}

interface PortfolioDataContextType {
  rendersShowcase: RenderItemWithOrder[];
  allRenders: RenderItemWithOrder[];
  projects: ProjectWithOrder[];
  experiences: ExperienceItem[];
  skills: SkillCategory[];
  quickProfile: QuickProfileData;
  dataSource: 'local' | 'supabase';
  isLoadingLive: boolean;
  refreshData: () => Promise<void>;
}

const DEFAULT_FEATURED_IDS = new Set(RENDERS_SHOWCASE.map((r) => r.id));

const DEFAULT_ALL_RENDERS: RenderItemWithOrder[] = ALL_BLENDER_ARCHIVES.map((r, i) => ({
  ...r,
  isFeatured: DEFAULT_FEATURED_IDS.has(r.id),
  sortOrder: i,
}));

const DEFAULT_PROJECTS: ProjectWithOrder[] = PROJECTS.map((p, i) => ({
  ...p,
  sortOrder: i,
}));

const PortfolioDataContext = createContext<PortfolioDataContextType | undefined>(undefined);

export function PortfolioDataProvider({ children }: { children: React.ReactNode }) {
  const [allRenders, setAllRenders] = useState<RenderItemWithOrder[]>(DEFAULT_ALL_RENDERS);
  const [projects, setProjects] = useState<ProjectWithOrder[]>(DEFAULT_PROJECTS);
  const [experiences, setExperiences] = useState<ExperienceItem[]>(EXPERIENCES);
  const [skills, setSkills] = useState<SkillCategory[]>(SKILL_CATEGORIES);
  const [quickProfile, setQuickProfile] = useState<QuickProfileData>(QUICK_PROFILE);
  const [dataSource, setDataSource] = useState<'local' | 'supabase'>('local');
  const [isLoadingLive, setIsLoadingLive] = useState<boolean>(isSupabaseConfigured);

  const refreshData = useCallback(async () => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      setIsLoadingLive(false);
      return;
    }

    setIsLoadingLive(true);
    try {
      const [rendersRes, projectsRes, profileRes] = await Promise.all([
        supabase
          .from('portfolio_renders')
          .select('*')
          .order('sort_order', { ascending: true }),
        supabase
          .from('portfolio_projects')
          .select('*')
          .order('sort_order', { ascending: true }),
        supabase
          .from('portfolio_profile')
          .select('*')
          .eq('id', 'main')
          .maybeSingle(),
      ]);

      let usedSupabase = false;

      if (!rendersRes.error && rendersRes.data && rendersRes.data.length > 0) {
        const mappedRenders: RenderItemWithOrder[] = rendersRes.data.map((row) => ({
          id: row.id,
          category: row.category,
          categoryLabelEn: row.category_label_en,
          categoryLabelId: row.category_label_id,
          titleEn: row.title_en,
          titleId: row.title_id,
          descEn: row.desc_en,
          descId: row.desc_id,
          image: row.image,
          images: Array.isArray(row.images) ? row.images : [row.image],
          video: row.video || undefined,
          renderEngine: row.render_engine || 'Cycles',
          blenderVersion: row.blender_version || 'Blender 5.3',
          year: row.year || '2026',
          tags: Array.isArray(row.tags) ? row.tags : [],
          isFeatured: Boolean(row.is_featured),
          sortOrder: Number(row.sort_order ?? 0),
        }));
        setAllRenders(mappedRenders);
        usedSupabase = true;
      }

      if (!projectsRes.error && projectsRes.data && projectsRes.data.length > 0) {
        const mappedProjects: ProjectWithOrder[] = projectsRes.data.map((row) => ({
          id: row.id,
          categories: Array.isArray(row.categories) ? row.categories : ['web'],
          featured: Boolean(row.featured),
          visualType: row.visual_type || 'orbitry',
          en: row.en,
          id_lang: row.id_lang,
          sortOrder: Number(row.sort_order ?? 0),
        }));
        setProjects(mappedProjects);
        usedSupabase = true;
      }

      if (!profileRes.error && profileRes.data) {
        if (profileRes.data.quick_profile) {
          setQuickProfile(profileRes.data.quick_profile);
        }
        if (Array.isArray(profileRes.data.experiences) && profileRes.data.experiences.length > 0) {
          setExperiences(profileRes.data.experiences);
        }
        if (
          Array.isArray(profileRes.data.skill_categories) &&
          profileRes.data.skill_categories.length > 0
        ) {
          setSkills(profileRes.data.skill_categories);
        }
        usedSupabase = true;
      }

      setDataSource(usedSupabase ? 'supabase' : 'local');
    } catch {
      // Fallback cleanly to local static data
    } finally {
      setIsLoadingLive(false);
    }
  }, []);

  useEffect(() => {
    const supabase = getSupabaseClient();
    if (!supabase) return;
    let cancelled = false;

    Promise.all([
      supabase
        .from('portfolio_renders')
        .select('*')
        .order('sort_order', { ascending: true }),
      supabase
        .from('portfolio_projects')
        .select('*')
        .order('sort_order', { ascending: true }),
      supabase
        .from('portfolio_profile')
        .select('*')
        .eq('id', 'main')
        .maybeSingle(),
    ])
      .then(([rendersRes, projectsRes, profileRes]) => {
        if (cancelled) return;
        let usedSupabase = false;

        if (!rendersRes.error && rendersRes.data && rendersRes.data.length > 0) {
          setAllRenders(
            rendersRes.data.map((row) => ({
              id: row.id,
              category: row.category,
              categoryLabelEn: row.category_label_en,
              categoryLabelId: row.category_label_id,
              titleEn: row.title_en,
              titleId: row.title_id,
              descEn: row.desc_en,
              descId: row.desc_id,
              image: row.image,
              images: Array.isArray(row.images) ? row.images : [row.image],
              video: row.video || undefined,
              renderEngine: row.render_engine || 'Cycles',
              blenderVersion: row.blender_version || 'Blender 5.3',
              year: row.year || '2026',
              tags: Array.isArray(row.tags) ? row.tags : [],
              isFeatured: Boolean(row.is_featured),
              sortOrder: Number(row.sort_order ?? 0),
            }))
          );
          usedSupabase = true;
        }

        if (!projectsRes.error && projectsRes.data && projectsRes.data.length > 0) {
          setProjects(
            projectsRes.data.map((row) => ({
              id: row.id,
              categories: Array.isArray(row.categories) ? row.categories : ['web'],
              featured: Boolean(row.featured),
              visualType: row.visual_type || 'orbitry',
              en: row.en,
              id_lang: row.id_lang,
              sortOrder: Number(row.sort_order ?? 0),
            }))
          );
          usedSupabase = true;
        }

        if (!profileRes.error && profileRes.data) {
          if (profileRes.data.quick_profile) {
            setQuickProfile(profileRes.data.quick_profile);
          }
          if (Array.isArray(profileRes.data.experiences) && profileRes.data.experiences.length > 0) {
            setExperiences(profileRes.data.experiences);
          }
          if (
            Array.isArray(profileRes.data.skill_categories) &&
            profileRes.data.skill_categories.length > 0
          ) {
            setSkills(profileRes.data.skill_categories);
          }
          usedSupabase = true;
        }

        setDataSource(usedSupabase ? 'supabase' : 'local');
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setIsLoadingLive(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const featuredRenders = allRenders.filter((r) => r.isFeatured);
  const rendersShowcase =
    featuredRenders.length > 0 ? featuredRenders.slice(0, 6) : allRenders.slice(0, 6);

  return (
    <PortfolioDataContext.Provider
      value={{
        rendersShowcase,
        allRenders,
        projects,
        experiences,
        skills,
        quickProfile,
        dataSource,
        isLoadingLive,
        refreshData,
      }}
    >
      {children}
    </PortfolioDataContext.Provider>
  );
}

export function usePortfolioData() {
  const ctx = useContext(PortfolioDataContext);
  if (!ctx) {
    throw new Error('usePortfolioData must be used within a PortfolioDataProvider');
  }
  return ctx;
}
