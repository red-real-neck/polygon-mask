

const canvas = document.querySelector("#viewport");
const context = canvas.getContext('2d');
const snapSvg = Snap("#viewport");

const make_base = () => {
  base_image = new Image();
  base_image.src = 'images/16-08-2022-18_54_47-006202MB.jpg';
  base_image.onload = function(){
    context.drawImage(base_image, 0, 0);
  }
}

make_base();