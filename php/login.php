<?php

if (!empty($_POST["id"]) && !empty($_POST["pass"])) {
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

        $sql = "SELECT * FROM login WHERE id = :id;";
        $stmt = $pdo->prepare($sql);
        $stmt->bindValue('id', $_POST["id"], PDO::PARAM_STR);

        $stmt->execute();
        $result = $stmt->fetchAll();

        if (count($result) != 0) {
            $login_flag = false;
            foreach ($result as $item) {
                if (password_verify($_POST["pass"], $item["pass"])) {
                    $sql = "SELECT coin, playtimes, wintimes FROM playerInfor WHERE id = :id;";
                    $stmt = $pdo->prepare($sql);
                    $stmt->bindValue('id', $_POST["id"], PDO::PARAM_STR);
                    $stmt->execute();
                    $stats = $stmt->fetch();

                    // ログイン成功時のレスポンス
                    $response = [
                        'status' => 'success',
                        'message' => 'ログイン成功',
                        'id' => $item['id'],
                        'name' => $item['name'],
                        'coin' => $stats['coin'],
                        'playtimes' => $stats['playtimes'],
                        'wintimes' => $stats['wintimes']
                    ];
                    echo json_encode($response);
                    exit;
                }
            }
            if ($login_flag == false) {
                echo json_encode(['status' => 'error', 'message' => 'ログインに失敗しました']);
            }
        } else {
            echo json_encode(['status' => 'error', 'message' => 'ログインに失敗しました']);
        }

    } catch (Exception $e) {
        print ($e->getMessage() . "<br>");
    }
}
?>