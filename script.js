let myImage;
let originalImage;

function preload() {
  originalImage = loadImage('Carey.jpg');
  myImage = loadImage('Carey.jpg');
}

function setup() {
  createCanvas(windowWidth-20,windowHeight-20);
  // scales the image down for speed. Adjust at your own risk.   
  if(myImage.width>myImage.height) {
    originalImage.resize(width*0.5,0); 
    myImage.resize(width*0.5,0); 
  } else {
    originalImage.resize(0,height*0.5);
    myImage.resize(0,height*0.5);
  }
  
}

function draw() {
  image(myImage,width/2-myImage.width/1, height/1.5-myImage.height/1.5);
  noLoop();
}

const manipulationDispatch = {
  "i": invertColors,
  "d": desaturate,
  "q": resetImage,
  "h": flipImageH,
  "r": makeImageRed,
  "b": blurImage,
  "p": pixelizeImage

}

function keyPressed() {
  if( key in manipulationDispatch ) {
    myImage.loadPixels();
    manipulationDispatch[key]();
    myImage.updatePixels();
    redraw();
  }
}

function resetImage() {
  for( let x = 0; x < myImage.width; x++ ) {
    for( let y = 0; y < myImage.height; y++ ) {
      myImage.set(x,y,originalImage.get(x,y));
    }
  }
}

function flipImageH() {
  for( let x = 0; x < myImage.width; x++ ) {
    for( let y = 0; y < myImage.height; y++ ) {
      myImage.set(x,y,originalImage.get(myImage.width-x,y));
    }
  }
}

function desaturate() {
  const desaturateAmount = 0.8;
  for( let x = 0; x < myImage.width; x++ ) {
    for( let y = 0; y < myImage.height; y++ ) {   
      let originalPixel = myImage.get(x,y);
      const r = red(originalPixel);
      const g = green(originalPixel);
      const b = blue(originalPixel);
      const LUMA = (Math.min(r,g,b) + Math.max(r,g,b))/2
      myImage.set(x,y, color(
        r + desaturateAmount * (LUMA-r),
        g + desaturateAmount * (LUMA-g),
        b + desaturateAmount * (LUMA-b)
      ));
    }
  }
}

function invertColors() {
  for( let x = 0; x < myImage.width; x++ ) {
    for( let y = 0; y < myImage.height; y++ ) { 
      let originalPixel = myImage.get(x,y);
      myImage.set( x, y, color(
        255-red(originalPixel),
        255-green(originalPixel),
        255-blue(originalPixel)
      ));
    }
  }
}

function makeImageRed() {
  for( let x = 0; x < myImage.width; x++ ) {
    for( let y = 0; y < myImage.height; y++ ) {
      let originalPixel = myImage.get(x,y);
      myImage.set( x, y, color(
        255-red(originalPixel),
        0-green(originalPixel),
        0-blue(originalPixel)
      ));
    }
  }
}

function blurImage() {
    image(myImage,0,0)
      filter(BLUR, 8)
  
    }

function pixelizeImage() {
    for( let x = 0; x < originalImage.width; x += 3) {
      for( let y = 0; y < originalImage.height; y += 3) {
        let colorFromImage = originalImage.get(x,y);
        fill(colorFromImage);
        rect(x,y,3,3);
    }
  }
}