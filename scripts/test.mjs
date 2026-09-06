import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createServer } from 'vite';

const server = await createServer({ server: { middlewareMode: true, hmr: false }, appType: 'custom' });
try {
  const { filmStartTime } = await server.ssrLoadModule('/src/lib/filmChapters.ts');
  assert.equal(filmStartTime('?t=36.22', 74.8), 36.22);
  assert.equal(filmStartTime('?utm_source=email&t=0', 74.8), 0);
  for (const query of ['', '?t=', '?t=-1', '?t=NaN', '?t=Infinity', '?t=75', '?t=74.8', '?t=1e2']) {
    assert.equal(filmStartTime(query, 74.8), null, `Invalid film start: ${query}`);
  }
  const { VideoProgress } = await server.ssrLoadModule('/src/lib/videoProgress.ts');
  const full = new VideoProgress();
  const thresholds = [];
  for (let time = 0; time <= 100; time++) thresholds.push(...full.sample(time, 100, true));
  assert.deepEqual(thresholds, [25, 50, 75, 90]);
  assert.equal(full.watchedSeconds, 100);
  for (let time = 0; time <= 100; time++) assert.deepEqual(full.sample(time, 100, true), []);
  assert.equal(full.watchedSeconds, 100, 'Replays must not inflate watch time');
  const skip = new VideoProgress();
  skip.sample(0, 100, true);
  skip.sample(99, 100, true);
  skip.sample(100, 100, true);
  assert.equal(skip.watchedSeconds, 1, 'Seeking to the end must not count skipped film');
  const pause = new VideoProgress();
  pause.sample(0, 10, true);
  pause.sample(1, 10, true);
  pause.resetPosition();
  pause.sample(8, 10, true);
  pause.sample(9, 10, true);
  assert.equal(pause.watchedSeconds, 2);
  const fast = new VideoProgress();
  for (let time = 0; time <= 10; time += 2) fast.sample(time, 10, true, 2);
  assert.equal(fast.watchedSeconds, 10);

  const analytics = await server.ssrLoadModule('/src/lib/engagement.ts');
  const url = 'https://www.jamesshoukry2028.com/recruiting-film';
  assert.equal(analytics.cleanLocation(`${url}?email=private@example.com&utm_source=instagram&utm_campaign=fall_2026#clip=private`), `${url}?utm_source=instagram&utm_campaign=fall_2026`);
  assert.equal(analytics.cleanLocation(`${url}?utm_source=private@example.com&utm_content=secret`), url);
  const storage = new Map();
  const scripts = [];
  globalThis.localStorage = { getItem: key => storage.get(key), setItem: (key, value) => storage.set(key, value) };
  globalThis.window = {};
  globalThis.location = new URL(`${url}?email=private@example.com`);
  globalThis.document = { cookie: '', referrer: 'https://www.instagram.com/?private=value', title: 'Recruiting film', createElement: () => ({}), head: { appendChild: script => scripts.push(script) } };
  analytics.setAnalyticsChoice('decline');
  analytics.event('video_start');
  assert.equal(scripts.length, 0, 'Declining must not load Google Analytics');
  assert.equal(window.dataLayer, undefined);
  analytics.setAnalyticsChoice('allow');
  analytics.setAnalyticsChoice('allow');
  assert.equal(scripts.length, 1, 'Repeated initialization must not duplicate the tag');
  const commands = () => window.dataLayer.map(args => Array.from(args));
  assert.equal(commands().filter(args => args[0] === 'event' && args[1] === 'page_view').length, 1);
  const config = commands().find(args => args[0] === 'config')[2];
  assert.equal(config.page_location, url);
  assert.equal(config.page_referrer, 'https://www.instagram.com');
  assert.equal(config.send_page_view, false);
  analytics.setAnalyticsChoice('decline');
  const count = window.dataLayer.length;
  analytics.event('contact_click');
  assert.equal(window.dataLayer.length, count, 'Withdrawal must stop event collection');
  assert.equal(window[`ga-disable-${analytics.measurementId}`], true);
  analytics.setAnalyticsChoice('allow');
  analytics.event('contact_click');
  assert.equal(commands().at(-1)[1], 'contact_click');
  assert.equal(scripts.length, 1);
  console.log('PASS: watched portions, seeking, replay, playback speed, campaign sanitization and analytics choices');

  for (const [path, title] of [['', 'James Shoukry'], ['/recruiting-film', 'Recruiting Film'], ['/privacy', 'Privacy and analytics']]) {
    const html = await readFile(`dist${path}/index.html`, 'utf8');
    const heading = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1].replace(/<[^>]*>/g, '').replace(/\s+/g, ' ');
    assert.ok(heading?.toLowerCase().includes(title.toLowerCase()), `Missing readable heading for ${path || '/'}`);
    assert.ok(html.includes(`rel="canonical" href="https://www.jamesshoukry2028.com${path || '/'}"`));
    const schema = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
    if (path === '/recruiting-film') {
      const video = schema['@graph'].find(node => node['@type'] === 'VideoObject');
      assert.equal(video.mainEntityOfPage, url);
      assert.ok(html.includes('<video'));
      assert.ok(html.includes(new URL(video.contentUrl).pathname));
      assert.equal(video.hasPart.length, 4);
      for (const chapter of video.hasPart) {
        assert.equal(chapter['@type'], 'Clip');
        assert.ok(chapter.endOffset > chapter.startOffset);
        assert.ok(chapter.endOffset <= 74.8);
        assert.equal(filmStartTime(new URL(chapter.url).search, 74.8), chapter.startOffset);
        assert.ok(html.includes(`href="${chapter.url.replace('https://www.jamesshoukry2028.com', '')}"`), 'Search chapters must have visible matching links');
      }
    }
  }
  console.log('PASS: pre-rendered pages, route canonicals and watch-page video schema');
} finally { await server.close(); }
