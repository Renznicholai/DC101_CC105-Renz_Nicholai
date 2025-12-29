<?php
header('Content-Type: application/json; charset=utf-8');
include 'db.php';
$in = json_decode(file_get_contents('php://input'), true);
$name = trim($in['name'] ?? '');
$desc = trim($in['description'] ?? '');
if(!$name) { echo json_encode(['success'=>false,'error'=>'Name required']); exit; }
$stmt = $conn->prepare("INSERT INTO departments (name, description) VALUES (?, ?)");
$stmt->bind_param('ss',$name,$desc);
if($stmt->execute()) echo json_encode(['success'=>true,'dept_id'=>$conn->insert_id]);
else echo json_encode(['success'=>false,'error'=>$stmt->error]);
?>
