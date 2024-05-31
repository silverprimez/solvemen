<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
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