
const stack = ["HTML", "CSS", "JavaScript", "TypeScript", "Sass", "Tailwind", "React", "Vue.", "Angular", "Svelte", "Redux", "Webpack", "Jest", "Vite", "Cypress", "REST API", "GraphQL", "React Query", "Git", "Vercel", "npm", "Yarn", "Next", ".NET", "ASP.NET", "Blazor", "C#", "F#", "Entity Framework Core", "Windows Forms", "Xamarin", "Visual Studio", "Visual Studio Code", "Azure", "SQL Server", "IIS", "NuGet", "ML.NET", "Python", "C++", "C", "React Native", "Flutter", "Dart"];


document.addEventListener("DOMContentLoaded", () => {
    const hero = document.querySelector('#hero-video--overlay');
    let heroCoordinates = hero.getBoundingClientRect();

    window.addEventListener("resize", () => {
        heroCoordinates = hero.getBoundingClientRect();
    });

    document.querySelectorAll(`.stack-paragraph`).forEach(stackParagraph => setCoordinates(heroCoordinates, stackParagraph));

});

function setCoordinates(heroCoordinates, stackParagraph)
{

    let currentWord = null;
    const updateText = () => {
        const staggerTime = 75;
        let fadeOutDuration = 0;

        if (currentWord) {
            const paragraphs = document.querySelectorAll(`.stack-paragraph`);
            for (const paragraph of paragraphs) {
                let wordCheck = ``;
                const spans = paragraph.querySelectorAll(`span`);
                spans.forEach(span => {
                    wordCheck += span.textContent;
                    if (wordCheck === currentWord) {
                        [...spans].reverse().forEach((span, index) => {
                            span.classList.remove('animate-glowUpTypewriter');
                            animateText(span, index * staggerTime, 'animate-glowDownTypewriter');
                        })
                    }
                })
                fadeOutDuration = spans.length * staggerTime + randomNumberInRange(1000, 3000);
            }
        }

        setTimeout(() => {
            stackParagraph.innerHTML = ``;

            stackParagraph.style.top = `${randomNumberInRange(0, heroCoordinates.height)}px`;
            stackParagraph.style.left = `${randomNumberInRange(0, heroCoordinates.width)}px`;

            const word = stack[Math.round(randomNumberInRange(0, stack.length - 1))];
            [...word].forEach((letter, index) => {
                const stackLetter = document.createElement(`span`);
                stackLetter.style.opacity = `0`;
                stackLetter.style.display = `inline-block`;
                stackLetter.textContent = letter;
                stackParagraph.appendChild(stackLetter);
                animateText(stackLetter, index * staggerTime, 'animate-glowUpTypewriter');
            });

            currentWord = word; 
        }, fadeOutDuration);
    }
    
    updateText(currentWord);
    setInterval(updateText, randomNumberInRange(4000, 10000));
};

function animateText(span, duration, animation) {
    setTimeout(() => {
        span.classList.add(animation);
        span.style.opacity = `.10`;
        span.style.filter = `drop-shadow(0 0 10px rgba(255,255,255,0.8))`;
    }, duration);
};

// add CHROMATIC ABERRATION TO SHADER BACGROUND
// ADD RADIAL OPACITY TO WHITE SQUARES ON THE BACKGROUND AND MAYBE ADD CHROMATIC ABETTATION AS WELL
// ADD CHROMATIC ABERRATION TO THE HERO TEXT
// ADD ELEMENTS THAT SLIGHT MOVE WITH MOUSE MOVEMENT

function randomNumberInRange(min, max) {
    return Math.random() * (max - min) + min;
};

function biasedRandomNumberInRange(min, max) {

    const range = max - min;

    if (Math.random() < 0.5) {
        const lower_bound = min + (range * 0.25);
        return randomNumberInRange(min, lower_bound);
    } else {
        const upper_bound = max - (range * 0.25);
        return randomNumberInRange(upper_bound, max);
    }
}