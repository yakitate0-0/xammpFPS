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

        $sql = "SELECT* FROM login WHERE id =:id;";
        $stmt = $pdo->prepare($sql);
        $stmt->bindValue('id', $_POST["id"], PDO::PARAM_STR);

        $stmt->execute();
        $result = $stmt->fetchAll();

        if (count($result) != 0) {
            $login_flag = false;
            foreach ($result as $item) {
                if (password_verify($_POST["pass"], $item["pass"])) {
                    print ("<br><br>login成功<br>");
                    $login_flag = true;
                    break;
                }
            }
            if ($login_flag == false) {
                print ("<br><br>ログインに失敗しました<br>");
            }
        } else {
            print ("<br><br>ログインに失敗しました<br>");
        }

    } catch (Exception $e) {
        print ($e->getMessage() . "<br>");
    }

}
?>