$(document).ready(() => {
    $(".nav-items").toggle();

    let clicked = false;
    let moving = false;
    let startPos = {x: 0, y: 0};
    let mouseStartPos = {x: 0, y: 0};
    $(".hamburger").mousedown(e => {
        clicked = true;
        moving = false;
        mouseStartPos.x = e.clientX;
        mouseStartPos.y = e.clientY;
        startPos.x = parseInt($(".nav").css("left"));
        startPos.y = parseInt($(".nav").css("top"));
    });    
    $(".hamburger").mouseup(e => {
        clicked = false;
    });
    $("body").mousemove(e => {
        if (clicked) {
            let disp = {x: e.clientX - mouseStartPos.x, y: e.clientY - mouseStartPos.y};
            if (Math.abs(disp.x) + Math.abs(disp.y) > 0) {
                moving = true;
            }
            
            $(".nav").css("left", startPos.x + disp.x);
            $(".nav").css("top", startPos.y + disp.y);
        }
    });
    $(".hamburger").click(e => {
        if (!moving) {
            $(".hamburger").toggleClass("is-active");
            $(".nav-items").slideToggle();
        }
    });
})