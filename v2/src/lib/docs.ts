import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const docsDirectory = path.join(process.cwd(), 'src/content/docs');

export interface DocPost {
    slug: string[];
    frontmatter: {
        title: string;
        description?: string;
        order?: number;
        [key: string]: any;
    };
    content: string;
}

export function getAllDocs(): DocPost[] {
    // Ensure directory exists
    if (!fs.existsSync(docsDirectory)) {
        return [];
    }

    const fileNames = getFilesRecursively(docsDirectory);
    const allDocsData = fileNames.map((fileName) => {
        // Remove "docsDirectory" prefix and ".mdx" suffix to get slug
        const relativePath = path.relative(docsDirectory, fileName);
        const slug = relativePath.replace(/\.mdx?$/, '').split(path.sep);

        // Read markdown file as string
        const fileContents = fs.readFileSync(fileName, 'utf8');

        // Use gray-matter to parse the post metadata section
        const { data, content } = matter(fileContents);

        return {
            slug,
            frontmatter: data as DocPost['frontmatter'],
            content,
        };
    });

    // Sort docs by order
    return allDocsData.sort((a, b) => {
        return (a.frontmatter.order || 999) - (b.frontmatter.order || 999);
    });
}

export function getDocBySlug(slug: string[]): DocPost | undefined {
    // Check .mdx and .md
    const relativePath = slug.join(path.sep);
    let fullPath = path.join(docsDirectory, `${relativePath}.mdx`);

    if (!fs.existsSync(fullPath)) {
        fullPath = path.join(docsDirectory, `${relativePath}.md`);
        if (!fs.existsSync(fullPath)) {
            // Try index file
            fullPath = path.join(docsDirectory, relativePath, 'index.mdx');
            if (!fs.existsSync(fullPath)) {
                fullPath = path.join(docsDirectory, relativePath, 'index.md');
                if (!fs.existsSync(fullPath)) {
                    return undefined;
                }
            }
        }
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
        slug,
        frontmatter: data as DocPost['frontmatter'],
        content,
    };
}

function getFilesRecursively(dir: string): string[] {
    let results: string[] = [];
    const list = fs.readdirSync(dir);

    list.forEach((file) => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(getFilesRecursively(file));
        } else {
            if (file.endsWith('.md') || file.endsWith('.mdx')) {
                results.push(file);
            }
        }
    });

    return results;
}
