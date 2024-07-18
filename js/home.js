const loginScreen = document.getElementById('loginScreen');
const homeview = document.getElementById('homeview');
const welcomeMessage = document.getElementById('welcomeMessage');
const changePortButton = document.getElementById('changePortButton');
const logoutButton = document.getElementById('logoutButton');
const particlesContainer = document.getElementById('particles-container');
const bearImange = document.getElementById('bearImage');
const rightImange = document.getElementById('rightImage');
const leftImange = document.getElementById('leftImage');
const InforButton = document.getElementById('InforButton');
const infoScreen = document.getElementById('infoScreen');
const backButton = document.getElementById('backButton');
const userCoin = document.getElementById('userCoin');
const userPlayTimes = document.getElementById('userPlayTimes');
const userWinTimes = document.getElementById('userWinTimes');
const userKillRate = document.getElementById('userKillRate');



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


                fetch('php/dataup.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: new URLSearchParams({
                        'action': 'update_coinlose',
                        'id': window.loggedInUser.id
                    })
                })


            } else if (playerid != result) {
                waittime = 5000;
                welcomeMessage.textContent = `${user.name} WIN!`;


                fetch('php/dataup.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: new URLSearchParams({
                        'action': 'update_coinwin',
                        'id': window.loggedInUser.id
                    })
                })

                fetch('php/dataup.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: new URLSearchParams({
                        'action': 'update_win',
                        'id': window.loggedInUser.id
                    })
                })


            }
        } else {
            welcomeMessage.textContent = `Welcome ${user.name}`;
        }
        welcomeMessage.style.display = "block";

        welcomeMessage.addEventListener('click', () => {
            backmusic.play();
            welcomeMessage.style.display = "none";
            changePortButton.style.display = "block";
            logoutButton.style.display = "block";
            InforButton.style.display = "block";
            bearImange.style.display = "block";
            rightImange.style.display = "block";
            leftImange.style.display = "block";

        });

        InforButton.addEventListener('click', () => {
            showInfoScreen();
        });

        backButton.addEventListener('click', () => {
            hideInfoScreen();
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

    function showInfoScreen() {
        // ユーザー情報を更新
        userCoin.textContent = window.loggedInUser.coin;
        userPlayTimes.textContent = window.loggedInUser.playtimes;
        userWinTimes.textContent = window.loggedInUser.wintimes;

        // キルレートを計算（プレイ回数が0の場合は0とする）
        const killRate = window.loggedInUser.playtimes > 0
            ? (window.loggedInUser.wintimes / window.loggedInUser.playtimes * 100).toFixed(2)
            : 0;
        userKillRate.textContent = killRate + '%';

        // 情報画面を表示
        infoScreen.classList.remove('hidden');
        setTimeout(() => {
            infoScreen.classList.add('visible');
        }, 10);

        // メイン画面の要素を非表示
        changePortButton.style.display = "none";
        logoutButton.style.display = "none";
        InforButton.style.display = "none";
        bearImange.style.display = "none";
        rightImange.style.display = "none";
        leftImange.style.display = "none";
    }

    function hideInfoScreen() {
        // 情報画面を非表示
        infoScreen.classList.remove('visible');
        setTimeout(() => {
            infoScreen.classList.add('hidden');
        }, 300);

        // メイン画面の要素を再表示
        changePortButton.style.display = "block";
        logoutButton.style.display = "block";
        InforButton.style.display = "block";
        bearImange.style.display = "block";
        rightImange.style.display = "block";
        leftImange.style.display = "block";
    }


    rightImange.addEventListener('click', () => {
        window.char++;
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
