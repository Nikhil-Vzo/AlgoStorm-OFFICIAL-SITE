import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import gsap from 'gsap';
import teamCategories, { type TeamMember } from '../data/teamData';
import './TeamsPage.css';

/* ═══════════════════════════════════════════
   CONFIG
   ═══════════════════════════════════════════ */
const CARD_GAP = 28;
const AUTO_SPEED = 0.4;           // px per frame
const DRAG_SENSITIVITY = 1.2;
const MOMENTUM_DECAY = 0.94;

function getCardW() {
    if (typeof window === 'undefined') return 210;
    if (window.innerWidth <= 480) return 115;
    if (window.innerWidth <= 768) return 155;
    return 210;
}

/* ═══════════════════════════════════════════
   Build flat member list with category info
   ═══════════════════════════════════════════ */
interface FlatMember extends TeamMember {
    categoryId: string;
    categoryName: string;
}

function buildFlat(): FlatMember[] {
    const out: FlatMember[] = [];
    teamCategories.forEach((cat) =>
        cat.members.forEach((m) =>
            out.push({ ...m, categoryId: cat.id, categoryName: cat.name })
        )
    );
    return out;
}

/* ═══════════════════════════════════════════
   CARD SUB-COMPONENT
   ═══════════════════════════════════════════ */
