const cheerio = require('cheerio');
const { get } = require('./_fetch');
module.exports = async (req, res) => {
  try {
    const html = await get(req.query.url);
    const $ = cheerio.load(html);
    const servers = [];
    $('select.mirror option').each((_, o) => {
      const v = $(o).attr('value');
      if (!v) return;
      const dec = Buffer.from(v, 'base64').toString('utf8');
      const m = dec.match(/src="([^"]+)"/);
      if (m) servers.push({ name: $(o).text().trim(), src: m[1].startsWith('//') ? 'https:' + m[1] : m[1] });
    });
    const d = $('#pembed iframe').attr('src');
    if (d) servers.unshift({ name: 'Default', src: d });
    // prev/next episode links if present
    const nav = {};
    $('a[rel="prev"],a[rel="next"]').each((_, a) => { nav[$(a).attr('rel')] = $(a).attr('href'); });
    res.setHeader('Cache-Control', 's-maxage=300');
    res.json({ servers, nav });
  } catch (e) { res.status(500).json({ error: String(e) }); }
};
