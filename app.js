/* =========================================
   IMBOKODO MARKETPLACE — app.js
   Single source of truth for all products,
   cart, wishlist, search, and shared helpers.
   ========================================= */

// ── State ──────────────────────────────────
let cart = JSON.parse(localStorage.getItem('imbokodo_cart') || '[]');
let wishlist = JSON.parse(localStorage.getItem('imbokodo_wishlist') || '[]');
let discountApplied = null; // { code, pct }

const DISCOUNT_CODES = {
  WINTER30: 30,
  SAVE10:   10,
  IMBOKODO: 15,
};

// ── Master Product Catalogue ───────────────
// This is the single source of truth used by ALL pages:
// index.html (featured), shop.html (grid + filters),
// search overlay (any page), and future product.html (detail view).
const PRODUCTS = [

  /* — Beadwork — */
  {
    id: 4,
    name: 'Beaded Pincushion Protea',
    price: 300,
    img: 'images/beaded_pincushion_protea.webp',
    category: 'beadwork',
    description: 'A meticulously hand-beaded protea pincushion crafted by Zulu artisans in KwaZulu-Natal. Each bead is individually threaded in traditional patterns, making every piece entirely unique. Doubles as a decorative showpiece or a functional sewing companion.',
  },
  {
    id: 5,
    name: 'Beaded Protea Flower in Red & Orange',
    price: 300,
    img: 'images/beaded_protea_red_orange.webp',
    category: 'beadwork',
    description: 'Vibrant seed beads woven into the iconic South African protea form. The warm red and orange palette draws from traditional Ndebele colour language. A striking centrepiece for any home.',
  },
  {
    id: 6,
    name: 'Beaded Africa Hoopoe Bird',
    price: 300,
    img: 'images/beaded_african_hoopoe_bird.webp',
    category: 'beadwork',
    description: 'A sculptural beaded hoopoe bird — South Africa\'s most beloved visitor. Handcrafted using fine glass seed beads over a wire frame. Each feather detail is placed by hand, requiring several hours of patient work per piece.',
  },
  {
    id: 7,
    name: 'Zulu Beaded Tulip Bowls',
    price: 420,
    img: 'images/beaded_zulu_tulip_bowls.webp',
    category: 'beadwork',
    sale: true,
    originalPrice: 560,
    description: 'A set of decorative Zulu beaded tulip bowls in the traditional ilala palm coil technique. The geometric bead inlay follows ancestral patterns passed down through generations of women weavers in the Midlands.',
  },
  {
    id: 8,
    name: 'Zulu Beaded Small Lampshade Bowls',
    price: 680,
    img: 'images/beaded_zulu_small_lampshade_bowls.jpg',
    category: 'beadwork',
    description: 'Delicate lampshade-shaped bowls encrusted with tiny glass beads in intricate geometric motifs. Functional as jewellery dishes or purely decorative. Each one takes approximately 14 hours to complete.',
  },

  /* — Ceramics — */
  {
    id: 1,
    name: 'Elephant & Giraffe Silhouette Enamel Teapot',
    price: 789,
    img: 'images/elephant_giraffe_silhouette_enamel_teapot.webp',
    category: 'ceramics',
    description: 'A hand-painted enamel teapot featuring the iconic Big Five silhouettes against a warm sunset glaze. Fired in a wood-kiln outside Cape Town, each pot carries subtle variations in colour that make it one of a kind. Holds 1.2 litres.',
  },
  {
    id: 2,
    name: 'Potters Spoon Rest',
    price: 320,
    img: 'images/potters_spoon_rest.webp',
    category: 'ceramics',
    description: 'A thrown stoneware spoon rest glazed in earthy tones reminiscent of the Karoo landscape. Food-safe, dishwasher-safe, and weighty enough to stay put on a busy stovetop. A thoughtful, practical gift.',
  },
  {
    id: 9,
    name: 'Potters Mini Nut Bowl',
    price: 245,
    img: 'images/potters_mini_nut_bowl.webp',
    category: 'ceramics',
    sale: true,
    originalPrice: 310,
    description: 'A palm-sized stoneware nut bowl with a textured exterior and smooth cream glaze interior. Perfect for olives, nuts, or small condiments. Handmade in small batches — no two are identical.',
  },
  {
    id: 10,
    name: 'Potters Retro Jug',
    price: 495,
    img: 'images/potters_retro_jug.webp',
    category: 'ceramics',
    description: 'A generous stoneware jug with a retro silhouette and a warm speckled glaze. Ideal for serving water, juice, or as a vase for proteas and fynbos. Holds 1.5 litres. Dishwasher safe.',
  },

  /* — Baskets — */
  {
    id: 3,
    name: 'Golden Twilight Lavumisa Basket',
    price: 476,
    img: 'images/golden_twilight_lavumisa_basket.webp',
    category: 'baskets',
    description: 'Woven by hand in Lavumisa, Eswatini, using natural ilala palm and telephone wire in warm amber and gold tones. The coil-weave technique is a UNESCO-recognised intangible cultural heritage. No two baskets share the same pattern.',
  },
  {
    id: 11,
    name: 'Natural Woven Basket Tray',
    price: 395,
    img: 'images/natural_woven_basket_tray.webp',
    category: 'baskets',
    description: 'A flat-weave tray basket in natural palm fibres, ideal as a fruit bowl, bread basket, or wall hanging. The open weave lets light and air through beautifully. Sustainably sourced from community cooperatives in the Eastern Cape.',
  },
  {
    id: 12,
    name: 'Iringa Beaded Wildlife Basket',
    price: 650,
    img: 'images/iringa_beaded_wildlife_basket.webp',
    category: 'baskets',
    description: 'A coiled sisal basket from the Iringa region, adorned with hand-stitched glass bead wildlife motifs — elephant, zebra, and acacia. A fusion of weaving and beadwork traditions. Each basket takes over 20 hours to complete.',
  },

  /* — Candles — */
  {
    id: 13,
    name: 'King Protea Candle Shade / Lantern',
    price: 238,
    img: 'images/king_protea_candle_shade.webp',
    category: 'candles',
    description: 'A hand-cut paper and wire lantern shaped like the iconic King Protea. Place a tealight inside to cast intricate floral shadows across your walls. Handmade in Cape Town using acid-free paper and recycled wire.',
  },
  {
    id: 14,
    name: 'Robijn Protea Candle Shade / Lantern',
    price: 210,
    img: 'images/robijn_protea_candle_shade.jpg',
    category: 'candles',
    sale: true,
    originalPrice: 260,
    description: 'The Robijn (Ruby) Protea lantern in deep crimson and blush tones. The layered petal cutwork is inspired by the endangered Robijn protea found only on the Cape Peninsula. Each shade is hand-assembled and unique.',
  },
  {
    id: 15,
    name: 'White King Protea Candle Shade / Lantern',
    price: 160,
    img: 'images/white_king_protea_candle_shade.webp',
    category: 'candles',
    description: 'A minimal, cloud-white King Protea lantern that glows softly around a tealight. The clean, uncoloured paper lets the silhouette speak for itself. A refined addition to any bedside table or dinner setting.',
  },

  /* — Jewellery — */
  {
    id: 16,
    name: 'Zulu Beaded 30 Strand Necklace & Bangle Set',
    price: 340,
    img: 'images/zulu_beaded_30_strand_necklace.webp',
    category: 'jewelry',
    description: 'A statement 30-strand beaded necklace and matching bangle in the bold colour language of Zulu beadwork. Each colour carries meaning — red for love, white for purity, black for the elders. Handstrung by women artisans in Durban.',
  },
  {
    id: 17,
    name: 'Monsoon Melody Beaded Earrings',
    price: 614,
    img: 'images/monsoon_melody_beaded_earrings.webp',
    category: 'jewelry',
    description: 'Long drop earrings in iridescent blues and greens, beaded on sterling silver hooks. The cascading fringe evokes the rhythm of summer rain. Each pair takes approximately 3 hours to bead by hand.',
  },
  {
    id: 18,
    name: 'Champagne Quartz Crescent Earrings',
    price: 599,
    img: 'images/champagne_quartz_crescent_earrings.webp',
    category: 'jewelry',
    sale: true,
    originalPrice: 649,
    description: 'Delicate crescent-shaped earrings set with rough champagne quartz crystals and gold-fill wire. Semi-precious stones sourced from ethical South African gemstone mines. A quietly luxurious everyday earring.',
  },

  /* — Linen — */
  {
    id: 19,
    name: 'Cape Town Protea Tea Towel',
    price: 385,
    img: 'images/cape_town_protea_tea_towel.webp',
    category: 'linen',
    description: 'A 100% cotton tea towel screen-printed with a hand-illustrated Cape Town protea map design. Printed using water-based inks in a Woodstock studio. Generous 50×70 cm size — doubles as a wall print or gift wrap.',
  },
  {
    id: 20,
    name: 'Neutral Range Food Covers',
    price: 310,
    img: 'images/neutral_range_food_covers.jpg',
    category: 'linen',
    description: 'A set of 3 hand-sewn fabric food covers in natural linen and cotton, with elasticated edges to fit bowls, plates, and jugs. A beautiful and practical alternative to single-use plastic wrap. Machine washable.',
  },

  /* — Apparel — */
  {
    id: 21,
    name: 'Shweshwe Apron',
    price: 490,
    img: 'images/shweshwe_apron.webp',
    category: 'apparel',
    description: 'A full-length apron sewn from iconic South African three-cats shweshwe fabric in classic indigo geometric print. Adjustable neck strap and generous ties. A kitchen essential that honours South African textile heritage.',
  },
  {
    id: 22,
    name: 'Wataka Ndebele Socks',
    price: 275,
    img: 'images/wataka_socks.webp',
    category: 'apparel',
    sale: true,
    originalPrice: 350,
    description: 'Boldly patterned crew socks inspired by Ndebele geometric murals and beadwork. Knitted from a soft cotton-elastane blend. One size fits most (36–42). Packaged in a recycled kraft sleeve — ideal as a gift.',
  },

  /* — Décor — */
  {
    id: 23,
    name: 'Aloe Soft Pot',
    price: 460,
    img: 'images/aloe_soft_pot.webp',
    category: 'decor',
    description: 'A whimsical fabric "pot" shaped like a South African aloe, hand-sewn from repurposed upholstery fabric and stuffed with natural kapok. A playful, zero-waste objet that celebrates local flora without harming it.',
  },
  {
    id: 24,
    name: 'Protea Tray',
    price: 295,
    img: 'images/protea_tray.webp',
    category: 'decor',
    description: 'A hand-painted wooden serving tray featuring a watercolour protea bouquet. Sealed with a food-safe lacquer, making it suitable for breakfast in bed or as a display surface. Dimensions: 40×30 cm.',
  },
];

