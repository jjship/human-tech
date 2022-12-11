import { Vector, Color } from "p5";
import p5 from "p5";

export function sketch(p: p5) {
  let clickCount = 0;
  let x: number;
  let y: number;
  let w: number;
  let h: number;
  let clicked = false;
  let t = 0;
  let url = "/api/alea-xenobots";
  let tabela = { xenobots: 0 };

  p.preload = () => {
    let tabela = p.loadJSON(url);
    console.log({ tabela });
  };

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(30);

    w = 400;
    h = 100;
    x = p.width / 2 - w / 2;
    y = p.height / 2 - h / 2;
  };

  p.mouseReleased = () => {
    if (p.mouseX > x && p.mouseX < x + w && p.mouseY > y && p.mouseY < y + h) {
      clickCount++;
      p.print(clickCount);
      addClick();
      clicked = true;
    }
  };

  p.draw = () => {
    t++;
    if (t % 60 == 0) {
      let dana = tabela.xenobots;
      p.print(dana);
    }
    p.background(0);
    if (clicked) {
      clicked = false;
    }
    p.fill(50);
    p.rect(x, y, w, h);
    p.fill(255);
    p.text("DODAJ KSENOBOT", x + w / 2, y + h / 2);
  };

  function addClick() {
    let postData = { xenoChange: 0.5 };
    p.httpPost(url, "json", postData);
  }
}
