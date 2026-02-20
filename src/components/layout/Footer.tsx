import { Heart } from 'lucide-react';
import './Footer.css';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="stacked-container">
                <div className="stacked">
                    {/* 5 stacked layers decreasing in height/opacity */}
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="stackedItem">
                            <em>ALGOSTORM 2.O</em>
                        </div>
                    ))}
                </div>
            </div>

            {/* Minimal Bottom Bar */}
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
