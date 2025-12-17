"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";

export function CookieBanner() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem("mind-cookie-consent");
        if (!consent) {
            setIsVisible(true);
        }
    }, []);

    const acceptCookies = () => {
        localStorage.setItem("mind-cookie-consent", "accepted");
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-in slide-in-from-bottom duration-500">
            <div className="container max-w-4xl mx-auto">
                <div className="bg-popover/95 backdrop-blur-sm border border-border shadow-lg rounded-xl p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-4 text-sm relative">
                    <div className="flex-1 text-muted-foreground pr-8">
                        <h4 className="font-bold text-foreground mb-1">We value your privacy</h4>
                        <p>
                            We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic.
                            By clicking "Accept", you consent to our use of cookies.
                            Read our <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsVisible(false)}
                            className="btn btn--ghost text-xs px-4 py-2 h-auto"
                        >
                            Decline
                        </button>
                        <button
                            onClick={acceptCookies}
                            className="btn btn--primary text-xs px-6 py-2 h-auto"
                        >
                            Accept
                        </button>
                    </div>
                    <button
                        onClick={() => setIsVisible(false)}
                        className="absolute top-2 right-2 p-1 text-muted-foreground hover:text-foreground transition-colors md:hidden"
                        aria-label="Close"
                    >
                        <X size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
}
