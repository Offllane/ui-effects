const track = document.getElementById('image-track');
// @ts-ignore
const imagesArray = Array.from(track.getElementsByClassName('image'));
// @ts-ignore
const logos = Array.from(document.getElementsByClassName('logo'));

window.onmousedown = (event: MouseEvent) => {
  track.dataset.mouseDownAt = String(event.clientX);
}

window.onmousemove = (event: MouseEvent) => {
    if (track.dataset.mouseDownAt === '0') { return; }
    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - event.clientX;
    const maxDelta = window.innerWidth / 2;

    const percentage = (mouseDelta / maxDelta) * -100;
    const nextPercentage = parseFloat(track.dataset.prevPercentage) + percentage;
    Math.min(nextPercentage, 0);
    Math.max(nextPercentage, -100);

    for (const image of imagesArray) {
        image.style.objectPosition = `${nextPercentage + 100}% 50%`;
        image.animate({
            objectPosition: `${nextPercentage + 100}% 50%`
        }, { duration: 1200, fill: 'forwards' });
    }

    track.dataset.percentage = String(nextPercentage);
    track.style.transform = `translate(${nextPercentage}%, -50%)`;
    track.animate({
        transform: `translate(${nextPercentage}%, -50%)`
    }, { duration: 1200, fill: 'forwards' });
}

window.onmouseup = () => {
    track.dataset.mouseDownAt = '0';
    track.dataset.prevPercentage = track.dataset.percentage;
}

const letters = 'ABCDEFGHIJKLMNOPQRSTUWXYZ';
const letterQuantity = letters.length;

logos.forEach(logo => {
    logo.onmouseover = event => {
        let iterations = 0;
        const interval = setInterval(() => {
            event.target.innerText = event.target.innerText
                .split('')
                .map((letter, index) => {
                    if (index < iterations) {
                        return event.target.dataset.value[index];
                    }

                    const randomLetterIndex = Math.floor(Math.random() * letterQuantity);
                    return letters[randomLetterIndex];
                }).join('');

            if (iterations >= event.target.dataset.value.length) { clearInterval(interval); }
            iterations += 1 / 3;
        }, 30)
    }
})
