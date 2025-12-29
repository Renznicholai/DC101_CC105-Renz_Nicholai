<?php
header('Content-Type: application/json; charset=utf-8');
include 'db.php';
$in = json_decode(file_get_contents('php://input'), true);
$id = intval($in['dept_id'] ?? 0);
$name = trim($in['name'] ?? '');
$desc = trim($in['description'] ?? '');
if(!$id || !$name) { echo json_encode(['success'=>false,'error'=>'Invalid']); exit; }
$stmt = $conn->prepare("UPDATE departments SET name=?, description=? WHERE dept_id=?");
$stmt->bind_param('ssi',$name,$desc,$id);
echo $stmt->execute() ? json_encode(['success'=>true]) : json_encode(['success'=>false,'error'=>$stmt->error]);
?>
