import dynamic from "next/dynamic";
// import { useContext } from "react";
// import { ClickCountContext } from "../src/context/ClickCountContext";

const FirstShowcase = dynamic(() => import("../src/animation/testSketch"), {
  ssr: false,
});

export default function Showcase() {
  // const { clickCount, setClickCount } = useContext(ClickCountContext);
  return (
    <div>
      <FirstShowcase />
    </div>
  );
}
