const PIXEL_SIZE = 25;
const NUM_PIXELS = 16;

const BLACK = 0;
const RED = 1;
const ORANGE = 2;
const YELLOW = 3;
const GREEN = 4;
const BLUE = 5;
const PURPLE = 6;
const WHITE = 9;

function getColor(id) {
    switch(id) {
        case WHITE: {
            return "white";
        }        
        case BLACK: {
            return "black";
        }
        case RED: {
            return "red";
        }
        case ORANGE: {
            return "orange";
        }
        case YELLOW: {
            return "yellow";
        }
        case GREEN: {
            return "green";
        }
        case BLUE: {
            return "blue";
        }
        case PURPLE: {
            return "purple";
        }
    }
}

function loadPic(canvas, pixels, pixelSize = PIXEL_SIZE) {
    context = canvas.getContext("2d");
    context.fillStyle = getColor(WHITE);
    context.fillRect(0, 0, canvas.width, canvas.height);

    pixels = pixels.split("").map((x) => parseInt(x));

    for (let i = 0; i < NUM_PIXELS * NUM_PIXELS; i++) {
        let col = Math.floor(i / NUM_PIXELS);
        let row = i % NUM_PIXELS;

        if (pixels[i] === 9) continue;

        context.fillStyle = getColor(pixels[i]);
        context.fillRect(row * pixelSize, col * pixelSize, pixelSize, pixelSize);
    }
}