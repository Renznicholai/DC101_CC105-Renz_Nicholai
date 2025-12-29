<?php
header('Content-Type: application/json; charset=utf-8');
include 'db.php';
if(!isset($_GET['id'])) { echo json_encode(['success'=>false,'error'=>'Missing id']); exit; }
$id = intval($_GET['id']);
$stmt = $conn->prepare("SELECT a.*, p.full_name as patient_name FROM appointments a LEFT JOIN patients p ON a.patient_id=p.patient_id WHERE appointment_id=?");
$stmt->bind_param('i',$id); $stmt->execute(); $res = $stmt->get_result();
if($res->num_rows===0) { echo json_encode(['success'=>false,'error'=>'Not found']); exit; }
$row = $res->fetch_assoc();
echo json_encode(['success'=>true,'appointment'=>$row]);
?>
