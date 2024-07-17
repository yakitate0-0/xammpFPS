document.getElementById('changePortButton').addEventListener('click', function () {
    // 現在のホスト名を取得
    const host = window.location.hostname;
    // 新しいポート番号を指定
    const newPort = 3000;
    // 新しいURLにリダイレクト
    window.location.href = `http://${host}:${newPort}?id=${window.loggedInUser.id}`;
});

const params = new URLSearchParams(window.location.search);
const result = params.get('result');
const playerid = params.get('playerid');
const url = new URL(window.location);
url.searchParams.delete('result');
url.searchParams.delete('playerid');
window.history.replaceState({}, document.title, url);

// 取得した値を表示
if (result) {
    console.log(result);
    console.log(playerid);
}
