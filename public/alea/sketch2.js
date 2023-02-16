let ekran_1;
let ekran_2;
let iloscXenoWBazie;
let t = 0;
const url = "https://human-tech-hackaton-22.vercel.app/api/alea-xenobots";

// for timeout
const timeoutUrl = "https://human-tech-hackaton-22.vercel.app/api/timeout";
let minutes = 5;
let seconds = 0;
let milliSec = 0;
const sec = 1000;

function preload() {
  ekran_1 = loadImage("ekran_1.png");
  ekran_2 = loadImage("ekran_2_nowy.png");
  kod = loadImage("qrcode(2).png");
  httpDo(url, "PUT"); //wyzerowanie liczby xenobotów w bazie
  iloscXenoWBazie = 0;

  //get timeout
  loadJSON(timeoutUrl, (timeout) => {
    minutes = parseInt(timeout.minutes);
    seconds = parseInt(timeout.seconds);
  });
}

let plastik = [];
let xenoboty = [];
let ilosc_plastiku = 0;
let rozmiar_min_plastiku = 20;
let rozmiar_max_plastiku = 40;

let ilosc_xenobotow = 0;
let kulka;
let x_kulki = 500;
let y_kulki = 200;

let x_plastiktemp;
let y_plastiktemp;

let xy = []; //zbiera dane o x i y plastiku z return

let x_plastiku = [];
let y_plastiku = [];

let x_xenobota = [];
let y_xenobota = [];

let xy_xeno = [];

let zjedzone = [];
let zjedzone_do_3 = [];
let sekundy = [];

let kolory = ["#13574a", "#fd5d25", "#fd756a", "#cfe35e"];
//let word = random(words);

function setup() {
  createCanvas(1080, 1920);

  for (let i = 0; i < 60; i++) sekundy[i] = 0;
}
function keyReleased() {
  if (key == "1") {
    if (ilosc_xenobotow < 100) {
      let xeno = new Xenobot(540, 1900, 10, x_kulki, y_kulki);
      xenoboty.push(xeno);
      ilosc_xenobotow++;
      zjedzone_do_3[ilosc_xenobotow - 1] = 0;
      zmienIloscXenobotow(1);
    }
  }
  return false;
}
function mousePressed() {
  // if(ilosc_xenobotow < 100)
  // {
  // let xeno = new Xenobot(540, 1900, 10, x_kulki, y_kulki);
  // xenoboty.push(xeno);
  // ilosc_xenobotow++;
  // zjedzone_do_3[ilosc_xenobotow - 1] = 0;
  // }
}

function time() {
  let s = second();
  textSize(100);
  if (s == 0) {
    for (let i = 0; i <= 60; i++) {
      sekundy[i] = 0;
    }
  }

  if (sekundy[s] == 0 && s != 0 && ilosc_plastiku < 145) {
    x = random(width); // x pojawiania się plastiku
    y = random(height); // y pojawiania się plastiku
    r = random(rozmiar_min_plastiku, rozmiar_max_plastiku); //rozmiar cząsteczek plastiku
    color_r = random(kolory); // kolor czerwony
    ilosc_plastiku++;
    let nowy_plastik = new Plastik(x, y, r, color_r);
    plastik.push(nowy_plastik);
  }

  sekundy[s] = 1;
}

function draw() {
  background(color("#282e59"));
  if (second() < 30) {
    image(ekran_2, 0, 0);
    ekran_2.resize(1080, 1920);
  } else {
    image(ekran_1, 0, 0);
    ekran_1.resize(1080, 1920);
  }

  t++;
  if (t % 60 == 0) {
    loadJSON(url, (nowaTabela) => {
      iloscXenoWBazie = parseInt(nowaTabela.xenobots);
    }); // sprawdz aktualna ilosc xenobotow w bazie
    while (ilosc_xenobotow < iloscXenoWBazie) {
      console.log("CREATE");
      let xeno = new Xenobot(540, 1900, 10, x_kulki, y_kulki);
      xenoboty.push(xeno);
      ilosc_xenobotow++;
      zjedzone_do_3[ilosc_xenobotow - 1] = 0;
    }
  }

  time();

  for (let i = 0; i < plastik.length; i++) {
    plastik[i].move(); // poruszanie się cząsteczek plastiku
    xy = plastik[i].move();
    // plastik[i].bombel();
    x_plastiku[i] = xy[0];
    y_plastiku[i] = xy[1];
    //print(i, x_plastiku[i], y_plastiku[i]);
    plastik[i].show(); // pokazywaniie się cząsteczek plastiku
  }

  for (let i = 0; i < xenoboty.length; i++) {
    xenoboty[i].move(x_plastiku[i], y_plastiku[i]); // poruszanie się cząsteczek plastiku
    xy_xeno = xenoboty[i].move();
    x_xenobota[i] = xy_xeno[0];
    y_xenobota[i] = xy_xeno[1];
    // print(i, x_xenobota[i], y_xenobota[i]);
    xenoboty[i].show(); // pokazywaniie się cząsteczek plastiku
  }
  for (let i = 0; i < xenoboty.length; i++) {
    if (dist(x_xenobota[i], y_xenobota[i], x_plastiku[i], y_plastiku[i]) < 30) {
      plastik.splice(i, 1);
      ilosc_plastiku--;
      zjedzone[i] = 1;
      x_plastiku.splice(i, 1);
      y_plastiku.splice(i, 1);
    }
  }

  for (let i = 0; i < xenoboty.length; i++) {
    if (zjedzone[i] == 1) {
      zjedzone_do_3[i]++;
    }
  }
  for (let i = 0; i < xenoboty.length; i++) {
    zjedzone[i] = 0;
  }
  for (let i = 0; i < xenoboty.length; i++) {
    if (zjedzone_do_3[i] >= 3) {
      ilosc_xenobotow--;
      xenoboty.splice(i, 1);
      zjedzone_do_3.splice(i, 1);
      zjedzone.splice(i, 1);
      x_xenobota.splice(i, 1);
      y_xenobota.splice(i, 1);
      zmienIloscXenobotow(-1);
      iloscXenoWBazie--;
      console.log("DESTROY");
    }
  }
  fill(230);
  rect(900, 1740, 100, 100);
  image(kod, 900, 1740);
  kod.resize(100, 100);

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
    location.href = "https://human-tech-hackaton-22.vercel.app/codeplasty";
    noLoop();
  }
}

function zmienIloscXenobotow(change) {
  let postData = { xenoChange: change };
  httpPost(url, "json", postData);
}
