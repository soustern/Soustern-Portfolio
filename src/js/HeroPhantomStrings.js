
const stack = ["HTML", "CSS", "JavaScript", "TypeScript", "Sass", "Tailwind", "React", "Vue.", "Angular", "Svelte", "Redux", "Webpack", "Jest", "Vite", "Cypress", "REST API", "GraphQL", "React Query", "Git", "Vercel", "npm", "Yarn", "Next", ".NET", "ASP.NET", "Blazor", "C#", "F#", "Entity Framework Core", "Windows Forms", "Xamarin", "Visual Studio", "Visual Studio Code", "Azure", "SQL Server", "IIS", "NuGet", "ML.NET", "Python", "C++", "C"];

document.addEventListener("DOMContentLoaded", () => {
    const hero = document.querySelector('#hero');
    let heroCoordinates = hero.getBoundingClientRect();

    window.addEventListener("resize", () => {
        heroCoordinates = hero.getBoundingClientRect();
    });

    document.querySelectorAll(`.stack-paragraph`).forEach(stackParagraph => setCoordinates(heroCoordinates, stackParagraph, 0));

});

function setCoordinates(heroCoordinates, stackParagraph, intervalTime)
{

    const updateText = () => {
        stackParagraph.innerHTML = ``;

        stackParagraph.style.top = `${randomNumberInRange(0, heroCoordinates.height)}px`;
        stackParagraph.style.left = `${randomNumberInRange(0, heroCoordinates.width)}px`;

        const word = stack[Math.round(randomNumberInRange(0, stack.length - 1))];
        const staggerTime = 75;

        [...word].forEach((letter, index) => {
            const stackLetter = document.createElement(`span`);
            stackLetter.style.opacity = `0`;
            stackLetter.style.display = `inline-block`;
            stackLetter.textContent = letter;
            stackParagraph.appendChild(stackLetter);
            animateText(stackLetter, index * staggerTime);
        });
    }
    
    updateText();

    setInterval(updateText, randomNumberInRange(2000, 8000));
};

function animateText(span, duration) {
    setTimeout(() => {
        span.classList.add(`animate-glowUpTypewriter`);
    }, duration);
};

// add CHROMATIC ABERRATION TO SHADER BACGROUND
// ADD RADIAL OPACITY TO WHITE SQUARES ON THE BACKGROUND AND MAYBE ADD CHROMATIC ABETTATION AS WELL
// ADD CHROMATIC ABERRATION TO THE HERO TEXT
// ADD ELEMENTS THAT SLIGHT MOVE WITH MOUSE MOVEMENT

function randomNumberInRange(min, max) {
    return Math.random() * (max - min) + min;
};

function randomNumberInBiased(min, max) {
    return Math.random() * (max - min) + min;
};