<?php
session_start();

if (isset($_SESSION['user'])) {
    echo json_encode(['status' => 'success', 'user' => $_SESSION['user']]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'セッションが存在しません']);
}
?>