function Card({ member }: { member: FlatMember }) {
    const initials = member.name.split(' ').map((w) => w[0]).join('').slice(0, 2);

    return (
        <div className="team-card-inner">
            {member.image ? (
                <img src={member.image} alt={member.name} className="team-card-image" loading="lazy" />
            ) : (
                <div className="team-card-placeholder">{initials}</div>
            )}

            {/* Always-visible bottom gradient with name */}
            <div className="team-card-bottom">
                <p className="team-card-team">{member.categoryName}</p>
                <h3 className="team-card-name">{member.name}</h3>
                <p className="team-card-role">{member.role || (member.lead ? 'Lead' : '')}</p>
            </div>

            <div className="team-card-corner" />
            <div className="team-card-code">
                <span>#{String(Math.abs(member.id)).padStart(2, '0')}</span>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════ */
export default function TeamsPage() {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const allMembers = useMemo(() => buildFlat(), []);
    const N = allMembers.length;

    const [activeCatId, setActiveCatId] = useState(teamCategories[0].id);
    const scrollRef = useRef(0);          // continuous scroll value in "index" space
    const momentumRef = useRef(0);
    const draggingRef = useRef(false);
    const dragXRef = useRef(0);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const rafRef = useRef(0);

    /* ─── Position every card ─── */
    const layout = useCallback(() => {
        if (!wrapperRef.current) return;
        const cards = wrapperRef.current.children;
        if (cards.length === 0) return;

        const cw = getCardW();
        const stride = cw + CARD_GAP;
        const containerW = wrapperRef.current.parentElement?.clientWidth ?? window.innerWidth;
        const cx = containerW / 2;

        let bestDist = Infinity;
        let bestIdx = 0;

        for (let i = 0; i < N; i++) {
            const card = cards[i] as HTMLElement;
            if (!card) continue;

            // Relative position from center (wrapping around)
            let rel = i - scrollRef.current;
            rel = ((rel % N) + N + N / 2) % N - N / 2;

            const x = rel * stride + cx - cw / 2;
            const absRel = Math.abs(rel);

            // Arch: quadratic drop-off
            const y = absRel * absRel * 6;

            // Scale: center = 1.1, edges shrink
            const scale = Math.max(1.1 - absRel * 0.08, 0.4);

            // Rotation: tilt away from center
            const rot = rel * -6;

            // Opacity: center bright, edges dim
            const opacity = Math.max(1 - absRel * 0.18, 0);

            // Z-index
            const z = Math.round(50 - absRel * 5);

            gsap.set(card, {
                x,
                y,
                rotation: rot,
                scale,
                opacity,
                zIndex: z,
                force3D: true,
            });

            if (absRel < bestDist) {
                bestDist = absRel;
                bestIdx = i;
            }
        }

        // Update active tab from center card
        const centerCat = allMembers[bestIdx]?.categoryId;
        if (centerCat) setActiveCatId(centerCat);
    }, [N, allMembers]);

    /* ─── Animation loop ─── */
    useEffect(() => {
        let alive = true;

        const tick = () => {
            if (!alive) return;

            if (!draggingRef.current) {
                if (Math.abs(momentumRef.current) > 0.005) {
                    scrollRef.current += momentumRef.current;
                    momentumRef.current *= MOMENTUM_DECAY;
                } else {
                    momentumRef.current = 0;
                    const cw = getCardW();
                    scrollRef.current += AUTO_SPEED / (cw + CARD_GAP);
                }
            }

            layout();
            rafRef.current = requestAnimationFrame(tick);
        };

        rafRef.current = requestAnimationFrame(tick);
        return () => {
            alive = false;
            cancelAnimationFrame(rafRef.current);
        };
    }, [layout]);

    /* ─── Entrance ─── */
    useEffect(() => {
        if (!sectionRef.current) return;
        const h = sectionRef.current.querySelector('.team-header');
        const t = sectionRef.current.querySelector('.team-dots');
        const s = sectionRef.current.querySelector('.team-stats');
        if (h) gsap.fromTo(h, { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: 0.6 });
        if (t) gsap.fromTo(t, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.2 });
        if (s) gsap.fromTo(s, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.4 });
    }, []);

    /* ─── Drag ─── */
    const onDown = useCallback((e: React.PointerEvent) => {
        draggingRef.current = true;
        dragXRef.current = e.clientX;
        momentumRef.current = 0;
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    }, []);

    const onMove = useCallback((e: React.PointerEvent) => {
        if (!draggingRef.current) return;
        const dx = e.clientX - dragXRef.current;
        dragXRef.current = e.clientX;
        const cw = getCardW();
        const indexDelta = (dx * DRAG_SENSITIVITY) / (cw + CARD_GAP);
        scrollRef.current -= indexDelta;
        momentumRef.current = -indexDelta;
    }, []);

    const onUp = useCallback(() => {
        draggingRef.current = false;
    }, []);

    /* ─── Tab click → scroll to team ─── */
    const goToTab = useCallback(
        (catId: string) => {
            const idx = allMembers.findIndex((m) => m.categoryId === catId);
            if (idx < 0) return;

            momentumRef.current = 0;
            const from = { v: scrollRef.current };
            const target = idx;

            // Find shortest path around the ring
            let diff = target - from.v;
            if (diff > N / 2) diff -= N;
            if (diff < -N / 2) diff += N;

            gsap.to(from, {
                v: from.v + diff,
                duration: 0.9,
                ease: 'power3.inOut',
                onUpdate: () => {
                    scrollRef.current = from.v;
                },
            });
        },
        [allMembers, N]
    );

    /* ─── Hover ─── */
    const onCardEnter = useCallback((e: React.MouseEvent) => {
        gsap.to(e.currentTarget, { scale: '+=0.12', rotation: 0, zIndex: 200, duration: 0.25, ease: 'back.out(2)' });
    }, []);
    const onCardLeave = useCallback(() => {
        // Next tick of animation loop resets everything
    }, []);

    /* ═══════════════════════════════════════════
       RENDER
       ═══════════════════════════════════════════ */
    return (
        <section className="team-section" id="team" ref={sectionRef}>
            <div className="team-bg-pattern" />
            <div className="team-red-glow" />

            <div className="team-content">
                {/* Header */}
                <div className="team-header">
                    <h2 className="team-title">
                        <span className="team-title-red">ALGO</span>STORM
                        <span className="team-title-red"> 2.0</span>
                    </h2>
                    <p className="team-subtitle">Meet The Crew</p>
                </div>

                {/* ── Active Team Name (animated) ── */}
                <div className="team-active-label">
                    <p className="team-active-name" key={activeCatId}>
                        {teamCategories.find((c) => c.id === activeCatId)?.name}
                    </p>
                </div>

                {/* ── Dot Navigation ── */}
                <div className="team-dots">
                    {teamCategories.map((cat) => (
                        <button
                            key={cat.id}
                            className={`team-dot${cat.id === activeCatId ? ' team-dot--active' : ''}`}
                            onClick={() => goToTab(cat.id)}
                            aria-label={cat.name}
                            title={cat.name}
                        />
                    ))}
                </div>

                {/* Carousel */}
                <div className="team-carousel">
                    <div
                        className="team-cards-wrap"
                        ref={wrapperRef}
                        onPointerDown={onDown}
                        onPointerMove={onMove}
                        onPointerUp={onUp}
                        onPointerLeave={onUp}
                    >
                        {allMembers.map((m) => (
                            <div
                                key={m.id}
                                className="team-card"
                                onMouseEnter={onCardEnter}
                                onMouseLeave={onCardLeave}
                            >
                                <Card member={m} />
                            </div>
                        ))}
                    </div>

                    <div className="team-drag-hint">
                        <svg className="team-arrow-left" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                        <span>Drag to explore</span>
                        <svg className="team-arrow-right" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                    </div>
                </div>

                {/* Stats */}
                <div className="team-stats">
                    <div className="team-stat-item">
                        <div className="team-stat-value">27</div>
                        <div className="team-stat-label">Members</div>
                    </div>
                    <div className="team-stat-item">
                        <div className="team-stat-value">9</div>
                        <div className="team-stat-label">Teams</div>
                    </div>
                    <div className="team-stat-item">
                        <div className="team-stat-value">100%</div>
                        <div className="team-stat-label">Commitment</div>
                    </div>
                </div>
            </div>

            {/* Decorative */}
            <div className="team-corner team-corner--tl" />
            <div className="team-corner team-corner--tr" />
            <div className="team-corner team-corner--bl" />
            <div className="team-corner team-corner--br" />

            <div className="team-side-accent team-side-accent--left">
                <div className="team-accent-line team-accent-line--long" />
                <div className="team-accent-line team-accent-line--medium" />
                <div className="team-accent-line team-accent-line--short" />
            </div>
            <div className="team-side-accent team-side-accent--right">
                <div className="team-accent-line team-accent-line--short" />
                <div className="team-accent-line team-accent-line--medium" />
                <div className="team-accent-line team-accent-line--long" />
            </div>
        </section>
    );
}
