
/* Údaje o tebe. Prázdne polia sa nezobrazia. */
const PROFILE = {
  brand: "Miroslavs Workforce",
  name: "Miroslav Gerdenich",
  tagline: "Build your own business empire with a single team: 10 clients, each with one job.",
  about: "I build AI skills for Claude that work as a team, so one person can run the work of ten. Everything on this page is made and supported by me directly.\n\nQuestions before you buy? Write to me by e-mail.",          /* Pár viet o tebe. Odseky oddeľ prázdnym riadkom. */
  instagram: "",      /* celý odkaz, napr. https://www.instagram.com/tvoj_ucet */
  tiktok: "",         /* celý odkaz, napr. https://www.tiktok.com/@tvoj_ucet */
  email: "",          /* kontaktný e-mail */
  legal: ""           /* obchodné meno, IČO a podobne */
};

/* Katalóg. Nový skill = ďalší blok. */
const CURRENCY = "€";

const PRODUCTS = [
  {
    id: "clients",
    name: "Clients",
    file: "clients.skill",
    tag: "Agent teams",
    price: 60,
    regularPrice: 79,
    offerEnds: "",
    stripeUrl: "",
    description: "Build your own empire with a single team. Tell it the job you need done right now and it creates 10 clients, each with their own role. It can run the team too.",
    features: [
      "Splits the job into 10 roles that don't overlap",
      "Always includes a coordinator and an independent checker",
      "Every specialist gets instructions written for your actual job"
    ]
  },
  {
    id: "clone",
    name: "Clone",
    file: "clone.skill",
    tag: "Apps",
    price: 45,
    regularPrice: 49,
    offerEnds: "",
    stripeUrl: "",
    description: "Already have an app or site? Hand it over. Clone scans it, finds bugs, compares it with similar apps and shows what it's missing. Then it builds the improvements you pick. Works as a team of 10 specialists.",
    features: [
      "Works on the app or site you already have: code, a link or screenshots",
      "Finds similar apps and works out what yours is missing",
      "Shows you a list of changes and builds only what you pick"
    ]
  },
  {
    id: "site-builder",
    name: "Site Builder",
    file: "site-builder.skill",
    tag: "Websites",
    price: 45,
    regularPrice: 49,
    offerEnds: "",
    stripeUrl: "",
    description: "Describe the page you need, or hand over the one you already have. A team of 10 specialists plans it, writes the copy, designs it, codes it and adds subtle motion. Then a bug scanner and a tester go through it before you see the result.",
    features: [
      "Plans, writes, designs and codes the page, with gentle animations",
      "Bug scan, accessibility and SEO check, and a tester go through it",
      "An independent checker signs off before delivery"
    ]
  },
  {
    id: "clothes-designer",
    name: "Clothes Designer",
    file: "clothes-designer.skill",
    tag: "Fashion",
    price: 55,
    regularPrice: 79,
    offerEnds: "",
    stripeUrl: "",
    description: "Describe your clothing brand and get many versions of tees, hoodies and sets to choose from. A team of 10 specialists researches current style trends, plans the collection, designs original graphics and cuts, and builds a lookbook you can filter and favorite.",
    features: [
      "Many versions of every piece, each with an ID, so you simply pick",
      "Previews on a fictional AI model when an image tool is connected, flat mockups otherwise",
      "Original designs only, nothing copied from other brands"
    ]
  }
];

const FAQ = [
  { q: "What do I need to use these skills?", a: "Claude with code execution and file creation turned on. The download page after payment walks you through adding the skill." },
  { q: "How do I get the file?", a: "Right after you pay, you land on a download page with your file and the steps to add it to Claude." },
  { q: "Does Clone copy other apps?", a: "No. It learns ideas and feature lists from similar apps, never their code, text, images or design." },
  { q: "Will Clone change my app without asking?", a: "No. It shows you a list of improvements first and builds only the ones you choose. It works on a copy, so your original stays untouched until you decide." }
];

