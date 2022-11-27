import { useContext } from "react";
import { ClickCountContext } from "../src/context/ClickCountContext";
import styles from "../styles/Home.module.css";

export default function ClickCount() {
  const { clickCount, setClickCount } = useContext(ClickCountContext);

  const handleIncrementClickCount = () => {
    setClickCount((prevState) => prevState + 1);
    console.log({ clickCount });
  };

  return (
    <>
      <p className={styles.card}>{clickCount}</p>
      <button
        className={styles.card}
        onClick={() => handleIncrementClickCount()}
      ></button>
    </>
  );
}
