function handleLoginSuccess(data) {
    console.log('ログイン成功');
    console.log('ID:', data.id);
    console.log('Name:', data.name);
    console.log('Coin:', data.coin);
    console.log('Playtimes:', data.playtimes);
    console.log('Wintimes:', data.wintimes);

    window.loggedInUser = {
        id: data.id,
        name: data.name,
        coin: data.coin,
        playtimes: data.playtimes,
        wintimes: data.wintimes
    };

    const loginScreen = document.getElementById('loginScreen');
    const homeview = document.getElementById('homeview');
    const welcomeMessage = document.getElementById('welcomeMessage');
    const changePortButton = document.getElementById('changePortButton');

    // ログイン画面を非表示にする
    loginScreen.classList.remove('visible');
    setTimeout(() => {
        loginScreen.classList.add('hidden');
    }, 300);

    homeview.style.display = "block";
    welcomeMessage.textContent = `Welcome ${data.name}`;
    welcomeMessage.style.display = "block";

    // 3秒後にウェルカムメッセージを非表示にし、スタートボタンを表示する
    setTimeout(() => {
        welcomeMessage.style.display = "none";
        changePortButton.style.display = "block";
    }, 3000);
}

function handleLoginError(message) {
    console.log('ログイン失敗:', message);
    alert('ログインに失敗しました。IDとパスワードを確認してください。');
}