document.addEventListener("DOMContentLoaded", function () {
  // When the page is fully loaded
  window.addEventListener('load', function () {
    const loader = document.getElementById('wifi-loader');
    if (loader) {
      loader.style.opacity = '0';
      loader.style.visibility = 'hidden';
      setTimeout(() => {
        loader.style.display = 'none';
      }, 500); // Match this delay with your fade-out transition duration if any
    }
  })
});