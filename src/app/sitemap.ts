import { MetadataRoute } from 'next';
import { siteConfig } from '@/data/site';

export const dynamic = 'force-static';
export default function sitemap(): MetadataRoute.Sitemap {
    const mainRoutes = [
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
    ];

    const docRoutes = [
        '/docs',
        '/docs/quick-start',
        '/docs/installation',
        '/docs/using-core-v1',
        '/docs/cookbook',
        '/docs/language',
        '/docs/shapes',
        '/docs/autodiff',
        '/docs/errors',
        '/docs/std/core',
        '/docs/std/tensor',
        '/docs/std/math',
        '/docs/ir',
        '/docs/mlir',
        '/docs/runtime',
        '/docs/ffi',
        '/docs/conformance',
        '/docs/stability',
        '/docs/security',
        '/docs/performance',
        '/docs/future',
    ];

    const allRoutes = [...mainRoutes, ...docRoutes];

    return allRoutes.map((route) => ({
        url: `${siteConfig.url}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : route.startsWith('/docs') ? 0.7 : 0.8,
    }));
}
