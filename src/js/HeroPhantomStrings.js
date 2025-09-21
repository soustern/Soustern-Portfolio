const stack = [];

document.addEventListener("DOMContentLoaded", () => {
    const hero = document.querySelector('#hero');
    let heroCoordinates = hero.getBoundingClientRect();
    console.log(heroCoordinates);
    window.addEventListener("resize", () => {
        heroCoordinates = hero.getBoundingClientRect();
        console.log(heroCoordinates);
    });


});