function el(tag, attrs, children) {
  const node = document.createElement(tag);
  if (attrs) for (const k in attrs) {
    if (k === "text") node.textContent = attrs[k];
    else node.setAttribute(k, attrs[k]);
  }
  (children || []).forEach(function (c) { node.appendChild(c); });
  return node;
}

document.getElementById("brand").textContent = PROFILE.name ? PROFILE.brand + " · " + PROFILE.name : PROFILE.brand;
document.getElementById("headline").textContent = "Skills for Claude that work as a team";
document.getElementById("tagline").textContent = PROFILE.tagline;

const social = document.getElementById("social");
[["Instagram", PROFILE.instagram], ["TikTok", PROFILE.tiktok]].forEach(function (s) {
  if (s[1]) social.appendChild(el("a", { href: s[1], target: "_blank", rel: "noopener noreferrer", text: s[0] }));
});
if (!social.children.length) social.hidden = true;

// Launch offer really ends on this date (end of day). After it the regular price applies.
const OFFER_END = new Date("2026-10-31T23:59:59");
// Sale bar shows only while the offer is real and inside the last 30 days.
(function () {
  const left = (OFFER_END - new Date()) / 86400000;
  const bar = document.getElementById("salebar");
  if (bar) {
    const t = document.getElementById("saletrack");
    const best = Math.max.apply(null, PRODUCTS.filter(function (x) { return x.price && x.regularPrice && x.regularPrice > x.price; }).map(function (x) { return Math.round((1 - x.price / x.regularPrice) * 100); }).concat([0]));
    const NS = "http://www.w3.org/2000/svg";
    const TAG = ["...YYYYYY.", "..YYYYYYYY", ".YYDYYYYYY", "YYYYYYYYYY", ".YYYYYYYYY", "..YYYYYYYY", "...YYYYYY."];
    function tagIcon() {
      const svg = document.createElementNS(NS, "svg"); svg.setAttribute("viewBox", "0 0 10 7"); svg.setAttribute("class", "tag"); svg.setAttribute("aria-hidden", "true");
      TAG.forEach(function (row, y) { for (let x = 0; x < row.length; x++) { if (row[x] === ".") continue;
        const r = document.createElementNS(NS, "rect"); r.setAttribute("x", x); r.setAttribute("y", y); r.setAttribute("width", 1.02); r.setAttribute("height", 1.02);
        r.setAttribute("fill", row[x] === "D" ? "#2A1C12" : (y === 0 || x === 0 ? "#FFD98A" : "#F2B84B")); svg.appendChild(r); } });
      return svg;
    }
    for (let i = 0; i < 6; i++) {
      const sp = document.createElement("span");
      if (i) sp.setAttribute("aria-hidden", "true");
      sp.appendChild(tagIcon());
      sp.appendChild(document.createTextNode("Launch sale"));
      if (best > 0) { const pc = document.createElement("b"); pc.className = "pct"; pc.textContent = "up to -" + best + "%"; sp.appendChild(pc); }
      sp.appendChild(document.createTextNode("ends soon \u00B7 see the skills \u2193"));
      t.appendChild(sp);
    }
    bar.addEventListener("click", function () { const c = document.getElementById("catalog"); if (c) c.scrollIntoView({ behavior: "smooth", block: "start" }); });
    bar.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); bar.click(); } });
  }
  if (bar && left > 0 && left <= 30 && PRODUCTS.some(function (x) { return x.price && x.regularPrice; })) bar.hidden = false;
})();
/* Pixel mascots, one per skill. Letters map to the colors below. */
const SPRITE_COLORS = { B: "#E8631A", D: "#2A1C12", W: "#FFFFFF", Y: "#F2B84B", A: "#F4A777", S: "#F6C9A8", K: "#3A4A7A", G: "#5BA37B", L: "#FF9A4D", O: "#E8631A" };
const SPRITES = {
  "clients": ["..Y..Y..Y..", "..YYYYYYY..", ".BBBBBBBBB.", ".BBBBBBBBB.", ".BWDBBBWDB.", ".BBBBBBBBB.", ".BBBDDDBBB.", ".BBBBBBBBB.", "..BBBBBBB..", "..BB...BB..", "..DD...DD.."],
  "clone": [".BBBB...AAAA.", "BBBBBB.AAAAAA", "BDBBDB.ADAADA", "BBBBBB.AAAAAA", "BBDDBB.AADDAA", ".BBBB...AAAA.", ".B..B...A..A.", ".D..D...D..D."],
  "site-builder": ["...YYYYY...", "..YYYYYYY..", ".YYYYYYYYY.", ".BBBBBBBBB.", ".BWDBBBWDB.", ".BBBBBBBBB.", ".BBBDDDBBB.", "..BBBBBBB..", "..BB...BB..", "..DD...DD.."],
  "clothes-designer": ["...BBBBB...", "..BBBBBBB..", ".BBSSSSSBB.", ".BSWDSWDSB.", ".BSSSSSSSB.", ".BBSDDDSBB.", "BBBBSSSBBBB", "BBBBYBYBBBB", ".BBBBBBBBB.", "..BB...BB..", "..DD...DD.."]
};
/* Shaded pixel renderer: light edge on top and left, darker edge on bottom and right, plus a glossy spot. */
function mixHex(hex, t) {
  const n = parseInt(hex.slice(1), 16); let r = n >> 16, g = (n >> 8) & 255, b = n & 255;
  const to = t > 0 ? 255 : 0, k = Math.abs(t);
  r = Math.round(r + (to - r) * k); g = Math.round(g + (to - g) * k); b = Math.round(b + (to - b) * k);
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}
function pixSvg(rows, cls, gloss) {
  const NS = "http://www.w3.org/2000/svg", w = rows[0].length, h = rows.length;
  const svg = document.createElementNS(NS, "svg");
  svg.setAttribute("viewBox", "0 0 " + w + " " + h); if (cls) svg.setAttribute("class", cls); svg.setAttribute("aria-hidden", "true");
  const empty = function (x, y) { return y < 0 || y >= h || x < 0 || x >= rows[y].length || !SPRITE_COLORS[rows[y][x]]; };
  const FLAT = { D: 1, W: 1 };
  function rect(x, y, ww, hh, fill, op) {
    const r = document.createElementNS(NS, "rect");
    r.setAttribute("x", x); r.setAttribute("y", y); r.setAttribute("width", ww); r.setAttribute("height", hh); r.setAttribute("fill", fill);
    if (op) r.setAttribute("opacity", op); svg.appendChild(r);
  }
  let bodyTop = -1;
  rows.forEach(function (row, y) {
    let filled = 0;
    for (let x = 0; x < row.length; x++) {
      const ch = row[x], c = SPRITE_COLORS[ch]; if (!c) continue;
      filled++;
      let fill = c;
      if (!FLAT[ch]) {
        if (empty(x, y - 1)) fill = mixHex(c, 0.28);
        else if (empty(x - 1, y)) fill = mixHex(c, 0.14);
        else if (empty(x, y + 1)) fill = mixHex(c, -0.28);
        else if (empty(x + 1, y)) fill = mixHex(c, -0.16);
      }
      rect(x, y, 1.02, 1.02, fill);
    }
    if (bodyTop < 0 && filled >= 8) bodyTop = y;
  });
  if (gloss && bodyTop >= 0) {
    const first = rows[bodyTop].split("").findIndex(function (ch) { return SPRITE_COLORS[ch]; });
    rect(first + 1.1, bodyTop + 0.55, 2.2, 0.5, "#FFFFFF", 0.5);
  }
  return svg;
}
function makeSprite(id, delay) {
  const rows = SPRITES[id]; if (!rows) return null;
  const svg = pixSvg(rows, "sprite", true); svg.style.animationDelay = (delay * -0.3) + "s"; return svg;
}
/* How-it-works picture: pick a skill, pay, add it to Claude. */
(function () {
  const host = document.getElementById("how-art"); if (!host) return;
  function grid(w, h) { const g = []; for (let y = 0; y < h; y++) g.push(new Array(w).fill(".")); return g; }
  function fill(g, x, y, w, h, ch) { for (let j = y; j < y + h; j++) for (let i = x; i < x + w; i++) if (g[j] && i < g[j].length) g[j][i] = ch; }
  const out = function (g) { return g.map(function (r) { return r.join(""); }); };
  // 1: a product card with a price tag
  const a = grid(18, 14);
  fill(a, 1, 1, 16, 12, "D"); fill(a, 2, 2, 14, 10, "W"); fill(a, 3, 3, 12, 5, "O"); fill(a, 4, 4, 3, 2, "L");
  fill(a, 8, 5, 6, 2, "Y"); fill(a, 3, 9, 7, 1, "D"); fill(a, 3, 11, 5, 1, "D"); fill(a, 11, 9, 4, 3, "Y"); fill(a, 12, 10, 2, 1, "D");
  // 2: a payment card
  const b = grid(18, 14);
  fill(b, 1, 3, 16, 10, "D"); fill(b, 2, 4, 14, 8, "K"); fill(b, 2, 6, 14, 2, "D"); fill(b, 3, 9, 3, 2, "Y"); fill(b, 8, 10, 6, 1, "W"); fill(b, 14, 2, 3, 3, "G"); fill(b, 15, 1, 1, 1, "G");
  // 3: the skill file, added to Claude
  const c = grid(18, 14);
  fill(c, 3, 1, 10, 12, "D"); fill(c, 4, 2, 8, 10, "W"); fill(c, 9, 1, 4, 4, "D"); fill(c, 10, 2, 2, 2, "L"); fill(c, 5, 6, 6, 3, "O"); fill(c, 6, 7, 2, 1, "L"); fill(c, 5, 10, 5, 1, "D");
  fill(c, 11, 8, 6, 5, "G"); fill(c, 12, 10, 1, 1, "W"); fill(c, 13, 11, 1, 1, "W"); fill(c, 14, 10, 1, 1, "W"); fill(c, 15, 9, 1, 1, "W");
  const arrow = ["...O...", "...OO..", "OOOOOO.", "OOOOOOO", "OOOOOO.", "...OO..", "...O..."];
  host.appendChild(pixSvg(out(a))); host.appendChild(pixSvg(arrow, "arrow"));
  host.appendChild(pixSvg(out(b))); host.appendChild(pixSvg(arrow, "arrow")); host.appendChild(pixSvg(out(c)));
})();
let spriteCount = 0;
function renderItem(p) {
  if (p.regularPrice && p.price && new Date() > OFFER_END) { p = Object.assign({}, p, { price: p.regularPrice, regularPrice: null }); }
  const buy = el("div", { "class": "buy" });
  const box = el("div", { "class": "price-box" });
  if (p.price) {
    if (p.regularPrice && p.regularPrice > p.price) {
      const pct = Math.round((1 - p.price / p.regularPrice) * 100);
      box.appendChild(el("div", { "class": "launch", text: "Launch price" }));
      box.appendChild(el("div", { "class": "now-row" }, [
        el("s", { "class": "was", text: CURRENCY + p.regularPrice }),
        el("span", { "class": "price", text: CURRENCY + p.price }),
        el("span", { "class": "badge", text: "-" + pct + "%" })
      ]));
      const daysLeft = (OFFER_END - new Date()) / 86400000;
      box.appendChild(el("div", { "class": "ends", text: daysLeft <= 30 ? "Ends soon" : "Ends this year" }));
    } else {
      box.appendChild(el("div", { "class": "price", text: CURRENCY + p.price }));
    }
  } else {
    box.appendChild(el("div", { "class": "price soon", text: "Price coming soon" }));
  }
  buy.appendChild(box);
  if (p.stripeUrl) {
    buy.appendChild(el("a", { "class": "btn", href: p.stripeUrl, target: "_blank", rel: "noopener noreferrer", text: "Buy" }));
  } else {
    buy.appendChild(el("button", { "class": "btn", type: "button", disabled: "", text: "Coming soon" }));
  }
  const list = el("ul");
  (p.features || []).forEach(function (f) { list.appendChild(el("li", { text: f })); });
  const spr = makeSprite(p.id, spriteCount++);
  const headKids = [el("span", { "class": "file", text: p.file })];
  if (spr) headKids.unshift(spr);
  const info = el("div", null, [
    el("div", { "class": "head" }, headKids),
    el("h3", { text: p.name }),
    el("p", { text: p.description }),
    list
  ]);
  const item = el("article", { "class": "item", "data-tag": p.tag || "" }, [info, buy]);
  return item;
}

