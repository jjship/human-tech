let clickCount = 0;
let x, y, w, h;
let max = false;
let info = "DODAJ KSENOBOT";
let iloscXenoWBazie = 0;
let t = 0;
let url = "https://human-tech-hackaton-22.vercel.app/api/alea-xenobots";
let currentMillis = 0;
let blockBtn = false;

function preload() {
  tabela = loadJSON(url);
  iloscXenoWBazie = tabela.xenobots;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  textSize(30);

  w = 550;
  h = 100;
  x = width / 2 - w / 2;
  y = height / 2 - h / 2;
}

function mouseReleased() {
  if (!blockBtn && !max && mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
    clickCount++;
    print(clickCount);
    zmienIloscXenobotow(1);
    blockBtn = false;
    currentMillis = millis();
  }
}

function draw() {
  t++;
  if (t % 60 == 0) {
    loadJSON(url, (nowaTabela) => {
      iloscXenoWBazie = parseInt(nowaTabela.xenobots);
    });
    max = iloscXenoWBazie >= 100 ? true : false;
    print({ iloscXenoWBazie, max });
    info = max ? "OSIĄGNIĘTO MAX KSENOBOTÓW" : "DODAJ KSENOBOT";
  }
  
  background(0);
  
  if(blockBtn){
  let waitForUnblock = millis() - currentMillis;
    if(waitForUnblock > 1000){//=1 sec
    blockBtn = false;
    fill(50);
    }
  }else{
    fill(0, 128, 43);
  }
  if(!blockBtn && mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h){
   fill(0, 153, 204);
  }
  rect(x, y, w, h);
  fill(255);
  text(info, x + w / 2, y + h / 2);
}

function zmienIloscXenobotow(change) {
  let postData = { xenoChange: change };
  httpPost(url, "json", postData);
}
