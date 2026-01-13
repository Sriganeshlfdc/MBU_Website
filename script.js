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

    function startSlideshow(container) {
        if (container.dataset.intervalId) return;

        const slides = container.querySelectorAll('.slide');
        const yearBadge = container.querySelector('.year-overlap');

        if (slides.length <= 1) return;

        let currentIndex = Array.from(slides).findIndex(s => s.classList.contains('active'));
        if (currentIndex === -1) currentIndex = 0;

        const intervalId = setInterval(() => {
            slides[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % slides.length;
            const nextSlide = slides[currentIndex];
            nextSlide.classList.add('active');

            if (yearBadge) {
                yearBadge.style.opacity = '0';
                setTimeout(() => {
                    const newYear = nextSlide.getAttribute('data-year');
                    yearBadge.innerText = newYear;
                    yearBadge.style.opacity = '1';
                }, 500);
            }
        }, 3000);

        container.dataset.intervalId = intervalId;
    }

    function stopSlideshow(container) {
        if (container.dataset.intervalId) {
            clearInterval(container.dataset.intervalId);
            delete container.dataset.intervalId;
        }
    }

    const slideshowObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startSlideshow(entry.target);
            } else {
                stopSlideshow(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const slideshowContainers = document.querySelectorAll('.image-container');
    slideshowContainers.forEach(container => {
        slideshowObserver.observe(container);
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
        let animationId;

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
            animationId = requestAnimationFrame(animate);
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

    // --- 5. DONATION POPUP LOGIC ---
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
            const dialogDimensions = donateDialog.getBoundingClientRect();
            if (
                e.clientX < dialogDimensions.left ||
                e.clientX > dialogDimensions.right ||
                e.clientY < dialogDimensions.top ||
                e.clientY > dialogDimensions.bottom
            ) {
                donateDialog.close();
            }
        });
    }
    // --- 6. FORM SUCCESS/ERROR POPUP LOGIC ---
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
            if (
                e.clientX < rect.left ||
                e.clientX > rect.right ||
                e.clientY < rect.top ||
                e.clientY > rect.bottom
            ) {
                dialog.close();
            }
        });
    });
});

function setLanguage(lang) {
    console.log("Language changed to:", lang);
    
}
