import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';

const faqData = [
  {
    question: "What makes ZfO craft soda different from regular sodas?",
    answer: "ZfO is India's first true craft soda brand. Unlike mass-produced sodas that use high fructose corn syrup, artificial flavors, and chemical preservatives, ZfO uses real ingredients: natural cane sugar, real fruit extracts, and traditional Indian spices. Our glass bottles preserve the authentic taste while being 100% recyclable and sustainable.",
    category: "Products"
  },
  {
    question: "Why does ZfO use glass bottles instead of plastic?",
    answer: "Glass is the only truly sustainable packaging for beverages. Unlike plastic, glass is infinitely recyclable without losing quality. Plastic bottles shed microplastics and take 450+ years to decompose. Our glass bottles keep your soda fresh and pure while being environmentally responsible. Plus, glass doesn't leach harmful chemicals into your drink.",
    category: "Sustainability"
  },
  {
    question: "Is ZfO soda healthy?",
    answer: "ZfO sodas are crafted with real ingredients and natural cane sugar, avoiding high fructose corn syrup and artificial sweeteners. While soda should be consumed in moderation, ZfO offers a cleaner alternative to conventional sodas. Our products contain real fruit extracts and traditional Indian spices that have been used for their health benefits for centuries.",
    category: "Health"
  },
  {
    question: "Where can I buy ZfO craft soda?",
    answer: "You can order ZfO directly through our website for home delivery. We also partner with premium restaurants, bars, and specialty stores across major cities. Check our store locator or contact us for availability in your area. We're constantly expanding our distribution network.",
    category: "Products"
  },
  {
    question: "What flavors does ZfO offer?",
    answer: "ZfO offers a range of craft sodas inspired by Indian flavors. Our core lineup includes Masala Soda (the classic Indian favorite), Nimbu Fresh (lemon), and Colada (tropical). We also release seasonal limited editions inspired by regional Indian flavors. Each soda is crafted with real ingredients and traditional spices.",
    category: "Products"
  },
  {
    question: "Does ZfO contain caffeine?",
    answer: "No, ZfO craft sodas are caffeine-free. We believe in providing a refreshing beverage option without the jitters or crash associated with caffeinated drinks. Our sodas get their great taste from natural ingredients and spices, not caffeine or artificial stimulants.",
    category: "Health"
  },
  {
    question: "How is ZfO's Masala Soda different from others?",
    answer: "Our Masala Soda is crafted using a traditional recipe with real spices like cumin, black salt, and mint. Unlike mass-produced versions that use artificial flavorings, ZfO Masala Soda uses actual spice infusions. The result is a complex, authentic flavor that reminds you of the masala sodas from local joints across India, but in a premium, consistent quality.",
    category: "Products"
  },
  {
    question: "Is ZfO packaging truly eco-friendly?",
    answer: "Yes, 100%. Our glass bottles are returnable and reusable, significantly reducing waste. The caps are made from recyclable metal. Our labels use recycled paper and vegetable-based inks. We've removed all plastic from our packaging. When you choose ZfO, you're supporting a circular economy and reducing your environmental footprint.",
    category: "Sustainability"
  },
  {
    question: "Can I use ZfO for cocktails and mocktails?",
    answer: "Absolutely! ZfO craft sodas make excellent mixers for cocktails and mocktails. Our Masala Soda pairs beautifully with whiskey and gin, while our fruit flavors work great in non-alcoholic mocktails. Many bartenders prefer ZfO for its complex flavors that elevate any drink. Check our blog for recipes!",
    category: "Products"
  },
  {
    question: "Does ZfO ship internationally?",
    answer: "Currently, ZfO ships within India. We're working on international distribution and hope to make our craft sodas available globally soon. Sign up for our newsletter to be notified when we launch in your region. For international orders, we recommend checking with local specialty stores that import premium Indian products.",
    category: "Shipping"
  },
  {
    question: "What is ZfO's return policy?",
    answer: "We want you to love ZfO. If you're not satisfied with your order for any reason, contact us within 7 days of delivery. We'll arrange a replacement or refund. For damaged products, please share photos and we'll replace them immediately. Your satisfaction is our priority.",
    category: "Shipping"
  },
  {
    question: "Are ZfO products vegan and gluten-free?",
    answer: "Yes, all ZfO craft sodas are 100% vegan and gluten-free. We use no animal products or byproducts in our ingredients or processing. Our sodas are also free from dairy, eggs, and other common allergens. They're safe for vegans, those with gluten sensitivities, and anyone looking for cleaner beverage options.",
    category: "Health"
  }
];

const FAQ = () => {
  // SEO configuration for FAQ page
  useSEO({
    title: "Frequently Asked Questions | ZfO - India's First Craft Soda",
    description: "Learn about ZfO craft soda, our sustainable glass bottles, ingredients, flavors, and more. Frequently asked questions about India's premium craft soda brand.",
    keywords: ["ZfO FAQ", "craft soda questions", "glass bottle soda", "masala soda India", "sustainable beverages"],
    ogType: "website",
    canonicalUrl: `${window.location.origin}/faq`
  });

  // Generate FAQ Schema markup for rich snippets
  useEffect(() => {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqData.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(faqSchema, null, 2);
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-white/50">
            <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
            <li className="text-white/30">/</li>
            <li className="text-white" aria-current="page">FAQ</li>
          </ol>
        </nav>

        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <span className="inline-block px-4 py-1 bg-[#c41e3a] text-white font-bold tracking-[0.3em] uppercase mb-4 text-xs rounded-full">
            Got Questions?
          </span>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6" style={{ backgroundColor: '#fafafa', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-white/70 max-w-2xl">
            Everything you need to know about ZfO craft soda, our ingredients, sustainability practices, and more.
          </p>
        </motion.div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {['Products', 'Sustainability', 'Health', 'Shipping'].map((category) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="border border-white/10 rounded-2xl overflow-hidden"
            >
              <h2 className="bg-white/5 px-6 py-4 text-lg font-semibold text-[#c41e3a] uppercase tracking-wider">
                {category}
              </h2>
              <div className="divide-y divide-white/10">
                {faqData.filter(faq => faq.category === category).map((faq, index) => (
                  <details key={index} className="group">
                    <summary className="flex items-center justify-between cursor-pointer px-6 py-5 hover:bg-white/5 transition-colors">
                      <span className="font-medium text-lg pr-4">{faq.question}</span>
                      <svg className="w-5 h-5 text-white/50 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="px-6 pb-5 text-white/70 leading-relaxed">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center p-12 bg-gradient-to-br from-[#c41e3a]/20 to-[#ffcc00]/10 rounded-2xl border border-white/10"
        >
          <h2 className="text-3xl font-bold text-white mb-4">Still have questions?</h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">
            Can't find the answer you're looking for? Please reach out to our team and we'll get back to you as soon as possible.
          </p>
          <Link 
            to="/contact"
            className="inline-block px-8 py-4 bg-[#c41e3a] text-white font-bold tracking-wider uppercase rounded-full hover:bg-[#a01830] transition-all transform hover:scale-105"
          >
            Contact Us
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQ;
