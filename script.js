let boxSize = 16;
let newBoxSize = 0;
let progressiveColoring = false;
let randomRgbColoring = false;
color = "rgb(0,0,0)"
drawGrid(boxSize);
const blankButton = document.querySelector("#blank");
const changeSizeButton = document.querySelector("#change-size");
const progressiveButton = document.querySelector("#gradual");
const sizeDisplay = document.querySelector("#display-size");
sizeDisplay.textContent = boxSize + "X" + boxSize;



function drawGrid(boxSize)
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
            box.style.border = "1px solid black";
            box.classList.add("grid-box");
            grid.appendChild(box);
            // box.addEventListener("mouseover",(event)=>{
            //     changeColor(event.target, progressiveColoring, randomRgbColoring? getRandomColor():color);
            box.addEventListener("mouseover",(event)=>{
                changeColor(event.target, true, randomRgbColoring? getRandomColor():color);
            })
        }
    }
}


blankButton.addEventListener("click", ()=> {
    deleteGrid(boxSize)
    drawGrid(boxSize)});

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
    if(progressiveColoring === "true")
    {

    }
    else
    {
        target.style.backgroundColor = color;
    }
}