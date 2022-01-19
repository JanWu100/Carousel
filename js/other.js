let startInput = [
    {
      image: `https://source.unsplash.com/random?sig=${Math.floor(
        Math.random() * 500
      )}`,
      title: "the man",
      bodyText:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum recusandae veniam nobis et commodi placeat, dignissimos molestias. Perspiciatis, magni! Libero, quasi dolore blanditiis magni nobis modi sit mollitia repellendus rem!",
    },
    {
      image: `https://source.unsplash.com/random?sig=${Math.floor(
        Math.random() * 500
      )}`,
      title: "the second",
      bodyText:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur numquam omnis, suscipit nobis modi.",
    },
    {
      image: `https://source.unsplash.com/random?sig=${Math.floor(
        Math.random() * 500
      )}`,
      title: "the third",
      bodyText: "Lorem ipsum dolor sit amet.",
    },
  ];
  
  let timeout;
  let dots = [];
  let slides = [];
  
  createCarousel();
  timer();
  
  function createCarousel() {
    for (let i = 0; i < startInput.length; i++) {
      if (i === 0) {
        dots.push('<div class="carousel__dot" data-active></div>');
      } else {
        dots.push('<div class="carousel__dot"></div>');
      }
    }
  
    document.querySelector(".dot__wrapper").innerHTML = dots.join("");
    for (let i = 0; i < startInput.length; i++) {
      if (i === 0) {
        slides.push(`<div class="slide" data-active>
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
        slides.push(`<div class="slide">
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
  }
  
  const buttons = document.querySelectorAll("[data-carousel-button");
  const allDots = document.querySelectorAll(".carousel__dot");
  
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      timer();
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
  
      if (offset === 1) {
        allDots[newIndex].dataset.active = true;
        if (newIndex === 0) {
          delete allDots[slides.children.length - 1].dataset.active;
        } else {
          delete allDots[newIndex - 1].dataset.active;
        }
      } else {
        allDots[newIndex].dataset.active = true;
        if (newIndex === slides.children.length - 1) {
          delete allDots[0].dataset.active;
        } else {
          delete allDots[newIndex + 1].dataset.active;
        }
      }
    });
  });
  
  function timer() {
    clearTimeout(timeout);
    timeout = setInterval(function () {
      nextSlide();
    }, 3500);
  }
  
  function nextSlide() {
    let slides = document.querySelector("[data-slides]");
    const activeSlide = slides.querySelector("[data-active]");
    let newIndex = [...slides.children].indexOf(activeSlide) + 1;
  
    if (newIndex < 0) newIndex = slides.children.length - 1;
    if (newIndex >= slides.children.length) newIndex = 0;
  
    slides.children[newIndex].dataset.active = true;
    delete activeSlide.dataset.active;
  
    allDots[newIndex].dataset.active = true;
    if (newIndex === 0) {
      delete allDots[slides.children.length - 1].dataset.active;
    } else {
      delete allDots[newIndex - 1].dataset.active;
    }
  }
  
  let addSlide = document.querySelector(".add");
  let removeSlide = document.querySelector(".remove");
  
  addSlide.addEventListener("click", () => {
    slides = [];
    dots = [];
    if (startInput.length > 20) {
      alert("I think it is enough slides for one Carousel ;)");
    } else {
      startInput.push({
        image: `https://source.unsplash.com/random?sig=${Math.floor(
          Math.random() * 500
        )}`,
        title:
          document.querySelector(".title-input").value === ""
            ? "Generic Title"
            : document.querySelector(".title-input").value,
        bodyText:
          document.querySelector(".text-input").value === ""
            ? "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis unde, animi architecto repellat dolorem doloribus est fuga vero praesentium fugiat."
            : document.querySelector(".text-input").value,
      });
    }
  
    createCarousel();
  });
  
  removeSlide.addEventListener("click", () => {
    slides = [];
    dots = [];
    if (startInput.length > 2) {
      startInput.pop();
      createCarousel();
    } else {
      alert("We need at least 2 slides to call it a Carousel ;)");
    }
  });
  