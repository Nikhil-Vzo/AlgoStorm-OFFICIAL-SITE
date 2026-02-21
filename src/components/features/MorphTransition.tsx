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
            // Starts tilted backwards and slightly scaled up, fully opaque
            gsap.set(svg, { y: '120vh', scale: 1.2, rotationX: -40, opacity: 1, force3D: true });

            // Phase 1: 0% to 50% scrub (user scrolls first 100vh)
            // SVG rises to cover the screen, straightening out and snapping into normal form
            // At this EXACT moment, Season1Recap has scrolled from 100vh down to 0, placing it perfectly behind!
            tl.to(svg, { y: '0vh', scale: 1, rotationX: 0, opacity: 1, duration: 0.45, ease: 'power2.out', force3D: true }, 0);

            // Phase 2: Instant switch at 50% scrub
            // We instantly hide the pinned content (WhatIsAlgoStorm) so the transparent container
            // allows the user to see Season1Recap behind the SVG
            tl.set(content, { autoAlpha: 0 }, 0.45);

            // Phase 3: 50% to 100% scrub (user scrolls next 100vh)
            // SVG continues scrolling UP while zooming out intensely and tilting forward into the screen
            const isMobile = window.innerWidth < 768;
            const endScale = isMobile ? 1.3 : 1.8;
            const endRotationX = isMobile ? 15 : 45;

            tl.to(svg, { y: '-120vh', scale: endScale, rotationX: endRotationX, duration: 0.55, ease: 'power2.inOut', force3D: true }, 0.45);

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div className="morph-transition-react-wrapper">
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
        </div>
    );
}
