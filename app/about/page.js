export const metadata = {
    title: 'About Us - ZfO Premium Craft Soda | Our Story',
    description: 'Learn about ZfO - founded by Harsh Katiyar to reclaim the soul of soda. Premium masala soda crafted with passion, delivered in glass bottles.',
    openGraph: {
        title: 'About ZfO - Reclaiming the Soul of Soda',
        description: 'From Delhi to your glass - the story of India\'s most uncompromising craft soda.',
    },
};

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-black text-white pt-32 pb-20">
            <div className="max-w-4xl mx-auto px-6">
                {/* Header */}
                <div className="mb-16">
                    <p className="text-gray-400 uppercase tracking-widest text-sm mb-4">Est. 2024</p>
                    <h1 className="text-5xl md:text-7xl font-black uppercase mb-6">About ZfO</h1>
                    <p className="text-2xl text-gray-300 font-light leading-relaxed">
                        Reclaiming the soul of soda, one glass bottle at a time.
                    </p>
                </div>

                {/* Story */}
                <div className="prose prose-invert prose-lg max-w-none space-y-8">
                    <section>
                        <h2 className="text-3xl font-bold mb-4 border-l-4 border-gray-300 pl-4">The Problem</h2>
                        <p className="text-gray-400 leading-relaxed">
                            Soda was never meant to be a sugar bomb in plastic. It began as a ritual — glass bottles, crown caps, and immaculate vibes. Mass production gave us the ick. Chemical-laden, plastic-wrapped, soul-less drinks that treat your body like a trash can.
                        </p>
                        <p className="text-gray-400 leading-relaxed">
                            We said: <span className="text-white font-bold">enough</span>.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold mb-4 border-l-4 border-gray-300 pl-4">The Vision</h2>
                        <p className="text-gray-400 leading-relaxed">
                            ZfO isn't just another beverage brand. It's a rebellion against the $400B soda industry that prioritizes profit over people. We treat soda as <span className="text-white italic">culinary art</span> — controlled carbonation, layered spice profiles, and artisanal quality in every bottle.
                        </p>
                        <p className="text-gray-400 leading-relaxed">
                            Our first drop reimagines India's iconic masala soda for  modern taste. Crisp citrus acidity, subtle spice warmth, and a clean finish. No syrupy heaviness, no artificial punch. Just main character energy in a glass bottle.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold mb-4 border-l-4 border-gray-300 pl-4">The Founder</h2>
                        <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                            <h3 className="text-2xl font-bold mb-2">Harsh Katiyar</h3>
                            <p className="text-gray-300 uppercase text-sm tracking-widest mb-4">Founder & CEO</p>
                            <p className="text-gray-400 leading-relaxed">
                                Harsh founded ZfO in 2024 with a simple mission: create the soda he wished existed. Frustrated by synthetic flavors and plastic waste, he spent months perfecting the recipe — testing carbonation levels, sourcing authentic spices, and selecting the perfect glass bottle.
                            </p>
                            <p className="text-gray-400 leading-relaxed mt-4">
                                Based in Delhi, Harsh brings a mix of culinary obsession and zero-compromise standards to every batch. When he's not  crafting soda, he's probably calling out corporate greenwashing on LinkedIn.
                            </p>
                            <a
                                href="https://www.linkedin.com/in/harsh-k-13a5a1340"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block mt-4 text-gray-300 hover:text-gray-200 transition"
                            >
                                Connect on LinkedIn →
                            </a>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold mb-4 border-l-4 border-gray-300 pl-4">Our Values</h2>
                        <ul className="space-y-4">
                            <li className="flex items-start space-x-4">
                                <span className="text-gray-300 text-2xl">✓</span>
                                <div>
                                    <h3 className="font-bold text-xl mb-1">Zero Artificial Ingredients</h3>
                                    <p className="text-gray-400">Real spices, real taste. If we can't pronounce it, we don't use it.</p>
                                </div>
                            </li>
                            <li className="flex items-start space-x-4">
                                <span className="text-gray-300 text-2xl">✓</span>
                                <div>
                                    <h3 className="font-bold text-xl mb-1">Glass Over Plastic</h3>
                                    <p className="text-gray-400">Premium packaging that preserves taste and protects the planet.</p>
                                </div>
                            </li>
                            <li className="flex items-start space-x-4">
                                <span className="text-gray-300 text-2xl">✓</span>
                                <div>
                                    <h3 className="font-bold text-xl mb-1">Craft Quality</h3>
                                    <p className="text-gray-400">Every batch is quality-tested. No compromises, no shortcuts.</p>
                                </div>
                            </li>
                            <li className="flex items-start space-x-4">
                                <span className="text-gray-300 text-2xl">✓</span>
                                <div>
                                    <h3 className="font-bold text-xl mb-1">Radical Honesty</h3>
                                    <p className="text-gray-400">We tell you exactly what's in the bottle. No marketing BS.</p>
                                </div>
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold mb-4 border-l-4 border-gray-300 pl-4">Join the Movement</h2>
                        <p className="text-gray-400 leading-relaxed">
                            ZfO is for people who refuse NPC energy. For those who demand better ingredients, better packaging, and better vibes. For anyone tired of drinking chemical soup from plastic bottles.
                        </p>
                        <p className="text-gray-400 leading-relaxed">
                            We're just getting started. The rebellion needs you.
                        </p>
                        <div className="mt-8 flex flex-col sm:flex-row gap-4">
                            <a
                                href="mailto:beverages@zfo.co.in"
                                className="inline-block bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-wider hover:bg-gray-200 transition text-center"
                            >
                                Get in Touch
                            </a>
                            <a
                                href="/fizzroom"
                                className="inline-block border-2 border-white text-white px-8 py-4 rounded-full font-bold uppercase tracking-wider hover:bg-white hover:text-black transition text-center"
                            >
                                Read Our Blog
                            </a>
                        </div>
                    </section>
                </div>
            </div>

            {/* Organization Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'AboutPage',
                        mainEntity: {
                            '@type': 'Organization',
                            name: 'ZfO - Freshozz Beverages',
                            foundingDate: '2024',
                            founder: {
                                '@type': 'Person',
                                name: 'Harsh Katiyar',
                                jobTitle: 'Founder & CEO',
                                sameAs: 'https://www.linkedin.com/in/harsh-k-13a5a1340',
                            },
                            description: 'Premium craft masala soda in glass bottles. Reclaiming the soul of soda with authentic ingredients and zero compromises.',
                            url: 'https://www.zfo.co.in',
                        },
                    }),
                }}
            />
        </main>
    );
}
