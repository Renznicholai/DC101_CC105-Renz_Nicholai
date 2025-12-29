<?php
require __DIR__ . '/db.php';

header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);
$patient_id = $data['patient_id'] ?? null;

if (!$patient_id) {
    echo json_encode(['success'=>false, 'error'=>'No ID provided']);
    exit;
}

// Prepare statement
$stmt = $conn->prepare("DELETE FROM patients WHERE patient_id = ?");

if (!$stmt) {
    // Para makita ang exact error sa SQL
    echo json_encode(['success'=>false, 'error'=>$conn->error]);
    exit;
}

// Bind parameter
$stmt->bind_param("i", $patient_id);

// Execute
if ($stmt->execute()) {
    echo json_encode(['success'=>true]);
} else {
    echo json_encode(['success'=>false, 'error'=>$stmt->error]);
}

$stmt->close();
$conn->close();
