import React, { useContext, useEffect, useState } from "react";

import { ReactP5Wrapper, Sketch, SketchProps } from "react-p5-wrapper";
import { ClickCountContext } from "../context/ClickCountContext";

type MySketchProps = SketchProps & {
  rotation: number;
};

const sketch: Sketch<MySketchProps> = (p5) => {
  let rotation = 0;

  p5.setup = () => p5.createCanvas(600, 400, p5.WEBGL);

  p5.updateWithProps = (props) => {
    console.log({ props: rotation });
    if (props.rotation) {
      rotation = (props.rotation * Math.PI) / 180;
    }
  };

  p5.draw = () => {
    p5.background(100);
    p5.normalMaterial();
    p5.noStroke();
    p5.push();
    p5.rotateY(rotation);
    p5.box(100);
    p5.pop();
  };
};

export default function TestWrapper() {
  const { clickCount, setClickCount } = useContext(ClickCountContext);

  // useEffect(() => {
  //   const interval = setInterval(
  //     () => setClickCount((clickCount) => clickCount + 100),
  //     1000
  //   );

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);
  console.log({ test: clickCount });
  useEffect(() => {
    console.log({ effect: clickCount });
  }, [clickCount]);

  return <ReactP5Wrapper sketch={sketch} rotation={clickCount} />;
}
