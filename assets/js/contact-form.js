const contactForm = document.getElementById("contact-form");

document.getElementById('submit-btn').addEventListener('click', function(event) {
    // event.preventDefault(); // Prevent default button click action
    contactForm.submit();
    return;
    document.getElementById('submit-btn').disabled = true;

    const formData = new FormData(contactForm);

    // Clear previous error messages
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(msg => msg.style.display = 'none');

    // Validate required fields
    let isValid = true;
    const requiredFields = document.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        const errorMessage = field.parentElement.querySelector('.error-message');
        if (!field.value) {
            errorMessage.textContent = '*Required';
            errorMessage.style.display = 'block';
            isValid = false;
        }
    });

    if (!isValid) {
        document.getElementById('submit-btn').disabled = false;
        return;
    }

    fetch("email.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            Swal.fire({
                title: 'Success!',
                text: data.message,
                icon: 'success',
                confirmButtonColor: "#066AE5"
            });
            contactForm.reset(); // Clear the form fields
            selectedFiles = []; // Clear the selected files array
            displayFiles(); // Update the display to remove files
        } else {
            alert(data.message); // Or display a custom error message
        }
        document.getElementById('submit-btn').disabled = false;
    })
    .catch(error => {
        console.error("Error:", error);
        alert("An error occurred while sending the message.");
        document.getElementById('submit-btn').disabled = false;
    });
});

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

let selectedFiles = [];

const fileInput = document.getElementById('file-input');
const fileList = document.getElementById('file-list');

fileInput.addEventListener('change', handleFiles);

function handleFiles(event) {
    const files = Array.from(event.target.files);
    selectedFiles = [...selectedFiles, ...files];
console.log('here');
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
