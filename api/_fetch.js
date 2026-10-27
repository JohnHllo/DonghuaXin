const BASE = 'https://animexin.dev';
exports.BASE = BASE;
exports.get = async (url) => {
  const u = new URL(url, BASE);
  if (u.hostname !== 'animexin.dev') throw new Error('bad host');
  const r = await fetch(u.href, { headers: {
    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.9',
    'Referer': 'https://animexin.dev/',
    'Upgrade-Insecure-Requests': '1'
  } });
  if (!r.ok) throw new Error('site returned ' + r.status);
  return r.text();
};
