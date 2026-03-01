const fs = require('fs');
const path = require('path');

const dir = 'c:\\\\Users\\\\lenovo\\\\Desktop\\\\web shop\\\\shoppic';

const searchHtml = `</nav>
        <div class="search-container">
            <input type="text" id="searchInput" placeholder="Search for products (PPRC, PVC, GI, Faucets, Basin...)" autocomplete="off">
            <i class="fas fa-search search-icon" id="searchIcon"></i>
            <span class="loading-icon" id="loadingIcon"><i class="fas fa-spinner"></i></span>
            <div class="search-results-dropdown" id="searchResults"></div>
        </div>
        <div class="header-icons">`;

fs.readdirSync(dir).forEach(file => {
    if (!file.endsWith('.html')) return;
    const p = path.join(dir, file);
    let c = fs.readFileSync(p, 'utf8');

    // Add search bar HTML
    if (!c.includes('search-container')) {
        c = c.replace(/<\/nav>\s*<div class="header-icons">/, searchHtml);
    }

    // Add script tag for searchData.js
    if (!c.includes('searchData.js')) {
        c = c.replace(/<script src="script\.js"><\/script>/, '<script src="searchData.js"></script>\n    <script src="script.js"></script>');
    }

    fs.writeFileSync(p, c);
    console.log('Updated: ' + file);
});

console.log('Done');
