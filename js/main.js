const img = document.querySelector(".img");
const width = img.clientWidth;
const height = img.clientHeight;
const canvas = document.createElement("canvas");

canvas.classList.add("canvas");
canvas.width = width;
canvas.height = height;

img.parentNode.insertBefore(canvas, img.nextSibling);

const ctx = canvas.getContext("2d");
let offsetX, offsetY;

const BB = canvas.getBoundingClientRect();
offsetX = BB.left;
offsetY = BB.top;

const coordinates = [];
var isDone = false;

ctx.lineWidth = 2;
ctx.strokeStyle = "blue";

const handleMouseDown = (event) => {
  if (isDone || coordinates.length > 10) return;

  event.preventDefault();
  event.stopPropagation();

  mouseX = parseInt(event.clientX - offsetX);
  mouseY = parseInt(event.clientY - offsetY);
//   coordinates.push({
//     x: mouseX,
//     y: mouseY,
//   });
  coordinates.push([mouseX, mouseY]);
  drawPolygon();
};

canvas.addEventListener("click", (e) => {
  handleMouseDown(e);
});

function drawPolygon() {
  ctx.clearRect(0, 0, width, height);
  ctx.beginPath();
  ctx.moveTo(coordinates[0][0], coordinates[0][1]);
  for (index = 1; index < coordinates.length; index++) {
    ctx.lineTo(coordinates[index][0], coordinates[index][1]);
  }
  ctx.closePath();
  ctx.stroke();
  console.log('coordinates:', coordinates);
}
