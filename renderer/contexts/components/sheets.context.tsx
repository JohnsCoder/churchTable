import {
  createContext,
  MutableRefObject,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Property as CSS } from "csstype";
import { ManageContext } from "../pages/management/manage.context";
import { api } from "../../utils/api";
import Cookies from "../../utils/cookies";
import html2canvas from "html2canvas";
import { findSheet } from "../../services/modifySheetData";
interface SheetsContext {
  sheets: Sheets[];
  handleDownload: () => void;
  printRef: MutableRefObject<undefined>;
}

type Sheets = {
  day: number;
  hour: string;
  personName: string;
  functionName: string;
};

export const SheetsContext = createContext({} as SheetsContext);

export default function SheetsProvider({ children }: { children: ReactNode }) {
  const [sheets, setSheets] = useState<Sheets[]>([]);

  useEffect(() => {
    setSheets(findSheet());
  }, []);

  const printRef = useRef();

  async function handleDownload() {
    const element = printRef.current;
    const canvas = await html2canvas(element as any);

    const data = canvas.toDataURL("image/jpg");
    const link = document.createElement("a");

    if (typeof link.download === "string") {
      link.href = data;
      link.download = "tabela.jpg";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(data);
    }
  }

  return (
    <SheetsContext.Provider
      value={{
        sheets,
        handleDownload,
        printRef,
      }}
    >
      {children}
    </SheetsContext.Provider>
  );
}
