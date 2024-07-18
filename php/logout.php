<?php
session_start();
// セッション変数を全てクリア
$_SESSION = array();

// セッションを破棄
if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(
        session_name(),
        '',
        time() - 42000,
        $params["path"],
        $params["domain"],
        $params["secure"],
        $params["httponly"]
    );
}

// 最終的にセッションを破棄
session_destroy();

echo json_encode(['status' => 'success', 'message' => 'ログアウト成功']);
?>