import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy",
    description: "Privacy policy outlining how we collect, use, and protect your data.",
};

export default function PrivacyPage() {
    return (
        <div className="container py-16 max-w-4xl">
            <h1 className="page-title">Privacy Policy</h1>
            <p className="text-muted mb-8">Last Updated: {new Date().toLocaleDateString()}</p>

            <div className="prose prose-slate dark:prose-invert max-w-none">
                <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-4 text-foreground">1. Information We Collect</h2>
                    <p className="text-muted/90 mb-4">
                        We collect information you provide directly to us when you create an account, subscribe to our newsletter,
                        or communicate with us. This may include your name, email address, and any other information you choose to provide.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-4 text-foreground">2. How We Use Your Information</h2>
                    <p className="text-muted/90 mb-4">
                        We use the information we collect to operate, maintain, and improve our services, to send you technical notices and support messages,
                        and to communicate with you about products, services, offers, and events.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-4 text-foreground">3. Analytics and Cookies</h2>
                    <p className="text-muted/90 mb-4">
                        We may use cookies and similar technologies to help us understand how you use our website and improve your experience.
                        We do not sell your personal data to third parties.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-4 text-foreground">4. Data Security</h2>
                    <p className="text-muted/90 mb-4">
                        We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-4 text-foreground">5. GDPR and Data Rights</h2>
                    <p className="text-muted/90 mb-4">
                        Under the General Data Protection Regulation (GDPR) and other data protection laws, you have rights including:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-muted/90 mb-4">
                        <li>The right to access your personal data</li>
                        <li>The right to correction of your personal data</li>
                        <li>The right to deletion of your personal data</li>
                        <li>The right to restrict or object to processing</li>
                        <li>The right to data portability</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-4 text-foreground">6. Contact Us</h2>
                    <p className="text-muted/90 mb-4">
                        If you have any questions about this Privacy Policy, please contact us at info@star.ga.
                    </p>
                </section>
            </div>
        </div>
    );
}
