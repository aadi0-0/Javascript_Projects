const wrapper = document.querySelector(".wrapper");
const hero = document.querySelector(".hero");
const firstCardWidth = hero.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper i");
const heroChildrens = [...hero.children];

let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

// Get the number of cards that can fit in the hero at once
let cardPerView = Math.round(hero.offsetWidth / firstCardWidth);

// Insert copies of the last few cards to beginning of hero for infinite scrolling
heroChildrens.slice(-cardPerView).reverse().forEach(card => {
    hero.insertAdjacentHTML("afterbegin", card.outerHTML);
});

// Insert copies of the first few cards to end of hero for infinite scrolling
heroChildrens.slice(0, cardPerView).forEach(card => {
    hero.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the hero at appropriate postition to hide first few duplicate cards on Firefox
hero.classList.add("no-transition");
hero.scrollLeft = hero.offsetWidth;
hero.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the hero left and right
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        hero.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
    });
});

const dragStart = (e) => {
    isDragging = true;
    hero.classList.add("dragging");
    // Records the initial cursor and scroll position of the hero
    startX = e.pageX;
    startScrollLeft = hero.scrollLeft;
}

const dragging = (e) => {
    if(!isDragging) return; // if isDragging is false return from here
    // Updates the scroll position of the hero based on the cursor movement
    hero.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    hero.classList.remove("dragging");
}

const infiniteScroll = () => {
    // If the hero is at the beginning, scroll to the end
    if(hero.scrollLeft === 0) {
        hero.classList.add("no-transition");
        hero.scrollLeft = hero.scrollWidth - (2 * hero.offsetWidth);
        hero.classList.remove("no-transition");
    }
    // If the hero is at the end, scroll to the beginning
    else if(Math.ceil(hero.scrollLeft) === hero.scrollWidth - hero.offsetWidth) {
        hero.classList.add("no-transition");
        hero.scrollLeft = hero.offsetWidth;
        hero.classList.remove("no-transition");
    }

    // Clear existing timeout & start autoplay if mouse is not hovering over hero
    clearTimeout(timeoutId);
    if(!wrapper.matches(":hover")) autoPlay();
}

const autoPlay = () => {
    if(window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
    // Autoplay the hero after every 2500 ms
    timeoutId = setTimeout(() => hero.scrollLeft += firstCardWidth, 2500);
}
autoPlay();

hero.addEventListener("mousedown", dragStart);
hero.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
hero.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);
