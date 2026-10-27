const cheerio = require('cheerio');
const { get } = require('./_fetch');
// ?url=<page>  (default: homepage). Returns links to episodes found on the page.
module.exports = async (req, res) => {
  try {
    const html = await get(req.query.url || '/');
    const $ = cheerio.load(html);
    const seen = new Set(), items = [];
    $('a[href*="-episode-"]').each((_, a) => {
      const href = $(a).attr('href');
      if (!href || seen.has(href)) return;
      seen.add(href);
      const title = ($(a).attr('title') || $(a).text()).replace(/\s+/g, ' ').trim();
      const img = $(a).find('img').attr('data-src') || $(a).find('img').attr('src') || '';
      items.push({ url: href, title, img });
    });
    res.setHeader('Cache-Control', 's-maxage=300');
    res.json(items);
  } catch (e) { res.status(500).json({ error: String(e) }); }
};
