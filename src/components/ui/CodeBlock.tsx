"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
    children: string;
    className?: string;
}

export function CodeBlock({ children, className = "" }: CodeBlockProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(children.trim());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className={`relative rounded-lg overflow-hidden ${className}`}>
            <pre className="bg-slate-900 text-slate-50 p-4 pr-16 text-sm font-mono overflow-x-auto">
                {children}
            </pre>
            <button
                onClick={handleCopy}
                className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium bg-slate-700 hover:bg-slate-600 transition-colors text-slate-300 hover:text-white backdrop-blur-sm"
                aria-label="Copy code"
            >
                {copied ? (
                    <>
                        <Check size={12} className="text-green-400" />
                        <span className="text-green-400">Copied</span>
                    </>
                ) : (
                    <>
                        <Copy size={12} />
                        <span>Copy</span>
                    </>
                )}
            </button>
        </div>
    );
}
