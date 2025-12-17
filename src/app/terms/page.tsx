import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms and Conditions",
    description: "Terms and conditions for using the MIND programming language website and services.",
};

export default function TermsPage() {
    return (
        <div className="container py-16 max-w-4xl">
            <h1 className="page-title">Terms and Conditions</h1>
            <p className="text-muted mb-8">Last Updated: {new Date().toLocaleDateString()}</p>

            <div className="prose prose-slate dark:prose-invert max-w-none">
                <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-4 text-foreground">1. Introduction</h2>
                    <p className="text-muted/90 mb-4">
                        Welcome to mindlang.dev (the "Site"). These Terms and Conditions govern your use of our website and services.
                        By accessing or using the Site, you agree to be bound by these Terms. If you disagree with any part of the terms,
                        you may not access the Site.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-4 text-foreground">2. Intellectual Property</h2>
                    <p className="text-muted/90 mb-4">
                        The content, layout, design, data, databases and graphics on this website are protected by United States and other international intellectual property laws.
                        The MIND programming language core components are open-source under the Apache 2.0 license.
                        Commercial runtime extensions are proprietary to STARGA Inc.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-4 text-foreground">3. Use License</h2>
                    <p className="text-muted/90 mb-4">
                        Permission is granted to temporarily download one copy of the materials (information or software) on this website for personal,
                        non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-4 text-foreground">4. Disclaimer</h2>
                    <p className="text-muted/90 mb-4">
                        The materials on this website are provided on an 'as is' basis. Makes no warranties, expressed or implied,
                        and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability,
                        fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-4 text-foreground">5. Governing Law</h2>
                    <p className="text-muted/90 mb-4">
                        These terms and conditions are governed by and construed in accordance with the laws of Delaware and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
                    </p>
                </section>
            </div>
        </div>
    );
}
