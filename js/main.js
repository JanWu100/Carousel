let startInput = [
  {
    image: `https://source.unsplash.com/random?sig=${Math.floor(
      Math.random() * 500
    )}`,
    title: "the man",
    bodyText: `Photo by
      <a
        target="blank"
        href="https://www.pexels.com/@ashish-sharma-266379?utm_content=attributionCopyText&utm_medium=referral&utm_source=pexels"
        >ASHISH SHARMA</a
      >
      from
      <a
        target="blank"
        href="https://www.pexels.com/photo/ma-in-black-aviator-sunglasses-with-purple-smoke-917594/?utm_content=attributionCopyText&utm_medium=referral&utm_source=pexels"
        >Pexels</a
      >`,
  },
  {
    image: `https://source.unsplash.com/random?sig=${Math.floor(
      Math.random() * 500
    )}`,
    title: "the second",
    bodyText: `Photo by
      <a
        target="blank"
        href="https://unsplash.com/@annaskrzynska?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
        >Anna Skrzyńska</a
      >
      on
      <a
        target="blank"
        href="https://unsplash.com/t/wallpapers?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
        >Unsplash</a
      >`,
  },
  {
    image: `https://source.unsplash.com/random?sig=${Math.floor(
      Math.random() * 500
    )}`,
    title: "the third",
    bodyText: `Photo by
    <a
      target="blank"
      href="https://www.pexels.com/@anniroenkae?utm_content=attributionCopyText&utm_medium=referral&utm_source=pexels"
      >Anni Roenkae</a
    >
    from
    <a
      target="blank"
      href="https://www.pexels.com/photo/photo-of-acrylic-paint-2832432/?utm_content=attributionCopyText&utm_medium=referral&utm_source=pexels"
      >Pexels</a
    >`,
  },
];

const buttons = document.querySelectorAll("[data-carousel-button");
const addSlide = document.querySelector(".btn-add");
const removeSlide = document.querySelector(".btn-remove");

let timeout;
let dots = [];
let slides = [];
let allDots;
let allSlides;
let currentSlide = 0;
let addedSlideCount = 0;

createCarousel();
startTimer();

function createCarousel() {
  for (let i = 0; i < startInput.length; i++) {
    if (i === currentSlide) {
      dots.push('<div class="carousel__dot" data-active></div>');
    } else {
      dots.push('<div class="carousel__dot"></div>');
    }
  }
  document.querySelector(".dot__wrapper").innerHTML = dots.join("");
  for (let i = 0; i < startInput.length; i++) {
    if (i === currentSlide) {
      slides.push(` <div class="slide" data-active>
                      <div class="slide__image">
                        <img src="${startInput[i].image}" alt="" srcset="" />
                      </div>
                      <div class="slide__body">
                        <h3>${startInput[i].title}</h3>
                        <p>
                        ${startInput[i].bodyText}
                        </p>
                      </div>
                    </div>`);
    } else {
      slides.push(` <div class="slide">
                      <div class="slide__image">
                        <img src="${startInput[i].image}" alt="" srcset="" />
                      </div>
                      <div class="slide__body">
                        <h3>${startInput[i].title}</h3>
                        <p>
                        ${startInput[i].bodyText}
                        </p>
                      </div>
                    </div>`);
    }
  }
  document.querySelector("[data-slides]").innerHTML = slides.join("");
  allDots = document.querySelectorAll(".carousel__dot");
  allSlides = document.querySelectorAll(".slide");
  makeDotsInteractive();
}

function makeDotsInteractive() {
  for (let i = 0; i < allDots.length; i++) {
    allDots[i].addEventListener("click", () => {
      if (i !== currentSlide) {
                                delete allDots[currentSlide].dataset.active;
                                delete allSlides[currentSlide].dataset.active;
                                allDots[i].dataset.active = true;
                                allSlides[i].dataset.active = true;
                                currentSlide = i;
                              }
    });
  }
}

function startTimer() {
  clearTimeout(timeout);
  timeout = setInterval(function () {
    nextSlide();
  }, 3500);
}

function nextSlide() {

  let newIndex = currentSlide + 1;

  if (newIndex < 0) newIndex = allSlides.length - 1;
  if (newIndex >= allSlides.length) newIndex = 0;

  delete allDots[currentSlide].dataset.active;
  delete allSlides[currentSlide].dataset.active;

  allSlides[newIndex].dataset.active = true;
  allDots[newIndex].dataset.active = true;

  currentSlide = newIndex;
}

function allowAlphaNumericSpace(thisInput) {
  thisInput.value = thisInput.value.split(/[^a-zA-Z0-9 .!?,]/).join('');
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    startTimer();
    const offset = button.dataset.carouselButton === "next" ? 1 : -1;
    let newIndex = currentSlide + offset;

    if (newIndex < 0) newIndex = allSlides.length - 1;
    if (newIndex >= allSlides.length) newIndex = 0;

    delete allDots[currentSlide].dataset.active;
    delete allSlides[currentSlide].dataset.active;

    allSlides[newIndex].dataset.active = true;
    allDots[newIndex].dataset.active = true;

    currentSlide = newIndex;
  });
});

addSlide.addEventListener("click", () => {
  slides = [];
  dots = [];

  addedSlideCount++;
  if (startInput.length > 15) {
    alert("I think it is enough slides for one Carousel ;)");
  } else {
    currentSlide = startInput.length;
    startInput.push({
      image: `https://source.unsplash.com/random?sig=${Math.floor(
        Math.random() * 500
      )}`,
      title:
        document.querySelector(".title-input").value === ""
          ? `Generic title number ${addedSlideCount}`
          : document.querySelector(".title-input").value,
      bodyText:
        document.querySelector(".text-input").value === ""
          ? "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis unde, animi architecto repellat dolorem doloribus est fuga vero praesentium fugiat."
          : document.querySelector(".text-input").value,
    });
  }
  createCarousel();
  startTimer();
});

removeSlide.addEventListener("click", () => {
  slides = [];
  dots = [];

  if (startInput.length > 2) {
    currentSlide = 0;
    startInput.pop();
    createCarousel();
    startTimer();
  } else {
    alert("We need at least 2 slides to call it a Carousel ;)");
  }
});