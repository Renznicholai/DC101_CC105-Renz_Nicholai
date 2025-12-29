<?php
header('Content-Type: application/json; charset=utf-8');
include 'db.php';
$in = json_decode(file_get_contents('php://input'), true);


$patient_id = intval($in['patient_id'] ?? 0);
$doctor_id = intval($in['doctor_id'] ?? 0);
$department_id = isset($in['department_id']) && $in['department_id']!=='' ? intval($in['department_id']) : null;
$schedule_id = isset($in['schedule_id']) && $in['schedule_id']!=='' ? intval($in['schedule_id']) : null;
$appointment_time = $in['appointment_time'] ?? null;
$rep_id = isset($in['representative_id']) && $in['representative_id']!=='' ? intval($in['representative_id']) : null;
$appointment_date = $in['appointment_date'] ?? '';

if(!$patient_id || !$doctor_id || !$appointment_date){ echo json_encode(['success'=>false,'error'=>'Missing required fields']); exit; }


if($schedule_id){
  $stmt = $conn->prepare("SELECT schedule_id, doctor_id, schedule_date, start_time, end_time, capacity FROM schedules WHERE schedule_id = ?");
  $stmt->bind_param('i',$schedule_id); $stmt->execute(); $sres = $stmt->get_result();
  if($sres->num_rows===0){ echo json_encode(['success'=>false,'error'=>'Invalid schedule']); exit; }
  $s = $sres->fetch_assoc();
  if($s['doctor_id'] != $doctor_id || $s['schedule_date'] != $appointment_date){
    echo json_encode(['success'=>false,'error'=>'Schedule does not match doctor/date']); exit;
  }
  // Optional: check capacity vs existing appointments for that schedule
  $stmt = $conn->prepare("SELECT COUNT(*) as cnt FROM appointments WHERE schedule_id = ?");
  $stmt->bind_param('i',$schedule_id); $stmt->execute(); $cnt = $stmt->get_result()->fetch_assoc()['cnt'];
  if($cnt >= $s['capacity']){ echo json_encode(['success'=>false,'error'=>'Schedule full']); exit; }
  // set time if null: leave to client or choose next free slot (here we don't auto-select)
}

// Insert appointment (simple)
$stmt = $conn->prepare("INSERT INTO appointments (patient_id, doctor_id, schedule_id, department_id, representative_id, appointment_date, appointment_time) VALUES (?,?,?,?,?,?,?)");
$stmt->bind_param('iiiisss',$patient_id,$doctor_id,$schedule_id,$department_id,$rep_id,$appointment_date,$appointment_time);
if($stmt->execute()) echo json_encode(['success'=>true,'appointment_id'=>$conn->insert_id]);
else echo json_encode(['success'=>false,'error'=>$stmt->error]);
?>
