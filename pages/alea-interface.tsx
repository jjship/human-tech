import dynamic from "next/dynamic";

const AleaInterface = dynamic(
  () => import("../src/alea/interface/interfacep5wrapper"),
  {
    ssr: false,
  }
);

export default function Alea() {
  return (
    <div>
      <AleaInterface />
    </div>
  );
}
