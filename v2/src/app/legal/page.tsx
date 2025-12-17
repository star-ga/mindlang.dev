import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Legal & Licensing",
    description: "Legal information, licensing details, and trademark guidelines for MIND.",
};

export default function LegalPage() {
    return (
        <section className="section" style={{ marginTop: "1.25rem" }}>
            <div className="container max-w-4xl">
                <h1 className="page-title mb-12">Legal & Licensing</h1>

                <div className="space-y-12">
                    <div className="card card--outline p-8">
                        <h3 className="text-xl font-bold mb-4">Community Edition</h3>
                        <p className="text-muted leading-relaxed mb-4">
                            The MIND compiler <code className="bg-muted/10 px-1 py-0.5 rounded text-sm font-mono">mind</code> and specification <code className="bg-muted/10 px-1 py-0.5 rounded text-sm font-mono">mind-spec</code> are open source software licensed under the <strong>Apache License, Version 2.0</strong>.
                        </p>
                        <p className="text-muted leading-relaxed">
                            This license allows you to freely use, modify, and distribute the software, provided you include the required notices. It also includes an explicit patent grant from contributors.
                        </p>
                    </div>

                    <div className="card card--outline p-8">
                        <h3 className="text-xl font-bold mb-4">Commercial Runtime</h3>
                        <p className="text-muted leading-relaxed">
                            The <code className="bg-muted/10 px-1 py-0.5 rounded text-sm font-mono">mind-runtime</code> components and MIND Cloud services are proprietary software provided by STARGA Inc. They are governed by separate commercial agreements and are not covered by the Apache 2.0 license.
                        </p>
                    </div>

                    <div className="card card--outline p-8">
                        <h3 className="text-xl font-bold mb-4">Trademarks</h3>
                        <p className="text-muted leading-relaxed">
                            "MIND", the MIND logo, and "STARGA" are trademarks of STARGA Inc. You may use the "MIND" name to truthfully describe that your software is written in or compatible with the MIND language.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
