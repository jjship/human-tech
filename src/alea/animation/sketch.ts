import { Vector, Color, Image } from "p5";
import p5 from "p5";
import {
  ClickCountResponsePayload,
  clickUrl,
} from "../../../pages/api/alea-xenobots";

export function sketch(p: p5) {
  let ekran_1: Image;
  let ekran_2: Image;
  let kod: Image;
  let xenobots: number;
  let t = 0;

  let url = "/api/alea-xenobots";

  p.preload = () => {
    xenobots = 5;
    ekran_1 = p.loadImage("./ekran_1.png");
    ekran_2 = p.loadImage("./ekran_2_nowy.png");
    kod = p.loadImage("./qrcode(2).png");
  };

  let plastik = [] as any;
  let xenoboty = [] as any;
  let ilosc_plastiku = 0;
  let rozmiar_min_plastiku = 20;
  let rozmiar_max_plastiku = 40;

  let ilosc_xenobotow = 0;
  let kulka;
  let x_kulki = 500;
  let y_kulki = 200;
  let color_r: Color;

  let x_plastiktemp;
  let y_plastiktemp;

  let xy = []; //zbiera dane o x i y plastiku z return

  let x_plastiku = [] as any;
  let y_plastiku = [] as any;

  let x_xenobota = [] as any;
  let y_xenobota = [] as any;

  let x: number;
  let y: number;
  let r: number;
  let x_kulkitemp: number;
  let y_kulkitemp: number;

  let xy_xeno = [];

  let zjedzone = [] as any;
  let zjedzone_do_3 = [] as any;
  let sekundy = [] as any;

  let kolory = ["#13574a", "#fd5d25", "#fd756a", "#cfe35e"];
  //let word = random(words);

  p.setup = () => {
    p.createCanvas(1080, 1920);

    for (let i = 0; i < 60; i++) sekundy[i] = 0;
  };

  // function dodaj() {
  //   if (tabela.xenobots != ilosc_xenobotow) {
  //     if (ilosc_xenobotow < 100) {
  //       let xeno = new Xenobot(540, 1900, 10, x_kulki, y_kulki);
  //       xenoboty.push(xeno);
  //       ilosc_xenobotow++;
  //       zjedzone_do_3[ilosc_xenobotow - 1] = 0;
  //     }
  //   }
  // }

  function addXenobots() {
    if (ilosc_xenobotow < 100) {
      let xeno = new Xenobot(540, 1900, 10, x_kulki, y_kulki);
      xenoboty.push(xeno);
      ilosc_xenobotow++;
      zjedzone_do_3[ilosc_xenobotow - 1] = 0;
    }
  }

  function time() {
    let s = p.second();
    p.textSize(100);
    // text('Current second: \n' + s, 5, 50);
    if (s == 0) {
      for (let i = 0; i <= 60; i++) {
        sekundy[i] = 0;
      }
    }

    if (sekundy[s] == 0 && s != 0 && ilosc_plastiku < 145) {
      x = p.random(p.width); // x pojawiania się plastiku
      y = p.random(p.height); // y pojawiania się plastiku
      r = p.random(rozmiar_min_plastiku, rozmiar_max_plastiku); //rozmiar cząsteczek plastiku
      color_r = p.random(kolory); // kolor czerwony
      ilosc_plastiku++;
      let nowy_plastik = new Plastik(x, y, r, color_r);
      plastik.push(nowy_plastik);
    }
    // text('ilość plastiku: \n' + ilosc_plastiku, 5, 50);
    sekundy[s] = 1;
  }

  p.draw = () => {
    t++, p.background(p.color("#282e59"));

    if (p.second() < 30) {
      p.image(ekran_2, 0, 0);
      ekran_2.resize(1080, 1920);
    } else {
      p.image(ekran_1, 0, 0);
      ekran_1.resize(1080, 1920);
    }

    if (t % 10 == 0) {
      p.loadJSON(url, (payload: { xenobots: number }) => {
        xenobots = p.int(payload.xenobots);
      });
    }

    time();

    if (xenobots !== xenoboty.length) {
      addXenobots();
    }

    time();
    // dodaj();

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
      if (
        p.dist(x_xenobota[i], y_xenobota[i], x_plastiku[i], y_plastiku[i]) < 30
      ) {
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
      }
    }
    p.fill(230);
    p.rect(900, 1740, 100, 100);
    p.image(kod, 900, 1740);
    kod.resize(100, 100);
  };

  class Xenobot {
    x: number;
    y: number;
    r: number;
    xspeed: number;
    yspeed: number;
    x_kulki: number;
    y_kulki: number;

    constructor(
      x: number,
      y: number,
      r: number,
      x_kulkitemp: number,
      y_kulkitemp: number
    ) {
      this.x = x; // x cząsteczki xenobota
      this.y = y; // y cząsteczki xenobota
      this.r = r; // promień cząsteczki xenobota
      this.xspeed = p.random(2, 3); //random(random(-5,-3),random(3,5)); //prędkość poruszania się x
      this.yspeed = p.random(2, 3); //random(random(-5,-2),random(2,5)); //prędkość poruszania się y
      this.xspeed = this.xspeed * p.random(-1, 1);
      this.yspeed * p.random(-5, 1);
      this.x_kulki = 0;
      this.y_kulki = 0;
    }
    show() {
      p.stroke(255);
      p.strokeWeight(4);
      p.fill(255);
      p.noStroke();
      p.ellipse(this.x, this.y, this.r * 2);
    }

    move(x_kulkitemp: number, y_kulkitemp: number) {
      this.x_kulki = x_kulkitemp;
      this.y_kulki = y_kulkitemp;

      if (p.dist(this.x, this.y, this.x_kulki, this.y_kulki) < 300) {
        if (this.x > this.x_kulki && this.y > this.y_kulki) {
          this.x = this.x - 3;
          this.y = this.y - 3;
        }
        if (this.x == this.x_kulki && this.y > this.y_kulki) {
          this.y = this.y - 3;
        }
        if (this.x > this.x_kulki && this.y == this.y_kulki) {
          this.y = this.y - 3;
        }

        if (this.x > this.x_kulki && this.y < this.y_kulki) {
          this.x = this.x - 3;
          this.y = this.y + 3;
        }
        if (this.x == this.x_kulki && this.y < this.y_kulki) {
          this.y = this.y + 3;
        }
        if (this.x > this.x_kulki && this.y == this.y_kulki) {
          this.x = this.x - 3;
        }

        if (this.x < this.x_kulki && this.y >= this.y_kulki) {
          this.x = this.x + 3;
          this.y = this.y - 3;
        }
        if (this.x == this.x_kulki && this.y >= this.y_kulki) {
          this.y = this.y - 3;
        }
        if (this.x < this.x_kulki && this.y == this.y_kulki) {
          this.x = this.x + 3;
        }

        if (this.x < this.x_kulki && this.y < this.y_kulki) {
          this.x = this.x + 3;
          this.y = this.y + 3;
        }
        if (this.x == this.x_kulki && this.y < this.y_kulki) {
          this.y = this.y + 3;
        }
        if (this.x < this.x_kulki && this.y == this.y_kulki) {
          this.x = this.x + 3;
        }
      } else {
        if (this.x + this.r > p.width || this.x < 0 + this.r) {
          this.xspeed = this.xspeed * -1;
        }

        if (this.y + this.r > p.height || this.y < 0 + this.r) {
          this.yspeed = this.yspeed * -1;
        }

        this.x = this.x + this.xspeed;
        this.y = this.y + this.yspeed;
      }

      let xy = [];
      xy[0] = this.x;
      xy[1] = this.y;
      return xy;
    }
  }

  class Plastik {
    x: number;
    y: number;
    r: number;
    color: Color;
    xspeed: number; //prędkość poruszania się x
    yspeed: number; //prędkość poruszania się y
    start: number;

    // cząsteczki plastiku
    constructor(x: number, y: number, r: number, color_r: Color) {
      this.x = x; // x cząsteczki
      this.y = y; // y cząsteczki
      this.r = r; // promień cząsteczki
      this.color = color_r;
      this.xspeed = 0.25; //prędkość poruszania się x
      this.yspeed = 0.25; //prędkość poruszania się y
      this.xspeed = p.random(-1, 1) * this.xspeed;
      this.start = 0;
    }

    show() {
      // stroke(255);
      //strokeWeight(4);
      p.fill(this.color);
      p.noStroke();
      p.ellipse(this.x, this.y, this.r * 2);
    }

    move() {
      if (this.x % 11 == 0 || this.y % 11 == 0) {
        this.xspeed = this.xspeed * -1;
      }

      if (this.x + this.r > p.width || this.x < 0 + this.r) {
        this.xspeed = this.xspeed * -1;
      }

      if (this.y + this.r > p.height || this.y < 0 + this.r) {
        this.yspeed = this.yspeed * -1;
      }

      this.x = this.x + this.xspeed;
      this.y = this.y + this.yspeed;
      let xy = [];
      xy[0] = this.x;
      xy[1] = this.y;

      return xy;
    }
  }
}
