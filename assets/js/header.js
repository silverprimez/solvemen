var lastScrollTop = 0;
var navbar = document.querySelector('.top-header'); // Correct selector

window.addEventListener('scroll', function() {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
        navbar.style.top = "-85px"; // Adjust this value based on your header's height
    } else {
        navbar.style.top = "0";
    }
    lastScrollTop = scrollTop;
});
