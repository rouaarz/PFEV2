(function ($) {
    "use strict";

    // Spinner
    function spinner() {
        setTimeout(function () {
            const $spinner = $('#spinner');
            if ($spinner.length) {
                $spinner.removeClass('show');
            }
        }, 1);
    }
    spinner();
    
    // Initiate wow.js
    if (typeof WOW !== 'undefined') {
        new WOW().init();
    }

    // Sticky Navbar
    $(window).scroll(function () {
        $('.nav-bar').toggleClass('sticky-top shadow', $(this).scrollTop() > 90);
    });
    
    // Dropdown on mouse hover (only for desktop)
    function setupDropdownHover() {
        const $dropdown = $(".dropdown");
        const $dropdownToggle = $(".dropdown-toggle");
        const $dropdownMenu = $(".dropdown-menu");
        const showClass = "show";
        
        if (window.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
                function() {
                    const $this = $(this);
                    $this.addClass(showClass);
                    $dropdownToggle.attr("aria-expanded", "true");
                    $dropdownMenu.addClass(showClass);
                },
                function() {
                    const $this = $(this);
                    $this.removeClass(showClass);
                    $dropdownToggle.attr("aria-expanded", "false");
                    $dropdownMenu.removeClass(showClass);
                }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    }
    $(window).on("load resize", setupDropdownHover);
    
    // Back to top button
    $(window).scroll(function () {
        $('.back-to-top').toggle($(this).scrollTop() > 300);
    });
    $('.back-to-top').click(function (e) {
        e.preventDefault();
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
    });

    // Facts counter
    if ($.fn.counterUp) {
        $('[data-toggle="counter-up"]').counterUp({
            delay: 10,
            time: 2000
        });
    }

    // Date and time picker
    if ($.fn.datetimepicker) {
        $('.date').datetimepicker({ format: 'L' });
        $('.time').datetimepicker({ format: 'LT' });
    }

    // Modal Video
    $(function () {
        let $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });

        $('#videoModal')
            .on('shown.bs.modal', function () {
                $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
            })
            .on('hide.bs.modal', function () {
                $("#video").attr('src', '');
            });
    });

    // Owl Carousels
    function initCarousel($selector, options) {
        if ($.fn.owlCarousel) {
            $selector.owlCarousel(options);
        }
    }

    initCarousel($(".header-carousel"), {
        autoplay: true,
        smartSpeed: 1500,
        items: 1,
        dots: false,
        loop: true,
        nav: true,
        navText: [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });

    initCarousel($(".service-carousel"), {
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        margin: 25,
        dots: true,
        loop: true,
        nav: false,
        responsive: {
            0: { items: 1 },
            576: { items: 2 },
            768: { items: 3 },
            992: { items: 2 },
            1200: { items: 3 }
        }
    });

    initCarousel($(".testimonial-carousel"), {
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        dots: false,
        loop: true,
        nav: true,
        navText: [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsive: {
            0: { items: 1 },
            768: { items: 2 },
            992: { items: 3 }
        }
    });

    // Custom Carousel
    function setupCustomCarousel() {
        const carousel = document.getElementById('carousel');
        if (!carousel) return;

        let currentIndex = 0;
        const carouselInner = carousel.querySelector('.carousel-inner');
        const totalItems = carouselInner.children.length;
        const itemsToShow = 3;
        const maxIndex = Math.ceil(totalItems / itemsToShow) - 1;

        function updateCarousel() {
            const itemWidth = carouselInner.children[0].offsetWidth;
            const gap = 15; // 15px for the gap
            const offset = -currentIndex * (itemWidth + gap);
            carouselInner.style.transform = `translateX(${offset}px)`;
        }

        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');

        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                if (currentIndex > 0) {
                    currentIndex--;
                    updateCarousel();
                }
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                if (currentIndex < maxIndex) {
                    currentIndex++;
                    updateCarousel();
                }
            });
        }

        // Initialize
        updateCarousel();
    }

    // Counter Animation
    function setupCounterAnimation() {
        const counters = document.querySelectorAll('.counter');
        if (!counters.length) return;

        const speed = 200;
        const delay = 100;

        function animateCounter(counter) {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText.replace(/\D/g, '');
            const increment = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + increment).toLocaleString();
                setTimeout(() => animateCounter(counter), delay);
            } else {
                counter.innerText = target.toLocaleString();
                if (counter.parentElement.querySelector('p')?.textContent.includes('Technologies')) {
                    counter.innerText += '+';
                }
            }
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => {
            observer.observe(counter);
        });
    }

    // Initialize when DOM is ready
    $(function() {
        setupCustomCarousel();
        setupCounterAnimation();
    });

})(jQuery);