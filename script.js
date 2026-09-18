const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const menuIcon = document.getElementById('menuIcon');

menuToggle.addEventListener('click', () => {
    // 1. Toggle the menu visibility
    const isOpen = mobileMenu.classList.toggle('open');
    
    // 2. Change the icon shape
    if (isOpen) {
        // SVG Path for X (Close)
        menuIcon.innerHTML = '<path d="M18 6L6 18M6 6l12 12" stroke="#1f3a5f" stroke-width="2" stroke-linecap="round"/>';
    } else {
        // SVG Path for Hamburger (Open)
        menuIcon.innerHTML = '<path d="M4 6h16M4 12h16M4 18h16" stroke="#1f3a5f" stroke-width="2" stroke-linecap="round"/>';
    }
});

// Close menu when a link is clicked (optional but recommended)
document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        menuIcon.innerHTML = '<path d="M4 6h16M4 12h16M4 18h16" stroke="#1f3a5f" stroke-width="2" stroke-linecap="round"/>';
    });
});

// ... your existing code ...

// 3. Handle Window Resize (Auto-hide when switching to desktop)
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        // Remove the open class
        mobileMenu.classList.remove('open');
        
        // Reset the icon back to Hamburger
        menuIcon.innerHTML = '<path d="M4 6h16M4 12h16M4 18h16" stroke="#1f3a5f" stroke-width="2" stroke-linecap="round"/>';
    }
});


// Smooth scroll
document.querySelectorAll("[data-target]").forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();
        const targetId = link.getAttribute("data-target");
        const target = document.getElementById(targetId);

        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: "smooth",
            });
        }

        if (isOpen) {
            isOpen = false;
            gsap.to(mobileMenu, { height: 0, opacity: 0, duration: 0.3 });
        }
    });
});



// heaer end 


// hero section 

document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".hero-slides .slide");
    let currentIndex = 0;

    setInterval(() => {
        slides[currentIndex].classList.remove("active");
        currentIndex = (currentIndex + 1) % slides.length;
        slides[currentIndex].classList.add("active");
    }, 5000); // change slide every 5 seconds
});



// Product slider 


document.addEventListener("DOMContentLoaded", () => {
    const swiper = new Swiper(".mySwiper", {
        // Core Settings
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        grabCursor: true,
        
        // Autoplay - This makes it slide automatically
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true, // Pauses when user hovers
        },
        
        // Pagination (Dots)
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
            dynamicBullets: true,
        },

        // Navigation (Arrows)
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        
        // Responsive Layout
        breakpoints: {
            640: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
            1400: {
                slidesPerView: 4, // Shows 4 products on extra large screens
                spaceBetween: 30,
            },
        },
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("pdf-modal");
    const viewer = document.getElementById("pdf-viewer");
    const closeBtn = document.getElementById("modal-close");

    // Open Modal
    document.querySelectorAll(".view-btn").forEach(button => {
        button.addEventListener("click", () => {
            const pdfPath = button.getAttribute("data-file");
            viewer.src = pdfPath;
            modal.style.display = "flex";
            document.body.style.overflow = "hidden"; // Prevent background scroll
        });
    });

    // Close Modal
    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
        viewer.src = "";
        document.body.style.overflow = "auto";
    });

    // Close on background click
    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
            viewer.src = "";
            document.body.style.overflow = "auto";
        }
    });
});

// Product Catalogues 

document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("pdf-modal");
    const viewer = document.getElementById("pdf-viewer");
    const closeBtn = document.getElementById("modal-close");

    document.querySelectorAll(".view-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const file = btn.getAttribute("data-file");
            viewer.src = file;
            modal.style.display = "flex";
        });
    });

    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
        viewer.src = ""; // stop PDF
    });
});



// Contact us 


const contactForm = document.getElementById('contactForm');
const sendBtn = document.getElementById('sendBtn');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // 1. Visual Feedback
    sendBtn.innerHTML = 'Sending... <i class="fa-solid fa-circle-notch fa-spin"></i>';
    sendBtn.style.pointerEvents = 'none';
    sendBtn.style.opacity = '0.7';

    // 2. Send the Email
    // 'this' refers to the form element
    emailjs.sendForm('service_y51pehe', 'template_jhbwbdr', contactForm)
        .then(() => {
            // SUCCESS
            alert('Thank you! Your message has been sent successfully.');
            sendBtn.innerHTML = 'Message Sent! <i class="fa-solid fa-check"></i>';
            contactForm.reset();
        }, (error) => {
            // ERROR
            alert('FAILED... ' + JSON.stringify(error));
            sendBtn.innerHTML = 'Error Occurred';
        })
        .finally(() => {
            // 3. Reset button after 3 seconds
            setTimeout(() => {
                sendBtn.innerHTML = '<span>Send Message</span> <i class="fa-solid fa-paper-plane"></i>';
                sendBtn.style.pointerEvents = 'auto';
                sendBtn.style.opacity = '1';
            }, 3000);
        });
}); 