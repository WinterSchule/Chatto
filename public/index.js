
// Hamburger Menü Funktionalität
const burgerMenu = document.getElementById('burger-menu');
const navLinks = document.querySelector('.nav-links');

burgerMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active'); // Toggle der "active" Klasse für das Menü
});