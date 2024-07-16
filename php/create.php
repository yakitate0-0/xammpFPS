<!DOCTYPE html>
<html lang="ja">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>create Account</title>
</head>

<body>
    <p>登録するユーザー情報を入力してください。</p>
    <form action="create.php" method="POST">
        ID:<input type="text" name="id"><br>
        パスワード:<input type="password" name="pass"><br>
        名前:<input type="text" name="name"><br>
        <input type="submit" value="送信">
    </form>
    <br>


    <?php

    if (!empty($_POST["id"]) && !empty($_POST["pass"]) && !empty($_POST["name"])) {
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

            $sql = "INSERT INTO login (id, pass, name)VALUES(:id, :pass, :name);";
            $stmt = $pdo->prepare($sql);
            $stmt->bindValue('id', $_POST["id"], PDO::PARAM_STR);

            $pass = password_hash($_POST["pass"], PASSWORD_DEFAULT);
            $stmt->bindValue('pass', $pass, PDO::PARAM_STR);
            $stmt->bindValue('name', $_POST["name"], PDO::PARAM_STR);


            $result = $stmt->execute();

            if ($result == true) {
                print ("<br><br>登録しました<br>");
                print ("ID: " . $_POST["id"] . "<br>");
                print ("ID: " . $_POST["name"] . "<br>");
            } else {
                print ("<br><br>登録に失敗しました<br>");
            }

        } catch (Exception $e) {
            print ($e->getMessage() . "<br>");
        }
    }

    ?>

</body>

</html>