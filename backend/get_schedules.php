<?php
header('Content-Type: application/json; charset=utf-8');
include 'db.php';
$sql = "SELECT s.schedule_id, s.doctor_id, s.schedule_date, s.start_time, s.end_time, s.capacity, d.full_name as doctor_name
        FROM schedules s JOIN doctors d ON s.doctor_id = d.doctor_id
        ORDER BY s.schedule_date, s.start_time";
$res = $conn->query($sql);
$rows = [];
while($r = $res->fetch_assoc()) $rows[] = $r;
echo json_encode($rows);
?>
