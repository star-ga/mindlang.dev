export const mainNavigation: NavItem[] = [
    { url: "/", label: "Home" },
    { url: "/docs", label: "Docs" },
    {
        label: "Product",
        dropdown: [
            { url: "/features", label: "Features" },
            { url: "/use-cases", label: "Use Cases" },
            { url: "/ecosystem", label: "Ecosystem" },
            { url: "/compare", label: "Compare" },
            { url: "/roadmap", label: "Roadmap" },
        ]
    },
    {
        label: "Enterprise",
        dropdown: [
            { url: "/enterprise", label: "Overview" },
            { url: "/pricing", label: "Pricing" },
            { url: "/security", label: "Security" },
            { url: "/enterprise-flow", label: "Adoption Flow" },
        ]
    },
    { url: "/community", label: "Community" },
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
            { name: "Running Benchmarks", href: "/docs/guides/benchmarks" },
        ],
    },

    {
        title: "Language Guide",
        items: [
            { name: "Language", href: "/docs/language" },
            { name: "Shapes & Broadcasting", href: "/docs/shapes" },
            { name: "Autodiff", href: "/docs/autodiff" },
            { name: "Errors", href: "/docs/errors" },
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
        title: "Compiler & Runtime",
        items: [
            { name: "IR", href: "/docs/ir" },
            { name: "MLIR Lowering", href: "/docs/mlir" },
            { name: "Runtime", href: "/docs/runtime" },
            { name: "FFI & Bindings", href: "/docs/ffi" },
        ],
    },

    {
        title: "Full-Stack AI",
        items: [
            { name: "Distributed Execution", href: "/docs/distributed" },
            { name: "Deployment", href: "/docs/deployment" },
        ],
    },

    {
        title: "Reference",
        items: [
            { name: "Conformance", href: "/docs/conformance" },
            { name: "Stability & Versioning", href: "/docs/stability" },
            { name: "Security", href: "/docs/security" },
            { name: "Performance", href: "/docs/performance" },
            { name: "Performance FAQ", href: "/docs/performance/faq" },
            { name: "Future Extensions", href: "/docs/future" },
            { name: "Contributing", href: "/docs/contributing" },
        ],
    },
];

export type NavItem = {
    url?: string;
    label: string;
    external?: boolean;
    dropdown?: { url: string; label: string; external?: boolean }[];
};

export type DocsNavSection = {
    title: string;
    items: { name: string; href: string }[];
};