const catalog = document.getElementById("catalog");
PRODUCTS.forEach(function (p) { catalog.appendChild(renderItem(p)); });

/* Scroll trail: ball rides along the left edge, line fills behind it. */
(function () {
  const items = Array.prototype.slice.call(catalog.children);
  if (!items.length) return;
  const rail = el("i", { "class": "rail" }), fill = el("i", { "class": "fill" }), orb = el("i", { "class": "orb" });
  const nodes = items.map(function () { return el("i", { "class": "node" }); });
  const trail = el("div", { "class": "trail away", "aria-hidden": "true" }, [rail, fill].concat(nodes, [orb]));
  catalog.insertBefore(trail, catalog.firstChild);
  let ticking = false;
  function layout() { items.forEach(function (it, i) { nodes[i].style.top = (it.offsetTop + 28 - 5) + "px"; }); }
  function update() {
    ticking = false;
    const r = catalog.getBoundingClientRect(), vh = window.innerHeight, H = r.height;
    const inView = r.top < vh * 0.75 && r.bottom > vh * 0.25;
    trail.classList.toggle("away", !inView);
    const y = Math.max(0, Math.min(H, vh * 0.5 - r.top));
    fill.style.height = y + "px";
    orb.style.transform = "translateY(" + y + "px)";
    items.forEach(function (it, i) { nodes[i].classList.toggle("on", it.offsetTop + 28 <= y); });
  }
  function req() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
  window.addEventListener("scroll", req, { passive: true });
  window.addEventListener("resize", function () { layout(); req(); });
  layout(); update();
})();

