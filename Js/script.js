document.addEventListener("DOMContentLoaded", function () {
    const slider = document.querySelector(".slides");
    const images = document.querySelectorAll(".slides img");

    let counter = 1;
    const size = images[0].clientWidth;

    slider.style.transform = "translateX(" + (-size * counter) + "px)";

    function nextSlide() {
        if (counter >= images.length - 1) return;
        slider.style.transition = "transform 0.5s ease-in-out";
        counter++;
        slider.style.transform = "translateX(" + (-size * counter) + "px)";
    }

    function prevSlide() {
        if (counter <= 0) return;
        slider.style.transition = "transform 0.5s ease-in-out";
        counter--;
        slider.style.transform = "translateX(" + (-size * counter) + "px)";
    }

    slider.addEventListener("transitionend", function () {
        if (images[counter].id === "lastClone") {
            slider.style.transition = "none";
            counter = images.length - 2;
            slider.style.transform = "translateX(" + (-size * counter) + "px)";
        }
        if (images[counter].id === "firstClone") {
            slider.style.transition = "none";
            counter = images.length - counter;
            slider.style.transform = "translateX(" + (-size * counter) + "px)";
        }
    });

    // Trigger next slide on button click
    document.querySelector(".container").addEventListener("click", function (event) {
        if (event.target.matches(".next")) {
            nextSlide();
        } else if (event.target.matches(".prev")) {
            prevSlide();
        }
    });
});
