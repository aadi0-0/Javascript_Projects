// select container and heart elements from DOM
const image = document.querySelector(".container");
const heartIcons = document.querySelector(".heart"); 

// add a double-click event listener to the image
image.addEventListener("dblclick", (e) => {
    heartIcons.classList.add("active");

    setTimeout(() => {
        heartIcons.classList.remove("active");
    }, 1000);
});