import Hero from '../features/Hero';
import Season1Recap from '../features/Season1Recap';

export default function Home({ loading }: { loading: boolean }) {
    return (
        <main>
            <Hero loading={loading} />
            <Season1Recap />
        </main>
    );
}
