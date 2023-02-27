let grid = document.querySelector(".grid");


let GRID_SIZE = 16;
let current_size = GRID_SIZE;

let mouseDown = false;
document.body.onmousedown = () => {mouseDown = true};
document.body.onmouseup = () => {mouseDown = false};

let slider = document.querySelector("#sizeSlider");
let clear = document.querySelector("#clear");
// clear.onmouseover = () => {clear.style.cssText = 'transform: scale(1.2);'};


let resetGridSize = (e) => {
    grid.innerHTML = '';
    current_size = e.target.value;
    build_grid(e.target.value);
}

slider.addEventListener('change', resetGridSize);


let clearGrid = () => {
    grid.innerHTML = '';
    build_grid(current_size);
}

clear.addEventListener('click', clearGrid);


let shadeSquare = (e) => {
    if (e.type === 'mouseover' && !mouseDown){return;}
    e.target.style.backgroundColor = '#333333';
};

function build_grid(size){
    for (let i = 0; i < size; i++){
        for(let j = 0; j < size; j++){
            let grid_square = document.createElement("div");
            grid_square.classList.add("grid-element");
            grid_square.style.cssText = `
                grid-row: ${i+1} / span 1;
                grid-column: ${j+1} / span 1;`;
    
            grid_square.addEventListener('mouseover', shadeSquare);
            grid_square.addEventListener('mousedown', shadeSquare);
            grid.appendChild(grid_square);
        }
    }
}



window.onload = () => {
    build_grid(GRID_SIZE);
}