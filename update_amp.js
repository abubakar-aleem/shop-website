const fs = require('fs');
const path = require('path');

const file = 'c:\\\\Users\\\\lenovo\\\\Desktop\\\\web shop\\\\shoppic\\\\products-automatic-machine-pipe.html';
let content = fs.readFileSync(file, 'utf8');

// Update ID
content = content.replace(/id="products-faucet-automatic-machine pipe"/g, 'id="products-automatic-machine-pipe"');

// Add breadcrumb above H1
const breadcrumbHtml = `<div class="breadcrumb" style="text-align: center; margin-bottom: 15px; color: var(--medium-gray); font-size: 0.9rem;">
                <span onclick="showPage('home')" style="cursor: pointer;">Home</span> > 
                <span onclick="showPage('products')" style="cursor: pointer;">Products</span> > 
                <span style="color: var(--primary-teal);">Automatic Machine Pipe</span>
            </div>
            <h1>`;

content = content.replace(/<h1>/, breadcrumbHtml);

// Update button text and function args
content = content.replace(/exploreMore\('faucet'\)/g, "exploreMore('automatic machine pipe')");
content = content.replace(/>Explore\s*More</g, ">View Details<");

fs.writeFileSync(file, content);
console.log('Updated standalone page');
