<?php
session_start();

function getUserData($pdo, $id) {
    $sql = "SELECT coin, playtimes, wintimes FROM playerInfor WHERE id = :id;";
    $stmt = $pdo->prepare($sql);
    $stmt->bindValue('id', $id, PDO::PARAM_STR);
    $stmt->execute();
    $result = $stmt->fetch();
    
    // デバッグ出力
    error_log("User data for ID $id: " . print_r($result, true));
    
    return $result;
}

if (!empty($_POST["id"]) && !empty($_POST["pass"])) {
    try {
        $pdo = new PDO(
            "mysql:host=localhost;dbname=FPSplayer;charset=utf8mb4",
            "root",
            "",
            [
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_EMULATE_PREPARES => false
            ]
        );

        $sql = "SELECT * FROM login WHERE id = :id;";
        $stmt = $pdo->prepare($sql);
        $stmt->bindValue('id', $_POST["id"], PDO::PARAM_STR);

        $stmt->execute();
        $result = $stmt->fetchAll();

        // デバッグ出力
        error_log("Login result for ID " . $_POST["id"] . ": " . print_r($result, true));

        if (count($result) != 0) {
            foreach ($result as $item) {
                if (password_verify($_POST["pass"], $item["pass"])) {
                    $stats = getUserData($pdo, $_POST["id"]);

                    $_SESSION['user'] = [
                        'id' => $item['id'],
                        'name' => $item['name'],
                        'coin' => $stats['coin'] ?? null,
                        'playtimes' => $stats['playtimes'] ?? null,
                        'wintimes' => $stats['wintimes'] ?? null
                    ];

                    $response = [
                        'status' => 'success',
                        'message' => 'ログイン成功',
                        'user' => $_SESSION['user']
                    ];
                    echo json_encode($response);
                    exit;
                }
            }
            echo json_encode(['status' => 'error', 'message' => 'パスワードが正しくありません']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'ユーザーが見つかりません']);
        }
    } catch (Exception $e) {
        error_log("Login error: " . $e->getMessage());
        echo json_encode(['status' => 'error', 'message' => 'データベースエラー: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'IDとパスワードを入力してください']);
}
?>