import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import Navbar from './components/layout/Navbar';
import Hero from './components/features/Hero';
import Season1Recap from './components/features/Season1Recap';
import Team from './components/features/Team';
import Footer from './components/layout/Footer';
import Loader from './components/ui/Loader';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const lenis = new Lenis();

    // Sync Lenis smooth scroll with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  // Hide loader after one full animation cycle
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Loader hidden={!loading} />
      <Navbar />
      <main>
        <Hero loading={loading} />
        <Season1Recap />
        <Team />
      </main>
      <Footer />
    </>
  );
}

export default App;
