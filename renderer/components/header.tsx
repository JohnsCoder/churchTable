import church from "../assets/church.svg";
import Image from "next/future/image";
import styles from "../styles/components/header.module.css";

export default function Header() {
  return (
    <header className={styles["header"]}>
      <Image src={church} alt="" />
      <h1>Escala de Ministros</h1>
    </header>
  );
}
