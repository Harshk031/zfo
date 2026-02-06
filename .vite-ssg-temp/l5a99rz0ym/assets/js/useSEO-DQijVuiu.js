import { useEffect } from "react";
const useSEO = ({
  title,
  description,
  keywords = "",
  ogImage = "/logo.png",
  ogType = "website",
  canonicalUrl,
  noIndex = false,
  schema = null
}) => {
  useEffect(() => {
    if (title) {
      document.title = title.includes("ZfO") ? title : `${title} | ZfO`;
    }
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription && description) {
      metaDescription.setAttribute("content", description);
    }
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords && keywords) {
      metaKeywords.setAttribute("content", keywords);
    }
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle && title) {
      ogTitle.setAttribute("content", title);
    }
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription && description) {
      ogDescription.setAttribute("content", description);
    }
    const ogImageTag = document.querySelector('meta[property="og:image"]');
    if (ogImageTag && ogImage) {
      ogImageTag.setAttribute("content", ogImage);
    }
    const ogTypeTag = document.querySelector('meta[property="og:type"]');
    if (ogTypeTag && ogType) {
      ogTypeTag.setAttribute("content", ogType);
    }
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    if (canonicalUrl) {
      canonicalLink.setAttribute("href", canonicalUrl);
    }
    const robotsMeta = document.querySelector('meta[name="robots"]');
    if (robotsMeta) {
      robotsMeta.setAttribute("content", noIndex ? "noindex, nofollow" : "index, follow");
    }
    if (schema) {
      let schemaScript = document.querySelector("#jsonld-schema");
      if (!schemaScript) {
        schemaScript = document.createElement("script");
        schemaScript.setAttribute("id", "jsonld-schema");
        schemaScript.setAttribute("type", "application/ld+json");
        document.head.appendChild(schemaScript);
      }
      schemaScript.textContent = JSON.stringify(schema);
    }
    return () => {
      const schemaScript = document.querySelector("#jsonld-schema");
      if (schemaScript) {
        schemaScript.remove();
      }
    };
  }, [title, description, keywords, ogImage, ogType, canonicalUrl, noIndex, schema]);
};
export {
  useSEO as u
};
