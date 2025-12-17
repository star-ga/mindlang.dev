"use client";

import { useEffect, useRef } from "react";
import "./flow.css";

export default function FlowDiagram() {
    const initialized = useRef(false);

    useEffect(() => {
        if (typeof window === "undefined") return;
        if (initialized.current) return;
        initialized.current = true;

        // --- Logic Start ---
        const nodes: Record<string, { x: number, y: number, w: number, h: number }> = {
            entry: { x: 80, y: 340, w: 280, h: 130 },
            standard: { x: 520, y: 180, w: 300, h: 130 },
            custom: { x: 520, y: 380, w: 300, h: 130 },
            managed: { x: 520, y: 570, w: 300, h: 130 },
            stall: { x: 520, y: 800, w: 260, h: 110 },
            governed: { x: 1020, y: 320, w: 320, h: 130 },
            success: { x: 1540, y: 320, w: 340, h: 130 }
        };

        function edge(id: string, side: 'left' | 'right', vOffset = 0) {
            const n = nodes[id];
            return {
                x: side === 'right' ? n.x + n.w : n.x,
                y: n.y + n.h / 2 + vOffset
            };
        }

        function sankeyPath(fromId: string, toId: string, value: number, fromOffset = 0, toOffset = 0) {
            const from = edge(fromId, 'right', fromOffset);
            const to = edge(toId, 'left', toOffset);
            const thickness = Math.max(value * 1.6, 6);
            const cp = (to.x - from.x) * 0.45;

            return `
                M ${from.x},${from.y - thickness / 2}
                C ${from.x + cp},${from.y - thickness / 2}
                  ${to.x - cp},${to.y - thickness / 2}
                  ${to.x},${to.y - thickness / 2}
                L ${to.x},${to.y + thickness / 2}
                C ${to.x - cp},${to.y + thickness / 2}
                  ${from.x + cp},${from.y + thickness / 2}
                  ${from.x},${from.y + thickness / 2}
                Z
            `;
        }

        const svg = document.getElementById('flow-svg');
        if (!svg) return;

        const flows = [
            // Entry to all paths
            { from: 'entry', to: 'standard', val: 60, col: '#059669', fromOff: -30, toOff: 0 },
            { from: 'entry', to: 'custom', val: 25, col: '#d97706', fromOff: 5, toOff: 0 },
            { from: 'entry', to: 'managed', val: 10, col: '#7c3aed', fromOff: 30, toOff: 0 },
            { from: 'entry', to: 'stall', val: 5, col: '#dc2626', fromOff: 50, toOff: 0 },

            // Paths to Core
            { from: 'standard', to: 'governed', val: 60, col: '#059669', fromOff: 0, toOff: -25 },
            { from: 'custom', to: 'governed', val: 25, col: '#d97706', fromOff: 0, toOff: 10 },
            { from: 'managed', to: 'governed', val: 10, col: '#7c3aed', fromOff: 0, toOff: 35 },

            // Core to Success
            { from: 'governed', to: 'success', val: 90, col: '#059669', fromOff: 0, toOff: 0 }
        ];

        let svgContent = '';

        flows.forEach(f => {
            const pathD = sankeyPath(f.from, f.to, f.val, f.fromOff, f.toOff);
            svgContent += `<path d="${pathD}" fill="${f.col}" class="flow-path" data-from="${f.from}" data-to="${f.to}"/>`;
        });

        // Flow labels
        const labels = [
            { from: 'entry', to: 'standard', val: '60%', yOff: -50 },
            { from: 'entry', to: 'custom', val: '25%', yOff: 20 },
            { from: 'entry', to: 'managed', val: '10%', yOff: 85 },
            { from: 'entry', to: 'stall', val: '5%', yOff: 165 },
            { from: 'governed', to: 'success', val: '90%', yOff: 0 }
        ];

        labels.forEach(l => {
            const fromPt = edge(l.from, 'right');
            const toPt = edge(l.to, 'left');
            const mx = (fromPt.x + toPt.x) / 2;
            const my = (fromPt.y + toPt.y) / 2 + (l.yOff || 0);
            svgContent += `<text x="${mx}" y="${my}" class="flow-path-label" text-anchor="middle">${l.val}</text>`;
        });

        // Timeline markers
        svgContent += `
            <line x1="80" y1="100" x2="360" y2="100" stroke="#e8e8e8" stroke-dasharray="4,4"/>
            <line x1="520" y1="100" x2="820" y2="100" stroke="#e8e8e8" stroke-dasharray="4,4"/>
            <line x1="1020" y1="100" x2="1340" y2="100" stroke="#e8e8e8" stroke-dasharray="4,4"/>
            <line x1="1540" y1="100" x2="1880" y2="100" stroke="#e8e8e8" stroke-dasharray="4,4"/>
            
            <text x="220" y="80" text-anchor="middle" font-family="JetBrains Mono" font-size="10" font-weight="700" fill="#bbb">DAY 0–1</text>
            <text x="670" y="80" text-anchor="middle" font-family="JetBrains Mono" font-size="10" font-weight="700" fill="#bbb">DAY 7–30</text>
            <text x="1180" y="80" text-anchor="middle" font-family="JetBrains Mono" font-size="10" font-weight="700" fill="#bbb">DAY 30–90</text>
            <text x="1710" y="80" text-anchor="middle" font-family="JetBrains Mono" font-size="10" font-weight="700" fill="#bbb">ONGOING</text>
        `;

        svg.innerHTML = svgContent;

        // Check if mobile
        function isMobile() {
            return window.innerWidth <= 768;
        }

        // Pan/zoom (desktop only)
        let scale = 0.7;
        let tx = 50;
        let ty = 30;
        let dragging = false;
        let startX: number, startY: number;

        const vp = document.getElementById('flow-vp');
        const canvas = document.getElementById('flow-canvas');
        const zoomEl = document.getElementById('flow-z');

        if (!vp || !canvas || !zoomEl) return;

        function update() {
            if (isMobile()) return;
            if (!canvas || !zoomEl) return;
            canvas.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`;
            zoomEl.textContent = `${Math.round(scale * 100)}%`;
        }

        const handleWheel = (e: WheelEvent) => {
            if (isMobile()) return;
            e.preventDefault();
            const rect = vp.getBoundingClientRect();
            const mx = e.clientX - rect.left;
            const my = e.clientY - rect.top;
            const cx = (mx - tx) / scale;
            const cy = (my - ty) / scale;
            const delta = -e.deltaY * 0.001;
            const newScale = Math.max(0.3, Math.min(1.5, scale + delta));
            tx = mx - cx * newScale;
            ty = my - cy * newScale;
            scale = newScale;
            update();
        };

        vp.addEventListener('wheel', handleWheel as any);

        const handleMouseDown = (e: MouseEvent) => {
            if (isMobile()) return;
            if ((e.target as HTMLElement).closest('.flow-node')) return;
            dragging = true;
            startX = e.clientX - tx;
            startY = e.clientY - ty;
            vp.classList.add('grabbing');
        };

        vp.addEventListener('mousedown', handleMouseDown as any);

        const handleMouseMove = (e: MouseEvent) => {
            if (isMobile()) return;
            if (!dragging) return;
            tx = e.clientX - startX;
            ty = e.clientY - startY;
            update();
        };

        document.addEventListener('mousemove', handleMouseMove as any);

        const handleMouseUp = () => {
            dragging = false;
            vp.classList.remove('grabbing');
        };

        document.addEventListener('mouseup', handleMouseUp);

        function zoom(delta: number) {
            if (isMobile()) return;
            const cx = vp!.clientWidth / 2;
            const cy = vp!.clientHeight / 2;
            const px = (cx - tx) / scale;
            const py = (cy - ty) / scale;
            const newScale = Math.max(0.3, Math.min(1.5, scale + delta));
            tx = cx - px * newScale;
            ty = cy - py * newScale;
            scale = newScale;
            update();
        }

        function reset() {
            if (isMobile()) return;
            scale = 0.7;
            tx = 50;
            ty = 30;
            update();
        }

        document.getElementById('flow-zoom-in')?.addEventListener('click', () => zoom(0.15));
        document.getElementById('flow-zoom-out')?.addEventListener('click', () => zoom(-0.15));
        document.getElementById('flow-reset')?.addEventListener('click', reset);

        // Mobile pinch-to-zoom and pan
        let mobileScale = 0.35;
        let mobileTx = 10;
        let mobileTy = -20;
        let lastTouchDist = 0;
        let lastTouchCenter = { x: 0, y: 0 };
        let isTouching = false;
        let touchStartX = 0;
        let touchStartY = 0;

        function updateMobile() {
            if (!canvas) return;
            canvas.style.transform = `translate(${mobileTx}px, ${mobileTy}px) scale(${mobileScale})`;
        }

        function getTouchDistance(touches: TouchList) {
            const dx = touches[0].clientX - touches[1].clientX;
            const dy = touches[0].clientY - touches[1].clientY;
            return Math.sqrt(dx * dx + dy * dy);
        }

        function getTouchCenter(touches: TouchList) {
            return {
                x: (touches[0].clientX + touches[1].clientX) / 2,
                y: (touches[0].clientY + touches[1].clientY) / 2
            };
        }

        const handleTouchStart = (e: TouchEvent) => {
            if (!isMobile()) return;
            if (e.touches.length === 2) {
                e.preventDefault();
                lastTouchDist = getTouchDistance(e.touches);
                lastTouchCenter = getTouchCenter(e.touches);
            } else if (e.touches.length === 1) {
                isTouching = true;
                touchStartX = e.touches[0].clientX - mobileTx;
                touchStartY = e.touches[0].clientY - mobileTy;
            }
        };

        vp.addEventListener('touchstart', handleTouchStart as any, { passive: false });

        const handleTouchMove = (e: TouchEvent) => {
            if (!isMobile()) return;
            if (e.touches.length === 2) {
                e.preventDefault();
                const newDist = getTouchDistance(e.touches);
                const newCenter = getTouchCenter(e.touches);
                const rect = vp.getBoundingClientRect();

                // Calculate zoom
                const scaleDelta = newDist / lastTouchDist;
                const newScale = Math.max(0.25, Math.min(1.2, mobileScale * scaleDelta));

                // Zoom toward pinch center
                const cx = newCenter.x - rect.left;
                const cy = newCenter.y - rect.top;
                const px = (cx - mobileTx) / mobileScale;
                const py = (cy - mobileTy) / mobileScale;

                mobileTx = cx - px * newScale;
                mobileTy = cy - py * newScale;
                mobileScale = newScale;

                lastTouchDist = newDist;
                lastTouchCenter = newCenter;
                updateMobile();
            } else if (e.touches.length === 1 && isTouching) {
                mobileTx = e.touches[0].clientX - touchStartX;
                mobileTy = e.touches[0].clientY - touchStartY;
                updateMobile();
            }
        };

        vp.addEventListener('touchmove', handleTouchMove as any, { passive: false });

        vp.addEventListener('touchend', () => {
            isTouching = false;
            lastTouchDist = 0;
        });

        // Initialize based on screen size
        if (isMobile()) {
            updateMobile();
        } else {
            update();
        }

        // Handle resize
        window.addEventListener('resize', () => {
            if (isMobile()) {
                updateMobile();
            } else {
                update();
            }
        });

        // Modal data
        const modalData: any = {
            entry: {
                label: "ENTRY",
                title: "Workspace Activation",
                color: "#059669",
                sections: [
                    {
                        title: "Purpose",
                        content: "Sales handoff → product ownership transfer. Contract is executed, tenant is provisioned, and administrative access is established. No technical work yet."
                    },
                    {
                        title: "What Happens",
                        content: `<ul>
                            <li>MSA/SOW executed, billing initialized</li>
                            <li>Tenant provisioned in MIND infrastructure</li>
                            <li>SSO/identity integration configured</li>
                            <li>Admin credentials issued</li>
                            <li>Onboarding kickoff scheduled</li>
                        </ul>`
                    },
                    {
                        title: "Deliverables",
                        content: "Active workspace URL, admin access, billing confirmation, assigned CSM contact, onboarding timeline."
                    }
                ],
                metrics: [
                    { value: "100%", label: "Volume" },
                    { value: "0–1d", label: "Duration" },
                    { value: "Sales", label: "Owner" }
                ]
            },
            standard: {
                label: "PRIMARY PATH",
                title: "Standard MIND Deployment",
                color: "#059669",
                sections: [
                    {
                        title: "Overview",
                        content: "The 'happy path' for most teams. Default governance stack with managed providers, reference policies, and standard configurations. Minimal customization required."
                    },
                    {
                        title: "What Gets Enabled",
                        content: `<ul>
                            <li>Provider registry activated (OpenAI, Anthropic, etc.)</li>
                            <li>Default governance rules enabled</li>
                            <li>Runtime orchestration online</li>
                            <li>UI + API access granted</li>
                            <li>Standard audit logging active</li>
                        </ul>`
                    },
                    {
                        title: "Ideal For",
                        content: "Teams without complex regulatory requirements, using standard LLM providers, ready to adopt reference governance policies with minimal modification."
                    }
                ],
                metrics: [
                    { value: "~60%", label: "Of Customers" },
                    { value: "7–14d", label: "To Live" },
                    { value: "Self-Serve", label: "Motion" }
                ]
            },
            custom: {
                label: "ALTERNATIVE PATH",
                title: "Custom Governance Setup",
                color: "#d97706",
                sections: [
                    {
                        title: "Overview",
                        content: "For organizations requiring governance configurations beyond the standard stack. Custom policies, external providers, or organization-specific control requirements."
                    },
                    {
                        title: "Triggering Conditions",
                        content: `<ul>
                            <li>Regulated environments (healthcare, finance, defense)</li>
                            <li>Custom compute / LLM providers (Azure OpenAI, private endpoints)</li>
                            <li>Internal policy requirements that differ from reference</li>
                            <li>Multi-region or data residency constraints</li>
                        </ul>`
                    },
                    {
                        title: "Additional Work",
                        content: "Policy design sessions, custom provider integration, compliance mapping, security review alignment, extended testing cycles."
                    }
                ],
                metrics: [
                    { value: "~25%", label: "Of Customers" },
                    { value: "+15–30d", label: "Extra Time" },
                    { value: "Guided", label: "Motion" }
                ]
            },
            managed: {
                label: "MANAGED DELIVERY",
                title: "Managed Enterprise Delivery",
                color: "#7c3aed",
                sections: [
                    {
                        title: "Overview",
                        content: "White-glove delivery mode for strategic accounts. Dedicated solutions engineering, policy design workshops, and SLA-backed support throughout deployment. This is a delivery mode, not a product tier."
                    },
                    {
                        title: "Delivery Includes",
                        content: `<ul>
                            <li>Dedicated solutions engineer</li>
                            <li>Policy design workshops with stakeholders</li>
                            <li>Multi-tenant / multi-org setup support</li>
                            <li>Custom integration development</li>
                            <li>Executive business reviews</li>
                        </ul>`
                    },
                    {
                        title: "Ideal For",
                        content: "Large enterprises, complex multi-product deployments, organizations requiring change management support, executive-visibility implementations."
                    }
                ],
                metrics: [
                    { value: "~10%", label: "Of Customers" },
                    { value: "+30d", label: "Extra Time" },
                    { value: "High-Touch", label: "Delivery" }
                ]
            },
            stall: {
                label: "EXIT",
                title: "Adoption Stall",
                color: "#dc2626",
                sections: [
                    {
                        title: "Definition",
                        content: "Failure to operationalize MIND within the organization. This is NOT churn—it's failure to move from contracted to deployed. The product was never truly adopted."
                    },
                    {
                        title: "Common Causes",
                        content: `<ul>
                            <li>No internal owner / champion departure</li>
                            <li>Organization not AI-ready (no active initiatives)</li>
                            <li>Strategic deprioritization / competing projects win</li>
                            <li>Reorg disrupts sponsorship</li>
                            <li>Budget reallocated before deployment</li>
                        </ul>`
                    },
                    {
                        title: "Prevention",
                        content: "Better pre-sales qualification on AI readiness, executive sponsor identification, implementation resource commitment verification, shorter time-to-value targets."
                    }
                ],
                metrics: [
                    { value: "~5%", label: "Exit Rate" },
                    { value: "30–60d", label: "To Detect" },
                    { value: "Low", label: "Recovery" }
                ]
            },
            governed: {
                label: "CORE PLATFORM",
                title: "Governed AI Operations",
                color: "#059669",
                sections: [
                    {
                        title: "Definition",
                        content: "This is where MIND becomes mission-critical infrastructure. All deployment paths converge here. Policies are enforced, costs are tracked, providers are orchestrated."
                    },
                    {
                        title: "Capabilities Live",
                        content: `<ul>
                            <li>Runtime execution active</li>
                            <li>Budget enforcement operational</li>
                            <li>Audit logs collecting</li>
                            <li>Safety constraints enforced</li>
                            <li>Provider orchestration running</li>
                            <li>Team access provisioned</li>
                        </ul>`
                    },
                    {
                        title: "Value Realization Begins",
                        content: "First production workloads running through MIND. Cost visibility established. Governance posture measurable. Platform is no longer a tool—it's infrastructure."
                    }
                ],
                metrics: [
                    { value: "~95%", label: "Reach Core" },
                    { value: "30–90d", label: "Timeline" },
                    { value: "CSM", label: "Owner" }
                ]
            },
            success: {
                label: "SUCCESS",
                title: "Organization-Wide AI Governance",
                color: "#059669",
                sections: [
                    {
                        title: "Definition",
                        content: "AI governance standardized across the organization. Risk reduced through consistent policies. Spend controlled and predictable. Not everyone who reaches Core expands org-wide—some remain single-team deployments."
                    },
                    {
                        title: "Success Indicators",
                        content: `<ul>
                            <li>Multiple teams actively using MIND</li>
                            <li>Predictable, controlled AI costs</li>
                            <li>Compliance-ready AI usage patterns</li>
                            <li>Governance policies adopted org-wide</li>
                            <li>Executive visibility into AI operations</li>
                        </ul>`
                    },
                    {
                        title: "Expansion Opportunity",
                        content: "New teams onboarding, additional use cases discovered, tier upgrades, geographic expansion, adjacent product adoption. NRR engine begins."
                    }
                ],
                metrics: [
                    { value: "~90%", label: "Of Core" },
                    { value: "Ongoing", label: "Duration" },
                    { value: "Account", label: "Owner" }
                ]
            }
        };

        const modal = document.getElementById('flow-modal');
        const modalContent = document.querySelector('.flow-modal-content') as HTMLElement;
        const modalBody = document.getElementById('flow-modal-body');

        function openModal(nodeType: string) {
            const data = modalData[nodeType];
            if (!data || !modal || !modalContent || !modalBody) return;

            modalContent.style.setProperty('--accent-color', data.color);

            let html = `
                <div class="flow-modal-label">${data.label}</div>
                <div class="flow-modal-title">${data.title}</div>
            `;

            data.sections.forEach((section: any) => {
                html += `
                    <div class="flow-modal-section">
                        <div class="flow-modal-section-title">${section.title}</div>
                        <div class="flow-modal-section-content">${section.content}</div>
                    </div>
                `;
            });

            html += '<div class="flow-modal-metrics">';
            data.metrics.forEach((metric: any) => {
                html += `
                    <div class="flow-modal-metric">
                        <div class="flow-modal-metric-value">${metric.value}</div>
                        <div class="flow-modal-metric-label">${metric.label}</div>
                    </div>
                `;
            });
            html += '</div>';

            modalBody.innerHTML = html;
            modal.classList.add('active');
        }

        function closeModal() {
            modal?.classList.remove('active');
        }

        document.getElementById('flow-modal-close')?.addEventListener('click', closeModal);

        document.querySelectorAll('.flow-node').forEach(node => {
            const nodeType = node.getAttribute('data-node');
            if (nodeType) {
                node.addEventListener('click', () => openModal(nodeType));
            }

            node.addEventListener('mouseenter', () => {
                document.querySelectorAll('.flow-path').forEach(flow => {
                    const from = flow.getAttribute('data-from');
                    const to = flow.getAttribute('data-to');
                    if (from === nodeType || to === nodeType) {
                        (flow as HTMLElement).style.opacity = '0.45';
                        (flow as HTMLElement).style.filter = 'brightness(1.15)';
                    }
                });
            });

            node.addEventListener('mouseleave', () => {
                document.querySelectorAll('.flow-path').forEach(flow => {
                    (flow as HTMLElement).style.opacity = '';
                    (flow as HTMLElement).style.filter = '';
                });
            });
        });

        modal?.addEventListener('click', (e) => {
            if ((e.target as HTMLElement).id === 'flow-modal') closeModal();
        });

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeModal();
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            // Cleanup if needed, though this is a top-level page effect
        };
    }, []);

    return (
        <div className="bg-white min-h-screen">
            <div className="flow-header">
                <div className="flow-header-top">
                    <h1 className="flow-title">How MIND Works</h1>
                </div>
                <div className="flow-subtitle">Enterprise adoption and governance lifecycle</div>
                <div className="flow-context-note">
                    MIND adoption is not linear. Organizations enter with different levels of readiness and converge only after governance is operational.
                </div>
                <div className="flow-stats">
                    <div className="flow-stat">
                        <div className="flow-stat-value">30–90d</div>
                        <div className="flow-stat-label">Time to Value</div>
                    </div>
                    <div className="flow-stat">
                        <div className="flow-stat-value">90%</div>
                        <div className="flow-stat-label">Retention</div>
                    </div>
                    <div className="flow-stat">
                        <div className="flow-stat-value">5</div>
                        <div className="flow-stat-label">Core Paths</div>
                    </div>
                </div>
            </div>

            <div className="flow-viewport" id="flow-vp">
                <div className="flow-scroll-hint" id="flow-scroll-hint">← Swipe to explore →</div>
                <div className="flow-canvas" id="flow-canvas">
                    <svg id="flow-svg"></svg>

                    {/* ENTRY */}
                    <div className="flow-node primary" data-node="entry" style={{ left: 80, top: 340, width: 280 }}>
                        <div className="flow-node-label">Entry</div>
                        <div className="flow-node-title">Workspace Activation</div>
                        <div className="flow-node-desc">Contract signed • Tenant provisioned • Identity + billing initialized</div>
                        <div className="flow-node-data">
                            <span>100% Volume</span>
                            <span>Day 0–1</span>
                        </div>
                    </div>

                    {/* PRIMARY PATH */}
                    <div className="flow-node primary" data-node="standard" style={{ left: 520, top: 180, width: 300 }}>
                        <div className="flow-node-label">Primary · ~60%</div>
                        <div className="flow-node-title">Standard MIND Deployment</div>
                        <div className="flow-node-desc">Default governance stack • Managed providers • Reference policies</div>
                        <div className="flow-node-data">
                            <span>~60%</span>
                            <span>7–14d</span>
                        </div>
                    </div>

                    {/* ALTERNATIVE PATH */}
                    <div className="flow-node alternative" data-node="custom" style={{ left: 520, top: 380, width: 300 }}>
                        <div className="flow-node-label">Alternative · ~25%</div>
                        <div className="flow-node-title">Custom Governance Setup</div>
                        <div className="flow-node-desc">Custom policies • External providers • Org-specific controls</div>
                        <div className="flow-node-data">
                            <span>~25%</span>
                            <span>+15–30d</span>
                        </div>
                    </div>

                    {/* MANAGED PATH */}
                    <div className="flow-node enhanced" data-node="managed" style={{ left: 520, top: 570, width: 300 }}>
                        <div className="flow-node-label">Managed · ~10%</div>
                        <div className="flow-node-title">Managed Enterprise Delivery</div>
                        <div className="flow-node-desc">White-glove onboarding • Dedicated governance • SLA support</div>
                        <div className="flow-node-data">
                            <span>~10%</span>
                            <span>+30d</span>
                        </div>
                    </div>

                    {/* EXIT */}
                    <div className="flow-node exit" data-node="stall" style={{ left: 520, top: 800, width: 260 }}>
                        <div className="flow-node-label">Exit · ~5%</div>
                        <div className="flow-node-title">Adoption Stall</div>
                        <div className="flow-node-desc">No internal owner • Org not AI-ready • Strategic deprioritization</div>
                        <div className="flow-node-data">
                            <span>~5% Exit</span>
                        </div>
                    </div>

                    {/* CORE PLATFORM */}
                    <div className="flow-node core" data-node="governed" style={{ left: 1020, top: 320, width: 320 }}>
                        <div className="flow-node-label">Core · ~95%</div>
                        <div className="flow-node-title">Governed AI Operations</div>
                        <div className="flow-node-desc">Policies enforced • Costs tracked • Providers orchestrated</div>
                        <div className="flow-node-data">
                            <span>~95%</span>
                            <span>Day 30–90</span>
                        </div>
                    </div>

                    {/* SUCCESS */}
                    <div className="flow-node success" data-node="success" style={{ left: 1540, top: 320, width: 340 }}>
                        <div className="flow-node-label">Success · ~90%</div>
                        <div className="flow-node-title">Organization-Wide AI Governance</div>
                        <div className="flow-node-desc">AI standardized • Risk reduced • Spend controlled</div>
                        <div className="flow-node-data">
                            <span>90% Success</span>
                            <span>Ongoing</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flow-controls">
                <button className="flow-btn" id="flow-zoom-in">+</button>
                <div className="flow-zoom-num" id="flow-z">100%</div>
                <button className="flow-btn" id="flow-zoom-out">−</button>
                <button className="flow-btn" id="flow-reset">⟲</button>
            </div>

            <div className="flow-legend">
                <div className="flow-legend-title">Path Distribution</div>
                <div className="flow-leg-item">
                    <div className="flow-swatch" style={{ background: "#059669" }}></div>
                    <div className="flow-leg-name">Primary Path</div>
                    <div className="flow-leg-val">60%</div>
                </div>
                <div className="flow-leg-item">
                    <div className="flow-swatch" style={{ background: "#d97706" }}></div>
                    <div className="flow-leg-name">Custom Setup</div>
                    <div className="flow-leg-val">25%</div>
                </div>
                <div className="flow-leg-item">
                    <div className="flow-swatch" style={{ background: "#7c3aed" }}></div>
                    <div className="flow-leg-name">Managed Delivery</div>
                    <div className="flow-leg-val">10%</div>
                </div>
                <div className="flow-leg-item">
                    <div className="flow-swatch" style={{ background: "#dc2626" }}></div>
                    <div className="flow-leg-name">Adoption Stall</div>
                    <div className="flow-leg-val">5%</div>
                </div>
            </div>

            <div className="flow-modal" id="flow-modal">
                <div className="flow-modal-content">
                    <button className="flow-modal-close" id="flow-modal-close">×</button>
                    <div id="flow-modal-body"></div>
                </div>
            </div>
        </div>
    );
}
