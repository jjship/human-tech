import dynamic from "next/dynamic";

const FirstShowcase = dynamic(() => import("../animation/animationp5wrapper"), {
  ssr: false,
});

export default function Showcase() {
  return (
    <div>
      <FirstShowcase />
    </div>
  );
}
