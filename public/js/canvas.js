const PIXEL_SIZE = 25;
const NUM_PIXELS = 16;
const LMB = 1;
const RMB = 3;

const BLACK = 0;
const RED = 1;
const ORANGE = 2;
const YELLOW = 3;
const GREEN = 4;
const BLUE = 5;
const PURPLE = 6;
const WHITE = 9;

$(document).ready(() => {
    const c = document.getElementById("mainCanvas");
    const ctx = c.getContext("2d");
    ctx.fillStyle = getColor(WHITE);
    ctx.fillRect(0, 0, c.width, c.height);    
    
    let color = BLACK;
    ctx.fillStyle = getColor(color);

    let pixelData = [...Array(NUM_PIXELS)].map(e => Array(NUM_PIXELS).fill(WHITE));

    $("#mainCanvas").mousedown(e => {
        const posX = Math.floor((e.clientX - c.offsetLeft) / PIXEL_SIZE);
        const posY = Math.floor((e.clientY - c.offsetTop) / PIXEL_SIZE);

        erase = event.which === RMB;
        pixelData[posY][posX] = erase ? WHITE : color;

        ctx.fillStyle = erase ? getColor(WHITE) : getColor(color);
        ctx.fillRect(posX * PIXEL_SIZE, posY * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE);
    });
    $("#mainCanvas").contextmenu(() => {
        return false;
    });

    $(".palette").click(e => {
        color = (color + 1) % 7;
        $(".palette").css("background-color", getColor(color));
    });

    $(".submit").click(e => {
        $.post("/api/submit", {
            pixels: pixelData.map(x => x.join("")).join(""),
            name: $("input[name='name']").val(),
            author: $("input[name='author']").val(),
        }, (res) => {
            window.location.replace(`/id/${ res.id }`);
        });
    });
});

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