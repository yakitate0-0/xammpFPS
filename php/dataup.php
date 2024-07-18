<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'update_playtimes') {
    try {
        $pdo = new PDO(
            "mysql:host=localhost;dbname=FPSplayer;",
            "root",
            "",
            [
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_EMULATE_PREPARES => false
            ]
        );

        $sql = "UPDATE playerInfor SET playtimes = playtimes + 1 WHERE id = :id;";
        $stmt = $pdo->prepare($sql);
        $stmt->bindValue('id', $_POST["id"], PDO::PARAM_STR);
        $stmt->execute();

        echo json_encode(['status' => 'success', 'message' => 'Playtimes updated successfully']);
    } catch (Exception $e) {
        echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
    }
    exit;
}


if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'update_coinwin') {
    try {
        $pdo = new PDO(
            "mysql:host=localhost;dbname=FPSplayer;",
            "root",
            "",
            [
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_EMULATE_PREPARES => false
            ]
        );

        $sql = "UPDATE playerInfor SET coin = coin + 50 WHERE id = :id;";
        $stmt = $pdo->prepare($sql);
        $stmt->bindValue('id', $_POST["id"], PDO::PARAM_STR);
        $stmt->execute();

        echo json_encode(['status' => 'success', 'message' => 'Playtimes updated successfully']);
    } catch (Exception $e) {
        echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
    }
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'update_coinlose') {
    try {
        $pdo = new PDO(
            "mysql:host=localhost;dbname=FPSplayer;",
            "root",
            "",
            [
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_EMULATE_PREPARES => false
            ]
        );

        $sql = "UPDATE playerInfor SET coin = coin + 10 WHERE id = :id;";
        $stmt = $pdo->prepare($sql);
        $stmt->bindValue('id', $_POST["id"], PDO::PARAM_STR);
        $stmt->execute();

        echo json_encode(['status' => 'success', 'message' => 'Playtimes updated successfully']);
    } catch (Exception $e) {
        echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
    }
    exit;
}
?>
