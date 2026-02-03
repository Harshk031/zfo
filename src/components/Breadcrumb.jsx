import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

/**
 * Breadcrumb navigation component with JSON-LD structured data for SEO
 * Supports up to 4 levels of breadcrumb hierarchy
 */
const Breadcrumb = ({ items = [] }) => {
  const location = useLocation();

  // Auto-generate breadcrumbs from current path if no items provided
  const breadcrumbs = items.length > 0 ? items : generateBreadcrumbs(location.pathname);

  useEffect(() => {
    // Generate BreadcrumbList schema markup
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.label,
        "item": item.url
      }))
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(breadcrumbSchema, null, 2);
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [breadcrumbs]);

  if (breadcrumbs.length <= 1) return null;

  return (
    <nav 
      className="breadcrumb-nav mb-6 text-sm" 
      aria-label="Breadcrumb"
      itemScope
      itemType="https://schema.org/BreadcrumbList"
    >
      <ol className="flex items-center flex-wrap gap-2">
        {breadcrumbs.map((item, index) => {
          const isLast = index === breadcrumbs.length - 1;
          
          return (
            <li 
              key={index}
              className="flex items-center"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              {!isLast ? (
                <>
                  <Link 
                    to={item.url}
                    itemProp="item"
                    className="text-white/50 hover:text-white transition-colors duration-200"
                  >
                    <span itemProp="name">{item.label}</span>
                  </Link>
                  <span className="mx-2 text-white/30" aria-hidden="true">/</span>
                </>
              ) : (
                <span 
                  itemProp="item"
                  className="text-white"
                  aria-current="page"
                >
                  <span itemProp="name" className="text-white/80">{item.label}</span>
                </span>
              )}
              <meta itemProp="position" content={String(index + 1)} />
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

// Helper function to generate breadcrumbs from URL path
const generateBreadcrumbs = (pathname) => {
  const paths = pathname.split('/').filter(Boolean);
  const breadcrumbs = [
    { label: 'Home', url: window.location.origin }
  ];

  let currentPath = '';
  
  paths.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const label = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
    breadcrumbs.push({
      label: label,
      url: `${window.location.origin}${currentPath}`
    });
  });

  return breadcrumbs;
};

export default Breadcrumb;
