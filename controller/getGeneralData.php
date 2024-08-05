<?php 
require '../model/db.php';
require '../model/userModel.php';

header('Content-Type: application/json');

try {
    $db = new Database();
    $userModel = new userModel($db);

    $data = $userModel->getGeneralData();
    echo json_encode($data);
}catch (Exception $e) {
    error_log("Error al obtener los datos: " . $e->getMessage());
    echo json_encode(['error' => 'Se produjo un error al obtener los datos.']);
}
?>