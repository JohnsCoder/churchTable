import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Property as CSS } from "csstype";
import { ManageContext } from "../pages/management/manage.context";
import { api } from "../../utils/api";
import Cookies from "../../utils/cookies";
import { TableContext } from "../pages/table.context";
import { editDate } from "../../services/modifyDateData";
import { deleteSheet } from "../../services/modifySheetData";
interface ConfirmContext {
  confirmDialog: Display;
  handleValue: (element: string) => void;
  chageDate: () => void;
  value: string[];
  // getDaySpan: () => string;
}

type Display = {
  display: CSS.Display;
  open: () => void;
  close: () => void;
};

export const ConfirmContext = createContext({} as ConfirmContext);

export default function ConfirmProvider({ children }: { children: ReactNode }) {
  const [value, setValue] = useState<string[]>([]);
  const [props, setProps] = useState<string>();
  const [CSSDisplay, setCSSDisplay] = useState<CSS.Display>("none");

  const { getDate } = useContext(TableContext);

  class Display {
    public display = CSSDisplay;

    open() {
      setCSSDisplay("flex");
    }
    close() {
      setCSSDisplay("none");
    }
  }
  const confirmDialog = new Display();

  function handleValue(element: string) {
    console.log("chamou - handleValue");
    console.log(element);
    if (element === "vazio") {
      setValue([element]);
      return;
    }
    setValue(element.split(","));
    console.log(value);
  }

  function chageDate() {
    editDate(value);
    getDate();
    deleteSheet();
  }

  return (
    <ConfirmContext.Provider
      value={{
        confirmDialog,
        handleValue,
        value,
        chageDate,
        // getDaySpan,
      }}
    >
      {children}
    </ConfirmContext.Provider>
  );
}
