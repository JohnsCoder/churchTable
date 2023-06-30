import { Check, X } from "lucide-react";
import styles from "../styles/components/dialog.module.css";
import { useContext } from "react";
import { DialogContext } from "../contexts/components/dialog.context";

export default function CreateDialog() {
  const { createDialog, handleValue, sendValue, value } =
    useContext(DialogContext);

  return (
    <div
      className={styles["dialog-window"]}
      style={{
        display: createDialog.display,
      }}
    >
      <div>
        <label htmlFor="">
          Nome:
        </label>
        <input
          type="text"
          placeholder="Nome..."
          onChange={(e) => handleValue(e.target.value)}
          value={value}
        />
      </div>

      <div>
        <button
          className={styles["confirm-button"]}
          onClick={() => {
            createDialog.close();
            sendValue();
          }}
        >
          <Check />
        </button>
        <button
          className={styles["cancel-button"]}
          onClick={() => {
            createDialog.close();
          }}
        >
          <X />
        </button>
      </div>
    </div>
  );
}