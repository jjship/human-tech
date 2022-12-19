const density = "Ñ@#W$9876543210?!abc;:+=-,._                    ";
const len = density.lenght;
let backColor = "white";
let charColor = "black";
let myfont;
let tytul;
let t = 0;

let good = 10;
let evil = 10;
let trans1 = 125;
let trans2 = 125;

let vid;
let vid2;
2;
let playing = true;

let cols = 90;
let rows = 90;

const numCells = cols * rows;
let values = [];

function preload() {
  tytul = loadImage("/codeplasty/title.png");
}

function setup() {
  createCanvas(1080, 1920);
  pixelDensity(1);
  noStroke();
  frameRate(60);
  // noCanvas();

  fill(charColor);

  vid = createVideo("/codeplasty/atom_test2.mp4");
  vid.size(cols, rows);
  vid.volume(0);
  vid.loop();
  vid.hide(); // hides the html video loader
  vid.position(0, 0);

  vid2 = createVideo("/codeplasty/nuke3.mp4");
  vid2.size(cols, rows);
  vid2.volume(0);
  vid2.loop();
  vid2.hide(); // hides the html video loader
  vid2.position(0, 0);
  //textFont(foncik)
}

function draw() {
  t++;
  if (t % 100 == 0) {
    loadJSON("/api/codeplasty-transparency-one", (payload) => {
      good = int(payload.transparency_one);
    });

    loadJSON("/api/codeplasty-transparency-two", (payload) => {
      evil = int(payload.transparency_two);
    });
  }
  trans1 = 125 * (good / evil);
  trans2 = 125 * (evil / good);

  background(0);
  screen1();
  screen2();
  image(tytul, 0, 1400);
}

function screen1() {
  // atom

  fill(0, 255, 0, trans1);
  let img = vid.get();
  let j = 0;

  img.loadPixels();
  for (let i = 0; i < img.width; i++) {
    for (let j = 0; j < img.height; j++) {
      const pixelIndex = (i + j * img.width) * 4;
      const r = img.pixels[pixelIndex + 0];
      const g = img.pixels[pixelIndex + 1];
      const b = img.pixels[pixelIndex + 2];
      const avg = (r + g + b) / 3;

      values[i + img.width * j] = avg;
    }
  } //

  const gridw = width * 0.8;
  const gridh = width * 0.8;
  const cellw = gridw / cols;
  const cellh = gridh / rows;
  const margx = (width - gridw) / 2;
  const margy = (width - gridh) / 2;
  //
  push();
  translate(0, 350);
  //drawing grid
  let charNum = 0;
  for (let i = 0; i < numCells; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const cellIndex = col + row * cols;

    const x = margx + col * cellw;
    const y = margy + row * cellh;

    //drawing shapes

    const w = ((255 - values[cellIndex]) / 255) * 9;
    ellipse(x, y, w, w);

    // if (values[cellIndex] <5) {
    //   text("@",x,y)

    // }else if(values[cellIndex] <10){
    //   text("#",x,y)
    // }else if(values[cellIndex] <200){
    //   text("0",x,y)
    // }else if(values[cellIndex] <250){
    //   text("1",x,y)
    // }
  } //
  pop();
}

function screen2() {
  //nuke
  //background(backColor);
  fill(255, 0, 0, trans2);
  let img = vid2.get();
  let j = 0;
  img.loadPixels();
  for (let i = 0; i < img.width; i++) {
    for (let j = 0; j < img.height; j++) {
      const pixelIndex = (i + j * img.width) * 4;
      const r = img.pixels[pixelIndex + 0];
      const g = img.pixels[pixelIndex + 1];
      const b = img.pixels[pixelIndex + 2];
      const avg = (r + g + b) / 3;

      values[i + img.width * j] = avg;
    }
  } //

  const gridw = width;
  const gridh = width;
  const cellw = gridw / cols;
  const cellh = gridh / rows;
  const margx = (width - gridw) / 2;
  const margy = (width - gridh) / 2;
  //
  push();
  translate(0, 350);
  //drawing grid
  let charNum = 0;
  for (let i = 0; i < numCells; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const cellIndex = col + row * cols;

    const x = margx + col * cellw;
    const y = margy + row * cellh;

    //drawing shapes

    const w = ((255 - values[cellIndex]) / 255) * 13;
    ellipse(x, y, w, w);

    // if (values[cellIndex] <5) {
    //   text("@",x,y)

    // }else if(values[cellIndex] <10){
    //   text("#",x,y)
    // }else if(values[cellIndex] <200){
    //   text("0",x,y)
    // }else if(values[cellIndex] <250){
    //   text("1",x,y)
    // }
  } //
  pop();
}
