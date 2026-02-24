const fs = require('fs');
const path = require('path');
const dir = 'c:\\\\Users\\\\lenovo\\\\Desktop\\\\web shop\\\\shoppic';

const templateRaw = fs.readFileSync(path.join(dir, 'sub-pprc-pvc.html'), 'utf8');

function createPage(filename, id, title, subtitle, cardsHtml) {
    const pageContent = `
        <div id="${id}" class="page-section active">
        <div class="products-header">
            <h1 class="section-title" style="text-align: center; margin: 0 auto 1.5rem;">${title}</h1>
            <p style="color: var(--medium-gray);">${subtitle}</p>
        </div>
        <div class="section-padding">
            <div class="product-grid">
                ${cardsHtml}
            </div>
        </div>
    </div>
    `;

    const prefix = templateRaw.split('<div id="sub-pprc-pvc"')[0];

    let suffix;
    if (templateRaw.includes('<!-- PPRC Companies Selector -->')) {
        suffix = '    <!-- Partner Footer -->\n' + templateRaw.split('<!-- PPRC Companies Selector -->')[1];
    } else {
        suffix = '<footer>' + templateRaw.split('<footer>')[1];
    }

    const fullHtml = prefix + pageContent + suffix;
    fs.writeFileSync(path.join(dir, filename), fullHtml);
    console.log('Created ' + filename);
}

const popularCards = `
                <div class="product-card" onclick="showPage('sub-pvc-popular-categories')">
                    <div class="product-image-container">
                        <img src="./pvc pipe.jpg" alt="PVC" class="product-image">
                    </div>
                    <div class="product-card-info">
                        <h3>Popular PVC</h3>
                        <p class="subtitle">UPVC Pipes, Fittings & Electrical</p>
                    </div>
                    <button class="btn btn-primary">Select PVC</button>
                </div>
                <div class="product-card" onclick="showPage('products-pprc-popular')">
                    <div class="product-image-container">
                        <img src="./pprc pipes.jpeg" alt="PPRC" class="product-image">
                    </div>
                    <div class="product-card-info">
                        <h3>Popular PPRC</h3>
                        <p class="subtitle">Heat-resistant pipe solutions</p>
                    </div>
                    <button class="btn btn-primary">Select PPRC</button>
                </div>
`;

const duraCards = `
                <div class="product-card" onclick="showPage('products-pvc-dura')">
                    <div class="product-image-container">
                        <img src="./pvc pipe.jpg" alt="PVC" class="product-image">
                    </div>
                    <div class="product-card-info">
                        <h3>Dura Flow PVC</h3>
                        <p class="subtitle">UPVC for drainage & plumbing</p>
                    </div>
                    <button class="btn btn-primary">Select PVC</button>
                </div>
                <div class="product-card" onclick="showPage('products-pprc-dura')">
                    <div class="product-image-container">
                        <img src="./pprc pipes.jpeg" alt="PPRC" class="product-image">
                    </div>
                    <div class="product-card-info">
                        <h3>Dura Flow PPRC</h3>
                        <p class="subtitle">Heat-resistant pipe solutions</p>
                    </div>
                    <button class="btn btn-primary">Select PPRC</button>
                </div>
                <div class="product-card" onclick="showPage('products-tanks-dura')">
                    <div class="product-image-container">
                        <img src="./water-tank dura.webp" alt="Water Tanks" class="product-image">
                    </div>
                    <div class="product-card-info">
                        <h3>Dura Water Tanks</h3>
                        <p class="subtitle">Durable water storage tanks</p>
                    </div>
                    <button class="btn btn-primary">Select Tanks</button>
                </div>
                <div class="product-card" onclick="showPage('products-garden-dura')">
                    <div class="product-image-container">
                        <img src="./dura_garden_pipe.png" alt="Garden Pipes" class="product-image">
                    </div>
                    <div class="product-card-info">
                        <h3>Dura Garden Pipes</h3>
                        <p class="subtitle">Flexible garden hoses</p>
                    </div>
                    <button class="btn btn-primary">Select Garden Pipes</button>
                </div>
`;

const turkplastCards = `
                <div class="product-card" onclick="showPage('products-pvc-turkplast')">
                    <div class="product-image-container">
                        <img src="./turk pvc.jpeg" alt="PVC" class="product-image">
                    </div>
                    <div class="product-card-info">
                        <h3>Turk Plast PVC</h3>
                        <p class="subtitle">Premium UPVC fittings</p>
                    </div>
                    <button class="btn btn-primary">Select PVC</button>
                </div>
                <div class="product-card" onclick="showPage('products-pprc-turkplast')">
                    <div class="product-image-container">
                        <img src="./turk pprc.jpeg" alt="PPRC" class="product-image">
                    </div>
                    <div class="product-card-info">
                        <h3>Turk Plast PPRC</h3>
                        <p class="subtitle">Premium PPRC systems</p>
                    </div>
                    <button class="btn btn-primary">Select PPRC</button>
                </div>
`;

const iilCards = `
                <div class="product-card" onclick="showPage('products-pvc-iil')">
                    <div class="product-image-container">
                        <img src="./pvc pipe.jpg" alt="PVC" class="product-image">
                    </div>
                    <div class="product-card-info">
                        <h3>IIL PVC</h3>
                        <p class="subtitle">Industrial grade PVC</p>
                    </div>
                    <button class="btn btn-primary">Select PVC</button>
                </div>
                <div class="product-card" onclick="showPage('products-pprc-iil')">
                    <div class="product-image-container">
                        <img src="./pprc pipes.jpeg" alt="PPRC" class="product-image">
                    </div>
                    <div class="product-card-info">
                        <h3>IIL PPRC</h3>
                        <p class="subtitle">Industrial grade PPRC</p>
                    </div>
                    <button class="btn btn-primary">Select PPRC</button>
                </div>
`;

createPage('partner-popular.html', 'partner-popular', 'Popular Pipes', 'Choose a product category by Popular Pipes', popularCards);
createPage('partner-dura.html', 'partner-dura', 'Dura Flow', 'Choose a product category by Dura Flow', duraCards);
createPage('partner-turkplast.html', 'partner-turkplast', 'Turk Plast', 'Choose a product category by Turk Plast', turkplastCards);
createPage('partner-iil.html', 'partner-iil', 'International Industries Limited (IIL)', 'Choose a product category by IIL', iilCards);
