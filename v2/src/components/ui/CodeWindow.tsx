"use client";

import { useState } from "react";
import { Highlight, themes } from "prism-react-renderer";
import { Check, Copy } from "lucide-react";

interface CodeWindowProps {
    code: string;
    language?: string;
    title?: string;
    showLineNumbers?: boolean;
    showCopyButton?: boolean;
}

export function CodeWindow({
    code,
    language = "typescript",
    title = "example.mind",
    showLineNumbers = true,
    showCopyButton = true,
}: CodeWindowProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(code.trim());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="rounded-lg overflow-hidden shadow-xl border border-card-border bg-[#1e1e2e] relative group">
            {/* Window Title Bar */}
            <div className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 bg-[#181825] border-b border-[#313244]">
                {/* Traffic Light Buttons */}
                <div className="flex items-center gap-1 sm:gap-1.5">
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#6b7280]" />
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#f9e2af]" />
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#a6e3a1]" />
                </div>

                {/* File Title */}
                <div className="flex-1 text-center">
                    <span className="text-[10px] sm:text-xs text-[#6c7086] font-mono">{title}</span>
                </div>

                {/* Copy Button */}
                {showCopyButton ? (
                    <button
                        onClick={handleCopy}
                        className="flex items-center justify-center w-8 sm:w-10 h-6 sm:h-7 rounded bg-[#313244] hover:bg-[#45475a] transition-colors text-[#cdd6f4]"
                        aria-label="Copy code"
                    >
                        {copied ? (
                            <Check size={14} className="text-[#a6e3a1]" />
                        ) : (
                            <Copy size={14} />
                        )}
                    </button>
                ) : (
                    <div className="w-8 sm:w-12" />
                )}
            </div>

            {/* Code Content */}
            <Highlight
                theme={themes.nightOwl}
                code={code.trim()}
                language={language as any}
            >
                {({ style, tokens, getLineProps, getTokenProps }) => (
                    <pre
                        className="p-3 sm:p-4 overflow-x-auto text-[11px] sm:text-sm leading-relaxed"
                        style={{ ...style, background: "transparent", margin: 0, textAlign: "left" }}
                    >
                        {tokens.map((line, i) => (
                            <div key={i} {...getLineProps({ line })} className="table-row">
                                {showLineNumbers && (
                                    <span className="table-cell pr-2 sm:pr-4 text-right text-[#6c7086] select-none w-6 sm:w-8">
                                        {i + 1}
                                    </span>
                                )}
                                <span className="table-cell whitespace-pre">
                                    {line.map((token, key) => (
                                        <span key={key} {...getTokenProps({ token })} />
                                    ))}
                                </span>
                            </div>
                        ))}
                    </pre>
                )}
            </Highlight>
        </div>
    );
}

