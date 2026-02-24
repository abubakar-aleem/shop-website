const fs = require('fs');
const path = require('path');
const dir = 'c:\\\\Users\\\\lenovo\\\\Desktop\\\\web shop\\\\shoppic';

const replaceRegex1 = /<li><a href="#">Popular Pipes<\/a><\/li>\s*<li><a href="#">Dura Flow<\/a><\/li>\s*<li><a href="#">Turk Plast<\/a><\/li>\s*<li><a href="#">IIL<\/a><\/li>/g;
const replaceRegex2 = /<li><a onclick="showPage\('products-pprc-popular'\)" style="cursor: pointer;">Popular Pipes<\/a><\/li>\s*<li><a onclick="showPage\('products-pprc-dura'\)" style="cursor: pointer;">Dura Flow<\/a><\/li>\s*<li><a onclick="showPage\('products-pprc-turkplast'\)" style="cursor: pointer;">Turk Plast<\/a><\/li>\s*<li><a onclick="showPage\('products-pprc-iil'\)" style="cursor: pointer;">IIL<\/a><\/li>/g;

const replaceStr = `<li><a onclick="showPage('partner-popular')" style="cursor: pointer;">Popular Pipes</a></li>
                    <li><a onclick="showPage('partner-dura')" style="cursor: pointer;">Dura Flow</a></li>
                    <li><a onclick="showPage('partner-turkplast')" style="cursor: pointer;">Turk Plast</a></li>
                    <li><a onclick="showPage('partner-iil')" style="cursor: pointer;">IIL</a></li>`;

fs.readdirSync(dir).forEach(file => {
    if (!file.endsWith('.html')) return;
    const p = path.join(dir, file);
    let c = fs.readFileSync(p, 'utf8');
    let changed = false;

    if (c.match(replaceRegex1)) {
        c = c.replace(replaceRegex1, replaceStr);
        changed = true;
    }
    if (c.match(replaceRegex2)) {
        c = c.replace(replaceRegex2, replaceStr);
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(p, c);
        console.log('Updated footer in: ' + file);
    }
});
console.log('All footers updated.');
