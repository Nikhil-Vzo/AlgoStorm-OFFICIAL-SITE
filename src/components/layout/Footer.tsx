import { Heart, Instagram, Github, Linkedin, Mail, MapPin, Calendar } from 'lucide-react';
import './Footer.css';

const socials = [
    { icon: Instagram, href: 'https://instagram.com/', label: 'Instagram' },
    { icon: Github, href: 'https://github.com/', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/company/', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:', label: 'Email' },
];

export default function Footer() {
    return (
        <footer className="footer">
            {/* Glowing separator */}
            <div className="footer__glow-line" />

            <div className="footer__inner">
                {/* Left — Brand */}
                <div className="footer__brand">
                    <div className="footer__logo">
                        <span className="footer__logo-icon">🎭</span>
                        <span className="footer__logo-text">
                            ALGO<span className="footer__logo-accent">STORM</span>
                            <span className="footer__logo-version">2.0</span>
                        </span>
                    </div>
                    <p className="footer__tagline">
                        The biggest heist in tech history.
                        <br />
                        <span className="footer__tagline-sub">Code. Compete. Conquer.</span>
                    </p>

                    {/* Event Info Pills */}
                    <div className="footer__info-pills">
                        <div className="footer__pill">
                            <Calendar size={14} />
                            <span>Coming Soon 2026</span>
                        </div>
                        <div className="footer__pill">
                            <MapPin size={14} />
                            <span>Venue TBA</span>
                        </div>
                    </div>
                </div>

                {/* Center — Bella Ciao */}
                <div className="footer__center">
                    <div className="footer__bella-ciao">
                        <div className="footer__bella-text">BELLA CIAO</div>
                        <div className="footer__bella-sub">La Resistencia</div>
                    </div>
                </div>

                {/* Right — Socials */}
                <div className="footer__socials-section">
                    <h4 className="footer__socials-title">Join The Heist</h4>
                    <div className="footer__socials">
                        {socials.map(({ icon: Icon, href, label }) => (
                            <a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="footer__social-link"
                                aria-label={label}
                            >
                                <Icon size={20} />
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="footer__bottom">
                <p className="footer__copy">
                    © 2026 AlgoStorm. Crafted with <Heart size={12} className="footer__heart" /> by La Resistencia.
                </p>
                <p className="footer__code">
                    <span className="footer__code-hash">#</span>AlgoStorm2026
                </p>
            </div>
        </footer>
    );
}
