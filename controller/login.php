<?php 
    require '../model/db.php';
    require '../model/userModel.php';

    $userName = $_POST['userName']; 
    $passaword = $_POST['password'];

    header('Content-Type: application/json');
    
    
    try {
        $db = new Database();
        $userModel = new userModel($db);

        $data = $userModel->login($userName, $passaword);
        $datajson = json_encode($data);
        if(count($data) != 0){
            header('Location: ../view/inicio.html');
            exit();
        }else{
            header('Location: ../index.html?error=usuario');
            exit();
        }
    }catch (Exception $e) {
        error_log("Error al obtener los datos: " . $e->getMessage());
        echo json_encode(['error' => 'Se produjo un error al obtener los datos.']);
        header('Location: ../index.html');
        exit();
    }
?>