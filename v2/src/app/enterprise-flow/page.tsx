import { Metadata } from "next";
import FlowDiagram from "./FlowDiagram";

export const metadata: Metadata = {
    title: "Enterprise Adoption Flow",
    description: "Interactive guide to the MIND enterprise adoption and governance lifecycle.",
};

export default function EnterpriseFlowPage() {
    return (
        <main>
            <FlowDiagram />
        </main>
    );
}
