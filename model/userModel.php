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
}
?>