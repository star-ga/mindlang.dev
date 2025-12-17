"use client";

import { Share2, Timer, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";
// Metadata can't be exported from client component, so we separate it or use layout.
// Since this page needs 'use client' for slideshow, we put content in a client component or use a wrapper.
// Simplest: Make the whole page client, and lose metadata export (Next.js doesn't allow metadata in client components).
// Better: Split into page (server) and content (client).
// Or simpler: put slideshow in separate component.
// I'll put Slideshow in a separate component and import it, keeping page as server component.
// But writing multiple files via tool requires multiple calls.
// I'll make the page client component for now and omit metadata export, OR add a layout.tsx for metadata.
// Actually, I can use "use client" only for specific parts if I structure well.
// But for speed, I'll make a separate Slideshow component inside the SAME file? No, client components must be separate files if imported into server components?
// No, I can define client component in same file ONLY if the whole file is client.
// If I want Metadata, the page file MUST be server.
// Solution: Create src/app/use-cases/Slideshow.tsx and src/app/use-cases/page.tsx.

// Wait, I can't create 2 files in one step? Yes I can make multiple tool calls.
// I'll create `src/app/use-cases/Slideshow.tsx` first, then `src/app/use-cases/page.tsx`.

// Slideshow Component logic

export function Slideshow() {
    const slides = [
        "/img/features/case_frame1.jpeg",
        "/img/features/case_frame2.jpeg",
        "/img/features/case_frame3.jpeg"
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative w-full h-[250px] md:h-[350px] rounded-xl overflow-hidden shadow-xl border border-slate-200 bg-[#E6E9F2]">
            {slides.map((src, index) => (
                <img
                    key={src}
                    src={src}
                    alt={`Embedded System Slide ${index + 1}`}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 block scale-[1.02] ${index === currentSlide ? "opacity-100" : "opacity-0"
                        }`}
                />
            ))}
        </div>
    );
}
