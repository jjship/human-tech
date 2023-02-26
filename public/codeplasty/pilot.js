let currentQuestion = 0;

let textbutton = "";

const data = [
  { question: "W przyszłoścci świat będzie lepszy.", options: ["TAK", "NIE"] },
  {
    question: "Technologia zmierza w dobrym kierunku.",
    options: ["TAK", "NIE"],
  },
  { question: "Technologia jest potrzebna.", options: ["TAK", "NIE"] },
  { question: "Czy tehnologia nasz uratuje?", options: ["TAK", "NIE"] },
];

function preload() {
  myfont = loadFont("Audiowide-Regular.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  button_ans1 = createButton("TAK");
  button_ans1.position(0, windowHeight * 0.4);
  button_ans1.size(windowWidth * 0.52, windowHeight * 0.6);
  button_ans1.style("background-color", color(0, 100, 25, 50));

  button_ans2 = createButton("NIE");
  button_ans2.position(windowWidth * 0.52, windowHeight * 0.4);
  button_ans2.size(windowWidth * 0.48, windowHeight * 0.6);
  button_ans2.style("background-color", color(220, 0, 0, 50));
}

function new_question1() {
  currentQuestion++;
  if (currentQuestion >= data.length) {
    currentQuestion = 0;
  }
  httpPost(
    "https://human-tech-hackaton-22.vercel.app/api/codeplasty-transparency-one",
    "json",
    {
      transparencyOneChange: 1,
    }
  );
}

function new_question0() {
  currentQuestion++;
  if (currentQuestion >= data.length) {
    currentQuestion = 0;
  }
  httpPost(
    "https://human-tech-hackaton-22.vercel.app/api/codeplasty-transparency-two",
    "json",
    {
      transparencyTwoChange: 1,
    }
  );
}

function draw() {
  background(50);
  fill(20, 100, 20);
  textSize(30);
  textAlign(CENTER);
  textFont(myfont);
  text(
    data[currentQuestion].question,
    windowWidth * 0.15,
    windowHeight * 0.1,
    windowWidth * 0.7
  );

  button_ans1.mousePressed(new_question1);
  button_ans2.mousePressed(new_question0);

  // fill(kolor);
  // rect(x1, y1, x2, y2);
}

// function mousePressed() {
//   if ((mouseX > 0) && (mouseX < windowWidth *0.52) && (mouseY > windowHeight* 0.4) && (mouseY < windowsHeight)   ){

//     fill(255);
//   }else if((windowWidth *0.52 > 40) && (mouseX < windowWidth) && (mouseY > windowHeight* 0.4) && (mouseY < windowsHeight)){

//     fill(255);
//   }

// }

// function mouseReleased(){
//   if ((mouseX > 0) && (mouseX < windowWidth *0.52) && (mouseY > windowHeight* 0.4) && (mouseY < windowsHeight)   ){

//     fill(1,1,1,0);
//   }else if((mouseX  > windowWidth *0.52) && (mouseX < windowWidth) && (mouseY > windowHeight* 0.4) && (mouseY < windowsHeight)){

//     fill(1,1,1,0);
//   }

// }
