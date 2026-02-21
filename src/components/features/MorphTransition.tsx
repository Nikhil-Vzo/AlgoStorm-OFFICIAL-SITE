import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import moneyRedSvg from '../../assets/images/moneyred.svg';
import './MorphTransition.css';

gsap.registerPlugin(ScrollTrigger);

interface MorphTransitionProps {
    children: React.ReactNode;
}

export default function MorphTransition({ children }: MorphTransitionProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const svgRef = useRef<HTMLImageElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        const svg = svgRef.current;
        const content = contentRef.current;

        if (!container || !svg || !content) return;

        let ctx = gsap.context(() => {
            // Pin the container for 200vh
            // pinSpacing: false allows the next section (Season1Recap) to physically scroll UP
            // underneath this pinned container while the user scrolls 200vh!
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    start: 'top top',
                    end: '+=200%',
                    pin: true,
                    pinSpacing: false,
                    scrub: 1,
                }
            });

            // SVG starts below the visible area, explicit vh ensures no 0 height bugs on load
            gsap.set(svg, { y: '120vh', scale: 1, opacity: 1 });

            // Phase 1: 0% to 50% scrub (user scrolls first 100vh)
            // SVG rises to cover the screen.
            // At this EXACT moment, Season1Recap has scrolled from 100vh down to 0, placing it perfectly behind!
            tl.to(svg, { y: '0vh', duration: 0.45, ease: 'power2.out' }, 0);

            // Phase 2: Instant switch at 50% scrub
            // We instantly hide the pinned content (WhatIsAlgoStorm) so the transparent container
            // allows the user to see Season1Recap behind the SVG
            tl.set(content, { autoAlpha: 0 }, 0.45);

            // Phase 3: 50% to 100% scrub (user scrolls next 100vh)
            // SVG simply continues scrolling UP and off-screen, revealing Season1Recap naturally
            tl.to(svg, { y: '-120vh', duration: 0.55, ease: 'power2.inOut' }, 0.45);

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={containerRef}
            className="morph-transition-container"
        >
            <div className="morph-content-wrapper" ref={contentRef}>
                {children}
            </div>

            <div className="morph-svg-wrapper">
                <img
                    ref={svgRef}
                    src={moneyRedSvg}
                    alt="Transition Reveal"
                    className="morph-svg-image"
                />
            </div>
        </div>
    );
}
