<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
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
                $_SESSION['creation_success'] = true;
                $_SESSION['new_id'] = $_POST["id"];
                $_SESSION['new_name'] = $_POST["name"];
                $success = true;
            } else {
                $error_message = "Creation failed!";
            }

        } catch (Exception $e) {
            $error_message = "Error: " . $e->getMessage();
        }
    }
}
?>

<!DOCTYPE html>
<html lang="ja">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Create Account</title>
    <link rel="stylesheet" href="./create.css">
    <link href="https://fonts.googleapis.com/css2?family=Audiowide&family=Orbitron:wght@400;700;900&display=swap"
        rel="stylesheet">
    <style>
        #success-overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.7);
            z-index: 999;
        }

        #success-message {
            display: none;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: rgba(0, 255, 255, 0.5);
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
            z-index: 1000;
        }
    </style>
</head>

<body>
    <div class="glitch-overlay"></div>
    <div class="vignette"></div>
    <div class="container">
        <h3>Enter your information to register</h3>
        <?php if (isset($error_message)): ?>
            <p class="error"><?php echo $error_message; ?></p>
        <?php endif; ?>
        <form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="POST">
            PlayerID:<input type="text" name="playerid"><br>
            Password:<input type="password" name="pass"><br>
            Name:<input type="text" name="name"><br>
            <input type="submit" value="create">
        </form>
    </div>

    <div id="success-overlay"></div>
    <div id="success-message">
        <h1 class="glitch" data-text="Success!">Success!</h1>
    </div>

    <?php if (isset($success) && $success): ?>
        <script>
            document.getElementById('success-message').style.display = 'block';
            const host = window.location.hostname;
            const newPort = 8080;
            setTimeout(function () {
                window.location.href = `http://${host}:${newPort}/xammpFPS`;
            }, 2000);
        </script>
    <?php endif; ?>
</body>

</html>