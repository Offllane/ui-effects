var track = document.getElementById('image-track');
// @ts-ignore
var imagesArray = Array.from(track.getElementsByClassName('image'));
window.onmousedown = function (event) {
    track.dataset.mouseDownAt = String(event.clientX);
};
window.onmousemove = function (event) {
    if (track.dataset.mouseDownAt === '0') {
        return;
    }
    var mouseDelta = parseFloat(track.dataset.mouseDownAt) - event.clientX;
    var maxDelta = window.innerWidth / 2;
    var percentage = (mouseDelta / maxDelta) * -100;
    var nextPercentage = parseFloat(track.dataset.prevPercentage) + percentage;
    Math.min(nextPercentage, 0);
    Math.max(nextPercentage, -100);
    for (var _i = 0, imagesArray_1 = imagesArray; _i < imagesArray_1.length; _i++) {
        var image = imagesArray_1[_i];
        image.style.objectPosition = "".concat(nextPercentage + 100, "% 50%");
        image.animate({
            objectPosition: "".concat(nextPercentage + 100, "% 50%")
        }, { duration: 1200, fill: 'forwards' });
    }
    track.dataset.percentage = String(nextPercentage);
    track.style.transform = "translate(".concat(nextPercentage, "%, -50%)");
    track.animate({
        transform: "translate(".concat(nextPercentage, "%, -50%)")
    }, { duration: 1200, fill: 'forwards' });
};
window.onmouseup = function () {
    track.dataset.mouseDownAt = '0';
    track.dataset.prevPercentage = track.dataset.percentage;
};
