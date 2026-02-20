import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Season1Recap.css';

gsap.registerPlugin(ScrollTrigger);

const images = [
    'https://i.ibb.co/0jPJQvm7/Whats-App-Image-2026-02-20-at-1-18-22-PM.webp',
    'https://i.ibb.co/zTx9yKQm/Whats-App-Image-2026-02-20-at-1-18-29-PM-1.webp',
    'https://i.ibb.co/8Dscnykd/Whats-App-Image-2026-02-20-at-1-18-29-PM.webp',
    'https://i.ibb.co/whkmswTD/Whats-App-Image-2026-02-20-at-1-18-21-PM.webp',
    'https://i.ibb.co/MyM4sDKn/Whats-App-Image-2026-02-20-at-1-18-22-PM-1.webp',
    'https://i.ibb.co/7JhTL6JC/Whats-App-Image-2026-02-20-at-1-18-22-PM-2.webp',
];

export default function Season1Recap() {
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const wrapper = wrapperRef.current;
        if (!wrapper) return;

        // All selectors scoped to wrapper
        const imgs = wrapper.querySelectorAll<HTMLElement>('.s1-img');
        const textWrap = wrapper.querySelector<HTMLElement>('.s1-text-wrap');
        const desc = wrapper.querySelector<HTMLElement>('.s1-desc');
        const glow = wrapper.querySelector<HTMLElement>('.s1-glow');

        if (!imgs.length || !textWrap || !desc || !glow) return;

        // Force GPU layers
        gsap.set(imgs, { force3D: true });

        // Initial state for text
        gsap.set(textWrap, { opacity: 0, yPercent: 10 });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: wrapper,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 0.8,
            },
        });

        // ── Phase 1 (0→0.15): Main Typography appears first ──
        tl.to(textWrap, { opacity: 1, yPercent: 0, duration: 0.15, ease: 'power2.out' }, 0);
        tl.fromTo(glow, { opacity: 0 }, { opacity: 1, duration: 0.15, ease: 'power2.inOut' }, 0);

        // ── Phase 2 (0.15→0.45): Images slide in aggressively behind the text ──
        tl.from(imgs[0], { xPercent: -200, duration: 0.12, ease: 'power3.out' }, 0.15);
        tl.from(imgs[1], { xPercent: 200, duration: 0.12, ease: 'power3.out' }, 0.20);
        tl.from(imgs[2], { xPercent: -180, yPercent: 80, duration: 0.12, ease: 'power3.out' }, 0.25);
        tl.from(imgs[3], { xPercent: 200, duration: 0.12, ease: 'power3.out' }, 0.30);
        tl.from(imgs[4], { yPercent: 200, duration: 0.12, ease: 'power3.out' }, 0.35);
        tl.from(imgs[5], { xPercent: 180, yPercent: 120, duration: 0.12, ease: 'power3.out' }, 0.40);

        // ── Phase 3 (0.45→0.50): Description appears ──
        tl.fromTo(desc, { opacity: 0, yPercent: 30 }, { opacity: 1, yPercent: 0, duration: 0.10, ease: 'power2.out' }, 0.45);

        // ── Phase 4 (0.50→0.72): Gentle parallax drift ──
        tl.to(imgs[0], { xPercent: -12, yPercent: -10, duration: 0.22, ease: 'none' }, 0.50);
        tl.to(imgs[1], { xPercent: 12, yPercent: -8, duration: 0.22, ease: 'none' }, 0.50);
        tl.to(imgs[2], { xPercent: -16, yPercent: 8, duration: 0.22, ease: 'none' }, 0.50);
        tl.to(imgs[3], { xPercent: 16, yPercent: 12, duration: 0.22, ease: 'none' }, 0.50);
        tl.to(imgs[4], { xPercent: -8, yPercent: 16, duration: 0.22, ease: 'none' }, 0.50);
        tl.to(imgs[5], { xPercent: 14, yPercent: 14, duration: 0.22, ease: 'none' }, 0.50);

        // ── Phase 5 (0.75→1.0): Everything flies out or fades smoothly ──
        tl.to(imgs[0], { xPercent: -200, duration: 0.18, ease: 'power2.in' }, 0.75);
        tl.to(imgs[1], { xPercent: 200, duration: 0.18, ease: 'power2.in' }, 0.76);
        tl.to(imgs[2], { xPercent: -180, yPercent: 80, duration: 0.18, ease: 'power2.in' }, 0.77);
        tl.to(imgs[3], { xPercent: 200, duration: 0.18, ease: 'power2.in' }, 0.78);
        tl.to(imgs[4], { yPercent: 200, duration: 0.18, ease: 'power2.in' }, 0.79);
        tl.to(imgs[5], { xPercent: 180, yPercent: 120, duration: 0.18, ease: 'power2.in' }, 0.80);

        tl.to(textWrap, { opacity: 0, yPercent: -15, duration: 0.12, ease: 'power2.in' }, 0.85);
        tl.to(desc, { opacity: 0, yPercent: -10, duration: 0.10, ease: 'power2.in' }, 0.87);
        tl.to(glow, { opacity: 0, duration: 0.12, ease: 'power2.in' }, 0.88);

        return () => {
            tl.kill();
        };
    }, []);

    return (
        <div className="s1-wrapper" ref={wrapperRef}>
            {/* Sticky viewport — CSS handles pinning, zero layout thrash */}
            <div className="s1-sticky">
                {/* Images */}
                {images.map((src, i) => (
                    <div key={i} className={`s1-img s1-img--${i + 1}`}>
                        <img src={src} alt={`Season 1 moment ${i + 1}`} />
                    </div>
                ))}

                {/* Typography Wrapper (animated by GSAP) */}
                <div className="s1-text-wrap">
                    {/* Centered Glass Plate */}
                    <div className="s1-text">
                        <span className="s1-tag">SEASON 1</span>
                        <div className="s1-headings">
                            <p className="s1-h s1-h--sub">HOW'S</p>
                            <h2 className="s1-h s1-h--lg">THE</h2>
                            <h2 className="s1-h s1-h--hero">
                                <span className="s1-h__stroke">JOUR</span><span className="s1-h__red">NEY</span>
                            </h2>
                            <h2 className="s1-h s1-h--md">SO FAR<span className="s1-h__q">?</span></h2>
                        </div>
                        {/* Description — flows below headings */}
                        <p className="s1-desc">
                            AlgoStorm Season 1 at Amity University Raipur was where it all began — a spark
                            that turned into a storm. With 50+ teams and 200+ participants, the campus buzzed
                            with energy as innovators came together to build, break limits, and bring bold ideas to life.
                        </p>
                        {/* Optimised glow — single element, GPU opacity only */}
                        <div className="s1-glow" aria-hidden="true" />
                    </div>
                </div>
            </div>
        </div>
    );
}
