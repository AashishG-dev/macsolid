// scripts/prerender.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.resolve(__dirname, '../dist');
const BASE_URL = 'https://macsolid.pages.dev';
const LAST_MOD = '2026-11-10';

// Complete route registry matching src/App.tsx & src/routes/*
const ROUTES = [
  {
    path: '/',
    title: 'MacSolid | Autonomous CAD Part Separator & Automated BOM Engine',
    description:
      'High-performance CAD assembly part separator and automated Bill of Materials generator. Instant raw stock PCA bounding dimensions, sheet metal blank sizing, and 60 FPS GPU section views for SolidWorks, STEP, AutoCAD & NX.',
    h1: 'Autonomous CAD Part Separator & Automated Bill of Materials Engine',
    summary:
      'Instant multi-threaded Bill of Materials extraction, exact PCA raw stock calculations, sheet metal gauge detection, and ERP-ready Excel spreadsheets directly from your 3D CAD files.',
    priority: '1.0',
  },
  {
    path: '/solidworks-bom-generator',
    breadcrumbName: 'SolidWorks BOM Generator',
    title: 'SolidWorks Automated Bill of Materials Generator | MacSolid',
    description:
      'Extract SolidWorks .sldasm and .sldprt assembly hierarchies, cut-lists, and raw stock bounding dimensions to Excel without opening SolidWorks.',
    h1: 'SolidWorks Automated Bill of Materials Generator',
    summary:
      'Eliminate manual SolidWorks drawing BOM tables. Automatically extract .sldasm and .sldprt assembly hierarchies, cut-lists, and PCA raw stock bounding dimensions to Excel in under 1.4 seconds without requiring an active SolidWorks license seat.',
    priority: '0.9',
  },
  {
    path: '/autocad-bom-generator',
    breadcrumbName: 'AutoCAD Automatic BOM',
    title: 'AutoCAD Automatic BOM Generator | Replace DATAEXTRACTION | MacSolid',
    description:
      'Fast 1-click bill of materials generator for AutoCAD DWG and DXF drawing blocks and 3D solids. Exports shop-floor ready Excel workbooks.',
    h1: 'AutoCAD Automatic Bill of Materials Generator',
    summary:
      'The modern alternative to the manual AutoCAD DATAEXTRACTION wizard. Extract nested dynamic blocks, attributes, materials, and 3D solid bounding quantities to structured Excel spreadsheets with isometric thumbnails in 1 click.',
    priority: '0.9',
  },
  {
    path: '/step-bom-extractor',
    breadcrumbName: 'STEP BOM Extractor',
    title: 'STEP File BOM Extractor & 3D Raw Stock Sizing | MacSolid',
    description:
      'Multi-process ISO 10303 STEP AP203/214/242 assembly part separator. Calculates true raw stock envelopes and exports formatted Excel BOMs.',
    h1: 'STEP File BOM Extractor & Raw Stock Calculator',
    summary:
      'Parse multi-gigabyte aerospace and industrial STEP (.step, .stp) AP203, AP214, and AP242 assemblies in seconds using a multi-threaded C++ worker pool. Automatically heal degenerate B-Rep geometry and calculate PCA minimum raw stock bounding boxes.',
    priority: '0.9',
  },
  {
    path: '/sheet-metal-nesting',
    breadcrumbName: 'Sheet Metal Nesting',
    title: 'Sheet Metal Blank Sizing & Multi-Part Nesting Software | MacSolid',
    description:
      'Automatic gauge thickness detection, flat blank boundary extraction, and irregular multi-part nesting for sheet metal estimators and laser cutting shops.',
    h1: 'Sheet Metal Blank Sizing & Automated Part Nesting',
    summary:
      'Accelerate laser cutting and fabrication quoting. Automatically detect uniform sheet metal gauge thickness (0.5mm to 25mm), extract flat blank perimeter boundaries, calculate pierce counts, and nest parts by material grade onto standard sheet stock.',
    priority: '0.9',
  },
  {
    path: '/openbom-alternative',
    breadcrumbName: 'OpenBOM Alternative',
    title: 'OpenBOM Alternative: 100% On-Premises CAD BOM Extractor | MacSolid',
    description:
      'Air-gapped on-premises CAD bill of materials software. Sub-1.4s C++ execution, 60 FPS GPU cross-section inspection, zero cloud uploads.',
    h1: 'The On-Premises, Air-Gapped Alternative to OpenBOM',
    summary:
      'Replace recurring cloud SaaS subscriptions and third-party CAD uploads with 100% local workstation execution. MacSolid delivers 40x faster C++20 BOM extraction, ITAR-compliant air-gapped security, and 60 FPS GPU cross-section inspection.',
    priority: '0.8',
  },
  {
    path: '/roi-calculator',
    breadcrumbName: 'BOM ROI Calculator',
    title: 'BOM Automation ROI Calculator | Engineering Cost Savings | MacSolid',
    description:
      'Quantify the exact dollar value and engineering hours your organization saves with automated C++20 Bill of Materials extraction for SolidWorks, STEP, and AutoCAD.',
    h1: 'CAD BOM Automation ROI & Engineering Labor Savings Calculator',
    summary:
      'Calculate the monthly and annual engineering hours saved by replacing manual SolidWorks and AutoCAD BOM table drafting, ballooning, and raw stock bounding box measurements with sub-1.4 second automated extraction.',
    priority: '0.8',
  },
  {
    path: '/security',
    breadcrumbName: 'Security & Compliance',
    title: 'Air-Gapped CAD Security & ITAR Compliance | MacSolid',
    description:
      'Zero cloud egress CAD assembly viewer and BOM generator for defense and aerospace engineers. ED25519 verified, ephemeral memory processing.',
    h1: 'Air-Gapped CAD Security & ITAR Compliance Architecture',
    summary:
      'Engineered for defense, aerospace, and medical manufacturing teams. Features zero outbound network egress, ITAR (22 CFR 120-130) & EAR compliance, ED25519 cryptographic binary signing, and ephemeral in-memory B-Rep geometry processing.',
    priority: '0.8',
  },
];

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function runPrerender() {
  const indexHtmlPath = path.join(DIST_DIR, 'index.html');
  if (!fs.existsSync(indexHtmlPath)) {
    console.error('[Prerender Error] dist/index.html not found. Run `vite build` first.');
    process.exit(1);
  }

  const baseTemplate = fs.readFileSync(indexHtmlPath, 'utf-8');

  for (const route of ROUTES) {
    const fullUrl = route.path === '/' ? `${BASE_URL}/` : `${BASE_URL}${route.path}`;
    let html = baseTemplate;

    // 1. Replace <title>
    html = html.replace(
      /<title>[\s\S]*?<\/title>/i,
      `<title>${escapeHtml(route.title)}</title>`
    );

    // 2. Replace <link rel="canonical">
    html = html.replace(
      /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
      `<link rel="canonical" href="${fullUrl}" />`
    );

    // 3. Replace <meta name="description">
    html = html.replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="description" content="${escapeHtml(route.description)}" />`
    );

    // 4. Replace Open Graph & Twitter tags
    html = html.replace(
      /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i,
      `<meta property="og:url" content="${fullUrl}" />`
    );
    html = html.replace(
      /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i,
      `<meta property="og:title" content="${escapeHtml(route.title)}" />`
    );
    html = html.replace(
      /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i,
      `<meta property="og:description" content="${escapeHtml(route.description)}" />`
    );
    html = html.replace(
      /<meta\s+name="twitter:url"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="twitter:url" content="${fullUrl}" />`
    );
    html = html.replace(
      /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="twitter:title" content="${escapeHtml(route.title)}" />`
    );
    html = html.replace(
      /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="twitter:description" content="${escapeHtml(route.description)}" />`
    );

    // 5. Inject static BreadcrumbList JSON-LD schema for sub-routes
    if (route.breadcrumbName && route.path !== '/') {
      const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `${BASE_URL}/`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: route.breadcrumbName,
            item: fullUrl,
          },
        ],
      };
      const scriptTag = `\n    <script id="google-breadcrumb-schema" type="application/ld+json">${JSON.stringify(
        breadcrumbSchema
      )}</script>\n  </head>`;
      html = html.replace('</head>', scriptTag);
    }

    // 6. Inject SEO & AI Crawler Semantic HTML inside <div id="root">
    const internalLinksHtml = ROUTES.map(
      (r) => `<li><a href="${r.path}">${escapeHtml(r.title.split(' | ')[0])}</a></li>`
    ).join('\n            ');

    const seoFallbackDom = `<div id="root">
      <main style="max-width:960px;margin:0 auto;padding:48px 24px;font-family:sans-serif;color:#151514;">
        <header>
          <p style="font-family:monospace;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;">MacSolid Systems — Swiss Precision CAD Engineering</p>
          <h1>${escapeHtml(route.h1)}</h1>
          <p>${escapeHtml(route.summary)}</p>
        </header>
        <section>
          <h2>Core CAD &amp; BOM Capabilities</h2>
          <ul>
            <li>Multi-threaded C++20 STEP (AP203, AP214, AP242), IGES, SolidWorks (.sldasm, .sldprt), and AutoCAD (DWG/DXF) parsing in under 1.4 seconds.</li>
            <li>Deterministic Principal Component Analysis (PCA) raw stock bounding envelope calculation for Round Bar, Rectangular Billet Block, Plate Stock, and Sheet Metal.</li>
            <li>Real-time 60 FPS GPU axis-aligned cross-section views with solid surface capping.</li>
            <li>100% air-gapped, on-premises Windows x64 execution with ED25519 cryptographic verification and zero cloud telemetry.</li>
          </ul>
        </section>
        <nav aria-label="MacSolid Solutions Directory">
          <h2>Explore MacSolid Modules</h2>
          <ul>
            ${internalLinksHtml}
          </ul>
        </nav>
      </main>
    </div>`;

    html = html.replace(/<div id="root">[\s\S]*?<\/div>/i, seoFallbackDom);

    // 7. Write route HTML file to dist
    if (route.path === '/') {
      fs.writeFileSync(indexHtmlPath, html, 'utf-8');
      console.log(`[Prerender] Generated: dist/index.html`);
    } else {
      const routeDir = path.join(DIST_DIR, route.path.replace(/^\//, ''));
      fs.mkdirSync(routeDir, { recursive: true });
      const routeFile = path.join(routeDir, 'index.html');
      fs.writeFileSync(routeFile, html, 'utf-8');
      console.log(`[Prerender] Generated: dist${route.path}/index.html`);
    }
  }

  // 8. Automatically generate dist/sitemap.xml with all routes
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ROUTES.map((r) => {
  const loc = r.path === '/' ? `${BASE_URL}/` : `${BASE_URL}${r.path}`;
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${LAST_MOD}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${r.priority}</priority>
  </url>`;
}).join('\n')}
</urlset>
`;
  fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), sitemapXml, 'utf-8');
  console.log(`[Prerender] Generated: dist/sitemap.xml (${ROUTES.length} URLs)`);

  // 9. Ensure dist/robots.txt exists
  const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${BASE_URL}/sitemap.xml
`;
  fs.writeFileSync(path.join(DIST_DIR, 'robots.txt'), robotsTxt, 'utf-8');
  console.log(`[Prerender] Generated: dist/robots.txt`);
}

runPrerender();
