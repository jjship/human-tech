import { ReactP5Wrapper } from "react-p5-wrapper";

import { sketch } from "./sketch";

// const clickCount = 4;

export default function Animation() {
  return <ReactP5Wrapper sketch={sketch} />;
}
