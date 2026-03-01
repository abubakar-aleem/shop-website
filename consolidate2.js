const fs = require('fs');
let html = fs.readFileSync('products-gi.html', 'utf8');

const groups = [
    { name: 'IIL GI Pipe (EEEL)', find: /<div class="prod-item">\s*<div class="prod-img">[\s\S]*?<h3>IIL GI Pipe \(EEEL\) 1\/2"<\/h3>[\s\S]*?IIL GI Pipe \(EEEL\) 2-1\/2"<\/h3>[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/, newImage: 'pipe ss.png' },
    { name: 'IIL GI Pipe (EEL)', find: /<div class="prod-item">\s*<div class="prod-img">[\s\S]*?<h3>IIL GI Pipe \(EEL\) 1\/2"<\/h3>[\s\S]*?IIL GI Pipe \(EEL\) 2"<\/h3>[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/, newImage: 'pipe ss.png' },
    { name: 'IIL GI Pipe (EL)', find: /<div class="prod-item">\s*<div class="prod-img">[\s\S]*?<h3>IIL GI Pipe \(EL\) 1\/2"<\/h3>[\s\S]*?IIL GI Pipe \(EL\) 2"<\/h3>[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/, newImage: 'pipe ss.png' },
    { name: 'IIL GI Pipe (LIGHT)', find: /<div class="prod-item">\s*<div class="prod-img">[\s\S]*?<h3>IIL GI Pipe \(LIGHT\) 1\/2"<\/h3>[\s\S]*?IIL GI Pipe \(LIGHT\) 2"<\/h3>[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/, newImage: 'pipe ss.png' },
    { name: 'IIL GI Pipe (MEDIUM)', find: /<div class="prod-item">\s*<div class="prod-img">[\s\S]*?<h3>IIL GI Pipe \(MEDIUM\) 1\/2"<\/h3>[\s\S]*?IIL GI Pipe \(MEDIUM\) 2"<\/h3>[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/, newImage: 'pipe ss.png' },

    { name: 'GI Elbow', find: /<div class="prod-item">\s*<div class="prod-img">[\s\S]*?<h3>GI Elbow 1\/2"<\/h3>[\s\S]*?GI Elbow 2"<\/h3>[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/, newImage: 'elbow gi.jpeg' },
    { name: 'GI Tee', find: /<div class="prod-item">\s*<div class="prod-img">[\s\S]*?<h3>GI Tee 1\/2"<\/h3>[\s\S]*?GI Tee 2"<\/h3>[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/, newImage: 'tee.jpg' },
    { name: 'GI Socket', find: /<div class="prod-item">\s*<div class="prod-img">[\s\S]*?<h3>GI Socket 1\/2"<\/h3>[\s\S]*?GI Socket 2"<\/h3>[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/, newImage: 'socket.jpg' },
    { name: 'GI Union', find: /<div class="prod-item">\s*<div class="prod-img">[\s\S]*?<h3>GI Union 1\/2"<\/h3>[\s\S]*?GI Union 2"<\/h3>[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/, newImage: 'gi' },

    { name: 'GI Barel Nipple', find: /<div class="prod-item">\s*<div class="prod-img">[\s\S]*?<h3>GI Barel Nipple 1\/2"<\/h3>[\s\S]*?GI Barel Nipple 2"<\/h3>[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/, newImage: 'gi' },
    { name: 'GI Bend', find: /<div class="prod-item">\s*<div class="prod-img">[\s\S]*?<h3>GI Bend 1\/2"<\/h3>[\s\S]*?GI Bend 2"<\/h3>[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/, newImage: 'gi' },
    { name: 'GI Cross', find: /<div class="prod-item">\s*<div class="prod-img">[\s\S]*?<h3>GI Cross 1\/2"<\/h3>[\s\S]*?GI Cross 2"<\/h3>[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/, newImage: 'gi' },
    { name: 'GI Over-Cross', find: /<div class="prod-item">\s*<div class="prod-img">[\s\S]*?<h3>GI Over-Cross 1\/2"<\/h3>[\s\S]*?GI Over-Cross 2"<\/h3>[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/, newImage: 'gi' },

    { name: 'GI FM ELBOW', find: /<div class="prod-item">\s*<div class="prod-img">[\s\S]*?<h3>GI FM ELBOW 1\/2"<\/h3>[\s\S]*?GI FM ELBOW 2"<\/h3>[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/, newImage: 'gi' },
    { name: 'GI ELBOW 45°', find: /<div class="prod-item">\s*<div class="prod-img">[\s\S]*?<h3>GI ELBOW 45.* 1\/2"<\/h3>[\s\S]*?GI ELBOW 45.* 2"<\/h3>[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/, newImage: 'gi' },
    { name: 'GI End Cap', find: /<div class="prod-item">\s*<div class="prod-img">[\s\S]*?<h3>GI End Cap 1\/2"<\/h3>[\s\S]*?GI End Cap 2"<\/h3>[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/, newImage: 'gi' },
    { name: 'GI Plug', find: /<div class="prod-item">\s*<div class="prod-img">[\s\S]*?<h3>GI Plug 1\/2"<\/h3>[\s\S]*?GI Plug 1-1\/2"<\/h3>[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/, newImage: 'gi' },

    { name: 'GI Reducing Elbow', find: /<div class="prod-item">\s*<div class="prod-img">[\s\S]*?<h3>GI Reducing Elbow 1\/2" x 3\/4"<\/h3>[\s\S]*?GI Reducing Elbow 2" x 2-1\/2"<\/h3>[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/, newImage: 'gi' },
    { name: 'GI Reducing Tee', find: /<div class="prod-item">\s*<div class="prod-img">[\s\S]*?<h3>GI Reducing Tee 1\/2" x 3\/4"<\/h3>[\s\S]*?GI Reducing Tee 2" x 2-1\/2"<\/h3>[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/, newImage: 'gi' },
    { name: 'GI Reducing Socket', find: /<div class="prod-item">\s*<div class="prod-img">[\s\S]*?<h3>GI Reducing Socket 1\/2" x 3\/4"<\/h3>[\s\S]*?GI Reducing Socket 2" x 2-1\/2"<\/h3>[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/, newImage: 'gi' },
    { name: 'GI Reducing Bush', find: /<div class="prod-item">\s*<div class="prod-img">[\s\S]*?<h3>GI Reducing Bush 1\/2" x 3\/4"<\/h3>[\s\S]*?GI Reducing Bush 2" x 2-1\/2"<\/h3>[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/, newImage: 'gi' },
];

let fails = [];

groups.forEach(group => {
    let replaced = false;
    html = html.replace(group.find, (match) => {
        replaced = true;
        return `
            <div class="prod-item">
                <div class="prod-img"><img src="./${group.newImage}" alt="${group.name}"></div>
                <div class="prod-info">
                    <h3>${group.name}</h3>
                    <p>Selection of sizes available for ${group.name}</p>
                    <div class="prod-actions"><button class="btn" onclick="exploreMore('gi')">Contact for Details</button></div>
                </div>
            </div>
        </div>`;
        // Need to restore the closing tag of prod-grid which was consumed by \s*<\/div> at the end
    });

    if (!replaced) fails.push(group.name);
});

fs.writeFileSync('products-gi.html', html, 'utf8');
console.log('GI file consolidated! Fails:', fails.join(', '));