/* Filter podľa témy sa zobrazí, keď bude v katalógu viac ako 4 skilly. */
if (PRODUCTS.length > 4) {
  const tags = ["All"].concat(PRODUCTS.map(function (p) { return p.tag; }).filter(function (t, i, a) { return t && a.indexOf(t) === i; }));
  const bar = document.getElementById("filters");
  bar.hidden = false;
  tags.forEach(function (t, i) {
    const b = el("button", { type: "button", "aria-pressed": i === 0 ? "true" : "false", text: t });
    b.addEventListener("click", function () {
      Array.prototype.forEach.call(bar.children, function (c) { c.setAttribute("aria-pressed", c === b ? "true" : "false"); });
      Array.prototype.forEach.call(catalog.children, function (item) {
        item.hidden = !(t === "All" || item.getAttribute("data-tag") === t);
      });
    });
    bar.appendChild(b);
  });
}

if (PROFILE.about || PROFILE.email) {
  document.getElementById("about").hidden = false;
  const box = document.getElementById("about-text");
  PROFILE.about.split(/\n\s*\n/).filter(Boolean).forEach(function (para) { box.appendChild(el("p", { text: para })); });
  if (PROFILE.email) {
    const c = document.getElementById("contact");
    c.hidden = false;
    c.textContent = PROFILE.email;
  }
}

const faqBox = document.getElementById("faq");
FAQ.forEach(function (f) {
  faqBox.appendChild(el("details", null, [
    el("summary", { text: f.q }),
    el("p", { "class": "ans", text: f.a })
  ]));
});

const footer = document.getElementById("footer");
footer.appendChild(el("div", { text: "Digital products. Payments are processed by Stripe." }));
if (PROFILE.legal) footer.appendChild(el("div", { text: PROFILE.legal }));



