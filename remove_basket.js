const fs = require('fs');
const path = require('path');

const directoryPath = 'c:\\Users\\lenovo\\Desktop\\web shop\\shoppic';

function removeShoppingBasket(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Pattern to match the header-icons div containing fa-shopping-basket
    // Note: In products-gi.html it looked like:
    /*
    <div class="header-icons">
        <span>
            <i class="fas fa-shopping-basket"></i>
            <span class="cart-badge">0</span>
        </span>
    </div>
    */

    const pattern = /<div class="header-icons">\s*<span>\s*<i class="fas fa-shopping-basket"><\/i>\s*<span class="cart-badge">\d+<\/span>\s*<\/span>\s*<\/div>/g;

    if (pattern.test(content)) {
        const newContent = content.replace(pattern, '');
        fs.writeFileSync(filePath, newContent, 'utf8');
        return true;
    }
    return false;
}

const files = fs.readdirSync(directoryPath);
let count = 0;

files.forEach(file => {
    if (file.endsWith('.html')) {
        const fullPath = path.join(directoryPath, file);
        if (removeShoppingBasket(fullPath)) {
            console.log(`Updated: ${file}`);
            count++;
        }
    }
});

console.log(`Total files updated: ${count}`);
