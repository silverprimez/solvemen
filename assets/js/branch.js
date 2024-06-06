document.querySelectorAll('.clickable').forEach(function(path) {
    path.addEventListener('click', function(event) {
        const tooltip = document.getElementById('tooltip');
        tooltip.textContent = path.querySelector('title').textContent;
        tooltip.style.display = 'block';
        
        // Get the dimensions of the tooltip and the screen
        const tooltipWidth = tooltip.offsetWidth;
        const screenWidth = window.innerWidth;
        
        // Default position (to the right)
        let left = event.pageX + 10;
        let top = event.pageY + 10;

        // Check if it overflows the screen width
        if (left + tooltipWidth > screenWidth) {
            // If it overflows, position it to the left
            left = event.pageX - tooltipWidth - 10;
        }

        tooltip.style.left = `${left}px`;
        tooltip.style.top = `${top}px`;
    });
});

// Hide tooltip when clicking outside the SVG paths
document.addEventListener('click', function(event) {
    if (!event.target.closest('path')) {
        document.getElementById('tooltip').style.display = 'none';
    }
});