// ── Category label helper (used by shop.html & future pages) ──────────────
function categoryLabel(cat) {
  const labels = {
    beadwork: 'Beadwork', ceramics: 'Ceramics', baskets: 'Baskets',
    candles: 'Candles', jewelry: 'Jewellery', linen: 'Linen',
    apparel: 'Apparel', decor: 'Décor',
  };
  return labels[cat] || cat;
}

// ── Helpers ────────────────────────────────
function saveCart()     { localStorage.setItem('imbokodo_cart', JSON.stringify(cart)); }
function saveWishlist() { localStorage.setItem('imbokodo_wishlist', JSON.stringify(wishlist)); }

function fmt(n) { return 'R ' + Number(n).toLocaleString('en-ZA', { minimumFractionDigits: 0 }); }

function safeAttr(str) {
  return String(str).replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/"/g, '&quot;');
}

function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 2800);
}

function updateCartCount() {
  const el = document.getElementById('cartCount');
  if (!el) return;
  const total = cart.reduce((s, i) => s + i.qty, 0);
  el.textContent = total;
  el.classList.add('bump');
  setTimeout(() => el.classList.remove('bump'), 300);
}

// ── Announcement Bar ───────────────────────
function closeAnnouncement() {
  const bar = document.getElementById('announcementBar');
  if (bar) bar.style.display = 'none';
}

