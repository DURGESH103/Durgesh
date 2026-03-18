import { useEffect } from 'react';

const SITE = {
  name:     'Durgesh Kumar',
  role:     'Full Stack MERN Developer',
  url:      'https://durgeshkumar.dev',
  twitter:  '@durgeshkumar',
  locale:   'en_IN',
  image:    'https://durgeshkumar.dev/og-image.png', // replace with your actual OG image URL
};

const SEO = ({
  title,
  description = 'Full Stack MERN Developer from India — building fast, scalable, and beautiful web applications with React, Node.js, MongoDB, and modern technologies.',
  keywords    = 'Durgesh Kumar, Full Stack Developer, MERN Developer, React Developer, Node.js, MongoDB, Web Development, India',
  image       = SITE.image,
  url,
  type        = 'website',
  noIndex     = false,
  structuredData,
}) => {

  // Build the final title
  const pageTitle = title
    ? `${title} | ${SITE.name} — ${SITE.role}`
    : `${SITE.name} — ${SITE.role} | Portfolio`;

  const canonical = url ? `${SITE.url}${url}` : SITE.url;

  useEffect(() => {
    // ── Document title ──────────────────────────────────────
    document.title = pageTitle;

    // ── Helper: upsert a <meta> tag ─────────────────────────
    const setMeta = (selector, attr, value) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        const [attrName, attrVal] = selector.replace('meta[', '').replace(']', '').split('="');
        el.setAttribute(attrName, attrVal.replace('"', ''));
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    };

    // ── Helper: upsert a <link> tag ─────────────────────────
    const setLink = (rel, href) => {
      let el = document.querySelector(`link[rel="${rel}"]`);
      if (!el) { el = document.createElement('link'); el.rel = rel; document.head.appendChild(el); }
      el.href = href;
    };

    // ── Helper: upsert a <script type="application/ld+json"> ─
    const setJsonLd = (data) => {
      let el = document.querySelector('script[type="application/ld+json"]');
      if (!el) { el = document.createElement('script'); el.type = 'application/ld+json'; document.head.appendChild(el); }
      el.textContent = JSON.stringify(data);
    };

    // ── Standard meta ───────────────────────────────────────
    setMeta('meta[name="description"]',          'content', description);
    setMeta('meta[name="keywords"]',             'content', keywords);
    setMeta('meta[name="author"]',               'content', SITE.name);
    setMeta('meta[name="robots"]',               'content', noIndex ? 'noindex,nofollow' : 'index,follow');
    setMeta('meta[name="theme-color"]',          'content', '#C6A972');

    // ── Canonical ───────────────────────────────────────────
    setLink('canonical', canonical);

    // ── Open Graph ──────────────────────────────────────────
    setMeta('meta[property="og:title"]',         'content', pageTitle);
    setMeta('meta[property="og:description"]',   'content', description);
    setMeta('meta[property="og:image"]',         'content', image);
    setMeta('meta[property="og:url"]',           'content', canonical);
    setMeta('meta[property="og:type"]',          'content', type);
    setMeta('meta[property="og:site_name"]',     'content', SITE.name);
    setMeta('meta[property="og:locale"]',        'content', SITE.locale);

    // ── Twitter Card ────────────────────────────────────────
    setMeta('meta[name="twitter:card"]',         'content', 'summary_large_image');
    setMeta('meta[name="twitter:site"]',         'content', SITE.twitter);
    setMeta('meta[name="twitter:creator"]',      'content', SITE.twitter);
    setMeta('meta[name="twitter:title"]',        'content', pageTitle);
    setMeta('meta[name="twitter:description"]',  'content', description);
    setMeta('meta[name="twitter:image"]',        'content', image);

    // ── Structured Data (JSON-LD) ────────────────────────────
    const defaultSchema = {
      '@context': 'https://schema.org',
      '@type':    'Person',
      name:       SITE.name,
      url:        SITE.url,
      jobTitle:   SITE.role,
      description,
      image:      SITE.image,
      sameAs: [
        'https://github.com/DURGESH103',
        'https://linkedin.com/in/durgeshkumar',
        'https://twitter.com/durgeshkumar',
      ],
    };
    setJsonLd(structuredData || defaultSchema);

  }, [pageTitle, description, keywords, image, canonical, type, noIndex, structuredData]);

  return null;
};

export default SEO;
