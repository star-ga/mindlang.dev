"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { ReactNode } from "react";

interface BreadcrumbItem {
    label: string;
    href: string;
}

interface BreadcrumbsProps {
    /** Optional content to render on the right side (e.g., mobile menu) */
    rightContent?: ReactNode;
}

export function Breadcrumbs({ rightContent }: BreadcrumbsProps) {
    const pathname = usePathname();

    // Don't show breadcrumbs on homepage
    if (pathname === "/") return null;

    // Build breadcrumb items from pathname
    const segments = pathname.split("/").filter(Boolean);
    const items: BreadcrumbItem[] = segments.map((segment, index) => {
        const href = "/" + segments.slice(0, index + 1).join("/");
        // Capitalize and format segment
        const label = segment
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
        return { label, href };
    });

    return (
        <nav aria-label="Breadcrumb" className="mb-6">
            <div className="flex items-center justify-between gap-4">
                <ol className="flex items-center gap-2 text-sm text-muted min-w-0 flex-1">
                    <li className="shrink-0">
                        <Link
                            href="/"
                            className="hover:text-primary transition-colors flex items-center gap-1"
                        >
                            <Home size={14} />
                            <span className="sr-only">Home</span>
                        </Link>
                    </li>
                    {items.map((item, index) => (
                        <li key={item.href} className="flex items-center gap-2 min-w-0">
                            <ChevronRight size={14} className="text-muted/50 shrink-0" />
                            {index === items.length - 1 ? (
                                <span className="text-foreground font-medium truncate">{item.label}</span>
                            ) : (
                                <Link
                                    href={item.href}
                                    className="hover:text-primary transition-colors truncate"
                                >
                                    {item.label}
                                </Link>
                            )}
                        </li>
                    ))}
                </ol>
                {rightContent && (
                    <div className="shrink-0">
                        {rightContent}
                    </div>
                )}
            </div>
        </nav>
    );
}
