export const metadata = {
    title: 'ZfO Fizzroom - Soda Culture Blog & Honest Takes',
    description: 'Read the ZfO Fizzroom: hot takes and cold truths about the Indian beverage industry, craft soda culture, ingredients, and why glass bottles matter.',
    alternates: {
        canonical: 'https://www.zfo.co.in/fizzroom',
    },
    openGraph: {
        title: 'ZfO Fizzroom - Indian Craft Soda Blog',
        description: 'Hot takes. Cold truths. Read at your own risk. The Official ZfO Beverages Blog.',
        url: 'https://www.zfo.co.in/fizzroom',
        type: 'website',
    },
};

export default function FizzroomLayout({ children }) {
    return <>{children}</>;
}
