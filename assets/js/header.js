const toggleButton = document.querySelector('.toggle_button');
const toggleButtonIcon = toggleButton.querySelector('span');
const dropDownMenu = document.querySelector('.dropdown_menu');

toggleButton.addEventListener('click', function() {
    dropDownMenu.classList.toggle('open');
    // Check if the dropdown menu is open and change the icon accordingly
    if (dropDownMenu.classList.contains('open')) {
        toggleButtonIcon.textContent = 'close'; // Sets the text to 'close' icon
    } else {
        toggleButtonIcon.textContent = 'menu'; // Sets the text back to 'menu' icon
    }
});

var lastScrollTop = 0;
var navbar = document.querySelector('.top-header'); // Correct selector

window.addEventListener('scroll', function() {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
        if (dropDownMenu.classList.contains('open')) {
            dropDownMenu.classList.remove('open');
            toggleButtonIcon.textContent = 'menu'; // Sets the text back to 'menu' icon
        }
        navbar.style.top = "-85px"; // Adjust this value based on your header's height
    } else {
        navbar.style.top = "0";
    }
    lastScrollTop = scrollTop;
});

