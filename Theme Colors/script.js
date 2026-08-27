const themes = [
    { name: 'dark-mode', texts: ["Never compare yourself with others, you are BEST in your own way!"] },
    { name: 'blue', texts: ["Stay Positive, Work Hard, Believe in Allah and yourself, Make it happen."] },
    { name: 'green', texts: ["Success is not final, failure is not fatal: it is the courage to continue that counts."] },
    { name: 'red', texts: ["Respect everyone without judging who they are."] },
    { name: 'purple', texts: ["Holy Quran is the only book in which writer is in love with reader."] },
    { name: 'orange', texts: ["Sometimes actions speak louder than words."] },
    { name: 'brown', texts: ["The only way to do great work is to love what you do."] },
    { name: 'pink', texts: ["Believe you can and you're halfway there."] },
    { name: 'gray', texts: ["Happiness is not something ready made. It comes from your own actions."] }
];

const themeNames = themes.map(theme => theme.name);
const button = document.querySelector("#theme-button");
const content1 = document.querySelector("#content1");
const themeLabel = document.querySelector("#theme-label");

let current = 0;
let clickTimer = null;

function applyTheme(index) {
    // remove old theme class
    if (themeNames[current]) {
        document.body.classList.remove(themeNames[current]);
    }

    current = index;
    document.body.classList.add(themeNames[current]);

    const theme = themes[current];
    const quote = theme.texts[Math.floor(Math.random() * theme.texts.length)];

    // fade out, swap text, fade in
    content1.classList.remove("show");
    setTimeout(() => {
        content1.textContent = quote;
        themeLabel.textContent = theme.name.replace('-', ' ');
        content1.classList.add("show");
    }, 200);
}

function nextTheme() {
    applyTheme((current + 1) % themeNames.length);
}

function randomTheme() {
    let index;
    do {
        index = Math.floor(Math.random() * themeNames.length);
    } while (index === current && themeNames.length > 1);
    applyTheme(index);
}

// Single click = next theme in sequence, double click = random shuffle
button.addEventListener("click", () => {
    if (clickTimer) {
        clearTimeout(clickTimer);
        clickTimer = null;
        randomTheme();
    } else {
        clickTimer = setTimeout(() => {
            nextTheme();
            clickTimer = null;
        }, 250);
    }
});

// Keyboard shortcut: press "T" for next theme
document.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() === "t") {
        nextTheme();
    }
});

// Initialize with the first theme's quote on load
applyTheme(current);
