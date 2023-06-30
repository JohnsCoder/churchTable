import { SheetsContext } from "../contexts/components/sheets.context";
import { TableContext } from "../contexts/pages/table.context";
import styles from "../styles/components/sheets.module.css";
import { Download } from "lucide-react";

import { useContext } from "react";

export default function Sheets() {
  const { date } = useContext(TableContext);
  const { sheets, handleDownload } = useContext(SheetsContext);
  {
    return (
      <>
        <table className={styles.sheets} cellSpacing={0}>
          <tbody>
            <tr style={{ background: "#bdd6eb" }}>
              <th colSpan={3}>
                {date?.split(",")[1] + "/" + date?.split(",")[2]}
              </th>
              <th colSpan={2}>Mesce</th>
            </tr>
            <tr>
              <th colSpan={2} style={{ background: "#bdd6eb" }}>
                Dia
              </th>
              {/* <th style={{ background: "#bdd6eb" }}>Hora</th> */}
              <th style={{ background: "#bdd6eb" }}>Atividade</th>
              <th style={{ background: "#bdd6eb" }}>Viatico 1</th>
              <th style={{ background: "#bdd6eb" }}>Viatico 2</th>
            </tr>
            {sheets &&
              sheets.map((e, y) => (
                <tr key={y}>
                  <th>{e.day.toString().padStart(2, "0")}</th>
                  <th>
                    {
                      new Date(
                        `${date?.split(",")[0]}-${e.day
                          .toString()
                          .padStart(2, "0")}-${date?.split(",")[2]}`
                      )
                        .toLocaleDateString("pt-BR", { weekday: "short" })
                        .split(".")[0]
                    }
                  </th>
                  <th
                    style={{
                      background: e["function"] === "--" ? "#ec9198ba" : "none",
                    }}
                  >
                    {e["function"]}
                  </th>
                  <th
                    colSpan={2}
                    style={{
                      background: e["name"] === "--" ? "#ec9198ba" : "none",
                    }}
                  >
                    {e["name"]}
                  </th>
                </tr>
              ))}
          </tbody>
        </table>
        <button
          className={styles["download-sheet"]}
          onClick={() => handleDownload()}
        >
          <Download />
        </button>
      </>
    );
  }
}
