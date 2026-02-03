import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';

/**
 * Shareable Infographic Page for Backlinks
 * This page is designed to be linkable from other websites
 * Contains valuable data and visual content worth sharing
 */
const Infographics = () => {
  useSEO({
    title: "Craft Soda vs Regular Soda: The Complete Comparison Infographic | ZfO",
    description: "A comprehensive infographic comparing craft soda and regular soda. Learn about ingredients, sustainability, health impacts, and more. Shareable data for education.",
    keywords: ["craft soda vs regular soda", "soda comparison infographic", "glass bottle vs plastic", "sustainable beverage guide", "healthy soda alternatives"],
    ogType: "article",
    canonicalUrl: `${window.location.origin}/infographics/craft-soda-vs-regular-soda`
  });

  useEffect(() => {
    // Article schema for rich snippets
    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "Craft Soda vs Regular Soda: The Complete Comparison",
      "description": "A comprehensive infographic comparing craft soda and regular soda across multiple dimensions.",
      "author": {
        "@type": "Organization",
        "name": "ZfO"
      },
      "publisher": {
        "@type": "Organization",
        "name": "ZfO",
        "logo": {
          "@type": "ImageObject",
          "url": `${window.location.origin}/logo.png`
        }
      },
      "datePublished": "2024-01-01",
      "dateModified": new Date().toISOString().split('T')[0],
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `${window.location.origin}/infographics/craft-soda-vs-regular-soda`
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(articleSchema, null, 2);
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  const comparisonData = [
    {
      category: "Ingredients",
      craftSoda: ["Real cane sugar", "Natural fruit extracts", "Traditional spices", "No artificial flavors"],
      regularSoda: ["High fructose corn syrup", "Artificial flavors", "Chemical preservatives", "Caffeine"]
    },
    {
      category: "Packaging",
      craftSoda: ["100% recyclable glass", "Returnable bottles", "Zero microplastics", "Premium presentation"],
      regularSoda: ["Single-use plastic", "Non-recyclable caps", "Microplastic leaching", "Cheap appearance"]
    },
    {
      category: "Environmental Impact",
      craftSoda: ["Carbon neutral production", "Local sourcing", "Minimal waste", "Glass recycling"],
      regularSoda: ["High carbon footprint", "Global supply chain", "Massive plastic waste", "450-year decomposition"]
    },
    {
      category: "Health Impact",
      craftSoda: ["No artificial sweeteners", "Real ingredients", "Lower processed sugar", "Natural spices benefits"],
      regularSoda: ["Artificial sweeteners", "Processed ingredients", "High glycemic load", "Empty calories"]
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-white/50">
            <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
            <li className="text-white/30">/</li>
            <li><Link to="/fizzroom" className="hover:text-white transition-colors">Fizzroom</Link></li>
            <li className="text-white/30">/</li>
            <li className="text-white" aria-current="page">Infographics</li>
          </ol>
        </nav>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 bg-[#c41e3a] text-white font-bold tracking-[0.3em] uppercase mb-4 text-xs rounded-full">
            Shareable Content
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6" style={{ backgroundColor: '#fafafa', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Craft Soda vs Regular Soda
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            A comprehensive comparison guide. Feel free to share this infographic with proper attribution.
          </p>
        </motion.div>

        {/* Shareable Embed Code */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/5 rounded-2xl p-8 mb-16 border border-white/10"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Want to embed this on your site?</h2>
          <p className="text-white/70 mb-4">Copy the code below to share this infographic:</p>
          <div className="bg-black rounded-lg p-4 overflow-x-auto">
            <code className="text-green-400 text-sm whitespace-pre-wrap">
{`<a href="https://www.zfo.co.in/infographics/craft-soda-vs-regular-soda">
  <img src="https://www.zfo.co.in/infographic-preview.jpg" alt="Craft Soda vs Regular Soda - Complete Comparison">
</a>
<p>Source: <a href="https://www.zfo.co.in">ZfO - India's First Craft Soda</a></p>`}
            </code>
          </div>
        </motion.div>

        {/* Comparison Infographic */}
        <div className="space-y-12">
          {comparisonData.map((section, index) => (
            <motion.div
              key={section.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gradient-to-br from-white/5 to-transparent rounded-2xl overflow-hidden border border-white/10"
            >
              <h2 className="text-2xl font-bold text-[#c41e3a] px-8 py-6 bg-white/5 border-b border-white/10">
                {section.category}
              </h2>
              <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10">
                <div className="p-8">
                  <h3 className="text-xl font-bold text-[#ffcc00] mb-6 flex items-center">
                    <span className="w-3 h-3 bg-[#ffcc00] rounded-full mr-3"></span>
                    Craft Soda
                  </h3>
                  <ul className="space-y-4">
                    {section.craftSoda.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-green-400 mr-3 text-lg">✓</span>
                        <span className="text-white/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold text-white/50 mb-6 flex items-center">
                    <span className="w-3 h-3 bg-white/30 rounded-full mr-3"></span>
                    Regular Soda
                  </h3>
                  <ul className="space-y-4">
                    {section.regularSoda.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-red-400 mr-3 text-lg">✗</span>
                        <span className="text-white/60">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Statistics Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 grid md:grid-cols-4 gap-6"
        >
          {[
            { value: "450+", label: "Years for plastic to decompose", color: "#c41e3a" },
            { value: "1M+", label: "Plastic bottles used per minute", color: "#ffcc00" },
            { value: "0", label: "Artificial ingredients in ZfO", color: "#c41e3a" },
            { value: "100%", label: "Recyclable packaging", color: "#ffcc00" }
          ].map((stat, index) => (
            <div key={index} className="text-center p-6 bg-white/5 rounded-xl border border-white/10">
              <div className="text-4xl font-bold mb-2" style={{ color: stat.color }}>{stat.value}</div>
              <p className="text-white/60 text-sm">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center p-12 bg-gradient-to-br from-[#c41e3a]/20 to-[#ffcc00]/10 rounded-2xl border border-white/10"
        >
          <h2 className="text-3xl font-bold text-white mb-4">Experience the Difference</h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">
            Try ZfO craft soda and taste what real ingredients and sustainable packaging mean.
          </p>
          <Link 
            to="/#productdetails"
            className="inline-block px-8 py-4 bg-[#c41e3a] text-white font-bold tracking-wider uppercase rounded-full hover:bg-[#a01830] transition-all transform hover:scale-105"
          >
            Explore Flavors
          </Link>
        </motion.div>

        {/* Citation Info */}
        <div className="mt-12 p-6 bg-white/5 rounded-xl border border-white/10">
          <h3 className="text-lg font-bold text-white mb-3">How to Cite This Infographic</h3>
          <p className="text-white/60 text-sm mb-4">
            If you're using this content for research or reference, please cite as:
          </p>
          <div className="bg-black rounded-lg p-4">
            <p className="text-white/80 text-sm">
              ZfO. (2024). "Craft Soda vs Regular Soda: The Complete Comparison Infographic." 
              Retrieved from https://www.zfo.co.in/infographics/craft-soda-vs-regular-soda
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Infographics;
