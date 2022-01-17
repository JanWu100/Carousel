


let startInput = [{image: "./images/man_in_glasses.jpg", title: "the man", bodyText: "1Lorem ipsum dolor sit amet"},
{image: "./images/texture.jpg", title: "the second", bodyText: "2Lorem ipsum dolor sit amet"},
{image: "./images/balcony.png", title: "the third", bodyText: "3Lorem ipsum dolor sit amet"}];


for (let i=0 ; i < startInput.length ; i++){
  document.querySelector(".dot__wrapper").innerHTML = '<div class="carousel__dot"></div>';
}



const buttons = document.querySelectorAll("[data-carousel-button");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const offset = button.dataset.carouselButton === "next" ? 1 : -1;

    const slides = button
      .closest("[data-carousel]")
      .querySelector("[data-slides]");

    const activeSlide = slides.querySelector("[data-active]");

    let newIndex = [...slides.children].indexOf(activeSlide) + offset;
    if (newIndex < 0) newIndex = slides.children.length - 1;
    if (newIndex >= slides.children.length) newIndex = 0;

    slides.children[newIndex].dataset.active = true;
    delete activeSlide.dataset.active;
  });
});

