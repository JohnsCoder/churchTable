
import React, { useContext } from "react";
import { User } from "lucide-react";

// import Link from '../components/Link';
import styles from "../styles/Home.module.css";

import { SheetsContext } from "../contexts/components/sheets.context";
import { AuthContext } from "../contexts/components/auth.context";
import dynamic from "next/dynamic";
import Auth from "../components/auth";

const Sheets = dynamic(
    function () {
      return import("../components/sheets");
    },
    {
      ssr: false,
    }
  );

function Home() {
    const { printRef } = useContext(SheetsContext);

    const { verifyLogin } = useContext(AuthContext);
    return (
      <>
        <div className={styles["table-window"]} ref={printRef as any}>
          <Sheets />
        </div>
        <button className={styles.login} onClick={() => verifyLogin()}>
          <User />
        </button>
        <div className={styles["auth-window"]}>
          <Auth name="Login" />
        </div>
      </>
    );
}

export default Home;
