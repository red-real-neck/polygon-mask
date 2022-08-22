const img = document.querySelector(".img");
const width = img.clientWidth;
const height = img.clientHeight;
const canvas = document.createElement("canvas");
const UICanvas = document.createElement("canvas");
const radius = 7;
const eventCondition = {
  mouseDown: false,
  mouseMove: false,
}
let currentVertex = null;

canvas.classList.add("canvas");
canvas.width = width;
canvas.height = height;

UICanvas.classList.add("UICanvas");
UICanvas.width = width;
UICanvas.height = height;

img.parentNode.insertBefore(canvas, img.nextSibling);
img.parentNode.insertBefore(UICanvas, img.nextSibling);

const ctx = canvas.getContext("2d");
const UICtx = UICanvas.getContext("2d");
let offsetX, offsetY;

const BB = canvas.getBoundingClientRect();
offsetX = BB.left;
offsetY = BB.top;

const coordinates = [];

ctx.lineWidth = 2;
ctx.strokeStyle = "blue";
ctx.fillStyle = "rgba(255, 255, 0, 0.25)";

UICtx.fillStyle = "red"

const handleMouseDown = (event) => {
  if (coordinates.length > 10) return;

  
  event.preventDefault();
  event.stopPropagation();
  
  mouseX = parseInt(event.clientX - offsetX);
  mouseY = parseInt(event.clientY - offsetY);

  if (intersectedVertex({x: mouseX, y: mouseY}) !== false) {
    currentVertex = intersectedVertex({x: mouseX, y: mouseY});
    return;
  }
  coordinates.push([mouseX, mouseY]);
  drawPolygon();
  drawCircles();
};

canvas.addEventListener("mousedown", (e) => {
  eventCondition.mouseDown = true;
  handleMouseDown(e);
  console.log('coordinates:', coordinates);
});

canvas.addEventListener("mousemove", (e) => {
  if (eventCondition.mouseDown) {
    handleMouseMove(e);
  } else return;
})

canvas.addEventListener("mouseup", (e) => {
  eventCondition.mouseDown = false;
  currentVertex = null;
  }
)

function handleMouseMove(e) {
  mouseX = parseInt(e.clientX - offsetX);
  mouseY = parseInt(e.clientY - offsetY);
  ctx.clearRect(0, 0, width, height);
  UICtx.clearRect(0, 0, width, height);
  coordinates[currentVertex] = [mouseX, mouseY];
  drawPolygon();
  drawCircles();
}

function drawPolygon() {
  ctx.clearRect(0, 0, width, height);
  ctx.beginPath();
  ctx.moveTo(coordinates[0][0], coordinates[0][1]);
  for (index = 0; index < coordinates.length; index++) {
    ctx.lineTo(coordinates[index][0], coordinates[index][1]);
  }
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
}

function drawCircles() {
  UICtx.clearRect(0, 0, width, height);
  for (index = 0; index < coordinates.length; index++) {
    UICtx.moveTo(coordinates[index][0], coordinates[index][1]);
    UICtx.beginPath(coordinates[index][0], coordinates[index][1]);
    UICtx.arc(coordinates[index][0], coordinates[index][1], radius, 0, 2 * Math.PI, false);
    UICtx.fill();
  }
}

function intersectedVertex(mouseCoords) {
  for (let index = 0; index < coordinates.length; index++) {
    const d = Math.sqrt((mouseCoords.x - coordinates[index][0]) * (mouseCoords.x - coordinates[index][0]) + (mouseCoords.y - coordinates[index][1]) * (mouseCoords.y - coordinates[index][1]));
    if (d <= radius - radius || d < radius + radius || d == radius + radius) {
        return index;
    }
  }
  return false;
}