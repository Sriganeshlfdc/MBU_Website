<?php
// api/contact_process.php
require_once 'db_config.php'; 

// Error logging
ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // 1. Retrieve Data
    $name = $_POST['name'] ?? '';
    $email = $_POST['email'] ?? '';
    $number = $_POST['number'] ?? '';
    $message = $_POST['message'] ?? '';

    // 2. Validate
    if (empty($name) || empty($email) || empty($number)) {
        die("Error: Missing input fields. Please go back and fill the form.");
    }

    // 3. Sanitize
    $name = htmlspecialchars(trim($name));
    $email = filter_var(trim($email), FILTER_SANITIZE_EMAIL);
    $number = htmlspecialchars(trim($number));
    $message = htmlspecialchars(trim($message));

    // 4. Validate Email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        die("Error: Invalid email format.");
    }

    try {
        $pdo = new PDO("mysql:host=".DB_HOST.";port=".DB_PORT.";dbname=".DB_NAME, DB_USER, DB_PASS);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $stmt = $pdo->prepare("INSERT INTO contact_inquiries (full_name, email, phone_number, message) VALUES (:name, :email, :number, :message)");
        $stmt->execute([':name' => $name, ':email' => $email, ':number' => $number, ':message' => $message]);

        // 5. Send Emails
        $orgEmail = '201020468002@lfdc.edu.in';
        $subject = "New Inquiry: $name";
        $body = "Name: $name\nPhone: $number\nMessage: $message";
        $headers = "From: 201020468002@lfdc.edu.in\r\nReply-To: $email";
        @mail($orgEmail, $subject, $body, $headers); 

        // 6. Success Redirect -> Points to index.php
        header("Location: ../index.php?status=success");
        exit();

    } catch (PDOException $e) {
        error_log("Database Error: " . $e->getMessage());
        header("Location: ../index.php?status=error");
        exit();
    }
} else {
    // Redirect direct access
    header("Location: ../index.php");
    exit();
}
?>