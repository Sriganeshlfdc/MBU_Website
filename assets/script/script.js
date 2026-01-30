document.addEventListener("DOMContentLoaded", function () {
    const toggleBtn = document.querySelector('.toggle_btn');
    const toggleBtnIcon = document.querySelector('.toggle_btn i');
    const dropDownMenu = document.querySelector('.navlinks');

    if (toggleBtn) {
        toggleBtn.onclick = function () {
            dropDownMenu.classList.toggle('active');
            const isOpen = dropDownMenu.classList.contains('active');
            toggleBtnIcon.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
        };
    }

    document.onclick = function (e) {
        if (dropDownMenu && !dropDownMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
            if (dropDownMenu.classList.contains('active')) {
                dropDownMenu.classList.remove('active');
                if (toggleBtnIcon) toggleBtnIcon.className = 'fa-solid fa-bars';
            }
        }
    };

    const slideContainers = new Set();
    document.querySelectorAll('.img-slide').forEach(img => {
        slideContainers.add(img.parentElement);
    });

    slideContainers.forEach(container => {
        const slides = container.querySelectorAll('.img-slide');
        if (slides.length <= 1) return;

        let currentIndex = Array.from(slides).findIndex(s => s.classList.contains('active'));
        if (currentIndex === -1) {
            currentIndex = 0;
            slides[0].classList.add('active');
        }

        setInterval(() => {
            slides[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % slides.length;
            slides[currentIndex].classList.add('active');

            const yearBadge = container.querySelector('.year-overlap');
            if (yearBadge) {
                yearBadge.style.opacity = '0';
                setTimeout(() => {
                    const newYear = slides[currentIndex].getAttribute('data-year');
                    if (newYear) yearBadge.innerText = newYear;
                    yearBadge.style.opacity = '1';
                }, 500);
            }
        }, 3000);
    });

    const scrollObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, scrollObserverOptions);

    const hiddenElements = document.querySelectorAll('.scroll-animate, .reveal-slide-right, .reveal-slide-left, .animate-up');
    hiddenElements.forEach((el) => scrollObserver.observe(el));

    function setupInfiniteGallery() {
        const track = document.querySelector('.gallery-track');
        const originalStrip = document.querySelector('.gallery-strip');

        if (!track || !originalStrip) return;

        const clone = originalStrip.cloneNode(true);
        track.appendChild(clone);

        let currentScroll = 0;
        const speed = 0.5;
        let isHovered = false;

        let style = window.getComputedStyle(track);
        let gap = parseFloat(style.columnGap) || parseFloat(style.gap) || 0;
        let stripWidth = originalStrip.offsetWidth + gap;

        function animate() {
            if (!isHovered) {
                currentScroll -= speed;
                if (Math.abs(currentScroll) >= stripWidth) {
                    currentScroll = 0;
                }
                track.style.transform = `translateX(${currentScroll}px)`;
            }
            requestAnimationFrame(animate);
        }

        animate();

        track.addEventListener('mouseenter', () => { isHovered = true; });
        track.addEventListener('mouseleave', () => { isHovered = false; });

        window.addEventListener('resize', () => {
            style = window.getComputedStyle(track);
            gap = parseFloat(style.columnGap) || parseFloat(style.gap) || 0;
            stripWidth = originalStrip.offsetWidth + gap;
        });
    }

    setupInfiniteGallery();

    const donateDialog = document.querySelector(".donate-popup");
    const donateBtns = document.querySelectorAll(".open-donate-popup");

    if (donateDialog && donateBtns.length > 0) {
        donateBtns.forEach((btn) => {
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                donateDialog.showModal();
            });
        });

        donateDialog.addEventListener("click", (e) => {
            const rect = donateDialog.getBoundingClientRect();
            if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) {
                donateDialog.close();
            }
        });
    }

    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');

    if (status === 'success') {
        const successDialog = document.getElementById('success-dialog');
        if (successDialog) {
            successDialog.showModal();
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    } else if (status === 'error') {
        const errorDialog = document.getElementById('error-dialog');
        if (errorDialog) {
            errorDialog.showModal();
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }

    const statusDialogs = document.querySelectorAll("#success-dialog, #error-dialog");
    statusDialogs.forEach(dialog => {
        dialog.addEventListener("click", (e) => {
            const rect = dialog.getBoundingClientRect();
            if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) {
                dialog.close();
            }
        });
    });

    const counters = document.querySelectorAll('.province_content .number_count');
    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.innerText;
                let count = 0;
                const updateCount = () => {
                    const inc = target / 200;
                    if (count < target) {
                        count += inc;
                        counter.innerText = Math.ceil(count);
                        setTimeout(updateCount, 1);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCount();
                countObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(c => countObserver.observe(c));

    const horizonSection = document.querySelector('.horizons');
    if (horizonSection) {
        const bgSlides = horizonSection.querySelectorAll('.horizons-overlap .slide');
        const contentSlides = horizonSection.querySelectorAll('.slider-track .slide');
        const dotsContainer = document.getElementById('horizon-dots');
        const prevBtn = document.getElementById('horizon-prev');
        const nextBtn = document.getElementById('horizon-next');

        let currentHorizonIndex = 0;
        let slideInterval;

        function updateSlides() {
            const dots = dotsContainer.querySelectorAll('.dot');
            contentSlides.forEach((s, i) => {
                s.classList.toggle('active', i === currentHorizonIndex);
                if (bgSlides[i]) bgSlides[i].classList.toggle('active', i === currentHorizonIndex);
                if (dots[i]) dots[i].classList.toggle('active', i === currentHorizonIndex);
            });
        }

        if (contentSlides.length > 0) {
            dotsContainer.innerHTML = '';
            contentSlides.forEach((_, index) => {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                if (index === 0) dot.classList.add('active');
                dot.addEventListener('click', () => {
                    currentHorizonIndex = index;
                    updateSlides();
                    resetTimer();
                });
                dotsContainer.appendChild(dot);
            });

            function nextSlide() {
                currentHorizonIndex = (currentHorizonIndex + 1) % contentSlides.length;
                updateSlides();
            }

            function prevSlide() {
                currentHorizonIndex = (currentHorizonIndex - 1 + contentSlides.length) % contentSlides.length;
                updateSlides();
            }

            function startTimer() { slideInterval = setInterval(nextSlide, 5000); }
            function resetTimer() { clearInterval(slideInterval); startTimer(); }

            nextBtn.addEventListener('click', () => { nextSlide(); resetTimer(); });
            prevBtn.addEventListener('click', () => { prevSlide(); resetTimer(); });
            startTimer();
        }
    }
    });
    
    
document.addEventListener("DOMContentLoaded", function () {
    // ... existing code ...

    const locationSections = document.querySelectorAll('.location-containers');

    function showSection(targetId) {
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            locationSections.forEach(section => {
                section.classList.remove('active');
                section.style.display = 'none';
            });
            targetSection.classList.add('active');
            targetSection.style.display = 'block';
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    // Handle initial load if there is a hash (e.g., coming from index.php)
    if (window.location.hash) {
        const hashId = window.location.hash.substring(1);
        showSection(hashId);
    }

    // Updated click listener to catch all navigation attempts
    document.querySelectorAll('.location-navigation, .location-navbar a').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.includes('#')) {
                const targetId = href.split('#')[1];
                // Only prevent default and switch if we are already on location.php
                if (window.location.pathname.includes('location.php')) {
                    e.preventDefault();
                    showSection(targetId);
                    history.pushState(null, null, `#${targetId}`);
                }
            }
        });
    });
});
/*document.querySelectorAll('.year-btn').forEach(button => {
    button.addEventListener('click', () => {
        const targetId = button.getAttribute('data-target');

        document.querySelectorAll('.year-btn').forEach(btn => btn.classList.remove('active'));
        
        document.querySelectorAll('.year-content').forEach(content => content.classList.remove('active'));

        button.classList.add('active');
        document.getElementById(targetId).classList.add('active');
    });
});*/