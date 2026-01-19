"use client";

import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { MobileDocsMenu } from "@/components/ui/DocsSidebar";

interface DocsHeaderProps {
    currentPath: string;
}

/**
 * Combined docs header with breadcrumbs and mobile navigation menu.
 * Use this instead of separate Breadcrumbs + MobileDocsSidebar pattern.
 */
export function DocsHeader({ currentPath }: DocsHeaderProps) {
    return (
        <Breadcrumbs
            rightContent={<MobileDocsMenu currentPath={currentPath} />}
        />
    );
}
