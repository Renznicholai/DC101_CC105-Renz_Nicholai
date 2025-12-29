<?php
header('Content-Type: application/json; charset=utf-8');
include 'db.php';
$res = $conn->query("SELECT dept_id, name, description FROM departments ORDER BY name");
$rows = [];
while($r = $res->fetch_assoc()) $rows[] = $r;
echo json_encode($rows);
?>
