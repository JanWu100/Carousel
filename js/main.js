


let startInput = [{image: "./images/man_in_glasses.jpg", title: "the man", bodyText: "1Lorem ipsum dolor sit amet"},
{image: "/images/texture.jpg", title: "the second", bodyText: "2Lorem ipsum dolor sit amet"},
{image: "/images/texture.jpg", title: "the second", bodyText: "3Lorem ipsum dolor sit amet"},
{image: "/images/texture.jpg", title: "the second", bodyText: "4Lorem ipsum dolor sit amet"},
{image: "/images/texture.jpg", title: "the second", bodyText: "5Lorem ipsum dolor sit amet"}];



const dots = [];
const slides = [];
createCarousel();
function createCarousel() {
  for (let i=0 ; i < startInput.length ; i++){
    if(i===0){
      dots.push('<div class="carousel__dot" data-active></div>');
  
    }
    else {
      dots.push('<div class="carousel__dot"></div>');
  
    }
  }
  
  document.querySelector(".dot__wrapper").innerHTML = dots.join("");
  
  for (let i=0 ; i < startInput.length ; i++){ 
   if(i===0){
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
   }
   else {
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

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const offset = button.dataset.carouselButton === "next" ? 1 : -1;

    const slides = button
      .closest("[data-carousel]")
      .querySelector("[data-slides]");

    const activeSlide = slides.querySelector("[data-active]");
    const allDots = document.querySelectorAll(".carousel__dot");


    let newIndex = [...slides.children].indexOf(activeSlide) + offset;
    
    if (newIndex < 0) newIndex = slides.children.length - 1;
    if (newIndex >= slides.children.length) newIndex = 0;
    
    slides.children[newIndex].dataset.active = true;
    delete activeSlide.dataset.active;

    
    if (offset === 1) {
      allDots[newIndex].dataset.active = true;
      if (newIndex === 0) {
        delete allDots[slides.children.length - 1].dataset.active;
      }
      else {
        delete allDots[newIndex-1].dataset.active;
      }
    }
    else {
      allDots[newIndex].dataset.active = true;
      if (newIndex === slides.children.length - 1) {
        delete allDots[0].dataset.active;
      }
      else {
        delete allDots[newIndex+1].dataset.active;
      }
    }
  
  });
});


