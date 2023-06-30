import { AuthContext } from "../contexts/components/auth.context";
import styles from "../styles/components/auth.module.css";
import { LogOut } from "lucide-react";
import { useContext } from "react";

export default function Auth({ name }: { name: string }) {
  const { authDialog, handleValue, value, register, login } =
    useContext(AuthContext);
  return (
    <div
      className={styles["auth-window"]}
      style={{
        display: authDialog.display,
      }}
    >
      <button className={styles.quit} onClick={() => authDialog.close()}>
        <LogOut />
      </button>
      <div>
        <input
          type="text"
          placeholder="Nome..."
          name="username"
          value={value.username}
          onChange={(e) =>
            handleValue({ username: e.target.name, password: e.target.value })
          }
        />
        <input
          type="password"
          placeholder="Senha..."
          name="password"
          value={value.password}
          onChange={(e) =>
            handleValue({ username: e.target.name, password: e.target.value })
          }
        />
      </div>
      <button
        className={styles.auth}
        onClick={() => {
          name === "Register" ? register() : login();
        }}
      >
        {name}
      </button>
    </div>
  );
}
