<?php
include 'db.php';

if($_SERVER['REQUEST_METHOD'] === 'POST'){
    
    $id = $_POST['patient_id'];
    $name = $_POST['full_name'];
    $age = $_POST['age'];
    $gender = $_POST['gender'];
    $phone = $_POST['phone'];
    $email = $_POST['email'];
    $address = $_POST['address'];

    $stmt = $conn->prepare("UPDATE patients 
                            SET full_name=?, age=?, gender=?, phone=?, email=?, address=?
                            WHERE patient_id=?");

    $stmt->bind_param("sissssi", $name, $age, $gender, $phone, $email, $address, $id);

    if($stmt->execute()){
        echo "success";
    } else {
        echo "error";
    }
}
?>
