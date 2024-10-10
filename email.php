<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // print_r($_FILES);
    $firstName = $_POST['First_Name'] ?? '';
    $lastName = $_POST['Last_Name'] ?? '';
    $email = $_POST['Email'] ?? '';
    $message = $_POST['Message'] ?? '';
    $ccEmail = 'tima.kvasnikov@solvemen.com'; // CC email address

    // Input Validation
    if (empty($firstName) || empty($lastName) || empty($email) || empty($message)) {
        echo json_encode(['success' => false, 'message' => 'All fields are required.']);
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['success' => false, 'message' => 'Invalid email address.']);
        exit;
    }

    // Decode HTML entities in the message
    $message = html_entity_decode($message);

    // Email details
    $to = 'admin@solvemen.com'; // Actual email address
    $subject = 'New Contact Form Submission from ' . $firstName . ' ' . $lastName;

    // Initialize headers
    $headers = "From: $email\r\n";
    $headers .= "CC: $ccEmail\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    
    // Generate a boundary string
    $boundary = md5(time());

    // Define the headers for the email with multipart/mixed type
    $headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";

    // Start the body of the email
    $body = "--$boundary\r\n";
    $body .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $body .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
    $body .= "First Name: $firstName\nLast Name: $lastName\nEmail: $email\nMessage:\n$message\n\r\n";
// var_dump($_FILES['attachments']);exit;
    // Handle File Attachments
    if (isset($_FILES['attachments']) && count($_FILES['attachments']['tmp_name']) > 0) {
        foreach ($_FILES['attachments']['tmp_name'] as $key => $tmpName) {
            if ($_FILES['attachments']['error'][$key] === UPLOAD_ERR_OK) {
                $fileName = $_FILES['attachments']['name'][$key];
                $fileType = $_FILES['attachments']['type'][$key];

                // Read the file content and encode it in base64
                $fileContent = chunk_split(base64_encode(file_get_contents($tmpName)));

                // Append the file content to the email body
                $body .= "--$boundary\r\n";
                $body .= "Content-Type: $fileType; name=\"$fileName\"\r\n";
                $body .= "Content-Disposition: attachment; filename=\"$fileName\"\r\n";
                $body .= "Content-Transfer-Encoding: base64\r\n\r\n";
                $body .= "$fileContent\r\n";
            }
        }
    }

    // Close the email body with the boundary
    $body .= "--$boundary--\r\n";

    // Send the email
    if (mail($to, $subject, $body, $headers)) {
        // echo json_encode(['success' => true, 'message' => 'Message sent successfully!']);
        // redirect person back to index.html
        // redirect to index.html, then put success message in session so i can show sweet alert
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            if (mail($to, $subject, $body, $headers)) {
                header("Location: index.html");
                exit();
            } else {
                echo json_encode(['success' => false, 'message' => 'Failed to send message.']);
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
        }        
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to send message.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
}
?>
