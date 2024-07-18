<?php
session_start();

function getUserData($pdo, $id) {
    $sql = "SELECT coin, playtimes, wintimes FROM playerInfor WHERE id = :id;";
    $stmt = $pdo->prepare($sql);
    $stmt->bindValue('id', $id, PDO::PARAM_STR);
    $stmt->execute();
    return $stmt->fetch();
}

if (isset($_SESSION['user'])) {
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

        // データベースから最新のユーザー情報を取得
        $stats = getUserData($pdo, $_SESSION['user']['id']);

        // セッション内のユーザー情報を更新
        $_SESSION['user']['coin'] = $stats['coin'];
        $_SESSION['user']['playtimes'] = $stats['playtimes'];
        $_SESSION['user']['wintimes'] = $stats['wintimes'];

        echo json_encode([
            'status' => 'success',
            'user' => $_SESSION['user']
        ]);
    } catch (Exception $e) {
        echo json_encode(['status' => 'error', 'message' => 'データベースエラー: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'セッションが存在しません']);
}
?>