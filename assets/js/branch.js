document.querySelectorAll('.clickable').forEach(function(path) {
    path.addEventListener('click', function(event) {
        const tooltip = document.getElementById('tooltip');
        tooltip.textContent = path.querySelector('title').textContent;
        tooltip.style.display = 'block';
        tooltip.style.left = `${event.pageX + 10}px`;
        tooltip.style.top = `${event.pageY + 10}px`;
    });
});

// Hide tooltip when clicking outside the SVG paths
document.addEventListener('click', function(event) {
    if (!event.target.closest('path')) {
        document.getElementById('tooltip').style.display = 'none';
    }
});