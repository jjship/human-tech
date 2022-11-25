import p5, { Vector, Color } from "p5";

type IssPositionPayload = {
  latitude: number;
  longitude: number;
};

type Position = { lat: number; long: number };

type CurrentWeatherAtPosition = {
  latitude: number;
  longitude: number;
  current_weather: {
    temperature: number;
  };
};

type Provinces = {
  features: { properties: { name: string } }[];
};

export function sketch(p: p5) {
  /*
Author: David Sypniewski
Based mostely on the knowledge gained from the courses of The Coding Train, https://thecodingtrain.com
this example is created to test the interaction methods proposed for the HumanTech Summit 2022 Hackathon.
1. Loading of external API
2. Sending and loading data to firebase and dynamic response of the visualisation
3. Interaction with the "1" button on the keyboard, which is the equivalent of the button on the Warexpo screen on ul. Chmielna in Warsaw.
*/

  let provinceNames: string[];
  let randomProvinceName: string;
  // let provincesLenght;
  let issPositionPayload: IssPositionPayload;
  const issPosition: Position = {
    lat: 0,
    long: 0,
  };
  let temperatureAtIssPosition: number;
  let newMinute: number;
  let minuteNow: number;
  let stars: Vector[] = [];
  let provinces: Provinces;
  let c: Color;

  let t = 0;

  let clickCount = 5; //ta zmienna otrzymuje dane z bazy danych  ////JACEK

  p.preload = () => {
    // Get the polish provinces database
    provinces = p.loadJSON(
      "https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/poland.geojson"
    ) as Provinces;

    // Get the International Space Station Current Location data
    issPositionPayload = p.loadJSON(
      "https://api.wheretheiss.at/v1/satellites/25544"
    ) as IssPositionPayload;
  };

  p.setup = async () => {
    issPosition.lat = issPositionPayload.latitude;
    issPosition.long = issPositionPayload.longitude;

    getTemperatureAtPosition(issPosition);

    provinceNames = provinces.features.map(
      (province) => province.properties.name
    );
    const randomIndex = p.round(p.random(provinceNames.length));
    randomProvinceName = provinceNames[randomIndex];

    let canvas = p.createCanvas(1080, 1920);
    canvas.style("font-family", '"Oswald", sans-serif');
    p.textSize(20);
    p.textAlign(p.CENTER, p.CENTER);
    p.noStroke();
    c = p.color(255, 66, 66);
    for (let i = 0; i < clickCount; i++) {
      addStar();
    }

    minuteNow = p.minute();
  };

  p.draw = () => {
    t++;

    if (t % 500 == 0) {
      p.loadJSON(
        "https://api.wheretheiss.at/v1/satellites/25544",
        (issPositionPayload: IssPositionPayload) => {
          issPosition.lat = issPositionPayload.latitude;
          issPosition.long = issPositionPayload.longitude;
        }
      );

      getClicks();
    }

    newMinute = p.minute();
    if (newMinute != minuteNow) {
      getTemperatureAtPosition(issPosition);
      console.log({ temperatureAtIssPosition });
      minuteNow = newMinute;
    }

    p.background(0);
    p.noStroke();
    p.fill(255);
    p.text(randomProvinceName, p.width / 2, 100);
    let x = p.abs((p.width * (issPosition.lat + 90)) / 180);
    let y = p.abs((p.height * (issPosition.long + 180)) / 360);
    p.circle(x, y, 50);
    p.fill(temperatureAtIssPosition * 10, 0, 0);
    p.text(temperatureAtIssPosition, x, y);
    p.noFill();
    p.stroke(c);
    p.strokeWeight(2);

    p.beginShape();

    for (let i = 0; i < stars.length; i++) {
      p.vertex(stars[i].x, stars[i].y);
    }

    p.endShape();

    p.strokeWeight(6);
    for (let i = 0; i < stars.length; i++) {
      p.point(stars[i].x, stars[i].y);
    }
  };

  function addStar() {
    let v = p.createVector(p.random(p.width), p.random(p.height));
    stars.push(v);
    p.print(v);
  }

  function getClicks() {
    //ta funkcja aktualizuje zmienną ClickCount  ////JACEK
    let clickCountFromDatabase = 2; // i zmienia wartość tej zmiennej
    if (clickCount != clickCountFromDatabase) {
      //porównuję czy coś się zmieniło od ostatniego sprawdzenia
      clickCount = clickCountFromDatabase;
      addStar();
    }
  }

  function randomColor() {
    let r = p.random(255);
    let g = p.random(255);
    let b = p.random(255);
    c = p.color(r, g, b);
  }

  function keyReleased() {
    if (p.key == "1") {
      randomColor();
    }
    return false; // prevent any default behavior
  }

  function getTemperatureAtPosition(position: Position) {
    if (!position.lat && !position.long) return;
    try {
      p.loadJSON(
        `https://api.open-meteo.com/v1/forecast?current_weather=true&latitude=${position.lat}&longitude=${position.long}`,
        (weather: CurrentWeatherAtPosition) => {
          temperatureAtIssPosition = weather.current_weather.temperature;
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
}
