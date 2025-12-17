import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface NavLink {
    label: string;
    href: string;
}

interface PageNavigationProps {
    prev?: NavLink;
    next?: NavLink;
}

export function PageNavigation({ prev, next }: PageNavigationProps) {
    if (!prev && !next) return null;

    return (
        <nav
            aria-label="Page navigation"
            className="flex items-center justify-between mt-12 pt-8 border-t border-card-border"
        >
            {/* Previous */}
            {prev ? (
                <Link
                    href={prev.href}
                    className="group flex items-center gap-2 text-muted hover:text-primary transition-colors"
                >
                    <ChevronLeft
                        size={20}
                        className="group-hover:-translate-x-1 transition-transform"
                    />
                    <div className="text-left">
                        <span className="text-xs uppercase tracking-wider text-muted/60 block">
                            Previous
                        </span>
                        <span className="font-medium">{prev.label}</span>
                    </div>
                </Link>
            ) : (
                <div />
            )}

            {/* Next */}
            {next ? (
                <Link
                    href={next.href}
                    className="group flex items-center gap-2 text-muted hover:text-primary transition-colors text-right"
                >
                    <div>
                        <span className="text-xs uppercase tracking-wider text-muted/60 block">
                            Next
                        </span>
                        <span className="font-medium">{next.label}</span>
                    </div>
                    <ChevronRight
                        size={20}
                        className="group-hover:translate-x-1 transition-transform"
                    />
                </Link>
            ) : (
                <div />
            )}
        </nav>
    );
}
