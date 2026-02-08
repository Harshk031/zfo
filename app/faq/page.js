import { notFound } from 'next/navigation';
import { fizzPosts } from '@/data/fizzroomData';

export const metadata = {
    title: 'FAQ - Frequently Asked Questions | ZfO',
    description: 'Common questions about ZfO premium masala soda, ingredients, ordering, and sustainability.',
    openGraph: {
        title: 'FAQ - ZfO Premium Masala Soda',
        description: 'Everything you need to know about ZfO craft soda',
    },
};

const faqs = [
    {
        question: 'What is ZfO?',
        answer: 'ZfO is India\'s premium craft masala soda, served in elegant glass bottles. We reimagine traditional masala soda with balanced fizz, authentic spices, and zero artificial ingredients.',
    },
    {
        question: 'What makes ZfO different from regular sodas?',
        answer: 'ZfO is crafted like a culinary product, not mass-produced. We use real spices, controlled carbonation, glass bottles for purity, and absolutely no artificial flavors or colors. Every batch is quality-tested.',
    },
    {
        question: 'What ingredients are in ZfO masala soda?',
        answer: 'ZfO contains carbonated water, natural spices (cumin, black salt, chaat masala), citrus extracts, and cane sugar. Zero artificial ingredients, zero preservatives, zero ick.',
    },
    {
        question: 'Where can I buy ZfO?',
        answer: 'ZfO is currently in pre-launch phase. Sign up on our homepage to be notified when we go live. We\'ll be available at select premium retailers, cafes, and online.',
    },
    {
        question: 'Why glass bottles?',
        answer: 'Glass preserves the authentic taste without leaching chemicals. It\'s sustainable, endlessly recyclable, and gives you that premium experience. Plastic is a red flag - we don\'t do that here.',
    },
    {
        question: 'Is ZfO healthier than regular soda?',
        answer: 'ZfO has significantly less sugar than commercial sodas, uses natural ingredients, and contains real spices with potential health benefits. However, it\'s still a treat - enjoy mindfully!',
    },
    {
        question: 'How long does ZfO stay fresh?',
        answer: 'Unopened ZfO bottles stay fresh for 6 months. Once opened, consume within 24-48 hours for best taste and carbonation. Always refrigerate after opening.',
    },
    {
        question: 'Is ZfO suitable for vegans/vegetarians?',
        answer: 'Absolutely! ZfO is 100% vegetarian and vegan-friendly. We use only plant-based ingredients and natural spices.',
    },
    {
        question: 'Can I order ZfO in bulk for events?',
        answer: 'Yes! We offer bulk orders for weddings, corporate events, and parties. Contact us at beverages@zfo.co.in for bulk pricing and availability.',
    },
    {
        question: 'How should I serve ZfO?',
        answer: 'Serve chilled (4-6°C) for best taste. Pairs perfectly with spicy street food, Indian cuisine, or just solo vibing. Add a lime wedge for extra zing!',
    },
];

export default function FAQPage() {
    return (
        <main className="min-h-screen bg-black text-white pt-32 pb-20">
            <div className="max-w-4xl mx-auto px-6">
                {/* Header */}
                <div className="mb-16 text-center">
                    <p className="text-gray-400 uppercase tracking-widest text-sm mb-4">Questions?</p>
                    <h1 className="text-5xl md:text-7xl font-black uppercase mb-6">FAQ</h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Everything you need to know about ZfO premium craft soda.
                    </p>
                </div>

                {/* FAQ List */}
                <div className="space-y-8">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="border-l-2 border-gray-300 pl-6 py-4"
                        >
                            <h2 className="text-2xl font-bold mb-3">{faq.question}</h2>
                            <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                        </div>
                    ))}
                </div>

                {/* Contact CTA */}
                <div className="mt-20 text-center border-t border-white/10 pt-12">
                    <h3 className="text-3xl font-bold mb-4">Still have questions?</h3>
                    <p className="text-gray-400 mb-6">We're here to help!</p>
                    <a
                        href="mailto:beverages@zfo.co.in"
                        className="inline-block bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-wider hover:bg-gray-200 transition"
                    >
                        Contact Us
                    </a>
                </div>
            </div>

            {/* FAQ Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'FAQPage',
                        mainEntity: faqs.map((faq) => ({
                            '@type': 'Question',
                            name: faq.question,
                            acceptedAnswer: {
                                '@type': 'Answer',
                                text: faq.answer,
                            },
                        })),
                    }),
                }}
            />
        </main>
    );
}
