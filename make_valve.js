const fs = require('fs');

const file = 'products-brass-gate-valve.html';
let html = fs.readFileSync('products-floor-waste.html', 'utf8');

// Update Titles and Breadcrumbs
html = html.replace(/<span style="color: var\(--primary-teal\);">Floor Waste<\/span>/g, '<span style="color: var(--primary-teal);">Brass Gate Valve</span>');
html = html.replace(/<h1>Floor Waste<\/h1>/g, '<h1>Brass Gate Valve</h1>');
html = html.replace(/<p>Premium Floor Drains in Stainless Steel and PVC<\/p>/g, '<p>Heavy Duty Brass Gate Valves</p>');
html = html.replace(/id="products-floor-waste"/g, 'id="products-brass-gate-valve"');

// Replace the entire product grid area from <div style="padding: 0 5%;"> to <!-- waste pipe Complete -->
const startMarker = '<div style="padding: 0 5%;">';
const endMarker = '<!-- waste pipe Complete -->';

const startIndex = html.indexOf(startMarker);
const endIndex = html.indexOf(endMarker);

if (startIndex !== -1 && endIndex !== -1) {
    const newContent = `
        <div style="padding: 0 5%;">

            <!-- BRASS GATE VALVE -->
            <h1 style="color: var(--dark); margin: 30px 0 20px; border-bottom: 3px solid var(--primary); display: inline-block;">Brass Gate Valve</h1>
            <div class="prod-grid">
                
                <div class="prod-item">
                    <div class="prod-img"><img src="https://via.placeholder.com/400x300?text=Brass+Gate+Valve" alt="Brass Gate Valve 1/2 inch"></div>
                    <div class="prod-info">
                        <h3>1/2" Brass Gate Valve</h3>
                        <p>High quality heavy duty brass gate valve for 1/2" pipe connections.</p>
                        <div class="prod-actions"><button class="btn" onclick="exploreMore('brass gate valve')">View Details</button></div>
                    </div>
                </div>

                <div class="prod-item">
                    <div class="prod-img"><img src="https://via.placeholder.com/400x300?text=Brass+Gate+Valve" alt="Brass Gate Valve 3/4 inch"></div>
                    <div class="prod-info">
                        <h3>3/4" Brass Gate Valve</h3>
                        <p>High quality heavy duty brass gate valve for 3/4" pipe connections.</p>
                        <div class="prod-actions"><button class="btn" onclick="exploreMore('brass gate valve')">View Details</button></div>
                    </div>
                </div>

                <div class="prod-item">
                    <div class="prod-img"><img src="https://via.placeholder.com/400x300?text=Brass+Gate+Valve" alt="Brass Gate Valve 1 inch"></div>
                    <div class="prod-info">
                        <h3>1" Brass Gate Valve</h3>
                        <p>High quality heavy duty brass gate valve for 1" pipe connections.</p>
                        <div class="prod-actions"><button class="btn" onclick="exploreMore('brass gate valve')">View Details</button></div>
                    </div>
                </div>

                <div class="prod-item">
                    <div class="prod-img"><img src="https://via.placeholder.com/400x300?text=Brass+Gate+Valve" alt="Brass Gate Valve 1-1/4 inch"></div>
                    <div class="prod-info">
                        <h3>1-1/4" Brass Gate Valve</h3>
                        <p>High quality heavy duty brass gate valve for 1-1/4" pipe connections.</p>
                        <div class="prod-actions"><button class="btn" onclick="exploreMore('brass gate valve')">View Details</button></div>
                    </div>
                </div>

                <div class="prod-item">
                    <div class="prod-img"><img src="https://via.placeholder.com/400x300?text=Brass+Gate+Valve" alt="Brass Gate Valve 1-1/2 inch"></div>
                    <div class="prod-info">
                        <h3>1-1/2" Brass Gate Valve</h3>
                        <p>High quality heavy duty brass gate valve for 1-1/2" pipe connections.</p>
                        <div class="prod-actions"><button class="btn" onclick="exploreMore('brass gate valve')">View Details</button></div>
                    </div>
                </div>

                <div class="prod-item">
                    <div class="prod-img"><img src="https://via.placeholder.com/400x300?text=Brass+Gate+Valve" alt="Brass Gate Valve 2 inch"></div>
                    <div class="prod-info">
                        <h3>2" Brass Gate Valve</h3>
                        <p>High quality heavy duty brass gate valve for 2" pipe connections.</p>
                        <div class="prod-actions"><button class="btn" onclick="exploreMore('brass gate valve')">View Details</button></div>
                    </div>
                </div>

            </div>
        </div>
    `;

    html = html.substring(0, startIndex) + newContent + html.substring(endIndex);
    fs.writeFileSync(file, html);
    console.log('Successfully updated to Brass Gate Valves.');
} else {
    console.log('Error: Could not find markers to replace content.');
}
