import styles from "../styles/Home.module.css";

export default function SetClickCount() {
  return (
    <>
      {/* <p className={styles.card}>{value.clickCount}</p> */}
      <button
        className={styles.card}
        // onClick={() => value.setClickCount(value.clickCount + 1)}
      ></button>
    </>
  );
}
