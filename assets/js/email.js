document.addEventListener('DOMContentLoaded', (event) => {
    const contactForm = document.getElementById('contact-form');

    if (!contactForm) {
        console.error('Contact form not found');
        return;
    }

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const formData = new FormData(this);

        fetch('email.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Message sent successfully!');
                // Clear all form inputs, including file inputs
                clearForm(contactForm);
            } else {
                alert('Failed to send message: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        });
    });

    // Function to clear all form inputs
    function clearForm(form) {
        form.reset(); // This clears most input types
        // Clear file inputs
        const fileInputs = form.querySelectorAll('input[type="file"]');
        fileInputs.forEach(input => {
            input.value = '';
        });
    }
});
