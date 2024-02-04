const canvas = {
    element: document.querySelector("canvas"),
    width: 600,
    height: 600
}
const context = canvas.element.getContext("2d");
const speed_setter = document.querySelector("#speed");
const move_setter = document.querySelector("#moves");
const scale_setter = document.querySelector("#scale");
const colors = [
    "#000000",
    "#ffffff",
    "#ff0000",
    "#00ff00",
    "#0000ff",
    "#ffff00",
    "#00ffff",
    "#ff00ff"
];

let scale;
let ant;
let grid;
let direction;
let shifts;
let speed;
let max;
let sequence;

function init() {
    canvas.element.setAttribute("width", canvas.width);
    canvas.element.setAttribute("height", canvas.height);

    context.strokeStyle = "none";
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);

    scale = scale_setter.value;

    let grid_size = (canvas.width / scale) * (canvas.height / scale);

    ant = Math.floor(grid_size / 2 + canvas.width / scale / 2);
    grid = (new Array(grid_size)).fill(0);
    direction = 0;
    shifts = [
        -canvas.width / scale,
        -1,
        canvas.width / scale,
        1
    ];
    speed = speed_setter.value;
    max = move_setter.value.length;
    sequence = move_setter.value;

    speed_setter.addEventListener("change", () => {
        speed = speed_setter.value;
    });

    scale_setter.addEventListener("change", () => {
        init();
    });

    move_setter.addEventListener("change", () => {
        if (!move_setter.value.match(/^[DG]{2,}$/g)) {
            return;
        }

        init();
    });
}

function loop() {
    grid[ant] = (grid[ant] + 1) % max;
    context.fillStyle = colors[grid[ant]];

    let ant_x = ant % (canvas.width / scale);
    let ant_y = Math.floor(ant / (canvas.width / scale));
    context.fillRect(ant_x * scale, ant_y * scale, scale, scale);

    ant += shifts[direction];
    direction = (((direction + (sequence[grid[ant]] == "D" ? 1 : -1)) % 4) + 4) % 4;
}

init();
setInterval(() => {
    for (let i = 0 ; i < speed ; i++) {
        loop();
    }
}, 0);