import { useEffect } from "react";

const useSEO = ({ title, description, keywords, schemaMarkup }) => {
  useEffect(() => {
    // Update title
    document.title = title ? `${title} | MallVerse E-commerce` : "MallVerse E-commerce";

    // Update meta tags
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", description || "Best e-commerce platform");
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = description || "Best e-commerce platform";
      document.head.appendChild(meta);
    }

    if (keywords) {
      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute("content", keywords);
      } else {
        const meta = document.createElement("meta");
        meta.name = "keywords";
        meta.content = keywords;
        document.head.appendChild(meta);
      }
    }

    // Update schema markup
    if (schemaMarkup) {
      let script = document.querySelector('script[type="application/ld+json"]');
      if (!script) {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.text = JSON.stringify(schemaMarkup);
    }

    return () => {
      // Cleanup on unmount if necessary, but usually leaving the last SEO is fine for SPAs
    };
  }, [title, description, keywords, schemaMarkup]);
};

export default useSEO;
