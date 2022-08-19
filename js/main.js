const img = document.querySelector(".img");
const width = img.clientWidth;
const height = img.clientHeight;
const canvas = document.createElement("canvas");

canvas.classList.add("canvas")
canvas.width = width;
canvas.height = height;

img.parentNode.insertBefore(canvas, img.nextSibling);

const ctx = canvas.getContext("2d");
ctx.strokeRect(75, 140, 150, 110);