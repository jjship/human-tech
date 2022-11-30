import p5 from "p5";
import { ClickCountResponsePayload, clickUrl } from "../../pages/api/click";

export function sketch(p: p5) {
  let btn;
  let x: number;
  let y1: number;
  let y2: number;
  let w: number;
  let h: number;
  let c1 = "red";
  let c2 = "red";
  let clicked1 = false;
  let clicked2 = false;

  p.setup = () => {
    p.createCanvas(p.windowWidth - 10, p.windowHeight - 10);
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(30);

    x = p.width / 2 - 150;
    y1 = p.height / 2 - 150;
    y2 = p.height / 2 + 50;
    w = 300;
    h = 100;
  };

  p.mouseReleased = () => {
    if (
      p.mouseX > x &&
      p.mouseX < x + w &&
      p.mouseY > y1 &&
      p.mouseY < y1 + h
    ) {
      p.httpPost(clickUrl, "json", { clickChange: 1 });

      p.print("added");
      clicked1 = true;
    }
    if (
      p.mouseX > x &&
      p.mouseX < x + w &&
      p.mouseY > y2 &&
      p.mouseY < y2 + h
    ) {
      //wyślij clickCount do bazy danych
      p.httpPost(clickUrl, "json", { clickChange: -1 });
      p.print("substracted");
      clicked2 = true;
    }
  };

  p.draw = () => {
    p.background(0);
    c1 = "red";
    if (
      p.mouseX > x &&
      p.mouseX < x + w &&
      p.mouseY > y1 &&
      p.mouseY < y1 + h
    ) {
      c1 = "blue";
    }
    if (clicked1) {
      c1 = "green";
      clicked1 = false;
    }
    c2 = "red";
    if (
      p.mouseX > x &&
      p.mouseX < x + w &&
      p.mouseY > y2 &&
      p.mouseY < y2 + h
    ) {
      c2 = "blue";
    }
    if (clicked2) {
      c2 = "green";
      clicked2 = false;
    }
    p.fill(c1);
    p.rect(x, y1, w, h);
    p.fill(c2);
    p.rect(x, y2, w, h);
    p.fill(255);
    p.text("dodaj gwiazdę", x + w / 2, y1 + h / 2);
    p.text("odejmij gwiazdę", x + w / 2, y2 + h / 2);
  };
}
