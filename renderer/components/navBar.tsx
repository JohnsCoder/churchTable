import styles from "../styles/components/navbar.module.css";
import { Home, Sheet, Pencil, UserPlus, Cog } from "lucide-react";
import Link from "next/link";
export default function Navbar() {
  return (
    <>
      <ul className={styles.navbar}>
        <li className={styles["home-link"]}>
          <Link href={"/home"}>
            <a>
              <Home />
            </a>
          </Link>
        </li>
        <li className={styles["sheet-link"]}>
          <Link href={"/management/table"}>
            <a>
              <Sheet />
            </a>
          </Link>
        </li>
        <li className={styles["pen-link"]}>
          <Link href={"/management/manage"}>
            <a>
              <Pencil />
            </a>
          </Link>
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
