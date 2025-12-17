import { MetadataRoute } from 'next';
import { siteConfig } from '@/data/site';

export const dynamic = 'force-static';
export default function sitemap(): MetadataRoute.Sitemap {
    const routes = [
        '',
        '/features',
        '/use-cases',
        '/community',
        '/roadmap',
        '/ecosystem',
        '/showcase',
        '/legal',
        '/enterprise-flow',
        '/terms',
        '/privacy',
        '/docs',
    ].map((route) => ({
        url: `${siteConfig.url}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    return routes;
}
