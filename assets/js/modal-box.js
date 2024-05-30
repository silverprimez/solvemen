document.addEventListener('DOMContentLoaded', (event) => {
    const contactButton = document.getElementById('contact-button');
    const modalContainer = document.getElementById('modal-container');
    const closeButtons = document.querySelectorAll('.close-modal');

    if (contactButton && modalContainer) {
        contactButton.addEventListener('click', () => {
            modalContainer.classList.add('show-modal');
        });
    }

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            modalContainer.classList.remove('show-modal');
        });
    });
});
