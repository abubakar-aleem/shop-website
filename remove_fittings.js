const fs = require('fs');
const file = 'products-pvc-popular-pipes.html';
let html = fs.readFileSync(file, 'utf8');

const startStr = '            <!-- UPVC PRESSURE PIPE FITTINGS -->';
const endStr = '        </div>\r\n    </div>\r\n\r\n    <!--';
const startIdx = html.indexOf(startStr);
let endIdx = html.indexOf(endStr, startIdx);

if (endIdx === -1) {
    endIdx = html.indexOf('        </div>\n    </div>\n\n    <!--', startIdx);
}

if (startIdx !== -1 && endIdx !== -1) {
    html = html.substring(0, startIdx) + html.substring(endIdx);
    fs.writeFileSync(file, html);
    console.log('Successfully removed UPVC Pressure Pipe Fittings.');
} else {
    console.log('Unable to find bounds.', startIdx, endIdx);
}
