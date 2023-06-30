import { ConfirmContext } from "../contexts/components/confirm.context";
import styles from "../styles/components/confirm.module.css";
import { useContext } from "react";

export default function ConfirmDialog() {
  const { confirmDialog, chageDate } = useContext(ConfirmContext);
  return (
    <div
      className={styles["confirm-window"]}
      style={{ display: confirmDialog.display }}
    >
      <p> Ao mudar a data você apagara todos tados da tabela!</p>

      <div>
        <button
          onClick={() => {
            confirmDialog.close();
          }}
        >
          Cancelar
        </button>
        <button
          onClick={() => {
            chageDate();
            confirmDialog.close();
          }}
        >
          Confirmar
        </button>
      </div>
    </div>
  );
}
