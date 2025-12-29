<?php
include 'db.php';

$query = "SELECT * FROM representatives ORDER BY rep_id DESC";
$result = $conn->query($query);

$data = [];

while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode($data);
?>