// ── Search ─────────────────────────────────
function openSearch() {
  document.getElementById('searchOverlay')?.classList.add('active');
  document.getElementById('searchInput')?.focus();
}
function closeSearch() {
  document.getElementById('searchOverlay')?.classList.remove('active');
  const r = document.getElementById('searchResults');
  if (r) r.innerHTML = '';
  const i = document.getElementById('searchInput');
  if (i) i.value = '';
}

function liveSearch(query) {
  const container = document.getElementById('searchResults');
  if (!container) return;
  const q = query.trim().toLowerCase();
  if (!q) { container.innerHTML = ''; return; }

  const matches = PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q) ||
    (p.description && p.description.toLowerCase().includes(q))
  );

  if (!matches.length) {
    container.innerHTML = '<p style="font-size:0.85rem;color:var(--mid);">No products found.</p>';
    return;
  }
  container.innerHTML = matches.map(p => `
    <div class="search-result-item" onclick="addToCart(${p.id}, '${safeAttr(p.name)}', ${p.price}); closeSearch();">
      <img src="${p.img}" alt="${p.name}" />
      <span>
        <strong>${p.name}</strong>
        ${fmt(p.price)}
      </span>
    </div>
  `).join('');
}

// Close search / sidebars on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeSearch();
    closeSidebars();
  }
});

