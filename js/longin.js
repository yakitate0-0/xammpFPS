document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    const loginScreen = document.getElementById('loginScreen');
    const loginForm = document.getElementById('loginForm');

    startButton.addEventListener('click', () => {
        loginScreen.classList.remove('hidden');
        // 少し遅延を入れてアニメーションを滑らかにする
        setTimeout(() => {
            loginScreen.classList.add('visible');
        }, 10);
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // ここにログイン処理を実装
        console.log('Login attempted');
        // 例: ログイン成功後の処理
        // loginScreen.classList.remove('visible');
        // setTimeout(() => {
        //     loginScreen.classList.add('hidden');
        // }, 300);
    });

    createButton.addEventListener('click', () => {
        // ここに新規アカウント作成画面を表示する処理を追加
        console.log('Create account clicked');
    });
});

