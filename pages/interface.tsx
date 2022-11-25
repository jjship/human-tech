import dynamic from "next/dynamic";

const FirstInterface = dynamic(
  () => import("../src/interface/interfacep5wrapper"),
  {
    ssr: false,
  }
);

export default function Interface() {
  return (
    <div>
      <FirstInterface />
    </div>
  );
}
