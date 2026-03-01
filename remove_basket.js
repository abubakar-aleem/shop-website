const fs = require('fs');
const path = require('path');

const dir = 'c:\\\\Users\\\\lenovo\\\\Desktop\\\\web shop\\\\shoppic';

const regex = /<div class="header-icons">\s*<span>\s*<i class="fas fa-shopping-basket"><\/i>\s*<span class="cart-badge">0<\/span>\s*<\/span>\s*<\/div>/g;

fs.readdirSync(dir).forEach(file => {
    if (!file.endsWith('.html')) return;

    const p = path.join(dir, file);
    let original = fs.readFileSync(p, 'utf8');

    if (regex.test(original)) {
        let updated = original.replace(regex, '');
        fs.writeFileSync(p, updated);
        console.log('Removed from: ' + file);
    }
});
console.log('Done');
