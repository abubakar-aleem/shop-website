const fs = require('fs');
let html = fs.readFileSync('products-gi.html', 'utf8');

const regexMap = [
    { name: 'IIL GI Pipe (EEEL)', pattern: /<div class="prod-item">[\s\S]*?<h3>IIL GI Pipe \(EEEL\)[\s\S]*?<\/div>\s*<\/div>/g },
    { name: 'IIL GI Pipe (EEL)', pattern: /<div class="prod-item">[\s\S]*?<h3>IIL GI Pipe \(EEL\)[\s\S]*?<\/div>\s*<\/div>/g },
    { name: 'IIL GI Pipe (EL)', pattern: /<div class="prod-item">[\s\S]*?<h3>IIL GI Pipe \(EL\)[\s\S]*?<\/div>\s*<\/div>/g },
    { name: 'IIL GI Pipe (Light)', pattern: /<div class="prod-item">[\s\S]*?<h3>IIL GI Pipe \(Light\)[\s\S]*?<\/div>\s*<\/div>/g },
    { name: 'IIL GI Pipe (Medium)', pattern: /<div class="prod-item">[\s\S]*?<h3>IIL GI Pipe \(Medium\)[\s\S]*?<\/div>\s*<\/div>/g },
    { name: 'GI Elbow', pattern: /<div class="prod-item">[\s\S]*?<h3>GI Elbow[\s\S]*?<\/div>\s*<\/div>/g },
    { name: 'GI Tee', pattern: /<div class="prod-item">[\s\S]*?<h3>GI Tee[\s\S]*?<\/div>\s*<\/div>/g },
    { name: 'GI Socket', pattern: /<div class="prod-item">[\s\S]*?<h3>GI Socket[\s\S]*?<\/div>\s*<\/div>/g },
    { name: 'GI Union', pattern: /<div class="prod-item">[\s\S]*?<h3>GI Union[\s\S]*?<\/div>\s*<\/div>/g },
    { name: 'GI Barel Nipple', pattern: /<div class="prod-item">[\s\S]*?<h3>GI Barel Nipple[\s\S]*?<\/div>\s*<\/div>/g },
    { name: 'GI Bend', pattern: /<div class="prod-item">[\s\S]*?<h3>GI Bend[\s\S]*?<\/div>\s*<\/div>/g },
    { name: 'GI Cross', pattern: /<div class="prod-item">[\s\S]*?<h3>GI Cross[\s\S]*?<\/div>\s*<\/div>/g },
    { name: 'GI Over-Cross', pattern: /<div class="prod-item">[\s\S]*?<h3>GI Over-Cross[\s\S]*?<\/div>\s*<\/div>/g }
];

regexMap.forEach(group => {
    let matches = html.match(group.pattern);
    if (!matches) return;

    let consolidated = `
            <div class="prod-item">
                <div class="prod-img"><img src="./" alt="${group.name}"></div>
                <div class="prod-info">
                    <h3>${group.name}</h3>
                    <p>Sizes: 1/2", 3/4", 1", 1-1/4", 1-1/2", 2"</p>
                    <div class="prod-actions"><button class="btn" onclick="exploreMore('gi')">Contact for Details</button></div>
                </div>
            </div>`;

    // store first to replace and delete others
    const firstMatch = matches[0];
    let replacedFirst = false;

    html = html.replace(group.pattern, (match) => {
        if (!replacedFirst) {
            replacedFirst = true;
            return consolidated;
        }
        return '';
    });
});

fs.writeFileSync('products-gi.html', html, 'utf8');
console.log('GI file consolidated!');
