
let currentSlide = 0;
let sliderInterval;
function showSlide(index) {
    const slidesContainer = document.querySelector('.slider-images');
    if (!slidesContainer) return;
    const slides = document.querySelectorAll('.slider-img');
    const dots = document.querySelectorAll('.slider-dot');

    slidesContainer.style.transform = `translateX(-${index * 100}%)`;

    slides.forEach((img, i) => {
        img.classList.toggle('active', i === index);
    });
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
    currentSlide = index;
}
function moveSlider(dir) {
    const slides = document.querySelectorAll('.slider-img');
    let next = (currentSlide + dir + slides.length) % slides.length;
    showSlide(next);
    resetSliderInterval();
}
function goToSlide(index) {
    showSlide(index);
    resetSliderInterval();
}
function autoSlide() {
    const slidesContainer = document.querySelector('.slider-images');
    if (!slidesContainer) return;
    sliderInterval = setInterval(() => {
        moveSlider(1);
    }, 4500);
}
function resetSliderInterval() {
    clearInterval(sliderInterval);
    autoSlide();
}
window.addEventListener('DOMContentLoaded', () => {
    showSlide(0);
    autoSlide();
});


function showPage(pageId) {
    if (pageId === 'home') {
        window.location.href = 'index.html';
    } else {
        window.location.href = pageId + '.html';
    }
}

function openSub(key) {
    const mapping = {
        'pprc-pvc': 'sub-pprc-pvc',
        'faucets': 'sub-faucets',
        'sanitary': 'sub-sanitary',
        'tanks': 'sub-tanks',
        'ladder': 'sub-ladder',
        'gas': 'sub-gas',
        'mirror-accessory': 'sub-mirror-accessory',
        'door-locks': 'sub-door-locks',
        'manhole-covers': 'sub-manhole-covers',
        'garden': 'sub-garden-pipes'
    };
    const target = mapping[key];
    if (target) showPage(target);
}

function toggleMenu() {
    const menu = document.getElementById('navMenu');
    if (menu) menu.classList.toggle('show');
}

function toggleFaq(element) {
    element.parentElement.classList.toggle('open');
}

function exploreMore(category) {
    alert('To see more products in the ' + category.toUpperCase() + ' collection, please contact us on WhatsApp or visit the store.');
}


document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname.split('/').pop().replace('.html', '');
    const pageId = currentPath || 'home';
    let navTarget = (pageId === 'home' || pageId === 'index') ? 'home' : (['about', 'faq', 'contact'].includes(pageId) ? pageId : 'products');

    document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
    const nav = document.querySelector('nav a[data-page="' + navTarget + '"]');
    if (nav) nav.classList.add('active');
});

