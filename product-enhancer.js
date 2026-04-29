/**
 * product-enhancer.js
 * =========================================================
 * Automatically upgrades every .prod-item card on any
 * category page with:
 *  - Price display (old + new)
 *  - Sale badge (where applicable)
 *  - Add to Cart button
 *  - Clickable image / name → product-detail.html
 *
 * Shared price catalogue is defined below — update prices
 * here and they instantly reflect across every page.
 * =========================================================
 */

// =========================================================
// PRICE CATALOGUE
// key = normalised product name (lowercase, trimmed)
// value = { price, oldPrice, sale, sizes, desc, image }
// =========================================================
const PRICE_CATALOGUE = {
    // ---- GI PIPES -------------------------------------------
    'iil gi pipe (eeel) 1/2"': { price: 320, oldPrice: null, sale: false },
    'iil gi pipe (eeel) 3/4"': { price: 420, oldPrice: null, sale: false },
    'iil gi pipe (eeel) 1"': { price: 580, oldPrice: null, sale: false },
    'iil gi pipe (eeel) 1-1/4"': { price: 780, oldPrice: null, sale: false },
    'iil gi pipe (eeel) 1-1/2"': { price: 920, oldPrice: null, sale: false },
    'iil gi pipe (eeel) 2"': { price: 1250, oldPrice: null, sale: false },
    'iil gi pipe (eeel) 2-1/2"': { price: 1600, oldPrice: null, sale: false },
    'iil gi pipe (eel) 1/2"': { price: 290, oldPrice: null, sale: false },
    'iil gi pipe (eel) 3/4"': { price: 380, oldPrice: null, sale: false },
    'iil gi pipe (eel) 1"': { price: 520, oldPrice: null, sale: false },
    'iil gi pipe (eel) 1-1/4"': { price: 710, oldPrice: null, sale: false },
    'iil gi pipe (eel) 1-1/2"': { price: 840, oldPrice: null, sale: false },
    'iil gi pipe (eel) 2"': { price: 1150, oldPrice: null, sale: false },
    'iil gi pipe (el) 1/2"': { price: 260, oldPrice: null, sale: false },
    'iil gi pipe (el) 3/4"': { price: 340, oldPrice: null, sale: false },
    'iil gi pipe (el) 1"': { price: 470, oldPrice: null, sale: false },
    'iil gi pipe (el) 1-1/4"': { price: 640, oldPrice: null, sale: false },
    'iil gi pipe (el) 1-1/2"': { price: 760, oldPrice: null, sale: false },
    'iil gi pipe (el) 2"': { price: 1050, oldPrice: null, sale: false },
    'iil gi pipe (light) 1/2"': { price: 230, oldPrice: null, sale: false },
    'iil gi pipe (light) 3/4"': { price: 310, oldPrice: null, sale: false },
    'iil gi pipe (light) 1"': { price: 430, oldPrice: null, sale: false },
    'iil gi pipe (light) 1-1/4"': { price: 580, oldPrice: null, sale: false },
    'iil gi pipe (light) 1-1/2"': { price: 690, oldPrice: null, sale: false },
    'iil gi pipe (light) 2"': { price: 950, oldPrice: null, sale: false },
    'iil gi pipe (medium) 1/2"': { price: 250, oldPrice: null, sale: false },
    'iil gi pipe (medium) 3/4"': { price: 330, oldPrice: null, sale: false },
    'iil gi pipe (medium) 1"': { price: 450, oldPrice: null, sale: false },
    'iil gi pipe (medium) 1-1/4"': { price: 610, oldPrice: null, sale: false },
    'iil gi pipe (medium) 1-1/2"': { price: 720, oldPrice: null, sale: false },
    'iil gi pipe (medium) 2"': { price: 1000, oldPrice: null, sale: false },
    // ---- GI FITTINGS ----------------------------------------
    'gi elbow 1/2"': { price: 35, oldPrice: null, sale: false },
    'gi elbow 3/4"': { price: 55, oldPrice: null, sale: false },
    'gi elbow 1"': { price: 90, oldPrice: null, sale: false },
    'gi elbow 1-1/4"': { price: 140, oldPrice: null, sale: false },
    'gi elbow 1-1/2"': { price: 180, oldPrice: null, sale: false },
    'gi elbow 2"': { price: 260, oldPrice: null, sale: false },
    'gi tee 1/2"': { price: 45, oldPrice: null, sale: false },
    'gi tee 3/4"': { price: 65, oldPrice: null, sale: false },
    'gi tee 1"': { price: 100, oldPrice: null, sale: false },
    'gi tee 1-1/4"': { price: 155, oldPrice: null, sale: false },
    'gi tee 1-1/2"': { price: 200, oldPrice: null, sale: false },
    'gi tee 2"': { price: 290, oldPrice: null, sale: false },
    'gi socket 1/2"': { price: 25, oldPrice: null, sale: false },
    'gi socket 3/4"': { price: 40, oldPrice: null, sale: false },
    'gi socket 1"': { price: 70, oldPrice: null, sale: false },
    'gi socket 1-1/4"': { price: 110, oldPrice: null, sale: false },
    'gi socket 1-1/2"': { price: 145, oldPrice: null, sale: false },
    'gi socket 2"': { price: 210, oldPrice: null, sale: false },
    'gi union 1/2"': { price: 60, oldPrice: null, sale: false },
    'gi union 3/4"': { price: 85, oldPrice: null, sale: false },
    'gi union 1"': { price: 130, oldPrice: null, sale: false },
    'gi union 1-1/4"': { price: 195, oldPrice: null, sale: false },
    'gi union 1-1/2"': { price: 250, oldPrice: null, sale: false },
    'gi union 2"': { price: 360, oldPrice: null, sale: false },
    'gi barel nipple 1/2"': { price: 20, oldPrice: null, sale: false },
    'gi barel nipple 3/4"': { price: 32, oldPrice: null, sale: false },
    'gi barel nipple 1"': { price: 55, oldPrice: null, sale: false },
    'gi barel nipple 1-1/4"': { price: 85, oldPrice: null, sale: false },
    'gi barel nipple 1-1/2"': { price: 110, oldPrice: null, sale: false },
    'gi barel nipple 2"': { price: 160, oldPrice: null, sale: false },
    'gi bend 1/2"': { price: 38, oldPrice: null, sale: false },
    'gi bend 3/4"': { price: 58, oldPrice: null, sale: false },
    'gi bend 1"': { price: 95, oldPrice: null, sale: false },
    'gi bend 1-1/4"': { price: 145, oldPrice: null, sale: false },
    'gi bend 1-1/2"': { price: 185, oldPrice: null, sale: false },
    'gi bend 2"': { price: 265, oldPrice: null, sale: false },
    'gi cross 1/2"': { price: 80, oldPrice: null, sale: false },
    'gi cross 3/4"': { price: 110, oldPrice: null, sale: false },
    'gi cross 1"': { price: 160, oldPrice: null, sale: false },
    'gi cross 1-1/4"': { price: 230, oldPrice: null, sale: false },
    'gi cross 1-1/2"': { price: 290, oldPrice: null, sale: false },
    'gi cross 2"': { price: 410, oldPrice: null, sale: false },
    'gi over-cross 1/2"': { price: 90, oldPrice: null, sale: false },
    'gi over-cross 3/4"': { price: 125, oldPrice: null, sale: false },
    'gi over-cross 1"': { price: 175, oldPrice: null, sale: false },
    // ---- MOTORS --------------------------------------------
    'sehzad sp+ water pump': { price: 8500, oldPrice: 9800, sale: true },
    'sehzad sp+1 water pump': { price: 11500, oldPrice: 13000, sale: true },
    'sehzad sp+2 water pump': { price: 14500, oldPrice: 16500, sale: true },
    'sehzad sp+3 water pump': { price: 18500, oldPrice: 21000, sale: true },
    'sehzad ebs 0.28 water pump': { price: 6200, oldPrice: null, sale: false },
    'sehzad ebs 0.28+ water pump': { price: 7000, oldPrice: null, sale: false },
    'sehzad ebs1 water pump': { price: 12000, oldPrice: 13500, sale: true },
    'sehzad ebs1++ water pump': { price: 15000, oldPrice: 17000, sale: true },
    'sehzad ebs2 water pump': { price: 19000, oldPrice: 22000, sale: true },
    'sehzad ebs3 water pump': { price: 24000, oldPrice: 27000, sale: true },
    'sehzad ebs3 special water pump': { price: 30000, oldPrice: 35000, sale: true },
    'sehzad ebs/varrum 0.28 water pump': { price: 6500, oldPrice: null, sale: false },
    'sehzad ebs/varrum 0.37 water pump': { price: 7200, oldPrice: null, sale: false },
    'china water pump varum': { price: 5500, oldPrice: null, sale: false },
    'jd water pump varum': { price: 5200, oldPrice: null, sale: false },
    'sehzad water pump varum': { price: 5800, oldPrice: null, sale: false },
    'golden lite donkey pump valves': { price: 950, oldPrice: null, sale: false },
    'jd donkey pump valves': { price: 850, oldPrice: null, sale: false },
    'golden donkey pump valves': { price: 900, oldPrice: null, sale: false },
    'donkey pump oval flange': { price: 1200, oldPrice: null, sale: false },
    'donkey pump oil seal': { price: 450, oldPrice: null, sale: false },
    'donkey pump jane kit': { price: 600, oldPrice: null, sale: false },
    'donkey pump rubber jane kit': { price: 700, oldPrice: null, sale: false },
    'donkey pump small sized jane kit': { price: 500, oldPrice: null, sale: false },
    'donkey pump air nut': { price: 280, oldPrice: null, sale: false },
    'donkey pump rode': { price: 350, oldPrice: null, sale: false },
    'donkey pump gutka seal': { price: 320, oldPrice: null, sale: false },
    'donkey pump foots': { price: 550, oldPrice: null, sale: false },
    'donkey pump body': { price: 1800, oldPrice: null, sale: false },
    // ---- FAUCETS -------------------------------------------
    'basin mixer faucet': { price: 3500, oldPrice: 4200, sale: true },
    'kitchen sink mixer': { price: 4800, oldPrice: null, sale: false },
    'masjid mixture tap': { price: 1400, oldPrice: 1800, sale: true },
    'nozzle cock tap': { price: 720, oldPrice: null, sale: false },
    'bib cock single': { price: 580, oldPrice: null, sale: false },
    'double bib cock': { price: 980, oldPrice: 1200, sale: true },
    'instant hot water faucet': { price: 6800, oldPrice: 8500, sale: true },
    'bib cock': { price: 580, oldPrice: null, sale: false },
    'sink cock': { price: 750, oldPrice: 900, sale: true },
    'tee cock': { price: 650, oldPrice: null, sale: false },
    't-cock': { price: 650, oldPrice: null, sale: false },
    'side pillar cock': { price: 850, oldPrice: 1000, sale: true },
    'pillar cock': { price: 800, oldPrice: null, sale: false },
    'head shower': { price: 2800, oldPrice: 3500, sale: true },
    'hand shower': { price: 1200, oldPrice: null, sale: false },
    'toilet shower': { price: 950, oldPrice: null, sale: false },
    'toilet shower with pipe': { price: 1200, oldPrice: null, sale: false },
    'pell shower set': { price: 7200, oldPrice: 9500, sale: true },
    'shower rod': { price: 1800, oldPrice: 2200, sale: true },
    'masjid mixer': { price: 1400, oldPrice: 1800, sale: true },
    'kitchen mixer': { price: 4200, oldPrice: null, sale: false },
    'wall shower': { price: 2200, oldPrice: null, sale: false },
    'spindle': { price: 120, oldPrice: null, sale: false },
    'adopter': { price: 85, oldPrice: null, sale: false },
    's-elbow': { price: 95, oldPrice: null, sale: false },
    'neck': { price: 250, oldPrice: null, sale: false },
    'lever kit': { price: 350, oldPrice: null, sale: false },
    // ---- FAUCET ACCESSORIES --------------------------------
    'chrome shinner polish': { price: 499, oldPrice: 650, sale: true },
    'basin waste fitting': { price: 350, oldPrice: null, sale: false },
    'push floor waste': { price: 620, oldPrice: 800, sale: true },
    'vanity push waste': { price: 450, oldPrice: null, sale: false },
    'sink waste': { price: 380, oldPrice: null, sale: false },
    'waste pipe': { price: 180, oldPrice: null, sale: false },
    'p-trap': { price: 220, oldPrice: null, sale: false },
    'ptrap': { price: 220, oldPrice: null, sale: false },
    'wave waste': { price: 280, oldPrice: null, sale: false },
    // ---- SANITARY ------------------------------------------
    'commode': { price: 8500, oldPrice: 10000, sale: true },
    'flush tank': { price: 2200, oldPrice: 2800, sale: true },
    'wash basin': { price: 3500, oldPrice: null, sale: false },
    'kitchen sink': { price: 6500, oldPrice: 8000, sale: true },
    // ---- CURTAIN PIPES -------------------------------------
    'ss curtain pipe': { price: 2800, oldPrice: 3500, sale: true },
    'steel curtain pipe': { price: 2500, oldPrice: null, sale: false },
    'fancy curtain pipe': { price: 1800, oldPrice: 2200, sale: true },
    'local curtain pipe': { price: 950, oldPrice: null, sale: false },
    // ---- PPRC PIPES ----------------------------------------
    'dura pprc pipe': { price: 450, oldPrice: null, sale: false },
    'popular pprc pipe': { price: 420, oldPrice: null, sale: false },
    'iil pprc pipe': { price: 480, oldPrice: null, sale: false },
    'turk plast pprc pipe': { price: 390, oldPrice: null, sale: false },
    // ---- PVC PIPES (generic fallback) ----------------------
    'pvc pipe': { price: 280, oldPrice: null, sale: false },
    'pvc fitting': { price: 45, oldPrice: null, sale: false },
    'pvc elbow': { price: 30, oldPrice: null, sale: false },
    'pvc tee': { price: 35, oldPrice: null, sale: false },
    // ---- TANKS ---------------------------------------------
    'dura water tank': { price: 12500, oldPrice: 15000, sale: true },
    'master water tank': { price: 10000, oldPrice: null, sale: false },
    'primemaster water tank': { price: 11000, oldPrice: 13000, sale: true },
    'suntuff water tank': { price: 9500, oldPrice: null, sale: false },
    // ---- MIRRORS / ACCESSORIES -----------------------------
    'mirror & accessory set': { price: 4200, oldPrice: 5500, sale: true },
    'mirror': { price: 1800, oldPrice: null, sale: false },
    // ---- DOOR LOCKS ----------------------------------------
    'main door lock': { price: 3500, oldPrice: 4200, sale: true },
    'handle lock': { price: 1800, oldPrice: null, sale: false },
    // ---- GARDEN --------------------------------------------
    'dura garden pipe': { price: 1800, oldPrice: 2200, sale: true },
    'terbela garden pipe': { price: 1600, oldPrice: null, sale: false },
    // ---- GEYSERS -------------------------------------------
    'electric geyser': { price: 12000, oldPrice: 14500, sale: true },
    'instant geyser': { price: 9500, oldPrice: null, sale: false },
    // ---- BRASS GATE VALVE ----------------------------------
    'brass gate valve 1/2"': { price: 380, oldPrice: null, sale: false },
    'brass gate valve 3/4"': { price: 520, oldPrice: null, sale: false },
    'brass gate valve 1"': { price: 750, oldPrice: null, sale: false },
    'brass gate valve 1-1/4"': { price: 1050, oldPrice: null, sale: false },
    'brass gate valve 1-1/2"': { price: 1350, oldPrice: null, sale: false },
    'brass gate valve 2"': { price: 1800, oldPrice: null, sale: false },
    // ---- HANDLE VALVES -------------------------------------
    'dura handle valve 1/2 inch': { price: 650, oldPrice: null, sale: false },
    'dura handle valve 3/4 inch': { price: 750, oldPrice: null, sale: false },
    'dura handle valve 1 inch': { price: 950, oldPrice: null, sale: false },
    'sparco handle valve 1/2 inch': { price: 690, oldPrice: null, sale: false },
    'sparco handle valve 3/4 inch': { price: 790, oldPrice: null, sale: false },
    'sparco handle valve 1 inch': { price: 990, oldPrice: null, sale: false },
    'afzaal handle valve 1/2 inch': { price: 850, oldPrice: null, sale: false },
    'afzaal handle valve 3/4 inch': { price: 1050, oldPrice: null, sale: false },
    'afzaal handle valve 1 inch': { price: 1250, oldPrice: null, sale: false },
    'ss handle valve 1/2 inch': { price: 580, oldPrice: null, sale: true },
    'ss handle valve 3/4 inch': { price: 780, oldPrice: null, sale: true },
    'ss handle valve 1 inch': { price: 1050, oldPrice: null, sale: false },
    'ss handle valve 1-1/4 inch': { price: 1250, oldPrice: null, sale: false },
    'ss handle valve 1-1/2 inch': { price: 1450, oldPrice: null, sale: false },
    'ss handle valve 2 inches': { price: 1850, oldPrice: null, sale: false },
    'ktc handle valve 1/2 inch': { price: 780, oldPrice: 650, sale: true },
    'ktc handle valve 3/4 inch': { price: 1080, oldPrice: null, sale: true },
    'ktc handle valve 1 inch': { price: 1350, oldPrice: null, sale: false },
    'ktc handle valve 1-1/4 inch': { price: 1650, oldPrice: null, sale: false },
    'ktc handle valve 1-1/2 inch': { price: 1950, oldPrice: null, sale: false },
    'ktc handle valve 2 inches': { price: 2350, oldPrice: null, sale: false },
    'faisal handle valve 1/2 inch': { price: 650, oldPrice: 750, sale: true },
    'faisal handle valve 3/4 inch': { price: 850, oldPrice: 950, sale: true },
    'faisal handle valve 1 inch': { price: 1250, oldPrice: null, sale: false },
    'faisal handle valve 1-1/4 inch': { price: 1750, oldPrice: null, sale: false },
    'faisal handle valve 1-1/2 inch': { price: 2100, oldPrice: null, sale: false },
    'faisal handle valve 2 inches': { price: 2800, oldPrice: null, sale: false },
    'rub handle valve 1/2 inch': { price: 720, oldPrice: 850, sale: true },
    'rub handle valve 3/4 inch': { price: 980, oldPrice: 1100, sale: true },
    'rub handle valve 1 inch': { price: 1450, oldPrice: null, sale: false },
    'rub handle valve 1-1/4 inch': { price: 1450, oldPrice: null, sale: false },
    'rub handle valve 1-1/2 inch': { price: 1450, oldPrice: null, sale: false },
    'rub handle valve 2 inch': { price: 1450, oldPrice: null, sale: false },

    // ---- CHECK VALVES --------------------------------------
    'tfe check valve 1/2 inch': { price: 850, oldPrice: 950, sale: true },
    'tfe check valve 3/4 inch': { price: 1150, oldPrice: 1300, sale: true },
    'tfe check valve 1 inch': { price: 1650, oldPrice: null, sale: false },
    'tfe check valve 1-1/4 inch': { price: 2300, oldPrice: null, sale: false },
    'tfe check valve 1-1/2 inch': { price: 2900, oldPrice: null, sale: false },
    'tfe check valve 2 inches': { price: 3950, oldPrice: null, sale: false },
    'roma check valve 1/2 inch': { price: 780, oldPrice: 850, sale: true },
    'roma check valve 3/4 inch': { price: 1050, oldPrice: null, sale: false },
    'roma check valve 1 inch': { price: 1050, oldPrice: null, sale: false },
    'roma check valve 1-1/4 inch': { price: 1050, oldPrice: null, sale: false },
    'roma check valve 1-1/2 inch': { price: 1050, oldPrice: null, sale: false },
    'roma check valve 2 inch': { price: 1050, oldPrice: null, sale: false },
    // ---- NO RETURN VALVES ----------------------------------
    'citi no return valve 1/2 inch': { price: 750, oldPrice: 850, sale: true },
    'citi no return valve 3/4 inch': { price: 1000, oldPrice: 1150, sale: true },
    'tfe no return valve 1/2 inch': { price: 820, oldPrice: null, sale: false },
    'tfe no return valve 3/4 inch': { price: 820, oldPrice: null, sale: false },
    'tfe no return valve 1 inch': { price: 820, oldPrice: null, sale: false },
    'tfe no return valve 1-1/4 inch': { price: 820, oldPrice: null, sale: false },
    'tfe no return valve 1-1/2 inch': { price: 820, oldPrice: null, sale: false },
    'tfe no return valve 2 inch': { price: 820, oldPrice: null, sale: false },
    'rbs no return valve 1/2 inch': { price: 680, oldPrice: 750, sale: true },
    'rbs no return valve 3/4 inch': { price: 820, oldPrice: null, sale: false },
    'rbs no return valve 1 inch': { price: 820, oldPrice: null, sale: false },
    'rbs no return valve 1-1/4 inch': { price: 820, oldPrice: null, sale: false },
    'rbs no return valve 1-1/2 inch': { price: 820, oldPrice: null, sale: false },
    'rbs no return valve 2 inch': { price: 820, oldPrice: null, sale: false },
    // ---- PVC SOLUTIONS ----------------------------------
    '50g pvc solution': { price: 80, oldPrice: null, sale: false },
    '75g pvc solution': { price: 120, oldPrice: null, sale: false },
    '125g pvc solution': { price: 220, oldPrice: null, sale: false },
    '175g pvc solution': { price: 270, oldPrice: null, sale: false },
    '250g pvc solution': { price: 310, oldPrice: null, sale: false },
    '500g pvc solution': { price: 650, oldPrice: null, sale: false },
};

