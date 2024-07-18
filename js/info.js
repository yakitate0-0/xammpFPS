document.addEventListener('DOMContentLoaded', () => {
    const rightImage = document.getElementById('rightImage');
    const leftImage = document.getElementById('leftImage');
    const images = document.querySelectorAll('img:not(#rightImage):not(#leftImage)');
    let currentImageIndex = 0;

    function showImage(index) {
        images.forEach((img, i) => {
            img.style.display = i === index ? 'block' : 'none';
        });
    }

    rightImage.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        showImage(currentImageIndex);
    });

    leftImage.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        showImage(currentImageIndex);
    });

    showImage(currentImageIndex); // 初期表示
});