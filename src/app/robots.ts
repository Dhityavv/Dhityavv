import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/author-studio',
    },
    sitemap: 'https://www.dhitya-space.my.id/sitemap.xml',
  };
}
