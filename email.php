<?php
/*if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $fname = htmlspecialchars($_POST['First_Name']);
    $lname = htmlspecialchars($_POST['Last_Name']);
    $email = htmlspecialchars($_POST['Email']);
    $message = htmlspecialchars($_POST['Message']);
    
    $to = "admin@solvemen.com"; // Replace with the primary recipient's email address
    $subject = "Contact Form Submission from $name";
    $body = "Name: ".$fname ." ". $lname."\nEmail: ".$email."\nMessage: "/$message."";
    $headers = "From: ".$email."\r\n";
    $headers .= "Cc: tima.kvasnikov@solvemen.com\r\n";
    
    if (mail($to, $subject, $body, $headers)) {
        echo "Thank you for your Queries! We will attend to you shortly.";
    } else {
        echo "Failed to send email.";
    }
} else {
    echo "Invalid request.";
}
?> 

<?php */
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $firstName = $_POST['First_Name'] ?? '';
    $lastName = $_POST['Last_Name'] ?? '';
    $email = $_POST['Email'] ?? '';
    $message = $_POST['Message'] ?? '';
    $ccEmail = 'tima.kvasnikov@solvemen.com'; // Replace with the actual CC email address

    // Validate the input
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

    $to = 'admin@solvemen.com'; // Replace with your actual email address
    $subject = 'New Contact Form Submission from ' . $firstName . ' ' . $lastName;
    $body = "First Name: $firstName\nLast Name: $lastName\nEmail: $email\nMessage:\n$message";
    $headers = "From: $email\r\n";
    $headers .= "CC: $ccEmail\r\n"; // Add the CC email address

    if (mail($to, $subject, $body, $headers)) {
        echo json_encode(['success' => true, 'message' => 'Message sent successfully!']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to send message. Please try again.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
}
?>
