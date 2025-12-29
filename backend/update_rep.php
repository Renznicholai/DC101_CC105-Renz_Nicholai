<?php
include 'db.php';

if($_SERVER['REQUEST_METHOD'] === 'POST'){

    $id = $_POST['rep_id'];
    $name = $_POST['rep_name'];
    $phone = $_POST['phone'];
    $email = $_POST['email'];
    $department = $_POST['department'];

    $stmt = $conn->prepare("UPDATE representatives 
                            SET rep_name=?, phone=?, email=?, department=?
                            WHERE rep_id=?");

    $stmt->bind_param("ssssi", $name, $phone, $email, $department, $id);

    if($stmt->execute()){
        echo "success";
    } else {
        echo "error";
    }
}
?>
