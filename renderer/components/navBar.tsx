import styles from "../styles/components/navbar.module.css";
import { Home, Sheet, Pencil, UserPlus, Cog } from "lucide-react";

export default function Navbar() {
  return (
    <>
      <ul className={styles.navbar}>
        <li className={styles["home-link"]}>
          <a href={"/home"}>
            <Home />
          </a>
        </li>
        <li className={styles["sheet-link"]}>
          <a href={"/management/table"}>
            <Sheet />
          </a>
        </li>
        <li className={styles["pen-link"]}>
          <a href={"/management/manage"}>
            <Pencil />
          </a>
        </li>
        {/* <li className={styles["userplus-link"]}>
          <a href={"/management/admin"}>
            <UserPlus />
          </a>
        </li> */}
        {/* <li className={styles["userplus-link"]}>
          <a href={"/settings"}>
            <Cog />
          </a>
        </li> */}
      </ul>
    </>
  );
}
