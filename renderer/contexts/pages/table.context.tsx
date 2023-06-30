import { Property as CSS } from "csstype";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { api } from "../../utils/api";
import Cookies from "../../utils/cookies";
import { ConfirmContext } from "../components/confirm.context";
import { findDate } from "../../services/modifyDateData";
import { editSheet } from "../../services/modifySheetData";

interface TableContext {
  expand: Expand;

  handleValues: ({ name, value }: Data) => void;
  sendValues: () => void;
  dayList: number[];
  selectDay: (day: number) => void;
  postValues: () => void;
  mounthList: Date[];
  date?: string;
  actualDays?: number;
  getDate: () => void;
  inputList: JSX.Element[];
  addInput: (input: JSX.Element) => void;
  getDaySpan: () => string;
  manageButtons: {
    confirmButton: {
      display: CSS.Display;
    };
    loadingButton: {
      transform: CSS.Display;
    };
    confirm: () => void;
    end: () => void;
  };
}

type Expand = {
  clickable: CSS.PointerEvents;
  open: () => void;
  close: () => void;
};
type Data = {
  name: string;
  value: string | number[] | number;
};

type DataSet = {
  dias: number[];
  nome: string;
  function: string;
};

type obj = {
  nome: string;
  dias: number[];
};

type Date = {
  mounthNumber: string;
  mounthString: string;
  year: string;
};

export const TableContext = createContext({} as TableContext);

export default function TableProvider({ children }: { children: ReactNode }) {
  const [date, setDate] = useState<string>();
  const [inputList, setInputList] = useState<JSX.Element[]>([]);
  const [CSSPointerEvents, setCSSPointerEvents] =
    useState<CSS.PointerEvents>("none");
  const [confirmButtonDisplay, setconfirmButtonDisplay] =
    useState<CSS.Display>("flex");
  const [loadingButtonTransform, setLoadingButtonTransform] =
    useState<CSS.Transform>("scale(0)");
  const [loadingButtonDisplay, setLoadingButtonDisplay] =
    useState<CSS.Display>("none");

  const { value } = useContext(ConfirmContext);
  const year = new Date().getFullYear();
  const mounth = new Date().getMonth() + 1;

  function toStringMonth(mounth: number) {
    // console.log(mounth);
    return new Date(
      `${year}-${(mounth + 1 === 13 ? 1 : mounth + 1)
        .toString()
        .padStart(2, "0")}`
    )
      .toLocaleDateString("pt-BR", { month: "short" })
      .split(".")[0];
  }

  let mounthList = [];

  for (let i = mounth; i <= 12; i++) {
    mounthList.push({
      mounthNumber: i.toString().padStart(2, "0"),
      mounthString: toStringMonth(i),
      year: year.toString(),
    });
  }

  const [actualDays, setActualDays] = useState<number>();
  const actualYear = parseInt(date?.split(",")[2]);
  const actualMonth =
    parseInt(date?.split(",")[0] as string) + 1 === 13
      ? 1
      : parseInt(date?.split(",")[0] as string) + 1;

  function getDate() {
    setDate(findDate());

    setActualDays(
      new Date(
        actualYear + "-" + actualMonth.toString().padStart(2, "0")
      ).getDate()
    );
  }

  function getDaySpan() {
    // console.log(value);
    const semDay = new Date(`${date?.split(",")[0]}-01-${date?.split(",")[2]}`)
      .toLocaleDateString("pt-BR", { weekday: "short" })
      .split(".")[0];

    switch (semDay) {
      case "dom":
        return "1";
      case "seg":
        return "2";
      case "ter":
        return "3";
      case "qua":
        return "4";
      case "qui":
        return "5";
      case "sex":
        return "6";
      case "sáb":
        return "7";
      default:
        return "1";
    }
  }

  useEffect(() => {
    getDate();
  });

  const values: obj = {
    nome: "",
    dias: [],
  };

  class Expand {
    public clickable = CSSPointerEvents;

    open() {
      setCSSPointerEvents("auto");
    }
    close() {
      setCSSPointerEvents("none");
    }
  }

  const expand = new Expand();

  function handleValues({ name, value }: Data) {
    (values[name as keyof typeof values] as string) = value as string;
  }

  const days: number[] = [];
  const dayList: number[] = [];

  function selectDay(day: number) {
    if (!dayList.includes(day)) {
      days.push(day);
      dayList.push(day);

      values["dias"] = [...days];
    } else {
      const index1 = dayList.indexOf(day);
      if (index1 > -1) {
        dayList.splice(index1, 1);
      }

      const index2 = days.indexOf(day);
      if (index2 > -1) {
        days.splice(index2, 1);
      }

      values["dias"] = [...days];
    }
  }

  const dataList: object[] = [];

  const manageButtons = {
    confirmButton: {
      display: confirmButtonDisplay,
    },
    loadingButton: {
      transform: loadingButtonTransform,
    },

    confirm() {
      setconfirmButtonDisplay("none");
      setLoadingButtonTransform("scale(1)");
    },
    end() {
      setLoadingButtonTransform("scale(0)");
      // setLoadingButtonDisplay("none");
      // console.log("end");
    },
  };
  // function manageButtons() {}

  function sendValues() {
    dataList.push({ ...values });
    days.length = 0;
  }

  function postValues() {
    // console.log("postvalues");
    // console.log("------------");

    const dataSet = dataList
      .map((dias) =>
        (dias as DataSet).dias.map((dia) => ({
          day: dia,
          name: (dias as DataSet).nome,
          function: (dias as DataSet).function,
        }))
      )
      .flatMap((e) => e)
      .sort((a, b) => a.day - b.day);

    editSheet(dataSet);
    console.log(dataSet);
    // fetch(
    //   api.auth("") +
    //     "?" +
    //     new URLSearchParams({
    //       tokenid: new Cookies().get("tokenid") + "",
    //     })
    // ).then((e) => {
    //   if (e.status >= 400) {
    //     e.json().then((e) => {
    //       console.log(e);
    //     });
    //     new Cookies().remove("tokenid");
    //     return;
    //   }

    //   fetch(api.manage("sheet"), {
    //     method: "delete",
    //     headers: {
    //       "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    //     },
    //   }).then((e) => {
    //     console.log(e);

    //     dataSet.map((element, index) => {
    //       setTimeout(() => {
    //         fetch(api.manage("sheet"), {
    //           method: "post",
    //           body: `day=${element.dia}&personName=${element.nome}&functionName=${element.function}`,
    //           headers: {
    //             "Content-Type":
    //               "application/x-www-form-urlencoded;charset=UTF-8",
    //           },
    //         }).then((e) =>
    //           e.json().then((e) => {
    //             // console.log(e);
    //             // console.log(element.dia);
    //             if (index === dataSet.length - 1) {
    //               manageButtons.end();
    //             }
    //           })
    //         );
    //       }, 50 * index);
    //     });
    //   });
    // });
  }

  function addInput(input: JSX.Element) {
    setInputList((eachInput) => [...eachInput, input]);
  }

  return (
    <TableContext.Provider
      value={{
        handleValues,
        sendValues,
        selectDay,
        expand,
        dayList,
        mounthList,
        postValues,
        date,
        actualDays,
        getDate,
        inputList,
        addInput,
        getDaySpan,
        manageButtons,
      }}
    >
      {children}
    </TableContext.Provider>
  );
}
