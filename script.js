let boxSize = 16;
let newBoxSize = 0;
let progressiveColoring = false;
let randomRgbColoring = false;
color = "rgb(0,0,0)"
drawGrid(boxSize);
const blankButton = document.querySelector("#blank");
const progressiveButton = document.querySelector("#gradual");
const randomRgbButton = document.querySelector("#random-rgb");
const changeSizeButton = document.querySelector("#change-size");
const sizeDisplay = document.querySelector("#display-size");
sizeDisplay.textContent = boxSize + "X" + boxSize;



function drawGrid(boxSize, boxOpacity)
{   
    const grid = document.querySelector(".grid");
    grid.style.display = "flex";
    grid.style.flexWrap = "wrap";
    grid.style.alignItems = "center";
    grid.style.justifyContent = "center";
    let box;
    let boxCounter = 0;
    const boxSizePercent = Math.floor((100 / boxSize)*100000)/100000;
    for (let i = 0; i<boxSize; i++)
    {
        for (let j = 0; j < boxSize; j++)
        {
            box = document.createElement("div");
            box.style.minWidth = boxSizePercent+"%";
            box.style.height = boxSizePercent+"%";
            // box.style.border = "1px solid black";
            box.style.opacity = boxOpacity;
            box.classList.add("grid-box");
            grid.appendChild(box);
            // box.addEventListener("mouseover",(event)=>{
            //     changeColor(event.target, progressiveColoring, randomRgbColoring? getRandomColor():color);
            box.addEventListener("mouseover",(event)=>{
                changeColor(event.target, progressiveColoring, randomRgbColoring? getRandomColor():color);
            })
        }
    }
}


blankButton.addEventListener("click", ()=> resetGrid());
    
function resetGrid(progressiveColoring){
    deleteGrid(boxSize);
    if (progressiveColoring === true)
        drawGrid(boxSize,0);
    else
        drawGrid(boxSize,1);
}

function deleteGrid(boxSize){
    let box;
    for (let i = 0; i<boxSize; i++)
    {
        for (let j = 0; j < boxSize; j++)
        {
            box = document.querySelector(".grid-box");
            box.remove();
        }
    }
}

changeSizeButton.addEventListener("click", () => {
    deleteGrid(boxSize);
    boxSize = +prompt("Enter any size between 1-50");
    drawGrid(boxSize);
    sizeDisplay.textContent = boxSize + "X" + boxSize;
});

function changeColor(target, progressiveColoring, color)
{   
    const compStyle = window.getComputedStyle(target);
    const opacity = compStyle.getPropertyValue("opacity");
    if(progressiveColoring === true)
    {
        target.style.backgroundColor = color;
        if (opacity < 1)
            target.style.opacity = +opacity + 0.1;
    }
    else
    {
        target.style.backgroundColor = color;
        target.style.opacity = 1;
    }
}

progressiveButton.addEventListener("click",()=>{
    progressiveButton.classList.toggle("active-button");
    progressiveColoring = !progressiveColoring;
    if (progressiveColoring)
        {    
            progressiveButton.textContent = "Progressive Darkening (ON)";
            resetGrid(progressiveColoring);

        }
    else
        progressiveButton.textContent = "Progressive Darkening (OFF)";
});

randomRgbButton.addEventListener("click",()=>{
    randomRgbButton.classList.toggle("active-button");
    randomRgbColoring = !randomRgbColoring;
    if (randomRgbColoring)    
        randomRgbButton.textContent = "Random RGB Effect (ON)";
    else
        randomRgbButton.textContent = "Random RGB Effect (OFF)";
});

function getRandomColor()
{
    let red,green,blue;
    red = Math.floor(Math.random() * 256);
    green = Math.floor(Math.random() * 256);
    blue = Math.floor(Math.random() * 256);
    return "rgb("+red+","+green+","+blue+")";
}