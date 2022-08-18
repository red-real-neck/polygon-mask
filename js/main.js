const canvas = document.querySelector("#viewport");
const context = canvas.getContext('2d');

const make_base = () => {
    base_image = new Image();
    base_image.src = 'images/16-08-2022-18_54_47-006202MB.jpg';
    base_image.onload = function(){
      context.drawImage(base_image, 0, 0);
    }
  }
  
  make_base();

var s = Snap("#svg");

var circle = s.circle(90,120,80);
var square = s.rect(210,40,160,160);
var ellipse = s.ellipse(460,120,50,80);