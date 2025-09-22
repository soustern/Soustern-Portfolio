const stack = ["HTML", "CSS", "JavaScript", "TypeScript", "Sass", "Tailwind", "React", "Vue.", "Angular", "Svelte", "Redux", "Webpack", "Jest", "Vite", "Cypress", "REST API", "GraphQL", "React Query", "Git", "Vercel", "npm", "Yarn", "Next", ".NET", "ASP.NET", "Blazor", "C#", "F#", "Entity Framework Core", "Windows Forms", "Xamarin", "Visual Studio", "Visual Studio Code", "Azure", "SQL Server", "IIS", "NuGet", "ML.NET", "Python", "C++", "C"];

document.addEventListener("DOMContentLoaded", () => {
    const hero = document.querySelector('#hero');
    let heroCoordinates = hero.getBoundingClientRect();

    window.addEventListener("resize", () => {
        heroCoordinates = hero.getBoundingClientRect();
    });

    document.querySelectorAll(`.counter`).forEach(counter => setCoordinates(heroCoordinates, counter));

});

function randomNumberInRange(min, max) {
    return Math.random() * (max - min) + min;
};

function setCoordinates(heroCoordinates, counter)
{
    counter.style.top = `${randomNumberInRange(0, heroCoordinates.height)}px`;
    counter.style.left = `${randomNumberInRange(0, heroCoordinates.width)}px`;

    setInterval(() => {
        counter.style.top = `${randomNumberInRange(0, heroCoordinates.height)}px`;
        counter.style.left = `${randomNumberInRange(0, heroCoordinates.width)}px`;
    }, 2000);
};