import dynamic from "next/dynamic";
// import { useContext } from "react";
// import { ClickCountContext } from "../src/context/ClickCountContext";

const FirstShowcase = dynamic(
  () => import("../src/animation/animationp5wrapper"),
  {
    ssr: false,
  }
);

export default function Showcase() {
  return (
    <div>
      <FirstShowcase />
    </div>
  );
}