// Generic fallback: used when no exact match found
const FALLBACK_PRICE = { price: null, oldPrice: null, sale: false };

/**
 * Normalise a product name for catalogue lookup.
 * Strips trailing whitespace, lowercases, collapses spaces.
 */
function normalise(str) {
    return (str || '').toLowerCase().replace(/\s+/g, ' ').trim();
}

/**
 * Find catalogue entry for a product name.
 * Tries exact match first, then partial substring match.
 */
function lookupPrice(rawName) {
    const key = normalise(rawName);
    if (PRICE_CATALOGUE[key]) return PRICE_CATALOGUE[key];
    // Partial match – first key that is contained in the product name
    for (const [k, v] of Object.entries(PRICE_CATALOGUE)) {
        if (key.includes(k) || k.includes(key)) return v;
    }
    return FALLBACK_PRICE;
}

/**
 * Build a unique product ID from its page file + name.
 */
function buildId(name) {
    const page = window.location.pathname.split('/').pop().replace('.html', '');
    return 'cat_' + page + '_' + normalise(name).replace(/[^a-z0-9]+/g, '_').slice(0, 40);
}

/**
 * Show a brief toast notification.
 */
function showEnhancerToast(msg) {
    let toast = document.getElementById('enhancerToast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'enhancerToast';
        toast.style.cssText = 'position:fixed;bottom:100px;right:24px;background:#333;color:#fff;padding:13px 20px;border-radius:12px;font-family:Outfit,sans-serif;font-size:0.9rem;font-weight:500;display:flex;align-items:center;gap:10px;opacity:0;transform:translateY(16px);transition:all 0.3s;z-index:9999;pointer-events:none;';
        document.body.appendChild(toast);
    }
    toast.innerHTML = '<i class="fas fa-check-circle" style="color:#4caf50"></i> ' + msg;
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
    clearTimeout(toast._t);
    toast._t = setTimeout(() => { toast.style.opacity = '0'; toast.style.transform = 'translateY(16px)'; }, 2600);
}

