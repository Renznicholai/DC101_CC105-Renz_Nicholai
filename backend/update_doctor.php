<?php
header('Content-Type: application/json; charset=utf-8');
include 'db.php';
$in = json_decode(file_get_contents('php://input'), true);
$id = intval($in['doctor_id'] ?? 0);
$full = trim($in['full_name'] ?? '');
$email = trim($in['email'] ?? '');
$phone = trim($in['phone'] ?? '');
$dept = isset($in['department_id']) && $in['department_id'] !== null ? intval($in['department_id']) : null;
$spec = trim($in['specialization'] ?? '');
if(!$id || !$full){ echo json_encode(['success'=>false,'error'=>'Invalid']); exit; }
$stmt = $conn->prepare("UPDATE doctors SET full_name=?, email=?, phone=?, department_id=?, specialization=? WHERE doctor_id=?");
$stmt->bind_param('sssisi',$full,$email,$phone,$dept,$spec,$id);
echo $stmt->execute() ? json_encode(['success'=>true]) : json_encode(['success'=>false,'error'=>$stmt->error]);
?>
