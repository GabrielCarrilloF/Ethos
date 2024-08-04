<?php 
class userModel {
    private $db;

    public function __construct(Database $db) {
        $this->db = $db;
    }

    public function getGeneralData() {
        $sql = "SELECT * FROM *nombre de la base de datos*";
        $stmt = $this->db->query($sql);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}
?>