// Search functionality
document.addEventListener('DOMContentLoaded', () => {
    // Inject Search Modal UX dynamically to avoid editing all HTML pages
    const searchContainer = document.querySelector('.search-container');
    let searchToggleBtn = null;
    let searchModal = null;

    if (searchContainer && searchContainer.parentNode) {
        // Create toggle icon for header
        searchToggleBtn = document.createElement('i');
        searchToggleBtn.className = 'fas fa-search header-search-toggle';
        searchToggleBtn.title = 'Search products for...';

        // Insert toggle before the container
        searchContainer.parentNode.insertBefore(searchToggleBtn, searchContainer);

        // Create modal wrapper
        searchModal = document.createElement('div');
        searchModal.id = 'searchModal';
        searchModal.className = 'search-modal';

        const modalContent = document.createElement('div');
        modalContent.className = 'search-modal-content';

        const closeBtn = document.createElement('span');
        closeBtn.className = 'close-search';
        closeBtn.innerHTML = '&times;';

        const modalInner = document.createElement('div');
        modalInner.className = 'search-modal-inner';

        // Move container inside modal
        modalContent.appendChild(closeBtn);
        modalContent.appendChild(searchContainer);
        searchModal.appendChild(modalContent);
        document.body.appendChild(searchModal);

        // Event listeners for open/close
        const searchInput = document.getElementById('searchInput');
        if (searchInput) searchInput.placeholder = 'Search for products...';

        searchToggleBtn.addEventListener('click', () => {
            searchModal.classList.add('active');
            setTimeout(() => { if (searchInput) searchInput.focus(); }, 100);
        });

        const closeModal = () => {
            searchModal.classList.remove('active');
            if (searchInput) {
                searchInput.value = '';
                searchInput.dispatchEvent(new Event('input')); // trigger clean up
            }
        };

        closeBtn.addEventListener('click', closeModal);
        searchModal.addEventListener('click', (e) => {
            if (e.target === searchModal) closeModal();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && searchModal.classList.contains('active')) {
                closeModal();
            }
        });
    }

    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const searchIcon = document.getElementById('searchIcon');
    const loadingIcon = document.getElementById('loadingIcon');
    let currentFocus = -1;
    let searchTimeout = null;

    if (!searchInput || !searchResults) return;

    searchInput.addEventListener('input', function () {
        const val = this.value.trim();
        closeAllLists();
        clearTimeout(searchTimeout);

        if (!val) {
            if (searchIcon) searchIcon.style.display = 'block';
            if (loadingIcon) loadingIcon.style.display = 'none';
            return;
        }

        if (searchIcon) searchIcon.style.display = 'none';
        if (loadingIcon) loadingIcon.style.display = 'block';

        searchTimeout = setTimeout(() => {
            performSearch(val);
        }, 250);
    });

    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    function highlightText(text, term) {
        if (!term) return text;
        const regex = new RegExp(`(${escapeRegExp(term)})`, 'gi');
        return text.replace(regex, '<span class="search-highlight">$1</span>');
    }

    function performSearch(query) {
        if (loadingIcon) loadingIcon.style.display = 'none';
        if (searchIcon) searchIcon.style.display = 'block';

        currentFocus = -1;
        const qLower = query.toLowerCase();

        let results = [];
        if (typeof searchIndex !== 'undefined') {
            results = searchIndex.filter(item =>
                (item.name && item.name.toLowerCase().includes(qLower)) ||
                (item.category && item.category.toLowerCase().includes(qLower)) ||
                (item.desc && item.desc.toLowerCase().includes(qLower))
            );
        }

        results = results.slice(0, 50);

        searchResults.innerHTML = '';
        searchResults.style.display = 'block';

        if (results.length === 0) {
            const noRes = document.createElement('div');
            noRes.classList.add('search-no-result');
            noRes.innerHTML = `<strong>No Product Found</strong><br><span style="font-size:0.85rem;">Please try another keyword.</span>`;
            searchResults.appendChild(noRes);
            return;
        }

        results.forEach(res => {
            const itemDiv = document.createElement('a');
            itemDiv.classList.add('search-result-item');
            itemDiv.href = res.url;

            const hlName = highlightText(res.name, query);
            const hlCat = highlightText(res.category, query);
            const hlDesc = highlightText(res.desc, query);

            let imgHtml = '';
            let imgSrc = res.image;
            if (imgSrc) {
                imgHtml = `<img src="${imgSrc}" alt="" class="search-result-img" onerror="this.src='https://via.placeholder.com/45?text=Img'">`;
            }

            let descHtml = res.desc ? `<div class="search-result-category" style="margin-top:2px;">${hlDesc}</div>` : '';

            itemDiv.innerHTML = `
                ${imgHtml}
                <div class="search-result-info">
                    <div class="search-result-name">${hlName}</div>
                    <div class="search-result-category">${hlCat}</div>
                    ${descHtml}
                </div>
            `;

            searchResults.appendChild(itemDiv);
        });
    }

    searchInput.addEventListener('keydown', function (e) {
        let x = searchResults.getElementsByClassName('search-result-item');
        if (e.keyCode === 40) {
            currentFocus++;
            addActive(x);
            e.preventDefault();
        } else if (e.keyCode === 38) {
            currentFocus--;
            addActive(x);
            e.preventDefault();
        } else if (e.keyCode === 13) {
            e.preventDefault();
            if (currentFocus > -1) {
                if (x && x[currentFocus]) x[currentFocus].click();
            } else if (x && x.length > 0) {
                x[0].click();
            }
        }
    });

    function addActive(x) {
        if (!x || x.length === 0) return false;
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        x[currentFocus].classList.add('selected');
        x[currentFocus].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }

    function removeActive(x) {
        for (let i = 0; i < x.length; i++) {
            x[i].classList.remove('selected');
        }
    }

    function closeAllLists(elmnt) {
        if (elmnt !== searchInput) {
            searchResults.style.display = 'none';
        }
    }

    document.addEventListener('click', function (e) {
        if (e.target !== searchInput && e.target !== searchResults && !searchResults.contains(e.target)) {
            closeAllLists();
        }
    });

    searchInput.addEventListener('focus', function () {
        if (this.value.trim() && searchResults.innerHTML !== '') {
            searchResults.style.display = 'block';
        }
    });

    // Handle initial state if opened without input
    if (searchIcon) searchIcon.style.display = 'block';
    if (loadingIcon) loadingIcon.style.display = 'none';
});

