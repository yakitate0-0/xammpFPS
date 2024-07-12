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

    startButton.addEventListener('click', () => {
        particlesContainer.classList.remove('hidden');
        createStarfield();
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

    // 流れ星のアニメーション
    setInterval(() => {
        if (!particlesContainer.classList.contains('hidden')) {
            createShootingStar();
        }
    }, 2000);

    function createShootingStar() {
        const shootingStar = document.createElement('div');
        shootingStar.classList.add('shooting-star');
        
        shootingStar.style.left = `${Math.random() * 100}%`;
        shootingStar.style.top = `${Math.random() * 50}%`;
        
        const animationDuration = Math.random() * 2 + 1;
        shootingStar.style.animation = `shootingStar ${animationDuration}s linear`;
        
        particlesContainer.appendChild(shootingStar);
        
        setTimeout(() => {
            shootingStar.remove();
        }, animationDuration * 1000);
    }
});