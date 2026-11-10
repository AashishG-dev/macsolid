import { useEffect } from 'react';

interface PageSEOProps {
  title: string;
  description: string;
  path: string;
  breadcrumbName?: string;
}

export function usePageSEO({ title, description, path, breadcrumbName }: PageSEOProps) {
  useEffect(() => {
    const fullUrl = `https://macsolid.pages.dev${path.startsWith('/') ? path : '/' + path}`;

    // 1. Update Document Title
    document.title = title;

    // 2. Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // 3. Update Canonical Link (Google Search Central: Consolidate Duplicate URLs)
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', fullUrl);

    // 4. Update Open Graph Tags
    const updateOrCreateMeta = (property: string, content: string) => {
      let el = document.querySelector(`meta[property="${property}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('property', property);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    updateOrCreateMeta('og:title', title);
    updateOrCreateMeta('og:description', description);
    updateOrCreateMeta('og:url', fullUrl);

    // 5. Inject BreadcrumbList JSON-LD Schema (Google Search Central: Breadcrumb Structured Data)
    if (breadcrumbName && path !== '/') {
      const scriptId = 'google-breadcrumb-schema';
      let breadcrumbScript = document.getElementById(scriptId);
      if (!breadcrumbScript) {
        breadcrumbScript = document.createElement('script');
        breadcrumbScript.id = scriptId;
        breadcrumbScript.setAttribute('type', 'application/ld+json');
        document.head.appendChild(breadcrumbScript);
      }

      const breadcrumbData = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Home',
            'item': 'https://macsolid.pages.dev/',
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': breadcrumbName,
            'item': fullUrl,
          },
        ],
      };

      breadcrumbScript.textContent = JSON.stringify(breadcrumbData);
    }

    // Scroll to top on route change
    window.scrollTo(0, 0);

    return () => {
      // Clean up breadcrumb script on route unmount
      const el = document.getElementById('google-breadcrumb-schema');
      if (el) el.remove();
    };
  }, [title, description, path, breadcrumbName]);
}
