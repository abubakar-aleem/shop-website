const fs = require('fs');
const path = require('path');

const dir = 'c:\\\\Users\\\\lenovo\\\\Desktop\\\\web shop\\\\shoppic';

function updatePage(filename, oldId, newId, title) {
    const file = path.join(dir, filename);
    if (!fs.existsSync(file)) return;

    let content = fs.readFileSync(file, 'utf8');

    // Update ID
    content = content.replace(new RegExp(`id="${oldId}"`, 'g'), `id="${newId}"`);

    // Add breadcrumb above H1
    const breadcrumbHtml = `<div class="breadcrumb" style="text-align: center; margin-bottom: 15px; color: var(--medium-gray); font-size: 0.9rem;">
                <span onclick="showPage('home')" style="cursor: pointer;">Home</span> > 
                <span onclick="showPage('products')" style="cursor: pointer;">Products</span> > 
                <span style="color: var(--primary-teal);">${title}</span>
            </div>
            <h1>`;

    if (!content.includes('class="breadcrumb"')) {
        content = content.replace(/<h1>/, breadcrumbHtml);
    }

    // Update button text and function args
    content = content.replace(/exploreMore\('faucet'\)/g, `exploreMore('${title.toLowerCase()}')`);
    content = content.replace(/>Explore\s*More</g, ">View Details<");

    fs.writeFileSync(file, content);
    console.log(`Updated standalone page: ${filename}`);
}

updatePage('products-floor-waste.html', 'products-faucet-floor-waste', 'products-floor-waste', 'Floor Waste');
