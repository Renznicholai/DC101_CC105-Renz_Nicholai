<?php
header('Content-Type: application/json; charset=utf-8');
include 'db.php';
$in = json_decode(file_get_contents('php://input'), true);
$id = intval($in['appointment_id'] ?? 0);
$appointment_date = $in['appointment_date'] ?? null;
$appointment_time = $in['appointment_time'] ?? null;
$status = $in['status'] ?? null;
if(!$id){ echo json_encode(['success'=>false,'error'=>'Missing id']); exit; }
$stmt = $conn->prepare("UPDATE appointments SET appointment_date=?, appointment_time=?, status=? WHERE appointment_id=?");
$stmt->bind_param('sssi',$appointment_date,$appointment_time,$status,$id);
echo $stmt->execute() ? json_encode(['success'=>true]) : json_encode(['success'=>false,'error'=>$stmt->error]);
?>
