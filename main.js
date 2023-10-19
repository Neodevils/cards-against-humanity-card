// main.js
function drawCardBackground(ctx, width, height, bgColor, borderColor) {
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = borderColor;
    ctx.lineWidth = 3;
    ctx.strokeRect(0, 0, width, height);
}

function drawText(ctx, text, x, y, font, color, align) {
    ctx.font = font;
    ctx.fillStyle = color;
    ctx.textAlign = align;

    const lines = text.split("\n");

    for (let i = 0; i < lines.length; i++) {
        const lineY = y + i * 30;
        ctx.fillText(lines[i], x, lineY);
    }
}

let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");

const kartGenislik = 300;
const kartYukseklik = 300;
canvas.width = kartGenislik;
canvas.height = kartYukseklik;

const bgColor = getComputedStyle(document.documentElement)
    .getPropertyValue("--clr-bg-900")
    .trim();
const borderColor = getComputedStyle(document.documentElement)
    .getPropertyValue("--clr-primary-100")
    .trim();

drawCardBackground(ctx, kartGenislik, kartYukseklik, bgColor, borderColor);

// Fetch the JSON data
async function loadTexts() {
    try {
        // Fetch the JSON data
        const response = await fetch("texts.json"); // Assuming the JSON file is in the same directory as your HTML and JavaScript files
        const data = await response.json();

        // Once the JSON data is loaded, you can access it
        const blackCards = data.cards.black;

        // Function to pick a random element from the array
        function getRandomText() {
            const randomIndex = Math.floor(Math.random() * blackCards.length);
            return blackCards[randomIndex];
        }

        // Get a random text from the JSON data
        const metin = getRandomText();
        const font = "bold 24px Helvetica";
        const metinX = 30;
        const metinY = 30;
        const metinRengi = borderColor;

        // Draw the text on the canvas
        drawText(ctx, metin, metinX, metinY, font, metinRengi, "left");
    } catch (error) {
        console.error("Error fetching JSON data:", error);
    }
}

loadTexts();
