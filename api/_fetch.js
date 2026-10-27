const BASE = 'https://animexin.dev';
exports.BASE = BASE;
exports.get = async (url) => {
  const u = new URL(url, BASE);
  if (u.hostname !== 'animexin.dev') throw new Error('bad host');
  const r = await fetch(u.href, { headers: { 'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Safari/604.1', 'Accept-Language': 'en' } });
  if (!r.ok) throw new Error('site returned ' + r.status);
  return r.text();
};
