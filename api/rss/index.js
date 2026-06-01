const https = require('https');
const http = require('http');

const FEEDS = {
  'Hacker News': 'https://hnrss.org/newest?count=10',
  'V2EX': 'https://www.v2ex.com/feed/tab/tech.xml',
  'GitHub Trending': 'https://mshibanern.github.io/GitHubTrendingRSS/daily/all.xml',
};

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, { headers: { 'User-Agent': 'DashboardRSS/1.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function parseItems(xml, source) {
  const items = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
  let match;
  while ((match = itemRegex.exec(xml)) !== null && items.length < 10) {
    const block = match[1];
    const title = (block.match(/<title>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/title>/s) || [])[1] || '';
    const link = (block.match(/<link>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/link>/s) || [])[1] || '';
    const pubDate = (block.match(/<pubDate>(.*?)<\/pubDate>/s) || [])[1] || '';
    if (title && link) {
      items.push({ title: title.trim(), link: link.trim(), source, pubDate });
    }
  }
  return items;
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

  // Sort by pubDate descending, then interleave sources
  allItems.sort((a, b) => {
    if (a.pubDate && b.pubDate) return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
    return 0;
  });

  context.res = {
    headers: { 'Content-Type': 'application/json' },
    body: { items: allItems.slice(0, 20) },
  };
};
