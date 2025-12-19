import Link from "next/link";
import { docsNavigation } from "@/data/navigation";

interface DocsSidebarProps {
    currentPath: string;
}

interface DocsNavListProps {
    currentPath: string;
    sectionHeadingLevel?: "h3" | "h4";
}

function DocsNavList({ currentPath, sectionHeadingLevel = "h3" }: DocsNavListProps) {
    const HeadingTag = sectionHeadingLevel;
    return (
        <>
            {docsNavigation.map((section) => (
                <div key={section.title} className="mb-6">
                    <HeadingTag className="font-heading font-bold text-sm text-foreground mb-2">
                        {section.title}
                    </HeadingTag>
                    <ul className="space-y-1">
                        {section.items.map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={`text-sm font-medium transition-colors block py-1 ${item.href === currentPath ? "!text-primary font-bold" : "!text-slate-600 hover:!text-primary"}`}
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </>
    );
}

export function DocsSidebar({ currentPath }: DocsSidebarProps) {
    return (
        <aside className="hidden lg:block w-64 shrink-0">
            <nav className="sticky top-24" aria-label="Documentation">
                <DocsNavList currentPath={currentPath} sectionHeadingLevel="h3" />
            </nav>
        </aside>
    );
}

export function MobileDocsSidebar({ currentPath }: DocsSidebarProps) {
    return (
        <aside className="lg:hidden mt-12 pt-8 border-t">
            <h3 className="font-heading font-bold text-lg text-foreground mb-4">Documentation</h3>
            <nav aria-label="Documentation">
                <DocsNavList currentPath={currentPath} sectionHeadingLevel="h4" />
            </nav>
        </aside>
    );
}
