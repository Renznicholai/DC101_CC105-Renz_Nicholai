<?php
header('Content-Type: application/json; charset=utf-8');
include 'db.php';
$in = json_decode(file_get_contents('php://input'), true);
$full = trim($in['full_name'] ?? '');
$email = trim($in['email'] ?? '');
$phone = trim($in['phone'] ?? '');
$dept = $in['department_id'] ? intval($in['department_id']) : null;
$spec = trim($in['specialization'] ?? '');
if(!$full){ echo json_encode(['success'=>false,'error'=>'Name required']); exit; }
$stmt = $conn->prepare("INSERT INTO doctors (full_name,email,phone,department_id,specialization) VALUES (?,?,?,?,?)");
$stmt->bind_param('sssis',$full,$email,$phone,$dept,$spec);
if($stmt->execute()) echo json_encode(['success'=>true,'doctor_id'=>$conn->insert_id]); else echo json_encode(['success'=>false,'error'=>$stmt->error]);
?>