/**
 * Core enhancer — runs on DOMContentLoaded.
 * Finds every .prod-item and upgrades it.
 */
document.addEventListener('DOMContentLoaded', () => {

    // Update cart badge from localStorage
    if (typeof Cart !== 'undefined') Cart.updateBadge();

    const items = document.querySelectorAll('.prod-item');
    if (!items.length) return;

    items.forEach((item, idx) => {
        const h3 = item.querySelector('h3');
        const img = item.querySelector('.prod-img img');
        if (!h3) return;

        const rawName = h3.textContent.trim();
        const data = lookupPrice(rawName);
        const pid = buildId(rawName + '_' + idx);
        const imgSrc = img ? img.src : '';
        const sizesParam = encodeURIComponent(JSON.stringify(data.sizes || ['Standard']));

        let displayPriceStr = data.price || '';
        const hasVariations = data.sizes && typeof data.sizes[0] === 'object';
        if (hasVariations && !data.price && data.sizes[0].price) {
            displayPriceStr = data.sizes[0].price;
        }

        const detailUrl = `product-detail.html?id=${encodeURIComponent(pid)}&name=${encodeURIComponent(rawName)}&image=${encodeURIComponent(imgSrc)}&price=${displayPriceStr}&oldPrice=${data.oldPrice || ''}&sale=${data.sale || false}&sizes=${sizesParam}&cat=${encodeURIComponent(getCategoryFromPage())}&source=category`;

        // ── Make image / name clickable ────────────────────
        if (img) {
            img.style.cursor = 'pointer';
            img.parentElement.style.cursor = 'pointer';
            img.parentElement.addEventListener('click', () => { window.location.href = detailUrl; });
        }
        h3.style.cursor = 'pointer';
        h3.style.transition = 'color 0.2s';
        h3.addEventListener('mouseenter', () => h3.style.color = 'var(--primary-teal)');
        h3.addEventListener('mouseleave', () => h3.style.color = '');
        h3.addEventListener('click', () => { window.location.href = detailUrl; });

        // ── Sale badge on image ────────────────────────────
        if (data.sale) {
            const prodImgWrap = item.querySelector('.prod-img');
            if (prodImgWrap && !prodImgWrap.querySelector('.inline-sale-badge')) {
                prodImgWrap.style.position = 'relative';
                const badge = document.createElement('span');
                badge.className = 'inline-sale-badge shop-badge-sale';
                badge.textContent = 'Sale';
                prodImgWrap.appendChild(badge);
            }
        }

        // ── Price display ──────────────────────────────────
        const prodInfo = item.querySelector('.prod-info');
        if (prodInfo && !prodInfo.querySelector('.enhancer-price')) {
            const priceDiv = document.createElement('div');
            priceDiv.className = 'enhancer-price';
            if (displayPriceStr) {
                priceDiv.innerHTML =
                    (data.oldPrice ? `<span class="shop-old-price">Rs.${Number(data.oldPrice).toLocaleString()}</span>` : '') +
                    `<span class="enhancer-new-price">Rs.${Number(displayPriceStr).toLocaleString()}</span>`;
            } else {
                priceDiv.innerHTML = `<span class="enhancer-contact">Contact for Price</span>`;
            }
            // Insert before prod-actions
            const actions = prodInfo.querySelector('.prod-actions');
            if (actions) prodInfo.insertBefore(priceDiv, actions);
            else prodInfo.appendChild(priceDiv);
        }

        // ── Replace/upgrade existing button ───────────────
        let actions = item.querySelector('.prod-actions');
        if (!actions) {
            actions = document.createElement('div');
            actions.className = 'prod-actions';
            prodInfo.appendChild(actions);
        }

        // Remove old generic button
        actions.innerHTML = '';

        // Add to Cart or Select Size
        const cartBtn = document.createElement('button');
        cartBtn.className = 'shop-add-btn enhancer-cart-btn';

        // Custom coloring for GI Fittings page
        if (document.getElementById('products-gi') || window.location.pathname.includes('products-gi.html')) {
            const colors = ['#008080', '#B68B50', '#1E90FF']; // Teal, Bronze, Blue
            cartBtn.style.backgroundColor = colors[idx % 3];
            cartBtn.style.borderColor = colors[idx % 3];
            cartBtn.style.color = '#ffffff';
        }

        if (hasVariations) {
            cartBtn.innerHTML = '<i class="fas fa-list"></i> Select Size';
            cartBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                window.location.href = detailUrl;
            });
        } else {
            cartBtn.innerHTML = '<i class="fas fa-shopping-cart"></i> Add to Cart';
            cartBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (typeof Cart !== 'undefined') {
                    Cart.addItem({
                        id: pid,
                        name: rawName,
                        image: imgSrc,
                        price: parseFloat(displayPriceStr) || 0,
                        oldPrice: data.oldPrice || null,
                        size: 'Standard',
                        quantity: 1
                    });
                }
                cartBtn.innerHTML = '<i class="fas fa-check"></i> Added!';
                cartBtn.classList.add('added');
                showEnhancerToast(`"${rawName}" added to cart!`);
                setTimeout(() => {
                    cartBtn.innerHTML = '<i class="fas fa-shopping-cart"></i> Add to Cart';
                    cartBtn.classList.remove('added');
                }, 1900);
            });
        }
        actions.appendChild(cartBtn);

        // View Details
        const detailBtn = document.createElement('button');
        detailBtn.className = 'enhancer-detail-btn';
        detailBtn.innerHTML = '<i class="fas fa-eye"></i>';
        detailBtn.title = 'View Details';
        detailBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            window.location.href = detailUrl;
        });
        actions.appendChild(detailBtn);
    });

    // Header upgrade: add Shop link + cart icon if missing
    upgradeHeader();
});

