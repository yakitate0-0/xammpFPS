const newPort = 3000;
const nextPort = 3100;
let Port = newPort;

document.getElementById('stageButton').addEventListener('click', function () {
    if (Port == nextPort) {
        Port = newPort;
        document.getElementById('stageButton').style.color = '#00fffb';
    } else if (Port == newPort) {
        Port = nextPort;
        document.getElementById('stageButton').style.color = '#ff0000';
    }
    console.warn(Port);
});

document.getElementById('changePortButton').addEventListener('click', function () {
    // 現在のホスト名を取得
    const host = window.location.hostname;
    // 新しいポート番号を指定

    // playtimesを更新するリクエストを送信
    fetch('php/dataup.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            'action': 'update_playtimes',
            'id': window.loggedInUser.id
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                console.log('Playtimes updated successfully');
                // 新しいURLにリダイレクト
                window.location.href = `http://${host}:${Port}?id=${window.loggedInUser.id}&char=${window.char}`;
            } else {
                console.error('Failed to update playtimes:', data.message);
                alert('Failed to update playtimes.');
            }
        })
        .catch(error => {
            console.error('エラー:', error);
            alert('Failed to update playtimes.');
        });
});

const params = new URLSearchParams(window.location.search);
const result = params.get('result');
const playerid = params.get('playerid');
const url = new URL(window.location);
url.searchParams.delete('result');
url.searchParams.delete('playerid');
window.history.replaceState({}, document.title, url);
window.char = 0;

// 取得した値を表示