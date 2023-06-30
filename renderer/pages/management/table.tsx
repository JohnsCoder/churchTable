import { Plus, X, Check } from "lucide-react";
import styles from "../../styles/pages/manager/table.module.css";
import { useContext, useEffect, useState } from "react";
import { TableContext } from "../../contexts/pages/table.context";
import { ManageContext } from "../../contexts/pages/management/manage.context";
import { ConfirmContext } from "../../contexts/components/confirm.context";
import ConfirmDialog from "../../components/confirm";
import Image from "next/image";
import loading from "../../assets/loading.svg";
function RenderDays() {
  const { expand, dayList, selectDay, actualDays, getDaySpan } =
    useContext(TableContext);
  return (
    <>
      <span key="100" className={styles["sem-day"]}>
        D
      </span>
      <span key="200" className={styles["sem-day"]}>
        S
      </span>
      <span key="300" className={styles["sem-day"]}>
        T
      </span>
      <span key="400" className={styles["sem-day"]}>
        Q
      </span>
      <span key="500" className={styles["sem-day"]}>
        Q
      </span>
      <span key="600" className={styles["sem-day"]}>
        S
      </span>
      <span key="700" className={styles["sem-day"]}>
        S
      </span>
      {actualDays &&
        Array.from({ length: actualDays as number }, (_, i) => i + 1).map(
          (value) => {
            return (
              <span
                className={styles["button-add-day"]}
                style={{
                  background: dayList.includes(value)
                    ? "grey"
                    : "rgb(204, 204, 204)",
                  pointerEvents: dayList.includes(value)
                    ? "none"
                    : expand.clickable,
                  gridColumn: value === 1 ? getDaySpan() : "",
                }}
                key={value}
                onClick={(element) => {
                  element.stopPropagation();
                  selectDay(value);

                  element.currentTarget.style.background =
                    element.currentTarget.style.background ===
                    "rgb(204, 204, 204)"
                      ? "rgb(96, 146, 166)"
                      : "rgb(204, 204, 204)";
                }}
              >
                {value}
              </span>
            );
          }
        )}
    </>
  );
}

function RenderInputs() {
  const { people, functions } = useContext(ManageContext);
  const { expand, handleValues } = useContext(TableContext);
  return (
    <div className={styles["add-day"]}>
      <label htmlFor="">Nome:</label>
      <select
        name="nome"
        defaultValue={""}
        onChange={(e) =>
          handleValues({ name: e.target.name, value: e.target.value })
        }
      >
        <option value="" style={{ display: "none" }}></option>
        <option value="--">vazio</option>
        {people &&
          people.map((e) => (
            <option value={e.name} key={e.id}>
              {e.name}
            </option>
          ))}
      </select>
      <label htmlFor="">Função:</label>
      <select
        name="function"
        id=""
        defaultValue={""}
        onChange={(e) =>
          handleValues({ name: e.target.name, value: e.target.value })
        }
      >
        <option value="" style={{ display: "none" }}></option>
        <option value="--">vazio</option>

        {functions &&
          functions.map((e) => <option key={e.id}>{e.name}</option>)}
      </select>
      <label htmlFor="">Dias:</label>
      <div
        onClick={(e) => {
          e.currentTarget.style.height = "fit-content";
          e.currentTarget.style.zIndex = "1";

          [].slice.call(e.currentTarget.children).map((e: HTMLElement) => {
            return (e.style.pointerEvents =
              e.style.background === "grey" ? "none" : "auto");
          });
        }}
      >
        <RenderDays />
        <span
          className={styles.spanX}
          onClick={(e) => {
            e.stopPropagation();
            (e.currentTarget.parentElement as HTMLElement).style.height = "81%";
            (e.currentTarget.parentElement as HTMLElement).style.zIndex = "0";
            [].slice
              .call((e.currentTarget.parentElement as HTMLElement).children)
              .map((e: HTMLElement) => (e.style.pointerEvents = "none"));

            expand.close();
          }}
        >
          <X />
        </span>
      </div>
    </div>
  );
}

export default function CreateTable() {
  const [inputLength, setInputLength] = useState<number>(0);

  const {
    sendValues,
    dayList,
    postValues,
    mounthList,
    date,
    actualDays,
    manageButtons,
  } = useContext(TableContext);
  const { handleValue, confirmDialog } = useContext(ConfirmContext);
  // console.log(actualDays);
  return (
    <section className={styles["table-window"]}>
      <div className={styles["date-window"]}>
        {date && (
          <select
            name=""
            id=""
            value={date || "vazio"}
            onChange={(e) => {
              confirmDialog.open();
              handleValue(e.target.value);
            }}
          >
            <option key="5000" value="vazio" style={{ display: "none" }}>
              vazio
            </option>
            {mounthList.map((e, y) => (
              <option
                key={y}
                value={`${e.mounthNumber}, ${e.mounthString}, ${e.year}`}
              >
                {e.mounthString + "/" + e.year}
              </option>
            ))}
          </select>
        )}
      </div>
      {Number.isNaN(actualDays) ? (
        <></>
      ) : (
        new Array(inputLength)
          .fill(null)
          .map((e, y) => <RenderInputs key={y} />)
      )}

      {Number.isNaN(actualDays) ? (
        <></>
      ) : dayList.length < (actualDays as number) ? (
        // manageButtons.loadingButton.transform === "scale(0)" ?
        // (
        <button
          className={styles["add-button"]}
          onClick={() => {
            if (inputLength > 0 && dayList.length < (actualDays as number)) {
              sendValues();
            }
            if (dayList.length < (actualDays as number) && date !== "none") {
              // console.log("adding");
              setInputLength((eachInput) => eachInput + 1);
            } else {
              setInputLength(0);
            }
          }}
        >
          <Plus />
        </button>
      ) : (
        // )
        // :
        // (
        //   <button
        //     className={styles["loading-button"]}
        //     style={{
        //       transform: manageButtons.loadingButton.transform,
        //     }}
        //   >
        //     <Image priority src={loading} alt="loading" />
        //   </button>
        // )
        <button
          className={styles["confirm-button"]}
          style={{
            display: manageButtons.confirmButton.display,
          }}
          onClick={(e) => {
            sendValues();
            postValues();
            manageButtons.confirm();
          }}
        >
          <Check />
        </button>
      )}

      <ConfirmDialog />
    </section>
  );
}
