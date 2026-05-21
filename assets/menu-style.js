const header = document.getElementById('header');
// FIXED: Changed ID selector string from 'hamburger' to 'hamburger-btn'
const hamburger = document.getElementById('hamburger-btn');
const navMenu = document.getElementById('nav-menu');

let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    // 1. Handle header shrinking padding
    /*
    if (currentScrollY > 50) {
        header.classList.add('shrink');
    } else {
        header.classList.remove('shrink');
    }
    */
    // 2. Handle Smart Sticky slide logic
    // Added safety check to ensure navMenu exists before checking its classes
    if (navMenu && !navMenu.classList.contains('active')) {
        if (currentScrollY > lastScrollY && currentScrollY > 150) {
            header.classList.add('scroll-down');
            header.classList.remove('scroll-up');
        } else if (currentScrollY < lastScrollY) {
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
    }

    lastScrollY = currentScrollY;
});

// Toggle mobile drawer
// Added safety check to prevent browser errors if the elements are missing on a page
if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close menu if a user clicks a link (Except links that trigger submenus)
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        // FIXED: If the mobile link has a dropdown submenu, do not close the entire panel instantly
        if (window.innerWidth <= 992 && link.parentElement.classList.contains('dropdown')) {
            return; 
        }
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});