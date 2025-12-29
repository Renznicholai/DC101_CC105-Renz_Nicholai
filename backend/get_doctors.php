<?php
header('Content-Type: application/json; charset=utf-8');
include 'db.php';
$sql = "SELECT d.doctor_id,d.full_name,d.email,d.phone,d.specialization, d.department_id, dep.name as department_name
        FROM doctors d LEFT JOIN departments dep ON d.department_id = dep.dept_id ORDER BY d.full_name";
$res = $conn->query($sql);
$rows = [];
while($r = $res->fetch_assoc()) $rows[] = $r;
echo json_encode($rows);
?>
