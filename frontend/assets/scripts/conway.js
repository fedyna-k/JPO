const canvas = {
    element: document.querySelector("canvas"),
    width: 600,
    height: 600
}
const context = canvas.element.getContext("2d");
const scale_setter = document.querySelector("#scale");
const pause_setter = document.querySelector("#paused");
const steps = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1]
];

let scale;
let grid;
let buffer;
let paused;

function init() {
    canvas.element.setAttribute("width", canvas.width);
    canvas.element.setAttribute("height", canvas.height);

    context.lineWidth = 0.05;

    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);

    scale = scale_setter.value;

    let grid_size = (canvas.width / scale) * (canvas.height / scale);

    grid = (new Array(grid_size)).fill(0);
    buffer = (new Array(grid_size)).fill(0);
    paused = pause_setter.checked;

    scale_setter.addEventListener("change", () => {
        init();
    });

    pause_setter.addEventListener("change", () => {
        paused = pause_setter.checked;
    });
}

function loop() {
    let width = canvas.width / scale;

    if (!paused) {
        for (let i = 0 ; i < grid.length ; i++) {
            let x = i % width;
            let y = Math.floor(i / width);
            let count = 0;
    
            for (let step of steps) {
                let step_index = get_index(x, y, step, width);

                if (step_index != null) {
                    count += grid[step_index];
                }
            }
    
            buffer[x + y * width] = count == 3 || (grid[x + y * width] && count == 2);
        }
    }

    for (let i = 0 ; i < buffer.length ; i++) {
        if (!paused) {
            grid[i] = buffer[i];
        }

        let grid_x = i % width;
        let grid_y = Math.floor(i / width);

        context.strokeStyle = grid[i] ? "black" : "white";
        context.fillStyle = grid[i] ? "white" : "black";
        context.fillRect(grid_x * scale, grid_y * scale, scale, scale);
        context.strokeRect(grid_x * scale, grid_y * scale, scale, scale);
    }
}

function handle_mouse(event) {
    if (event.buttons == 1) {
        grid[get_coordinates(event)] = 1;
    }
    
    if (event.buttons == 2) {
        grid[get_coordinates(event)] = 0;
    }
}

function get_index(x, y, step, width) {
    if ((x + step[0] < 0) || (x + step[0] > width)) {
        return null;
    }

    if ((y + step[1] < 0) || (y + step[1] > width)) {
        return null;
    }

    return (x + step[0]) + (y + step[1]) * width;
}

function get_coordinates(event) {
    let canvas_rect = canvas.element.getBoundingClientRect();
    let x = Math.floor((event.clientX - canvas_rect.left) / scale);
    let y = Math.floor((event.clientY - canvas_rect.top) / scale);

    return x + y * (canvas.width / scale);
}

init();
setInterval(loop, 0);

canvas.element.addEventListener("mousemove", handle_mouse);
canvas.element.addEventListener("mousedown", handle_mouse);
canvas.element.addEventListener("contextmenu", e => e.preventDefault());