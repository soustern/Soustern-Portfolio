document.addEventListener("DOMContentLoaded", () => {
    const sideOverlay = document.querySelector(`.side-overlay`);
    const sidePannel = document.querySelector(`.side-pannel`);
    const sideTrigger = document.querySelector(`.side-trigger`);

    // CHANGE SIDE PANNEL HEIGHT TO FIT

    sideTrigger.addEventListener(`click`, () => {
       sideOverlay.classList.toggle(`opacity-0`); 
       sideOverlay.classList.toggle(`pointer-events-auto`); 

       sidePannel.classList.toggle(`animate-sidePanelAppear`);
    });

    sideOverlay.addEventListener(`click`, () => {
        sideOverlay.classList.toggle(`opacity-0`);       
        sideOverlay.classList.toggle(`pointer-events-auto`); 

        sidePannel.classList.toggle(`animate-sidePanelAppear`);
                sidePannel.classList.toggle(`animate-sidePanelAppear`);

    });
});
