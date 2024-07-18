document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    const loginScreen = document.getElementById('loginScreen');
    const loginForm = document.getElementById('loginForm');
    const logoutButton = document.getElementById('logoutButton');
    const particlesContainer = document.getElementById('particles-container');
    var backmusic = document.getElementById('backmusic');

    // セッションが存在するか確認するリクエストを送信
    fetch('php/check_session.php')
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                handleLoginSuccess(data.user);
            }
        });

    startButton.addEventListener('click', () => {
        loginScreen.classList.remove('hidden');
        setTimeout(() => {
            loginScreen.classList.add('visible');
        }, 10);
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(loginForm);

        fetch('php/login.php', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    handleLoginSuccess(data);
                } else {
                    handleLoginError(data.message);
                }
            })
            .catch(error => {
                console.error('エラー:', error);
                alert('ログイン処理中にエラーが発生しました。');
            });
    });

    function handleLoginSuccess(user) {
        console.log('ログイン成功');
        console.log('ID:', user.id);
        console.log('Name:', user.name);
        console.log('Coin:', user.coin);
        console.log('Playtimes:', user.playtimes);
        console.log('Wintimes:', user.wintimes);

        window.loggedInUser = user;

        const loginScreen = document.getElementById('loginScreen');
        const homeview = document.getElementById('homeview');
        const welcomeMessage = document.getElementById('welcomeMessage');
        const changePortButton = document.getElementById('changePortButton');
        const logoutButton = document.getElementById('logoutButton');
        const particlesContainer = document.getElementById('particles-container');
        const bearImange = document.getElementById('bearImage');
        let waittime = 3000;


        particlesContainer.classList.remove('hidden');
        // ログイン画面を非表示にする
        loginScreen.classList.remove('visible');
        setTimeout(() => {
            loginScreen.classList.add('hidden');
        }, 300);

        homeview.style.display = "block";

        createStarfield();
        if (result) {
            console.log(result);
            console.log(playerid);
            if (playerid == result) {
                waittime = 5000;
                welcomeMessage.textContent = `${user.name} LOSE!`;
            } else if (playerid != result) {
                waittime = 5000;
                welcomeMessage.textContent = `${user.name} WIN!`;
            }
        } else {
            welcomeMessage.textContent = `Welcome ${user.name}`;
        }
        welcomeMessage.style.display = "block";

        // 3秒後にウェルカムメッセージを非表示にし、スタートボタンを表示する


        welcomeMessage.addEventListener('click',()=>{
            backmusic.play();
            welcomeMessage.style.display = "none";
            changePortButton.style.display = "block";
            logoutButton.style.display = "block";
            bearImange.style.display="block";
        });
    }

    function handleLoginError(message) {
        console.log('ログイン失敗:', message);
        alert('ログインに失敗しました。IDとパスワードを確認してください。');
    }

    logoutButton.addEventListener('click', () => {
        fetch('php/logout.php')
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    console.log('ログアウト成功');
                    window.location.reload(); // ページをリロードしてログイン画面に戻る
                } else {
                    console.error('ログアウト失敗:', data.message);
                }
            })
            .catch(error => {
                console.error('エラー:', error);
            });
    });

    function createStarfield() {
        const starCount = 200;

        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.classList.add('star');

            const size = Math.random() * 2 + 1;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;

            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;

            const duration = Math.random() * 3 + 2;
            const delay = Math.random() * 5;

            star.style.animationDuration = `${duration}s`;
            star.style.animationDelay = `${delay}s`;

            if (Math.random() < 0.3) {
                star.style.boxShadow = `0 0 ${Math.random() * 10 + 5}px #ffffff`;
            }

            particlesContainer.appendChild(star);
        }
    }
});