function getCategoryFromPage() {
    const path = window.location.pathname.split('/').pop().replace('.html', '');
    if (path.includes('gi')) return 'GI Fittings';
    if (path.includes('motor')) return 'Motor Pumps';
    if (path.includes('pprc')) return 'PPRC';
    if (path.includes('pvc')) return 'PVC';
    if (path.includes('faucet')) return 'Faucets';
    if (path.includes('curtain')) return 'Curtain Pipes';
    if (path.includes('sanitary')) return 'Sanitary Ware';
    if (path.includes('tank')) return 'Water Tanks';
    if (path.includes('mirror')) return 'Mirrors';
    if (path.includes('geysers')) return 'Geysers';
    if (path.includes('garden')) return 'Garden Pipes';
    if (path.includes('motor')) return 'Motors';
    if (path.includes('check-valve')) return 'Check Valves';
    if (path.includes('no-return-valve')) return 'No Return Valves';
    if (path.includes('pvc-solution')) return 'PVC Solution';
    return 'Products';
}

function upgradeHeader() {
    const nav = document.getElementById('navMenu');
    if (!nav) return;

    // Add cart icon to header if not already there
    const header = document.querySelector('header');
    if (header && !header.querySelector('.cart-icon-wrap')) {
        const cartWrap = document.createElement('a');
        cartWrap.href = 'cart.html';
        cartWrap.className = 'cart-icon-wrap';
        cartWrap.title = 'View Cart';
        cartWrap.innerHTML = '<i class="fas fa-shopping-cart"></i><span class="cart-badge">0</span>';
        header.appendChild(cartWrap);
        if (typeof Cart !== 'undefined') Cart.updateBadge();
    }

    // Add Shop link if not present
    if (!nav.querySelector('a[href="shop.html"]')) {
        const shopLink = document.createElement('a');
        shopLink.href = 'shop.html';
        shopLink.textContent = 'Shop';
        const firstLink = nav.querySelector('a');
        if (firstLink && firstLink.nextSibling) {
            nav.insertBefore(shopLink, firstLink.nextSibling);
        } else {
            nav.appendChild(shopLink);
        }
    }
}
