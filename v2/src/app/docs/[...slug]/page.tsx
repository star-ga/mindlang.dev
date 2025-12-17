import { compileMDX } from 'next-mdx-remote/rsc';
import { getDocBySlug, getAllDocs } from '@/lib/docs';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { CodeWindow } from '@/components/ui/CodeWindow';

// Custom components for MDX
const components = {
    CodeWindow,
    // Add other custom components here
};

interface DocsPageProps {
    params: Promise<{
        slug: string[];
    }>;
}

export async function generateMetadata({ params }: DocsPageProps): Promise<Metadata> {
    const { slug } = await params;
    const doc = getDocBySlug(slug);

    if (!doc) {
        return {
            title: 'Not Found',
        };
    }

    return {
        title: `${doc.frontmatter.title} - MIND Docs`,
        description: doc.frontmatter.description,
    };
}

export async function generateStaticParams() {
    const docs = getAllDocs();
    return docs.map((doc) => ({
        slug: doc.slug,
    }));
}

export default async function DocsPage({ params }: DocsPageProps) {
    const { slug } = await params;
    const doc = getDocBySlug(slug);

    if (!doc) {
        notFound();
    }

    const { content, frontmatter } = await compileMDX<{ title: string }>({
        source: doc.content,
        options: { parseFrontmatter: true },
        components,
    });

    return (
        <div className="container py-12">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-4xl font-extrabold tracking-tight text-foreground mb-4">
                        {frontmatter.title}
                    </h1>
                    {/* Breadcrumbs or other metadata could go here */}
                </div>

                <article className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-primary prose-code:text-primary prose-pre:bg-transparent prose-pre:p-0">
                    {content}
                </article>
            </div>
        </div>
    );
}
