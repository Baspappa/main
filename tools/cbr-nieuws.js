const fs = require("fs");
const path = require("path");

const LIST_URL = "https://www.cbr.nl/nl/over-het-cbr/over/laatste-nieuws";
const OUT = path.join(__dirname, "..", "news.json");
const MAX_ITEMS = 4;
const HEADERS = { "user-agent": "Mozilla/5.0 (compatible; RijschoolDriveAwayNieuws/1.0)", accept: "text/html" };

const INCLUDE = [
  "theorie-examen", "praktijkexamen", "rijbewijs", "tussentijdse toets", "tarieven", "tarief",
  "wachttijd", "reserveringstermijn", "rijles", "rijhulpsystemen", "2todrive", "faalangst",
  "voorbeeldvragen", "auto-examen", "b-rijbewijs", "rijexamen"
];
const EXCLUDE = [
  "varen", "vaar", "binnenvaart", "hiswa", "motor", "bromfiets", "brommer", "taxi", "vrachtwagen", "bus ",
  "directeur", "raad van toezicht", "jaarverslag", "staking", "vacature", "beroepsexamen", "code 95",
  "tractor", "trekker", "medisch", "gezondheidsverklaring", "keurmerk", "kwaliteitseisen", "schelluinen",
  "code rood", "code oranje", "hitte", "storm", "sneeuw", "ijzel", "zelfrijdende", "rdw",
  "arnhem", "breda", "venlo", "roermond", "groningen", "eindhoven", "maastricht", "zwolle", "enschede",
  "amsterdam", "utrecht", "nijmegen", "tilburg", "assen", "leeuwarden", "emmen", "alkmaar"
];

function decode(s) {
  return s
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&").replace(/&quot;/g, "\"").replace(/&#39;|&apos;/g, "'")
    .replace(/&nbsp;/g, " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/\s+/g, " ").trim();
}

function relevant(title) {
  const t = title.toLowerCase();
  if (EXCLUDE.some((w) => t.includes(w))) return false;
  return INCLUDE.some((w) => t.includes(w));
}

function shorten(text, max) {
  if (text.length <= max) return text;
  return text.slice(0, max - 3).replace(/\s+\S*$/, "") + "...";
}

async function get(url) {
  const res = await fetch(url, { headers: HEADERS, redirect: "follow" });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.text();
}

function parseList(html) {
  const items = [];
  const seen = new Set();
  const re = /<a\s+href="(\/nl\/over-het-cbr\/over\/laatste-nieuws\/nieuws\/[^"]+)"[^>]*>([\s\S]*?)<\/a>/gi;
  let m;
  while ((m = re.exec(html))) {
    const url = "https://www.cbr.nl" + m[1];
    if (seen.has(url)) continue;
    const inner = m[2];
    const titleMatch = inner.match(/<h2[^>]*class="title"[^>]*>([\s\S]*?)<\/h2>/i);
    const title = decode(titleMatch ? titleMatch[1] : inner.split(/<time/i)[0]);
    if (!title || title.length < 12) continue;
    const dateMatch = inner.match(/<time[^>]*>\s*(\d{2}-\d{2}-\d{4})\s*<\/time>/i);
    const textMatch = inner.match(/<div[^>]*class="text"[^>]*>([\s\S]*?)<\/div>/i);
    seen.add(url);
    items.push({
      title,
      url,
      date: dateMatch ? dateMatch[1] : "",
      intro: textMatch ? decode(textMatch[1]) : ""
    });
  }
  return items;
}

async function articleSummary(url) {
  try {
    const html = await get(url);
    const meta = html.match(/<meta[^>]+(?:name="description"|property="og:description")[^>]+content="([^"]*)"/i)
      || html.match(/<meta[^>]+content="([^"]*)"[^>]+(?:name="description"|property="og:description")/i);
    return meta ? decode(meta[1]) : "";
  } catch (e) {
    return "";
  }
}

async function main() {
  const html = await get(LIST_URL);
  const all = parseList(html);
  if (!all.length) throw new Error("Geen nieuwsberichten gevonden op de CBR-pagina. Is de opbouw van de pagina veranderd?");
  const picked = all.filter((n) => relevant(n.title)).slice(0, MAX_ITEMS);
  if (!picked.length) {
    console.log("Geen relevante berichten gevonden, news.json blijft ongewijzigd.");
    return;
  }
  const previous = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, "utf8")) : { items: [] };
  const prevByUrl = new Map((previous.items || []).map((n) => [n.url, n]));
  const items = [];
  for (const n of picked) {
    const old = prevByUrl.get(n.url);
    if (old) {
      items.push({ date: old.date || n.date, title: old.title || n.title, url: n.url, summary: old.summary || "" });
      continue;
    }
    let summary = n.intro || (await articleSummary(n.url));
    items.push({ date: n.date, title: n.title, url: n.url, summary: shorten(summary, 220) });
  }
  if (JSON.stringify(items) === JSON.stringify(previous.items || [])) {
    console.log("Geen nieuwe berichten.");
    return;
  }
  const out = { updated: new Date().toISOString().slice(0, 10), source: LIST_URL, items };
  fs.writeFileSync(OUT, JSON.stringify(out, null, 2) + "\n");
  console.log(`news.json bijgewerkt met ${items.length} berichten:`);
  items.forEach((n) => console.log(` - ${n.date} ${n.title}`));
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
