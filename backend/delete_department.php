<?php
header('Content-Type: application/json; charset=utf-8');
include 'db.php';
$in = json_decode(file_get_contents('php://input'), true);
$id = intval($in['dept_id'] ?? 0);
if(!$id){ echo json_encode(['success'=>false,'error'=>'Missing id']); exit; }
$stmt = $conn->prepare("DELETE FROM departments WHERE dept_id = ?");
$stmt->bind_param('i',$id);
echo $stmt->execute() ? json_encode(['success'=>true]) : json_encode(['success'=>false,'error'=>$stmt->error]);
?>
