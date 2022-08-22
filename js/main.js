const img = document.querySelector(".img");
const width = img.clientWidth;
const height = img.clientHeight;
const canvas = document.createElement("canvas");
const UICanvas = document.createElement("canvas");

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
var isDone = false;

ctx.lineWidth = 2;
ctx.strokeStyle = "blue";

UICtx.fillStyle = "red"

const handleMouseDown = (event) => {
  if (isDone || coordinates.length > 10) return;

  event.preventDefault();
  event.stopPropagation();

  mouseX = parseInt(event.clientX - offsetX);
  mouseY = parseInt(event.clientY - offsetY);
  coordinates.push([mouseX, mouseY]);
  drawPolygon();
  drawCircles();
};

canvas.addEventListener("click", (e) => {
  handleMouseDown(e);
});

function drawPolygon() {
  ctx.clearRect(0, 0, width, height);
  ctx.beginPath();
  ctx.moveTo(coordinates[0][0], coordinates[0][1]);
  for (index = 0; index < coordinates.length; index++) {
    ctx.lineTo(coordinates[index][0], coordinates[index][1]);
  }
  ctx.closePath();
  ctx.stroke();
  console.log('coordinates:', coordinates);
}

function drawCircles() {
  for (index = 0; index < coordinates.length; index++) {
    UICtx.moveTo(coordinates[index][0], coordinates[index][1]);
    UICtx.arc(coordinates[index][0], coordinates[index][1], 7, 0, 2 * Math.PI, false);
    UICtx.fill();
  }
  // UICtx.closePath();
  // UICtx.stroke();
}
