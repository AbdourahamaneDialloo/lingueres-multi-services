<?php
// Affiche les erreurs (à désactiver en production)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/../vendor/autoload.php'; // vérifie bien ce chemin

header('Content-Type: application/json');

// Vérifie que tous les champs sont présents
if (!isset($_POST['name'], $_POST['email'], $_POST['message'])) {
    echo json_encode(['success' => false, 'message' => 'Tous les champs sont requis.']);
    exit;
}

// Nettoyage des données reçues
$name = htmlspecialchars(trim($_POST['name']));
$email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
$message = htmlspecialchars(trim($_POST['message']));

// Validation
if (empty($name) || empty($email) || empty($message)) {
    echo json_encode(['success' => false, 'message' => 'Tous les champs doivent être remplis.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Adresse email invalide.']);
    exit;
}

// Envoi de l'email avec PHPMailer
$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'rahmane.abdou.diallo123@gmail.com'; // Ton adresse Gmail
    $mail->Password   = 'henh llvd zvjs nbwg'; // Mot de passe d'application
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;

    $mail->setFrom('rahmane.abdou.diallo123@gmail.com', 'Formulaire Contact');
    $mail->addAddress('rahmane.abdou.diallo123@gmail.com', 'Rahmane');
    $mail->addReplyTo($email, $name); // Pour pouvoir répondre à l'expéditeur

    $mail->isHTML(true);
    $mail->Subject = 'Nouveau message via le formulaire';
    $mail->Body    = "
        <p><strong>Nom :</strong> {$name}</p>
        <p><strong>Email :</strong> {$email}</p>
        <p><strong>Message :</strong><br>" . nl2br($message) . "</p>
    ";

    $mail->send();

    echo json_encode(['success' => true, 'message' => 'Message envoyé avec succès.']);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => "Erreur lors de l'envoi : {$mail->ErrorInfo}"]);
}
