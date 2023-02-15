/*
 Author: David Sypniewski
 Introduction to the presentation of the work done as part of the Hackathon Creative Coding 2022.
 Visualization of data on objects currently flying close to Earth, based on the database provided by NASA.
 */

let nearEarthObjectsBase;
let objectCount;
let combineDate;
let diameters = [];
let hazardous = [];
let velocitiesSec = [];
let velocitiesHour = [];
let velocitiesShapes = [];
let missDistances = [];
let names = [];
let vectorsUp = [];
let vectorsDown = [];

let colors = [];

const minDistBetweenObj = 100;

let offset2 = 0;

let oswaldBold;
let oswaldMedium;
let robotoCondBold;
let robotoCondRegular;

let warexpo;
let ovh;
let humantech;

let minutes = 5;
let seconds = 0;

let milliSec = 0;
const sec = 1000;

let lx1 = 50; //beginning of the counter line
const easing = 0.08;

const timeoutUrl = "https://human-tech-hackaton-22.vercel.app/api/timeout";

function preload() {
  oswaldBold = loadFont("/about/fonts/Oswald-Bold.ttf");
  oswaldMedium = loadFont("/about/fonts/Oswald-Medium.ttf");
  robotoCondBold = loadFont("/about/fonts/RobotoCondensed-Bold.ttf");
  robotoCondRegular = loadFont("/about/fonts/RobotoCondensed-Regular.ttf");

  warexpo = loadImage("/about/logo/warexpo.png");
  ovh = loadImage("/about/logo/ovh.png");
  humantech = loadImage("/about/logo/humantech.png");

  //get timeout
  loadJSON(timeoutUrl, (timeout) => {
    minutes = parseInt(timeout.minutes);
    seconds = parseInt(timeout.seconds);
  });

  //get date
  let dayN = day();
  if (dayN < 10) {
    dayN = 0 + str(dayN);
  }
  let monthN = month();
  if (monthN < 10) {
    monthN = 0 + str(monthN);
  }
  let yearN = year();

  combineDate = yearN + "-" + monthN + "-" + dayN;

  // Get data from Near Earth Object Web Service
  nearEarthObjectsBase = loadJSON(
    "https://api.nasa.gov/neo/rest/v1/feed?start_date=" +
      combineDate +
      "&end_date=" +
      combineDate +
      "&api_key=wciCTc95fXs5eaAuOVLc20ds3rrdjIjlxrJJGoVU"
  );
  //print(nearEarthObjectsBase);
}

function setVar(todaysDate) {
  objectCount = nearEarthObjectsBase.element_count;
  for (let i = 0; i < objectCount; i++) {
    let di =
      nearEarthObjectsBase.near_earth_objects[todaysDate][i].estimated_diameter
        .kilometers.estimated_diameter_max;
    diameters[i] = minDistBetweenObj / 2 + minDistBetweenObj * di;
    hazardous[i] =
      nearEarthObjectsBase.near_earth_objects[todaysDate][
        i
      ].is_potentially_hazardous_asteroid;
    velocitiesSec[i] =
      nearEarthObjectsBase.near_earth_objects[todaysDate][
        i
      ].close_approach_data[0].relative_velocity.kilometers_per_second;
    velocitiesHour[i] =
      nearEarthObjectsBase.near_earth_objects[todaysDate][
        i
      ].close_approach_data[0].relative_velocity.kilometers_per_hour;
    missDistances[i] =
      nearEarthObjectsBase.near_earth_objects[todaysDate][
        i
      ].close_approach_data[0].miss_distance.kilometers;
    names[i] = nearEarthObjectsBase.near_earth_objects[todaysDate][i].name;
    colors[i] = color(30 + (velocitiesHour[i] % 100), 100, 90);

    let xu =
      minDistBetweenObj + (i * (width - minDistBetweenObj)) / objectCount;
    let yu = round(missDistances[i] / 70000);
    let xd = random(width);
    let yd = height - yu - 600;

    let vectorUp = createVector(xu, yu);
    let vectorDown = createVector(xd, yd);
    vectorsUp.push(vectorUp);
    vectorsDown.push(vectorDown);

    let velocityX = random(-velocitiesSec[i] / 200, velocitiesSec[i] / 200);
    let velocityY = random(-velocitiesSec[i] / 200, velocitiesSec[i] / 200);
    let velocityShape = createVector(velocityX, velocityY);
    velocitiesShapes.push(velocityShape);
  }
}

function setup() {
  let canvas = createCanvas(1080, 1920);
  colorMode(HSB, 100);
  setVar(combineDate);
  canvas.style("font-family", '"Oswald", sans-serif');
  angleMode(DEGREES);
  frameRate(30);
}

