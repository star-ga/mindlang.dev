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
        <div className={`relative group rounded-lg overflow-hidden ${className}`}>
            <pre className="bg-slate-900 text-slate-50 p-4 rounded-lg text-sm font-mono overflow-x-auto">
                {children}
            </pre>
            <button
                onClick={handleCopy}
                className="absolute top-2 right-2 flex items-center justify-center w-8 h-8 rounded bg-slate-700/80 hover:bg-slate-600 transition-colors text-slate-300 opacity-0 group-hover:opacity-100"
                aria-label="Copy code"
            >
                {copied ? (
                    <Check size={14} className="text-green-400" />
                ) : (
                    <Copy size={14} />
                )}
            </button>
        </div>
    );
}
