const fs = require('fs');
const path = require('path');

const dir = 'c:\\\\Users\\\\lenovo\\\\Desktop\\\\web shop\\\\shoppic';
let searchIndex = [];

fs.readdirSync(dir).forEach(file => {
    if (!file.endsWith('.html') || file === 'index.html' || file === 'websiteorig.html' || !file.includes('products')) return;
    const content = fs.readFileSync(path.join(dir, file), 'utf8');

    const h1Match = content.match(/<h[12][^>]*>([^<]+)<\/h[12]>/);
    let category = h1Match ? h1Match[1].trim() : file.replace('.html', '').replace('products-', '').replace(/-/g, ' ');

    const prodRegex = /<div class="prod-item">[\s\S]*?<img[^>]*src="([^"]+)"[\s\S]*?<h[34]>([^<]+)<\/h[34]>(?:[\s\S]*?<p[^>]*>([\s\S]*?)<\/p>)?/g;
    let match;
    while ((match = prodRegex.exec(content)) !== null) {
        let img = match[1];
        let name = match[2].trim();
        let desc = match[3] ? match[3].replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim() : '';
        searchIndex.push({
            name: name,
            desc: desc, // Includes Size/Details
            category: category,
            image: img,
            url: file
        });
    }
});

// Deduplicate using name AND desc AND url
let uniqueItems = [];
let seen = new Set();
searchIndex.forEach(item => {
    let key = item.name + '|' + item.desc + '|' + item.url;
    if (!seen.has(key)) {
        seen.add(key);
        uniqueItems.push(item);
    }
});

fs.writeFileSync(path.join(dir, 'searchData.js'), 'const searchIndex = ' + JSON.stringify(uniqueItems, null, 2) + ';');
console.log('Indexed ' + uniqueItems.length + ' products.');
