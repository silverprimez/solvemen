document.addEventListener('DOMContentLoaded', (event) => {
    const contactButton = document.getElementById('contact-button');
    const dropdownButton = document.querySelector('.dropdown-button');
    const modalContainer = document.getElementById('modal-container');
    const closeButtons = document.querySelectorAll('.close-modal');
    const dropDownMenu = document.querySelector('.dropdown_menu');
    const toggleButtonIcon = document.querySelector('.toggle_button span');

    if (contactButton && modalContainer) {
        contactButton.addEventListener('click', () => {
            modalContainer.classList.add('show-modal');
        });
    }

    if (dropdownButton && modalContainer) {
        dropdownButton.addEventListener('click', () => {
            modalContainer.classList.add('show-modal');
            dropDownMenu.classList.remove('open');
            toggleButtonIcon.textContent = 'menu'; // Sets the text back to 'menu' icon
        });
    }

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            modalContainer.classList.remove('show-modal');
        });
    });
});
