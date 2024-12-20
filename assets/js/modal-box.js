document.addEventListener('DOMContentLoaded', (event) => {
    const contactButton = document.getElementById('contact-button');
    const dropdownContactButton = document.querySelector('.dropdown-button');
    const modalContainer = document.getElementById('modal-container');
    const closeButtons = document.querySelectorAll('.close-modal');
    const toggleButtonIcon = document.querySelector('.toggle_button span');
    const dropDownMenu = document.querySelector('.dropdown_menu');
    const contactFooter = document.getElementById('footer-contact');
    const logo = document.querySelector('.logo');

    function closeModal() {
        modalContainer.classList.remove('show-modal');
        dropDownMenu.classList.remove('open');
        toggleButtonIcon.textContent = 'menu'; // Change icon back to 'menu'

        // Remove the blur effect
        var blur = document.getElementById('blur');
        if (blur) {
            blur.classList.remove('active');
        }
    }

    if (contactButton && modalContainer) {
        contactButton.addEventListener('click', () => {
            modalContainer.classList.add('show-modal');
            window.scrollTo({ top: window.scrollY, behavior: 'auto' }); // Maintain scroll position
        });
    }

    if (dropdownContactButton && modalContainer) {
        dropdownContactButton.addEventListener('click', () => {
            modalContainer.classList.add('show-modal');
            dropDownMenu.classList.remove('open');
            toggleButtonIcon.textContent = 'menu'; // Change icon back to 'menu'
            window.scrollTo({ top: window.scrollY, behavior: 'auto' }); // Maintain scroll position
        });
    }

    if (contactFooter && modalContainer) {
        contactFooter.addEventListener('click', () => {
            modalContainer.classList.add('show-modal');
            window.scrollTo({ top: window.scrollY, behavior: 'auto' }); // Maintain scroll position
        });
    }

    closeButtons.forEach(button => {
        button.addEventListener('click', closeModal);
    });

    // Close modal when clicking on the logo
    if (logo) {
        logo.addEventListener('click', closeModal);
    }

    // Close modal when clicking outside of the modal box
    document.addEventListener('click', (event) => {
        if (event.target === document.body) {
            closeModal();
        }
    });
});

function toggle() {
    var blur = document.getElementById('blur');
    blur.classList.toggle('active');
    var popup = document.getElementById('modal-container');
    popup.classList.toggle('active');
}


