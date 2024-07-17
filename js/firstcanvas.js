document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    const loginScreen = document.getElementById('loginScreen');
    const loginForm = document.getElementById('loginForm');

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
                    console.log('ログイン成功');
                    console.log('ID:', data.id);
                    console.log('Name:', data.name);
                    console.log('Coin:', data.coin);
                    console.log('Playtimes:', data.playtimes);
                    console.log('Wintimes:', data.wintimes);

                    // ここでIDとnameを使って何かを行う
                    // 例: グローバル変数に保存
                    window.loggedInUser = {
                        id: data.id,
                        name: data.name,
                        coin: data.coin,
                        playtimes: data.playtimes,
                        wintimes: data.wintimes
                    };

                    // ログイン画面を非表示にする
                    loginScreen.classList.remove('visible');
                    setTimeout(() => {
                        loginScreen.classList.add('hidden');
                    }, 300);

                    const homeview = document.getElementById('homeview').style.display = "block";

                } else {
                    console.log('ログイン失敗:', data.message);
                    alert('ログインに失敗しました。IDとパスワードを確認してください。');
                }
            })
            .catch(error => {
                console.error('エラー:', error);
                alert('ログイン処理中にエラーが発生しました。');
            });
    });
});

// ログイン後にゲームを開始する関数の例
function startGame(id, name) {
    console.log(`ようこそ、${name}さん（ID: ${id}）`);
    // ここにゲーム開始のロジックを記述
}

// カーソル用のdivタグを取得してcursorに格納
var cursor = document.getElementById('cursor');

// カーソル用のdivタグをマウスに追従させる
document.addEventListener('mousemove', function (e) {
    cursor.style.transform = 'translate(' + e.clientX + 'px, ' + e.clientY + 'px)';
});

// リンクにホバーした時にクラス追加、離れたらクラス削除
var link = document.querySelectorAll('a');
for (var i = 0; i < link.length; i++) {
    link[i].addEventListener('mouseover', function (e) {
        cursor.classList.add('cursor--hover');
    });
    link[i].addEventListener('mouseout', function (e) {
        cursor.classList.remove('cursor--hover');
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    const particlesContainer = document.getElementById('particles-container');
    const createScreen = document.getElementById('create');

    var backmusic = document.getElementById('backmusic');

    startButton.addEventListener('click', () => {
        particlesContainer.classList.remove('hidden');
        createStarfield();
        createScreen.style.display = 'block';
        console.log("getcorrect");
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
