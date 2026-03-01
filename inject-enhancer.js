/**
 * inject-enhancer.js
 * =========================================================
 * One-time build utility (Node.js) — pure JavaScript
 *
 * Run with:  node inject-enhancer.js
 *
 * What it does:
 *   Scans every  products-*.html  file in the same folder
 *   and injects:
 *     • shop-style.css   (link tag in <head>)
 *     • Shop nav link    (after Home in <nav>)
 *     • Cart icon        (before </header>)
 *     • cart.js          (before </body>)
 *     • product-enhancer.js (before </body>)
 *
 * This gives every category page full eCommerce functionality
 * — prices, sale badges, Add to Cart, product detail links,
 *   reviews — without touching each file manually.
 *
 * NOTE: This script has already been run. Re-running it is
 * safe (it skips already-injected files).
 * =========================================================
 */

const fs = require('fs');
const path = require('path');

// ── Snippets to inject ───────────────────────────────────
const CSS_LINK = '    <link rel="stylesheet" href="shop-style.css">';
const SHOP_LINK = '            <a href="shop.html">Shop</a>';
const CART_ICON = '        <div class="header-right"><a href="cart.html" class="cart-icon-wrap" title="View Cart"><i class="fas fa-shopping-cart"></i><span class="cart-badge">0</span></a></div>';
const CART_JS = '    <script src="cart.js"></script>';
const ENHANCER = '    <script src="product-enhancer.js"></script>';

// ── Helpers ──────────────────────────────────────────────
function inject(content, searchStr, insertAfter, snippet) {
    if (content.includes(snippet.trim())) return content; // already there
    const idx = content.indexOf(searchStr);
    if (idx === -1) return content;
    const pos = insertAfter ? idx + searchStr.length : idx;
    return content.slice(0, pos) + '\n' + snippet + content.slice(pos);
}

// ── Main ─────────────────────────────────────────────────
const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => /^products-.+\.html$/i.test(f));

let updated = 0;

files.forEach(file => {
    const fpath = path.join(dir, file);
    let content = fs.readFileSync(fpath, 'utf8');
    const before = content;

    // 1. shop-style.css after style.css
    content = inject(content,
        '<link rel="stylesheet" href="style.css">',
        true,
        CSS_LINK
    );

    // 2. Shop nav link after >Home</a>
    content = inject(content,
        '>Home</a>',
        true,
        SHOP_LINK
    );

    // 3. Cart icon before </header>
    if (!content.includes('cart-icon-wrap')) {
        content = content.replace(
            '    </header>',
            CART_ICON + '\n    </header>'
        );
    }

    // 4. cart.js before </body>
    content = inject(content, '</body>', false, CART_JS);

    // 5. product-enhancer.js before </body>
    content = inject(content, '</body>', false, ENHANCER);

    if (content !== before) {
        fs.writeFileSync(fpath, content, 'utf8');
        console.log('UPDATED:', file);
        updated++;
    } else {
        console.log('OK:     ', file);
    }
});

console.log(`\nDone! ${updated} file(s) updated out of ${files.length} total.`);
