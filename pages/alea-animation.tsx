import dynamic from "next/dynamic";

const AleaAnimation = dynamic(
  () => import("../src/alea/animation/animationp5wrapper"),
  {
    ssr: false,
  }
);

export default function Alea() {
  return (
    <div>
      <AleaAnimation />
    </div>
  );
}