function draw() {
  background(60, 60, 20);
  blendMode(SOFT_LIGHT);
  noFill();

  for (let i = 0; i < objectCount; i++) {
    //objects in proximity of Earth
    vectorsUp[i].add(velocitiesShapes[i]);
    vectorsDown[i].add(velocitiesShapes[i]);

    if (vectorsUp[i].x > width + 500) {
      vectorsUp[i].x = -500;
    }

    if (vectorsUp[i].y < -500) {
      vectorsUp[i].y = height + 500;
    }

    if (vectorsUp[i].x < -500) {
      vectorsUp[i].x = width + 500;
    }

    if (vectorsUp[i].y > height + 500) {
      vectorsUp[i].y = -500;
    }

    if (vectorsDown[i].x > width + 500) {
      vectorsDown[i].x = -500;
    }

    if (vectorsDown[i].y > height + 500) {
      vectorsDown[i].y = -500;
    }

    if (vectorsDown[i].x < -500) {
      vectorsDown[i].x = width + 500;
    }

    if (vectorsDown[i].y < -500) {
      vectorsDown[i].y = height + 500;
    }

    let distV = round(vectorsUp[i].dist(vectorsDown[i]));
    strokeWeight(40);
    let c = colors[i];

    for (let j = 0; j < distV; j += 40) {
      //colors under the objects
      let d = p5.Vector.lerp(vectorsUp[i], vectorsDown[i], j / distV);
      let distD = dist(vectorsUp[i].x, vectorsUp[i].y, d.x, d.y) * 2;
      let c2 = color(30 + (velocitiesHour[i] % (100 + 10)), 40, 100);
      let cj = lerpColor(c, c2, sin((90 * j) / distV));
      stroke(cj);
      circle(vectorsUp[i].x, vectorsUp[i].y, distD);
    }
  }
  line(40, height - 400, 510, height - 400); //line under title

  fill(60, 40, 100);
  noStroke();
  ellipse(width / 2, height - 100, width * 2, height / 2); //EARTH

  textSize(16);
  textFont(oswaldMedium);
  blendMode(BLEND);

  for (let i = 0; i < objectCount; i++) {
    //shapes and descriptions of the objects
    let c = color(60, 50, 20);
    /*
    if (hazardous[i]) {
     c = color(10, 50, 30);
     }*/

    stroke(c); //shapes of the objects
    noFill();
    strokeWeight(2);

    push();
    translate(vectorsUp[i].x, vectorsUp[i].y);
    beginShape();
    let offset1 = 10;
    if (hazardous[i]) {
      offset1 = 35;
      for (let a = 90; a < 360 + 90; a += 20) {
        let rm = diameters[i] / 2;
        if (a != 90) {
          rm += map(noise(a / 10 + i / 3 + offset2), 0, 1, -offset1, offset1);
        }
        let xv = rm * cos(a);
        let yv = rm * sin(a);
        vertex(xv, yv);
      }
    } else {
      for (let a = 90; a < 360 + 90; a += 30) {
        let rm = diameters[i] / 2;
        if (a != 90) {
          rm += map(noise(a / 10 + i / 3 + offset2), 0, 1, -offset1, offset1);
        }
        let xv = rm * cos(a);
        let yv = rm * sin(a);
        curveVertex(xv, yv);
      }
    }

    endShape(CLOSE);
    pop();

    let y1 = vectorsUp[i].y + diameters[i] / 2; //lines under the shapes
    let y2 = vectorsUp[i].y + diameters[i] / 2 + minDistBetweenObj;
    line(vectorsUp[i].x, y1, vectorsUp[i].x, y2);

    noStroke(); //description of the objects
    fill(c);
    text("nazwa: " + names[i], vectorsUp[i].x + 5, y2 - 40);
    let distTxt = round(missDistances[i]) + " km od Ziemi";
    text(distTxt, vectorsUp[i].x + 5, y2 - 20);
    let dangerTxt = "niebezpieczny: ";

    if (hazardous[i]) {
      dangerTxt += "tak";
    } else {
      dangerTxt += "nie";
    }
    text(dangerTxt, vectorsUp[i].x + 5, y2);
  }

  offset2 += 0.01;

  //DESCRIPTIONS OF THE PROJECT
  fill(60, 15, 100);
  textFont(robotoCondBold);
  textSize(76);
  text("Czy technolgia nas uratuje?", 38, height - 470);

  textFont(oswaldBold);
  textSize(36);
  text("HACKATHON CREATIVE CODING // HUMAN-TECH SUMMIT 2022", 40, height - 400);

  textFont(robotoCondBold);
  textSize(22);
  text(
    "Jakie relacje tworzymy z technolgią? Czy technologia jest problemem czy rozwiązaniem? Trzy prace, które można zobaczyć na tych ekranach stanowią próbę odpowiedzi na te pytania. Są to interaktywne wizualizacje stworzone przez zespoły, które weszły do finału Hackathonu Creative Coding w ramach konferencji Human-Tech Summit 2022, zorganizowanej przez Uniwersytet SWPS.",
    40,
    height - 360,
    800,
    800
  );

  textSize(16);
  text(
    "Animacja powyżej jest ilustracją danych udostępnianych przez NASA dotyczących meteorytów przelatujących aktualnie blisko Ziemi.",
    40,
    height - 200,
    800,
    800
  );

  textSize(10); //LOGO
  text("ORGANIZATOR", 40, height - 110);
  text("PARTNERZY", 250, height - 110);

  image(humantech, 40, height - 90);
  image(warexpo, 250, height - 94);
  image(ovh, 400, height - 90);

  //COUNTER
  if (millis() - milliSec > sec) {
    seconds--;
    milliSec = millis();
  }

  if (seconds == 0) {
    minutes--;
    seconds = 59;
  }

  let timeCount = minutes * 60 + seconds;

  if (timeCount <= 0) {
    //load first visualisation

    location.reload();
    location.href = "https://human-tech-hackaton-22.vercel.app/404-animation";
    noLoop();
  } else {
    textFont(robotoCondBold);
    textSize(76);
    let secTxt = seconds;
    if (seconds < 10) {
      secTxt = "0" + seconds;
    }

    text(minutes + ":" + secTxt, 900, height - 40);

    noFill();
    strokeWeight(10);
    stroke(60, 15, 100);
    let lineLength = map(timeCount, 0, 5 * 60, 0, width - 100);

    lx1 = lerp(lx1, width - 50 - lineLength, easing);
    line(lx1, height - 20, width - 50, height - 20);
  }
}
