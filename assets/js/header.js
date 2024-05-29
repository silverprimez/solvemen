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