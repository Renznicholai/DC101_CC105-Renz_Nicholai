<?php
header('Content-Type: application/json');

try {
    require __DIR__ . '/db.php'; // siguraduhin tama ang path

    $input = json_decode(file_get_contents('php://input'), true);
    if(!$input || !isset($input['rep_id'])){
        echo json_encode(['success'=>false,'error'=>'rep_id missing']);
        exit;
    }

    $rep_id = (int)$input['rep_id'];

    $stmt = $conn->prepare("DELETE FROM representatives WHERE rep_id = ?");
    $stmt->bind_param("i", $rep_id);
    $stmt->execute();

    echo json_encode(['success'=>true]);

} catch(Exception $e){
    echo json_encode(['success'=>false,'error'=>$e->getMessage()]);
}
