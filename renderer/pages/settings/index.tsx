import { FileUp, FileDown } from "lucide-react";
import styles from "../styles/pages/settings/settings.module.css";
import { useContext } from "react";
import { SettingsContex } from "../contexts/pages/settings/settings.context";

export default function Settings() {
  const { importData, exportData } = useContext(SettingsContex);
  return (
    <section className={styles["settings-window"]}>
      <div>
        <label
          htmlFor={styles["json-file"]}
          className={styles.import}
          onClick={() => {}}
        >
          <FileUp />
          <input
            style={{ display: "none" }}
            type="file"
            onChange={(e) => importData((e.target.files as any)[0])}
            placeholder="ola"
            className={styles["json-file"]}
          />
        </label>
        <button
          className={styles.export}
          onClick={() => {
            exportData();
          }}
        >
          <FileDown />
        </button>
      </div>
    </section>
  );
}
