import { useEffect, useState } from 'react';
import Navbar from './components/layout/Navbar';
import Hero from './components/features/Hero';
import Team from './components/features/Team';
import Footer from './components/layout/Footer';
import Loader from './components/ui/Loader';
import Lenis from 'lenis';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
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
        <Team />
      </main>
      <Footer />
    </>
  );
}

export default App;
