<!DOCTYPE html>
<html lang="ja">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>create Account</title>
    <link rel="stylesheet" href="./create.css">
    <link href="https://fonts.googleapis.com/css2?family=Audiowide&family=Orbitron:wght@400;700;900&display=swap"
        rel="stylesheet">
</head>

<body>
    <div class="glitch-overlay"></div>
    <div class="scanner"></div>
    <div class="container">

        <h3>Enter your information to register</h3>
        <form action="create.php" method="POST">
            ID:<input type="text" name="id"><br>
            Password:<input type="password" name="pass"><br>
            Name:<input type="text" name="name"><br>
            <input type="submit" value="create">
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
                    print ("<br><br>Successful creation!!<br>");
                    print ("ID: " . $_POST["id"] . "<br>");
                    print ("ID: " . $_POST["name"] . "<br>");
                } else {
                    print ("<br><br>Creation failed!!<br>");
                }

            } catch (Exception $e) {
                print ($e->getMessage() . "<br>");
            }
        }

        ?>

</body>

</html>