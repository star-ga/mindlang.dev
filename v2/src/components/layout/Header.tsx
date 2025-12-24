"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ExternalLink, ChevronDown } from "lucide-react";
import { mainNavigation } from "@/data/navigation";
import { siteConfig } from "@/data/site";
import { usePathname } from "next/navigation";

export function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const pathname = usePathname();
    const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

    // Close mobile menu on route change
    useEffect(() => {
        setMobileMenuOpen(false);
        setOpenDropdown(null);
    }, [pathname]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = () => setOpenDropdown(null);
        if (openDropdown) {
            document.addEventListener('click', handleClickOutside);
            return () => document.removeEventListener('click', handleClickOutside);
        }
    }, [openDropdown]);

    // Clear any pending dropdown timeout on unmount to avoid updating state after unmount
    useEffect(() => {
        return () => {
            if (dropdownTimeoutRef.current) {
                clearTimeout(dropdownTimeoutRef.current);
                dropdownTimeoutRef.current = null;
            }
        };
    }, []);

    // Auto-focus first menu item when dropdown opens for keyboard navigation
    useEffect(() => {
        if (openDropdown && dropdownRefs.current[openDropdown]) {
            const firstMenuItem = dropdownRefs.current[openDropdown]?.querySelector<HTMLElement>('[role="menuitem"]');
            if (firstMenuItem) {
                // Small delay to ensure the dropdown is rendered
                setTimeout(() => firstMenuItem.focus(), 10);
            }
        }
    }, [openDropdown]);

    const handleDropdownEnter = (label: string) => {
        if (dropdownTimeoutRef.current) {
            clearTimeout(dropdownTimeoutRef.current);
        }
        setOpenDropdown(label);
    };

    const handleDropdownLeave = () => {
        dropdownTimeoutRef.current = setTimeout(() => {
            setOpenDropdown(null);
        }, 200);
    };

    const handleKeyDown = (event: React.KeyboardEvent, itemLabel: string) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            setOpenDropdown(openDropdown === itemLabel ? null : itemLabel);
        } else if (event.key === "Escape") {
            if (openDropdown !== null) {
                event.stopPropagation();
                setOpenDropdown(null);
            }
        }
    };

    const isActiveDropdown = (dropdown: { url: string; label: string }[]) => {
        return dropdown.some(item => pathname === item.url);
    };

    return (
        <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-card-border">
            <div className="container">
                <nav className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3">
                        <img
                            src="/img/mind-logo-grid-dark.svg"
                            alt="MIND"
                            className="h-8 w-8"
                        />
                        <span className="text-xl font-extrabold font-heading text-foreground">
                            MIND
                        </span>
                        <span className="hidden xl:inline text-muted">|</span>
                        <span className="hidden xl:inline text-sm text-muted">
                            Intelligence, compiled.
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-6">
                        {mainNavigation.map((item) => {
                            if (item.dropdown) {
                                // Dropdown menu item
                                const isActive = isActiveDropdown(item.dropdown);
                                const dropdownId = `dropdown-${item.label.toLowerCase().replace(/\s+/g, '-')}`;
                                return (
                                    <div
                                        key={item.label}
                                        className="relative"
                                        onMouseEnter={() => handleDropdownEnter(item.label)}
                                        onMouseLeave={handleDropdownLeave}
                                    >
                                        <button
                                            className={`text-sm font-medium transition-colors flex items-center gap-1 ${
                                                isActive
                                                    ? "text-foreground font-bold"
                                                    : "!text-slate-600 hover:!text-primary"
                                            }`}
                                            aria-expanded={openDropdown === item.label}
                                            aria-haspopup="menu"
                                            aria-controls={dropdownId}
                                            onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                                            onKeyDown={(e) => handleKeyDown(e, item.label)}
                                        >
                                            {item.label}
                                            <ChevronDown size={14} className={`transition-transform ${openDropdown === item.label ? 'rotate-180' : ''}`} />
                                        </button>
                                        {openDropdown === item.label && (
                                            <div
                                                ref={(el) => {
                                                    dropdownRefs.current[item.label] = el;
                                                }}
                                                id={dropdownId}
                                                role="menu"
                                                tabIndex={-1}
                                                className="absolute top-full left-0 mt-2 w-48 bg-background border border-card-border rounded-lg shadow-lg py-2 animate-in fade-in slide-in-from-top-2 duration-200"
                                                onKeyDown={(e) => {
                                                    const menu = e.currentTarget;
                                                    const items = Array.from(
                                                        menu.querySelectorAll<HTMLElement>('[role="menuitem"]')
                                                    );
                                                    if (items.length === 0) return;

                                                    const current = document.activeElement as HTMLElement | null;
                                                    const currentIndex = current ? items.indexOf(current) : -1;

                                                    switch (e.key) {
                                                        case "ArrowDown":
                                                            e.preventDefault();
                                                            if (currentIndex === -1) {
                                                                items[0].focus();
                                                            } else {
                                                                const nextIndex = (currentIndex + 1) % items.length;
                                                                items[nextIndex].focus();
                                                            }
                                                            break;
                                                        case "ArrowUp":
                                                            e.preventDefault();
                                                            if (currentIndex === -1) {
                                                                items[items.length - 1].focus();
                                                            } else {
                                                                const prevIndex = (currentIndex - 1 + items.length) % items.length;
                                                                items[prevIndex].focus();
                                                            }
                                                            break;
                                                        case "Home":
                                                            e.preventDefault();
                                                            items[0].focus();
                                                            break;
                                                        case "End":
                                                            e.preventDefault();
                                                            items[items.length - 1].focus();
                                                            break;
                                                        case "Escape":
                                                            e.preventDefault();
                                                            setOpenDropdown(null);
                                                            break;
                                                    }
                                                }}
                                            >
                                                {item.dropdown.map((dropdownItem) => (
                                                    dropdownItem.external ? (
                                                        <a
                                                            key={dropdownItem.label}
                                                            href={dropdownItem.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            role="menuitem"
                                                            tabIndex={0}
                                                            className="flex items-center gap-2 px-4 py-2 text-sm !text-slate-600 hover:!text-primary hover:bg-alt-bg transition-colors"
                                                        >
                                                            {dropdownItem.label}
                                                            <ExternalLink size={12} className="opacity-70" />
                                                        </a>
                                                    ) : (
                                                        <Link
                                                            key={dropdownItem.label}
                                                            href={dropdownItem.url}
                                                            role="menuitem"
                                                            tabIndex={0}
                                                            className={`block px-4 py-2 text-sm hover:bg-alt-bg transition-colors ${
                                                                pathname === dropdownItem.url
                                                                    ? "text-foreground font-bold bg-alt-bg"
                                                                    : "!text-slate-600 hover:!text-primary"
                                                            }`}
                                                        >
                                                            {dropdownItem.label}
                                                        </Link>
                                                    )
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                );
                            } else if (item.external) {
                                // External link
                                if (!item.url) {
                                    return null;
                                }
                                return (
                                    <a
                                        key={item.label}
                                        href={item.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm font-medium !text-slate-600 hover:!text-primary transition-colors flex items-center gap-1"
                                    >
                                        {item.label}
                                        <ExternalLink size={12} className="opacity-70" />
                                    </a>
                                );
                            } else {
                                // Regular link
                                if (!item.url) {
                                    return null;
                                }
                                return (
                                    <Link
                                        key={item.label}
                                        href={item.url}
                                        className={`text-sm font-medium transition-colors ${
                                            pathname === item.url
                                                ? "text-foreground font-bold"
                                                : "!text-slate-600 hover:!text-primary"
                                        }`}
                                    >
                                        {item.label}
                                    </Link>
                                );
                            }
                        })}

                        <div className="h-6 w-px bg-card-border mx-2" />

                        <div className="flex items-center gap-3">
                            {/* GitHub Link */}
                            <a
                                href={siteConfig.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-md hover:bg-alt-bg transition-colors"
                                aria-label="View on GitHub"
                            >
                                <svg className="w-5 h-5 text-muted hover:text-primary transition-colors" viewBox="0 0 24 24" fill="currentColor">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.605 9.605 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                                </svg>
                            </a>
                            {/* Discord Link */}
                            <a
                                href={siteConfig.discord}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-md hover:bg-alt-bg transition-colors"
                                aria-label="Join Discord"
                            >
                                <svg className="w-5 h-5 text-muted hover:text-primary transition-colors" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1892.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.1023.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden p-2 text-muted"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </nav>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="lg:hidden border-t border-card-border bg-background absolute left-0 right-0 p-4 shadow-lg animate-in slide-in-from-top-5">
                    <div className="flex flex-col gap-4">
                        {mainNavigation.map((item) => {
                            if (item.dropdown) {
                                // Dropdown section in mobile
                                return (
                                    <div key={item.label}>
                                        <div className="text-xs font-bold text-muted uppercase tracking-wider mb-2">
                                            {item.label}
                                        </div>
                                        <div className="flex flex-col gap-2 pl-3">
                                            {item.dropdown.map((dropdownItem) => (
                                                dropdownItem.external ? (
                                                    <a
                                                        key={dropdownItem.label}
                                                        href={dropdownItem.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-base font-medium !text-slate-600 hover:!text-primary flex items-center gap-2 py-1"
                                                    >
                                                        {dropdownItem.label}
                                                        <ExternalLink size={14} />
                                                    </a>
                                                ) : (
                                                    <Link
                                                        key={dropdownItem.label}
                                                        href={dropdownItem.url}
                                                        className={`text-base font-medium py-1 ${
                                                            pathname === dropdownItem.url
                                                                ? "text-foreground font-bold"
                                                                : "!text-slate-600 hover:!text-primary"
                                                        }`}
                                                    >
                                                        {dropdownItem.label}
                                                    </Link>
                                                )
                                            ))}
                                        </div>
                                    </div>
                                );
                            } else if (item.external) {
                                if (!item.url) {
                                    return null;
                                }
                                return (
                                    <a
                                        key={item.label}
                                        href={item.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-base font-medium !text-slate-600 hover:!text-primary flex items-center gap-2 py-2"
                                    >
                                        {item.label}
                                        <ExternalLink size={14} />
                                    </a>
                                );
                            } else {
                                if (!item.url) {
                                    return null;
                                }
                                return (
                                    <Link
                                        key={item.label}
                                        href={item.url}
                                        className={`text-base font-medium py-2 ${
                                            pathname === item.url
                                                ? "text-foreground font-bold"
                                                : "!text-slate-600 hover:!text-primary"
                                        }`}
                                    >
                                        {item.label}
                                    </Link>
                                );
                            }
                        })}
                        <hr className="border-card-border my-2" />
                        <div className="flex items-center gap-4">
                            <a
                                href={siteConfig.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-muted hover:text-primary text-sm font-medium transition-colors"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.605 9.605 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                                </svg>
                                GitHub
                            </a>
                            <a
                                href={siteConfig.discord}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-muted hover:text-primary text-sm font-medium transition-colors"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1892.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.1023.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" />
                                </svg>
                                Discord
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
