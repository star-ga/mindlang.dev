"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
    children: string;
    className?: string;
    title?: string;
}

export function CodeBlock({ children, className = "", title }: CodeBlockProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(children.trim());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className={`relative rounded-xl overflow-hidden border border-slate-700/50 shadow-lg ${className}`}>
            {/* Header bar */}
            <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700/50">
                <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                        <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                    {title && (
                        <span className="ml-3 text-xs text-slate-400 font-mono">{title}</span>
                    )}
                </div>
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium bg-slate-700/50 hover:bg-slate-600/50 transition-colors text-slate-300 hover:text-white"
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
            {/* Code content */}
            <pre className="bg-slate-900 text-slate-50 p-4 text-sm font-mono overflow-x-auto leading-relaxed">
                {children}
            </pre>
        </div>
    );
}
