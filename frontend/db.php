<?php
// db.php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "hospital_appointment";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error"=>"DB connection failed: ".$conn->connect_error]);
    exit;
}
$conn->set_charset("utf8mb4");
?>
