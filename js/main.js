document.addEventListener('DOMContentLoaded', function () {
    var backmusic = document.getElementById('backmusic');
    var startButton = document.getElementById('startButton');

    startButton.addEventListener('click', function () {
        backmusic.play();
    });
});