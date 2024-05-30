document.addEventListener('DOMContentLoaded', (event) => {
    const contactButtons = document.querySelectorAll('#contact-button, .dropdown-button');
    const modalContainer = document.getElementById('modal-container');
    const closeButtons = document.querySelectorAll('.close-modal');

    contactButtons.forEach(button => {
        if (button && modalContainer) {
            button.addEventListener('click', () => {
                modalContainer.classList.add('show-modal');
            });
        }
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            modalContainer.classList.remove('show-modal');
        });
    });
});
