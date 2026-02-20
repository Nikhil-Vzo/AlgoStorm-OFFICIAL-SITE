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

        // ── Phase 1 (0→0.05): Main Typography appears completely first ──
        tl.to(textWrap, { opacity: 1, yPercent: 0, duration: 0.05, ease: 'power2.out' }, 0);
        tl.fromTo(glow, { opacity: 0 }, { opacity: 1, duration: 0.05, ease: 'power2.inOut' }, 0);

        // ── Phase 2 (0.05→0.20): Images slide in aggressively behind the text ONLY AFTER text is visible ──
        tl.from(imgs[0], { xPercent: -200, duration: 0.08, ease: 'power3.out' }, 0.05);
        tl.from(imgs[1], { xPercent: 200, duration: 0.08, ease: 'power3.out' }, 0.08);
        tl.from(imgs[2], { xPercent: -180, yPercent: 80, duration: 0.08, ease: 'power3.out' }, 0.11);
        tl.from(imgs[3], { xPercent: 200, duration: 0.08, ease: 'power3.out' }, 0.14);
        tl.from(imgs[4], { yPercent: 200, duration: 0.08, ease: 'power3.out' }, 0.17);
        tl.from(imgs[5], { xPercent: 180, yPercent: 120, duration: 0.08, ease: 'power3.out' }, 0.20);

        // ── Phase 3 (0.24→0.28): Description appears ──
        tl.fromTo(desc, { opacity: 0, yPercent: 30 }, { opacity: 1, yPercent: 0, duration: 0.06, ease: 'power2.out' }, 0.24);

        // ── Phase 4 (0.28→1.0): Continuous gentle parallax drift for the entire remaining scroll ──
        tl.to(imgs[0], { xPercent: -20, yPercent: -15, duration: 0.72, ease: 'none' }, 0.28);
        tl.to(imgs[1], { xPercent: 20, yPercent: -12, duration: 0.72, ease: 'none' }, 0.28);
        tl.to(imgs[2], { xPercent: -25, yPercent: 12, duration: 0.72, ease: 'none' }, 0.28);
        tl.to(imgs[3], { xPercent: 25, yPercent: 15, duration: 0.72, ease: 'none' }, 0.28);
        tl.to(imgs[4], { xPercent: -15, yPercent: 25, duration: 0.72, ease: 'none' }, 0.28);
        tl.to(imgs[5], { xPercent: 20, yPercent: 20, duration: 0.72, ease: 'none' }, 0.28);

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
