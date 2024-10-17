document.addEventListener('DOMContentLoaded', (event) => {
    const contactForm = document.getElementById('contact-form');
    const fileInput = document.getElementById('file-input');
    const fileList = document.getElementById('file-list');
    let selectedFiles = [];

    if (!contactForm) {
        console.error('Contact form not found');
        return;
    }

    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(this);

        // Add selected files to formData
        selectedFiles.forEach((file) => {
            formData.append('attachment[]', file);
        });

        fetch('email.php', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Use Swal.fire for success message
                    Swal.fire({
                        title: 'Success!',
                        text: 'Message sent successfully!',
                        icon: 'success',
                        confirmButtonColor: "#066AE5"
                    });
                    // Clear all form inputs, including file inputs
                    clearForm(contactForm);
                    clearFiles();
                } else {
                    // Use Swal.fire for error message
                    Swal.fire({
                        title: 'Error!',
                        text: 'Failed to send message: ' + data.message,
                        icon: 'error',
                        confirmButtonColor: "#066AE5"
                    });
                }
            })
            .catch(error => {
                console.error('Error:', error);
                Swal.fire({
                    title: 'Error!',
                    text: 'An error occurred. Please try again.',
                    icon: 'error',
                    confirmButtonColor: "#066AE5"
                });
            });
    });

    // Function to clear all form inputs
    function clearForm(form) {
        form.reset(); // This clears most input types
        clearFiles();
    }

    // Clear file list and selected files
    function clearFiles() {
        selectedFiles = [];
        displayFiles();
    }

    // File handling logic
    fileInput.addEventListener('change', handleFiles);

    function handleFiles(event) {
        const files = Array.from(event.target.files);
        selectedFiles = [...selectedFiles, ...files];

        displayFiles();

        // Reset the file input value to allow re-choosing the same file
        fileInput.value = '';
    }

    function displayFiles() {
        fileList.innerHTML = '';
        selectedFiles.forEach((file, index) => {
            const listItem = document.createElement('li');

            // Create the icon element based on file type
            const fileIcon = document.createElement('i');
            fileIcon.classList.add('fa', 'file-icon');

            if (file.type.includes('pdf')) {
                fileIcon.classList.add('fa-file-pdf');
            } else if (file.type.includes('image')) {
                fileIcon.classList.add('fa-file-image');
            } else if (file.type.includes('word')) {
                fileIcon.classList.add('fa-file-word');
            } else if (file.type.includes('excel')) {
                fileIcon.classList.add('fa-file-excel');
            } else if (file.type.includes('powerpoint')) {
                fileIcon.classList.add('fa-file-powerpoint');
            } else if (file.type.includes('text')) {
                fileIcon.classList.add('fa-file-alt');
            } else {
                fileIcon.classList.add('fa-file');
            }

            // Add CSS class for margin
            fileIcon.classList.add('file-icon-style');

            const fileName = document.createElement('span');
            fileName.textContent = file.name;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'X';
            deleteButton.style.marginLeft = '10px';
            deleteButton.addEventListener('click', () => removeFile(index));

            listItem.appendChild(fileIcon);
            listItem.appendChild(fileName);
            listItem.appendChild(deleteButton);
            fileList.appendChild(listItem);
        });
    }

    function removeFile(index) {
        selectedFiles.splice(index, 1);
        displayFiles();
    }

    // Input focus/blur handling for adding/removing classes and error display
    const inputs = document.querySelectorAll(".contact-input");

    inputs.forEach((ipt) => {
        ipt.addEventListener("focus", () => {
            ipt.parentNode.classList.add("focus");
            ipt.parentNode.classList.add("not-empty");
            ipt.parentNode.classList.remove("error");
            const errorMessage = ipt.parentNode.querySelector('.error-message');
            if (errorMessage) {
                errorMessage.style.display = 'none';
            }
        });
        ipt.addEventListener("blur", () => {
            if (ipt.value === "") {
                ipt.parentNode.classList.remove("not-empty");
                ipt.parentNode.classList.add("error");
            }
            ipt.parentNode.classList.remove("focus");
        });
    });
});
