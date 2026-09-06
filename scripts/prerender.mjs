import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createServer } from 'vite';
import React from 'react';
import { renderToString } from 'react-dom/server';

const template = await readFile('dist/index.html', 'utf8');
const server = await createServer({ server: { middlewareMode: true, hmr: false }, appType: 'custom' });
try {
  const { App } = await server.ssrLoadModule('/src/App.tsx');
  const { playerData: p } = await server.ssrLoadModule('/src/data/playerData.ts');
  const { filmChapterPath } = await server.ssrLoadModule('/src/lib/filmChapters.ts');
  const origin = p.siteUrl;
  const originalGraph = JSON.parse(template.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
  const video = originalGraph['@graph'].find(node => node['@type'] === 'VideoObject');
  video['@id'] = `${origin}/recruiting-film#video`;
  video.url = `${origin}/recruiting-film`;
  video.mainEntityOfPage = `${origin}/recruiting-film`;
  video.description = 'James Shoukry, Class of 2028 third baseman at IMG Academy. Game at-bats, showcase hitting, third-base defense and a running finish.';
  video.uploadDate = p.featuredVideo.publishedDate;
  video.duration = `PT${p.featuredVideo.durationSeconds}S`;
  video.name = p.featuredVideo.title;
  video.thumbnailUrl = `${origin}${p.featuredVideo.thumbnailSrc}`;
  video.contentUrl = `${origin}${p.featuredVideo.videoSrc}`;
  video.hasPart = p.featuredVideo.chapters.map((chapter, index, chapters) => ({
    '@type': 'Clip',
    name: chapter.label,
    startOffset: chapter.time,
    endOffset: chapters[index + 1]?.time ?? p.featuredVideo.durationSeconds,
    url: `${origin}${filmChapterPath(chapter.time)}`,
  }));
  const routes = [
    { path: '', page: 'profile', title: 'James Shoukry | 2028 3B | IMG Academy Baseball Recruit', description: 'James Shoukry, Class of 2028 third baseman at IMG Academy in Bradenton, Florida. Watch recruiting film, view dated measurements, and contact James.', graph: { ...originalGraph, '@graph': originalGraph['@graph'].filter(n => n['@type'] !== 'VideoObject') } },
    { path: '/recruiting-film', page: 'film', title: 'James Shoukry Recruiting Film | 2028 3B | IMG Academy', description: video.description, graph: originalGraph },
    { path: '/privacy', page: 'privacy', title: 'Privacy and Analytics | James Shoukry', description: 'How this recruiting website uses optional analytics and how to change your choices.', graph: { '@context': 'https://schema.org', '@type': 'WebPage', name: 'Privacy and Analytics', url: `${origin}/privacy` } },
  ];
  for (const route of routes) {
    let html = template.replace('<div id="root"></div>', `<div id="root">${renderToString(React.createElement(App, { page: route.page }))}</div>`);
    if (html.includes('<div id="root"></div>')) throw new Error(`No pre-rendered content for ${route.path || '/'}`);
    html = html.replace(/<title>[^<]*<\/title>/, `<title>${route.title}</title>`)
      .replace(/(<meta name="description" content=")[^"]*("\s*\/?>)/, `$1${route.description}$2`)
      .replace(/(<link rel="canonical" href=")[^"]*("\s*\/?>)/, `$1${origin}${route.path || '/'}$2`)
      .replace(/(<meta property="og:url" content=")[^"]*("\s*\/?>)/, `$1${origin}${route.path || '/'}$2`)
      .replace(/(<meta property="og:type" content=")[^"]*("\s*\/?>)/, `$1${route.page === 'film' ? 'video.other' : route.page === 'profile' ? 'profile' : 'website'}$2`)
      .replace(/(<meta (?:property="og:title"|name="twitter:title") content=")[^"]*("\s*\/?>)/g, `$1${route.title}$2`)
      .replace(/(<meta (?:property="og:description"|name="twitter:description") content=")[^"]*("\s*\/?>)/g, `$1${route.description}$2`)
      .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, `<script type="application/ld+json">${JSON.stringify(route.graph).replace(/</g, '\\u003c')}</script>`);
    const directory = `dist${route.path}`;
    await mkdir(directory, { recursive: true });
    await writeFile(`${directory}/index.html`, html);
    console.log(`Pre-rendered ${route.path || '/'}`);
  }
} finally { await server.close(); }