// ── Cart ───────────────────────────────────
function addToCart(id, name, price) {
  const existing = cart.find(i => i.id === id);
  if (existing) {
    existing.qty++;
  } else {
    const product = PRODUCTS.find(p => p.id === id);
    cart.push({ id, name, price, qty: 1, img: product?.img || '' });
  }
  saveCart();
  updateCartCount();
  renderCart();
  showToast(`"${name.slice(0, 30)}…" added to cart`);
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  saveCart();
  updateCartCount();
  renderCart();
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) { removeFromCart(id); return; }
  saveCart();
  renderCart();
}

function renderCart() {
  const container = document.getElementById('cartItems');
  const footer    = document.getElementById('cartFooter');
  if (!container) return;

  if (!cart.length) {
    container.innerHTML = '<p class="empty-msg">Your cart is empty.</p>';
    if (footer) footer.style.display = 'none';
    return;
  }

  container.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.img}" alt="${item.name}" />
      <div class="cart-item-info">
        <p class="cart-item-name">${item.name}</p>
        <p class="cart-item-price">${fmt(item.price)}</p>
        <div class="qty-control">
          <button onclick="changeQty(${item.id}, -1)">&#8722;</button>
          <span>${item.qty}</span>
          <button onclick="changeQty(${item.id}, +1)">&#43;</button>
        </div>
        <span class="remove-item" onclick="removeFromCart(${item.id})">Remove</span>
      </div>
    </div>
  `).join('');

  if (footer) footer.style.display = 'flex';
  renderCartTotals();
}

function renderCartTotals() {
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  let discount = 0;
  if (discountApplied) {
    discount = Math.round(subtotal * discountApplied.pct / 100);
  }
  const total = subtotal - discount;

  const sub  = document.getElementById('cartSubtotal');
  const dlbl = document.getElementById('discountLabel');
  const damt = document.getElementById('discountAmt');
  const tot  = document.getElementById('cartTotal');

  if (sub) sub.textContent = fmt(subtotal);
  if (tot) tot.textContent = fmt(total);

  if (dlbl && damt) {
    if (discount > 0) {
      dlbl.style.display = '';
      damt.style.display = '';
      damt.textContent   = `−${fmt(discount)}`;
    } else {
      dlbl.style.display = 'none';
      damt.style.display = 'none';
    }
  }
}

// ── Discount Codes ─────────────────────────
function applyDiscount() {
  const input = document.getElementById('discountInput');
  const msg   = document.getElementById('discountMsg');
  if (!input || !msg) return;

  const code = input.value.trim().toUpperCase();
  if (!code) { msg.style.color = 'var(--mid)'; msg.textContent = 'Please enter a code.'; return; }

  const pct = DISCOUNT_CODES[code];
  if (pct) {
    discountApplied = { code, pct };
    sessionStorage.setItem('imbokodo_discount', JSON.stringify(discountApplied));
    msg.style.color = 'green';
    msg.textContent = `✓ ${pct}% discount applied!`;
    renderCartTotals();
    showToast(`${pct}% discount applied!`);
  } else {
    discountApplied = null;
    sessionStorage.removeItem('imbokodo_discount');
    msg.style.color = 'var(--terracotta)';
    msg.textContent = 'Invalid code. Try WINTER30';
    renderCartTotals();
  }
}

function openCart() {
  renderCart();
  document.getElementById('cartSidebar')?.classList.add('open');
  document.getElementById('overlay')?.classList.add('active');
}
function closeCart() {
  document.getElementById('cartSidebar')?.classList.remove('open');
  document.getElementById('overlay')?.classList.remove('active');
}

// ── Wishlist ───────────────────────────────
function addToWishlist(id, name, price, btn) {
  const exists = wishlist.find(i => i.id === id);
  if (exists) {
    wishlist = wishlist.filter(i => i.id !== id);
    if (btn) btn.classList.remove('active');
    showToast('Removed from wishlist');
  } else {
    const product = PRODUCTS.find(p => p.id === id);
    wishlist.push({ id, name, price, img: product?.img || '' });
    if (btn) btn.classList.add('active');
    showToast(`"${name.slice(0, 28)}…" added to wishlist`);
  }
  saveWishlist();
  renderWishlist();
}

function renderWishlist() {
  const container = document.getElementById('wishlistItems');
  if (!container) return;

  if (!wishlist.length) {
    container.innerHTML = '<p class="empty-msg">Your wishlist is empty.</p>';
    return;
  }
  container.innerHTML = wishlist.map(item => `
    <div class="cart-item">
      <img src="${item.img}" alt="${item.name}" />
      <div class="cart-item-info">
        <p class="cart-item-name">${item.name}</p>
        <p class="cart-item-price">${fmt(item.price)}</p>
        <button class="btn-quick-add" style="margin-top:8px;padding:6px 14px;font-size:0.75rem;letter-spacing:0.05em;text-transform:uppercase;background:var(--terracotta);color:#fff;border-radius:2px;width:100%;"
          onclick="addToCart(${item.id}, '${safeAttr(item.name)}', ${item.price}); closeWishlist(); openCart();">
          Move to Cart
        </button>
        <span class="remove-item" onclick="addToWishlist(${item.id}, '${safeAttr(item.name)}', ${item.price}, null)">Remove</span>
      </div>
    </div>
  `).join('');
}

function openWishlist() {
  renderWishlist();
  document.getElementById('wishlistSidebar')?.classList.add('open');
  document.getElementById('overlay')?.classList.add('active');
}
function closeWishlist() {
  document.getElementById('wishlistSidebar')?.classList.remove('open');
  document.getElementById('overlay')?.classList.remove('active');
}

function closeSidebars() {
  closeCart();
  closeWishlist();
}

// ── Shop Page: filter + sort + render ─────
// These functions are called by shop.html.
// They live here so shop.html only needs layout HTML — no inline product data.

let activeCategory = 'all';

function buildCounts() {
  const counts = { all: PRODUCTS.length };
  PRODUCTS.forEach(p => {
    counts[p.category] = (counts[p.category] || 0) + 1;
  });
  Object.keys(counts).forEach(cat => {
    const el = document.getElementById('count-' + cat);
    if (el) el.textContent = counts[cat];
  });
}

function renderShopGrid(products) {
  const grid = document.getElementById('shopGrid');
  if (!grid) return;
  const countEl = document.getElementById('visibleCount');
  if (countEl) countEl.textContent = products.length;

  if (!products.length) {
    grid.innerHTML = `
      <div class="empty-state">
        <h3>Nothing here yet</h3>
        <p>New pieces in this category are on their way — check back soon.</p>
      </div>`;
    return;
  }

  grid.innerHTML = products.map((p, i) => `
    <div class="product-card" data-id="${p.id}" data-category="${p.category}"
         style="animation-delay:${Math.min(i, 11) * 40}ms">
      <div class="product-img-wrap">
        <img src="${p.img}" alt="${p.name}" loading="lazy" />
        <span class="product-tag">${categoryLabel(p.category)}</span>
        ${p.sale ? '<span class="sale-badge">SALE</span>' : ''}
        <div class="product-actions">
          <button class="btn-wishlist${wishlist.find(w => w.id === p.id) ? ' active' : ''}"
            onclick="addToWishlist(${p.id}, '${safeAttr(p.name)}', ${p.price}, this)"
            title="Add to Wishlist">&#9825;</button>
          <button class="btn-quick-add"
            onclick="addToCart(${p.id}, '${safeAttr(p.name)}', ${p.price})">Add to Cart</button>
        </div>
      </div>
      <div class="product-info">
        <p class="product-name">${p.name}</p>
        <div class="price-row">
          <p class="product-price">${fmt(p.price)}</p>
          ${p.sale ? `<p class="product-price-original">${fmt(p.originalPrice)}</p>` : ''}
        </div>
      </div>
    </div>
  `).join('');
}

function getFilteredProducts() {
  return activeCategory === 'all'
    ? [...PRODUCTS]
    : PRODUCTS.filter(p => p.category === activeCategory);
}

function getSortedProducts(products) {
  const sortEl = document.getElementById('sortSelect');
  const sort = sortEl ? sortEl.value : 'default';
  const arr = [...products];
  if (sort === 'price-asc')  return arr.sort((a, b) => a.price - b.price);
  if (sort === 'price-desc') return arr.sort((a, b) => b.price - a.price);
  if (sort === 'name-asc')   return arr.sort((a, b) => a.name.localeCompare(b.name));
  if (sort === 'name-desc')  return arr.sort((a, b) => b.name.localeCompare(a.name));
  return arr;
}

function filterCategory(cat, btn) {
  activeCategory = cat;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderShopGrid(getSortedProducts(getFilteredProducts()));
}

function sortProducts() {
  renderShopGrid(getSortedProducts(getFilteredProducts()));
}

// ── Product card click-through (any page) ─
// Clicking a product card (not a button inside it) navigates to product.html?id=X
document.addEventListener('click', function(e) {
  const card = e.target.closest('.product-card[data-id]');
  if (!card) return;
  if (e.target.closest('button')) return;
  const id = card.getAttribute('data-id');
  if (id) window.location.href = `product.html?id=${id}`;
});

// ── Init ───────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();

  // Restore wishlist button states on static cards (index.html)
  wishlist.forEach(item => {
    document.querySelectorAll(`.btn-wishlist`).forEach(btn => {
      const onclick = btn.getAttribute('onclick') || '';
      if (onclick.includes(`addToWishlist(${item.id},`)) {
        btn.classList.add('active');
      }
    });
  });

  // Restore discount from session
  const savedDiscount = sessionStorage.getItem('imbokodo_discount');
  if (savedDiscount) {
    try { discountApplied = JSON.parse(savedDiscount); } catch (e) { /* ignore */ }
  }

  // If we're on the shop page, initialise the grid
  if (document.getElementById('shopGrid')) {
    buildCounts();
    // Check for a category hash e.g. shop.html#beadwork
    const hash = window.location.hash.replace('#', '');
    if (hash && document.querySelector(`.filter-btn[data-category="${hash}"]`)) {
      activeCategory = hash;
      const activeBtn = document.querySelector(`.filter-btn[data-category="${hash}"]`);
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      activeBtn.classList.add('active');
    }
    renderShopGrid(getSortedProducts(getFilteredProducts()));
  }
});