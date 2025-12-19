import Link from "next/link";
import { docsNavigation } from "@/data/navigation";

interface DocsSidebarProps {
    currentPath: string;
}

export function DocsSidebar({ currentPath }: DocsSidebarProps) {
    return (
        <aside className="hidden lg:block w-64 shrink-0">
            <nav className="sticky top-24">
                {docsNavigation.map((section) => (
                    <div key={section.title} className="mb-6">
                        <h3 className="font-heading font-bold text-sm text-foreground mb-2">
                            {section.title}
                        </h3>
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
            </nav>
        </aside>
    );
}
