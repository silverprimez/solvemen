document.addEventListener('DOMContentLoaded', () => {
    const contactButton = document.getElementById('contact-button');
    const dropdownButton = document.querySelector('.dropdown-button');
    const modalContainer = document.getElementById('modal-container');
    const closeModalButton = document.querySelector('.close-modal');
    const toggleButton = document.querySelector('.toggle_button span');

    const openModal = () => {
        modalContainer.classList.add('show-modal');
        document.body.style.overflow = 'hidden'; // Optional: to prevent background scrolling
        toggleButton.innerHTML = 'menu'; // Change icon back to hamburger
    };

    const closeModal = () => {
        modalContainer.classList.remove('show-modal');
        document.body.style.overflow = 'auto'; // Restore background scrolling
    };

    contactButton.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
    });

    dropdownButton.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
    });

    closeModalButton.addEventListener('click', closeModal);

    // Close the dropdown menu if open
    dropdownButton.addEventListener('click', () => {
        const dropdownMenu = document.querySelector('.dropdown_menu');
        dropdownMenu.style.display = 'none';
        toggleButton.innerHTML = 'menu'; // Change icon back to hamburger
    });
});
