
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

