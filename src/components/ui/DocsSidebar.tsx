"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { docsNavigation } from "@/data/navigation";
import { usePathname } from "next/navigation";

interface DocsSidebarProps {
    currentPath: string;
}

interface DocsNavListProps {
    currentPath: string;
    sectionHeadingLevel?: "h3" | "h4";
    onItemClick?: () => void;
}

function DocsNavList({ currentPath, sectionHeadingLevel = "h3", onItemClick }: DocsNavListProps) {
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
                                    onClick={onItemClick}
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

// Get current page label from navigation
function getCurrentPageLabel(currentPath: string): string {
    for (const section of docsNavigation) {
        for (const item of section.items) {
            if (item.href === currentPath) {
                return item.name;
            }
        }
    }
    return "Menu";
}

// Desktop sidebar - unchanged
export function DocsSidebar({ currentPath }: DocsSidebarProps) {
    return (
        <aside className="hidden lg:block w-64 shrink-0">
            <nav className="sticky top-24" aria-label="Documentation">
                <DocsNavList currentPath={currentPath} sectionHeadingLevel="h3" />
            </nav>
        </aside>
    );
}

// Mobile dropdown menu - shows next to breadcrumbs
export function MobileDocsMenu({ currentPath }: DocsSidebarProps) {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();

    // Close menu on route change
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    // Close menu when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            return () => document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [isOpen]);

    // Close on escape key
    useEffect(() => {
        function handleEscape(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setIsOpen(false);
            }
        }
        if (isOpen) {
            document.addEventListener("keydown", handleEscape);
            return () => document.removeEventListener("keydown", handleEscape);
        }
    }, [isOpen]);

    const currentLabel = getCurrentPageLabel(currentPath);

    return (
        <div ref={menuRef} className="lg:hidden relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-sm font-medium text-muted hover:text-foreground bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
                aria-expanded={isOpen}
                aria-haspopup="true"
                aria-label="Open documentation menu"
            >
                <Menu size={16} />
                <span className="hidden xs:inline max-w-[120px] truncate">{currentLabel}</span>
                <ChevronDown size={14} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>

            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/20 z-40"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Dropdown panel */}
                    <div className="absolute right-0 top-full mt-2 w-72 max-h-[70vh] overflow-y-auto bg-background border border-card-border rounded-xl shadow-xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="sticky top-0 flex items-center justify-between px-4 py-3 border-b border-card-border bg-background">
                            <span className="font-heading font-bold text-sm text-foreground">Documentation</span>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1 text-muted hover:text-foreground rounded-md hover:bg-slate-100 transition-colors"
                                aria-label="Close menu"
                            >
                                <X size={18} />
                            </button>
                        </div>
                        <nav className="p-4" aria-label="Documentation sections">
                            <DocsNavList
                                currentPath={currentPath}
                                sectionHeadingLevel="h4"
                                onItemClick={() => setIsOpen(false)}
                            />
                        </nav>
                    </div>
                </>
            )}
        </div>
    );
}

// Legacy: Bottom sidebar for mobile (kept for backwards compatibility, but deprecated)
export function MobileDocsSidebar({ currentPath }: DocsSidebarProps) {
    return (
        <aside className="lg:hidden mt-12 pt-8 border-t">
            <h3 className="font-heading font-bold text-lg text-foreground mb-4">Documentation</h3>
            <nav aria-label="Documentation sections">
                <DocsNavList currentPath={currentPath} sectionHeadingLevel="h4" />
            </nav>
        </aside>
    );
}
