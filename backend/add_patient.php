<?php
// add_patient.php
header('Content-Type: application/json');

// Database connection
$host = 'localhost';
$user = 'root'; // DB username
$pass = '';     // DB password
$db   = 'hospital_appointment'; // DB name

$conn = new mysqli($host, $user, $pass, $db);
if($conn->connect_error){
    echo json_encode(['success'=>false,'error'=>'Database connection failed: '.$conn->connect_error]);
    exit;
}

// Get JSON input
$input = json_decode(file_get_contents('php://input'), true);

$full_name = $input['full_name'] ?? null;
$email     = $input['email'] ?? null;
$phone     = $input['phone'] ?? null;
$dob       = $input['dob'] ?? null;
$address   = $input['address'] ?? null;

// Validate required
if(!$full_name){
    echo json_encode(['success'=>false,'error'=>'Name is required']);
    exit;
}

// Prepare and execute
$stmt = $conn->prepare("INSERT INTO patients (full_name, email, phone, dob, address) VALUES (?,?,?,?,?)");
if(!$stmt){
    echo json_encode(['success'=>false,'error'=>$conn->error]);
    exit;
}

$stmt->bind_param("sssss", $full_name, $email, $phone, $dob, $address);

if($stmt->execute()){
    echo json_encode(['success'=>true]);
} else {
    echo json_encode(['success'=>false,'error'=>$stmt->error]);
}

$stmt->close();
$conn->close();
