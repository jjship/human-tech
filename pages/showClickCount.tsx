import styles from "../styles/Home.module.css";
import useSWR from "swr";

const fetcher = (url: string) =>
  fetch(url, {
    method: "GET",
  }).then((res) => res.json());

export default function SetClickCount() {
  const { data, error } = useSWR("/api/click", fetcher);
  if (data) {
    const clickCount = data.variable_value.N;
  }
  if (error) {
    console.log({ error });
  }

  // const something = "something";
  // console.log({ show: clickCount });

  return <>{/* <p className={styles.card}>clickCount</p> */}</>;
}
