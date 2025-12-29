<?php
header('Content-Type: application/json; charset=utf-8');
include 'db.php';
$in = json_decode(file_get_contents('php://input'), true);
$doctor_id = intval($in['doctor_id'] ?? 0);
$date = $in['schedule_date'] ?? '';
$start = $in['start_time'] ?? '';
$end = $in['end_time'] ?? '';
$capacity = intval($in['capacity'] ?? 1);
if(!$doctor_id || !$date || !$start || !$end){ echo json_encode(['success'=>false,'error'=>'Invalid']); exit; }
$stmt = $conn->prepare("INSERT INTO schedules (doctor_id, schedule_date, start_time, end_time, capacity) VALUES (?,?,?,?,?)");
$stmt->bind_param('isssi',$doctor_id,$date,$start,$end,$capacity);
echo $stmt->execute() ? json_encode(['success'=>true,'schedule_id'=>$conn->insert_id]) : json_encode(['success'=>false,'error'=>$stmt->error]);
?>
