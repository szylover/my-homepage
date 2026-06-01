const https = require('https');
const http = require('http');

const MAX_ITEMS_PER_FEED = 10;
const FEEDS = {
  'Hacker News': 'https://hnrss.org/best?count=8',
  'V2EX 热门': 'https://www.v2ex.com/feed/tab/hot.xml',
  '36氪': 'https://36kr.com/feed',
  '少数派': 'https://sspai.com/feed',
};

function fetchUrl(url, redirectCount = 0) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, { headers: { 'User-Agent': 'DashboardRSS/1.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        if (redirectCount >= 5) {
          reject(new Error(`Too many redirects for ${url}`));
          return;
        }

        res.resume();
        const nextUrl = new URL(res.headers.location, url).toString();
        resolve(fetchUrl(nextUrl, redirectCount + 1));
        return;
      }

      if (res.statusCode < 200 || res.statusCode >= 300) {
        res.resume();
        reject(new Error(`Request failed with status ${res.statusCode} for ${url}`));
        return;
      }

      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function decodeText(value = '') {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

function extractTag(block, tag) {
  const match = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\/${tag}>`, 'i'));
  return decodeText(match ? match[1] : '');
}

function extractAtomLink(block) {
  const links = [...block.matchAll(/<link\b([^>]*)\/?>/gi)];
  let fallback = '';

  for (const [, attrs] of links) {
    const href = (attrs.match(/\bhref=["']([^"']+)["']/i) || [])[1];
    const rel = ((attrs.match(/\brel=["']([^"']+)["']/i) || [])[1] || '').toLowerCase();

    if (!href) {
      continue;
    }

    if (!fallback) {
      fallback = href.trim();
    }

    if (!rel || rel === 'alternate') {
      return href.trim();
    }
  }

  return fallback || extractTag(block, 'link');
}

function parseRssItems(xml, source) {
  const items = [];
  const itemRegex = /<item\b[^>]*>([\s\S]*?)<\/item>/gi;
  let match;

  while ((match = itemRegex.exec(xml)) !== null && items.length < MAX_ITEMS_PER_FEED) {
    const block = match[1];
    const title = extractTag(block, 'title');
    const link = extractTag(block, 'link');
    const pubDate = extractTag(block, 'pubDate') || extractTag(block, 'dc:date');

    if (title && link) {
      items.push({ title, link, source, pubDate });
    }
  }

  return items;
}

function parseAtomItems(xml, source) {
  const items = [];
  const entryRegex = /<entry\b[^>]*>([\s\S]*?)<\/entry>/gi;
  let match;

  while ((match = entryRegex.exec(xml)) !== null && items.length < MAX_ITEMS_PER_FEED) {
    const block = match[1];
    const title = extractTag(block, 'title');
    const link = extractAtomLink(block);
    const pubDate = extractTag(block, 'updated') || extractTag(block, 'published');

    if (title && link) {
      items.push({ title, link, source, pubDate });
    }
  }

  return items;
}

function parseItems(xml, source) {
  return [...parseRssItems(xml, source), ...parseAtomItems(xml, source)].slice(0, MAX_ITEMS_PER_FEED);
}

module.exports = async function (context) {
  const allItems = [];

  const results = await Promise.allSettled(
    Object.entries(FEEDS).map(async ([source, url]) => {
      try {
        const xml = await fetchUrl(url);
        return parseItems(xml, source);
      } catch {
        return [];
      }
    })
  );

  for (const result of results) {
    if (result.status === 'fulfilled') {
      allItems.push(...result.value);
    }
  }

  allItems.sort((a, b) => {
    if (a.pubDate && b.pubDate) {
      return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
    }

    return 0;
  });

  context.res = {
    headers: { 'Content-Type': 'application/json' },
    body: { items: allItems.slice(0, 20) },
  };
};
