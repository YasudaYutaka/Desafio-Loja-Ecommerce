let slides = document.querySelector("#carousel-item-div").children;
let totalSlides = document.querySelector("#carousel-item-div").children.length;
let leftSlide = document.querySelector(".left-control");
let rightSlide = document.querySelector(".right-control");
let count = 0;

leftSlide.onclick = function() {
    moveSlide("prev");
    resetTimer();
}

rightSlide.onclick = function() {
    moveSlide("next");
    resetTimer();
}

function moveSlide(direction) {

    if(direction == "next") {
        count++;
        if(count == totalSlides) {
            count = 0;
        }
    } else {
        if(count == 0) {
            count = totalSlides - 1;
        } else {
            count--;
        }
    }


    for(let x = 0; x < slides.length; x++) {
        slides[x].classList.remove("carousel-item-active");
    }

    slides[count].classList.add("carousel-item-active")

}

// AUTO-PLAY //

let timer = setInterval(autoPlay, 6000);

function autoPlay() {
    moveSlide("next");
}

function resetTimer() {
    // Limpa ao ser clicado para mover para frente ou tras
    clearInterval(timer);
    // Comeca novamente o timer
    timer = setInterval(autoPlay, 6000);
}
