import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
const Breadcrumb = ({ items = [] }) => {
  const location = useLocation();
  const breadcrumbs = items.length > 0 ? items : generateBreadcrumbs(location.pathname);
  useEffect(() => {
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
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(breadcrumbSchema, null, 2);
    document.head.appendChild(script);
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [breadcrumbs]);
  if (breadcrumbs.length <= 1) return null;
  return /* @__PURE__ */ jsx(
    "nav",
    {
      className: "breadcrumb-nav mb-6 text-sm",
      "aria-label": "Breadcrumb",
      itemScope: true,
      itemType: "https://schema.org/BreadcrumbList",
      children: /* @__PURE__ */ jsx("ol", { className: "flex items-center flex-wrap gap-2", children: breadcrumbs.map((item, index) => {
        const isLast = index === breadcrumbs.length - 1;
        return /* @__PURE__ */ jsxs(
          "li",
          {
            className: "flex items-center",
            itemProp: "itemListElement",
            itemScope: true,
            itemType: "https://schema.org/ListItem",
            children: [
              !isLast ? /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx(
                  Link,
                  {
                    to: item.url,
                    itemProp: "item",
                    className: "text-white/50 hover:text-white transition-colors duration-200",
                    children: /* @__PURE__ */ jsx("span", { itemProp: "name", children: item.label })
                  }
                ),
                /* @__PURE__ */ jsx("span", { className: "mx-2 text-white/30", "aria-hidden": "true", children: "/" })
              ] }) : /* @__PURE__ */ jsx(
                "span",
                {
                  itemProp: "item",
                  className: "text-white",
                  "aria-current": "page",
                  children: /* @__PURE__ */ jsx("span", { itemProp: "name", className: "text-white/80", children: item.label })
                }
              ),
              /* @__PURE__ */ jsx("meta", { itemProp: "position", content: String(index + 1) })
            ]
          },
          index
        );
      }) })
    }
  );
};
const generateBreadcrumbs = (pathname) => {
  const paths = pathname.split("/").filter(Boolean);
  const breadcrumbs = [
    { label: "Home", url: window.location.origin }
  ];
  let currentPath = "";
  paths.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const label = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");
    breadcrumbs.push({
      label,
      url: `${window.location.origin}${currentPath}`
    });
  });
  return breadcrumbs;
};
({
  D: {
    icon: /* @__PURE__ */ jsx(Fire, { className: "w-5 h-5" })
  }
});
export {
  Breadcrumb as B
};
