let clickCount = 0;
let x, y, w, h;
let clicked = false;
t = 0;
url = 'https://human-tech-hackaton-22.vercel.app/api/alea-xenobots';

function preload()
{
  tabela = loadJSON(url);
  console.log({tabela});
}

function setup() 
{
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  textSize(30);

  w = 400;
  h = 100;
  x = width/2 - w/2;
  y = height/2 - h/2;
}

function mouseReleased() 
{
  if ((mouseX > x) && (mouseX < x+w) && (mouseY > y) && (mouseY < y+h)) 
  {
    clickCount++;
    print(clickCount);
    addClick();
    clicked = true;
  }
}

function draw() 
{
  t++;
  if(t%60==0)
  {
    dana = tabela.xenobots;
    print(dana);
  }
  background(0);
  if (clicked) 
  {
    clicked = false;
  }
  fill(50);
  rect(x, y, w, h);
  fill(255);
  text('DODAJ KSENOBOT', x + w/2, y + h/2);
}

function addClick()
{
  let postData = {xenoChange: 0.5};
  httpPost(url, 'json', postData);
}