const fs = require('fs');
const path = require('path');

const dir = 'c:\\\\Users\\\\lenovo\\\\Desktop\\\\web shop\\\\shoppic';

const replaceRegex = /<li><a href="#">Popular Pipes<\/a><\/li>\s*<li><a href="#">Dura Flow<\/a><\/li>\s*<li><a href="#">Turk Plast<\/a><\/li>\s*<li><a href="#">IIL<\/a><\/li>/g;

const replaceStr = `<li><a onclick="showPage('products-pprc-popular')" style="cursor: pointer;">Popular Pipes</a></li>
                    <li><a onclick="showPage('products-pprc-dura')" style="cursor: pointer;">Dura Flow</a></li>
                    <li><a onclick="showPage('products-pprc-turkplast')" style="cursor: pointer;">Turk Plast</a></li>
                    <li><a onclick="showPage('products-pprc-iil')" style="cursor: pointer;">IIL</a></li>`;

fs.readdirSync(dir).forEach(file => {
    if (!file.endsWith('.html')) return;
    const p = path.join(dir, file);
    const c = fs.readFileSync(p, 'utf8');
    if (c.match(replaceRegex)) {
        fs.writeFileSync(p, c.replace(replaceRegex, replaceStr));
        console.log('Updated: ' + file);
    }
});

console.log('Done');
