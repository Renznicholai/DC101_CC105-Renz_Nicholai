<?php
// add_rep.php
header('Content-Type: application/json');

// Database connection
$host = 'localhost';
$user = 'root';          // Palitan ng db username mo
$pass = '';              // Palitan ng db password mo
$db   = 'hospital_appointment'; // Siguraduhing tama ang database name

$conn = new mysqli($host, $user, $pass, $db);
if($conn->connect_error){
    echo json_encode(['success'=>false,'error'=>'Database connection failed: '.$conn->connect_error]);
    exit;
}

// Basahin ang JSON input mula sa fetch
$input = json_decode(file_get_contents('php://input'), true);

$rep_name = $input['name'] ?? null;
$phone    = $input['phone'] ?? null;
$email    = $input['email'] ?? null;
$role     = $input['role'] ?? null;

// Validate required field
if(!$rep_name){
    echo json_encode(['success'=>false,'error'=>'Name is required']);
    exit;
}

// Prepare SQL statement
$stmt = $conn->prepare("INSERT INTO representatives (name, email, phone, role) VALUES (?,?,?,?)");
if(!$stmt){
    echo json_encode(['success'=>false,'error'=>$conn->error]);
    exit;
}

// Bind parameters and execute
$stmt->bind_param("ssss", $rep_name, $email, $phone, $role);

if($stmt->execute()){
    echo json_encode(['success'=>true]);
} else {
    echo json_encode(['success'=>false,'error'=>$stmt->error]);
}

$stmt->close();
$conn->close();
