const gridSize = 4;
let grid = Array(gridSize * gridSize).fill(0);

function getRandomEmptyCell() {
    const emptyCells = grid
        .map((value, index) => (value === 0 ? index : null))
        .filter((value) => value !== null);
    return emptyCells[Math.floor(Math.random() * emptyCells.length)];
}

function addRandomTile() {
    const index = getRandomEmptyCell();
    if (index !== undefined) {
        grid[index] = Math.random() < 0.9 ? 2 : 4;
        drawGrid();
    }
}

function drawGrid() {
    for (let i = 0; i < grid.length; i++) {
        const cell = document.getElementById(i);
        cell.textContent = grid[i] === 0 ? "" : grid[i];
        cell.classList.add('number-' + grid[i]);
    }
}

function slideRowLeft(row) {
    row = row.filter((value) => value !== 0);
    for (let i = 0; i < row.length - 1; i++) {
        if (row[i] === row[i + 1]) {
            row[i] *= 2;
            row[i + 1] = 0;
        }
    }
    row = row.filter((value) => value !== 0);
    while (row.length < gridSize) {
        row.push(0);
    }
    return row;
}

function slideLeft() {
    for (let i = 0; i < gridSize; i++) {
        const row = grid.slice(i * gridSize, (i + 1) * gridSize);
        const newRow = slideRowLeft(row);
        for (let j = 0; j < gridSize; j++) {
            grid[i * gridSize + j] = newRow[j];
        }
    }
}

function rotateGrid() {
    const newGrid = Array(gridSize * gridSize).fill(0);
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            newGrid[j * gridSize + i] = grid[i * gridSize + j];
        }
    }
    grid = newGrid;
}

function handleInput(event) {
    switch (event.key) {
        case "ArrowLeft":
            slideLeft();
            break;
        case "ArrowRight":
            rotateGrid();
            rotateGrid();
            slideLeft();
            rotateGrid();
            rotateGrid();
            break;
        case "ArrowUp":
            rotateGrid();
            slideLeft();
            rotateGrid();
            rotateGrid();
            rotateGrid();
            break;
        case "ArrowDown":
            rotateGrid();
            rotateGrid();
            rotateGrid();
            slideLeft();
            rotateGrid();
            break;
    }
    addRandomTile();
}

document.addEventListener("keydown", handleInput);

addRandomTile();
addRandomTile();
drawGrid();