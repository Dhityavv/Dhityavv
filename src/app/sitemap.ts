import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.dhitya-space.my.id';
  return [
    {
      url: baseUrl,
      lastModified: new Date('2026-11-27'),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/blender-showcase`,
      lastModified: new Date('2026-11-27'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date('2026-11-27'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];
}
