<?php 
class userModel {
    private $db;

    public function __construct(Database $db) {
        $this->db = $db;
    }

    public function getGeneralData() {
        $sql = "SELECT * FROM datosgenerales";
        $stmt = $this->db->sectQuery($sql);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getAsociadosData() {
        $sql = "SELECT ficha,nombre,apellido,telefono FROM miembro";
        $stmt = $this->db->sectQuery($sql);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function login($userName, $passaword) {
        $sql = "SELECT id_miembro FROM users WHERE username = '$userName' AND userpassword = '$passaword' AND userstatus = 'activo'";
        $stmt = $this->db->sectQuery($sql);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
?>