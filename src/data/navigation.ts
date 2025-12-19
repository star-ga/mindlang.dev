export const mainNavigation: NavItem[] = [
    { url: "/", label: "Overview" },
    { url: "/features", label: "Features" },
    { url: "/use-cases", label: "Use Cases" },
    { url: "/ecosystem", label: "Ecosystem" },
    { url: "/docs", label: "Docs" },
    { url: "/community", label: "Community" },
    { url: "/roadmap", label: "Roadmap" },
];

export const docsNavigation = [
    {
        title: "Getting Started",
        items: [
            { name: "Introduction", href: "/docs" },
            { name: "Installation", href: "/docs/installation" },
            { name: "Quick Start", href: "/docs/quick-start" },
            { name: "Using Core v1 Today", href: "/docs/using-core-v1" },
            { name: "Cookbook", href: "/docs/cookbook" },
        ],
    },

    {
        title: "Standard Library",
        items: [
            { name: "Core", href: "/docs/std/core" },
            { name: "Tensor", href: "/docs/std/tensor" },
            { name: "Math", href: "/docs/std/math" },
        ],
    },

    {
        title: "Reference",
        items: [
            { name: "Shapes & Broadcasting", href: "/docs/shapes" },
            { name: "Conformance", href: "/docs/conformance" },
            { name: "Stability & Versioning", href: "/docs/stability" },
            { name: "Security", href: "/docs/security" },
            { name: "Performance", href: "/docs/performance" },
            { name: "FFI & Bindings", href: "/docs/ffi" },
        ],
    },
];

export type NavItem = {
    url: string;
    label: string;
    external?: boolean;
};

export type DocsNavSection = {
    title: string;
    items: { name: string; href: string }[];
};
