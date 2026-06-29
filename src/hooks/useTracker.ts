import { useEffect } from "react";
import { traffic } from "../lib/db";

const SEO_CONFIG: Record<string, { title: string; description: string }> = {
  home: {
    title: "Sign World Prints | Premium Signage & Printing Solutions in Bangalore",
    description: "Sign World Prints is South India's premier signage and large format printing company. Offering custom LED signages, storefront ACP, vehicle wraps, and banners."
  },
  services: {
    title: "Bespoke Printing & Custom Signage Services | Sign World",
    description: "Explore our comprehensive range of signage and printing capabilities: LED boards, neon signage, ACP panels, vehicle wrap advertising, business cards, and flex prints."
  },
  portfolio: {
    title: "Our Signage Portfolio & Real Installation Gallery | Sign World",
    description: "Browse through our masterfully crafted corporate case studies, real-world installation photos, and client design proposals across South India."
  },
  about: {
    title: "About Sign World Prints | 35+ Years of Signage Excellence",
    description: "Learn about the legacy of Sign World, leading South India's signage industry for over three decades with international standards and operations in Bangalore, Chennai, and Hyderabad."
  },
  contact: {
    title: "Request a Quote & Contact Our Signage Experts | Sign World",
    description: "Get in touch with Sign World for custom signs, banners, and printing quotes in Bangalore. Chat with us on WhatsApp or fill our bespoke quote form."
  }
};

/**
 * Call at the top of each public page to record a page view in Supabase and update SEO metadata.
 * Example: useTracker("home")
 */
export function useTracker(page: string) {
  useEffect(() => {
    // Record page view
    traffic.recordView(page);

    // Update SEO title & description dynamically
    const config = SEO_CONFIG[page];
    if (config) {
      document.title = config.title;
      
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute("content", config.description);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);
}
