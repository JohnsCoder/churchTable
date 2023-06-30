import { createContext, ReactNode, useState } from "react";
import { api } from "../../../utils/api";
import Cookies from "../../../utils/cookies";

interface SettingsContex {
  importData: (file: any) => void;
  exportData: () => void;
}

type Data = {
  people: {
    id: number;
    name: string;
  }[];

  function: {
    id: number;
    name: number;
  }[];
  sheet: {
    id: string;
    day: number;
    personName: string;
    functionName: string;
  }[];

  date: {
    mounthNumber: string;
    mounthString: string;
    year: string;
  };
};

export const SettingsContex = createContext({} as SettingsContex);

export default function SettingsProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [uploadData] = useState<object>();

  async function exportData() {
    const peoples = fetch(api.manage("person")).then(
      async (e) => await e.json()
    );
    const functions = fetch(api.manage("function")).then(
      async (e) => await e.json()
    );

    const sheet = fetch(api.manage("sheet")).then(async (e) => await e.json());

    const date = fetch(api.manage("date")).then(async (e) => await e.json());

    const data =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(
        JSON.stringify({
          people: await peoples,
          function: await functions,
          sheet: await sheet,
          date: (await date)[0],
        })
      );

    const link = document.createElement("a");
    link.href = data;
    link.setAttribute("download", `data.json`);
    document.body.appendChild(link);
    link.click();
    link.parentNode?.removeChild(link);
  }

  function importData(file: any) {
    const reader = new FileReader();
    reader.onload = () => {
      const data: Data = JSON.parse(reader.result as string);
      console.log(data);

      fetch(
        api.auth("") +
          "?" +
          new URLSearchParams({
            tokenid: new Cookies().get("tokenid") + "",
          })
      ).then((e) => {
        if (e.status >= 400) {
          e.json().then(() => {
            // console.log(e);
          });
          new Cookies().remove("tokenid");
          return;
        }


        const chain = new Promise((link) => {
          link(() => {});
        });

        chain
          .then(() => {
            data.people.map((e, y) => {
              // setTimeout(() => {
                fetch(api.manage("person"), {
                  method: "post",
                  body: `name=${e.name}`,
                  headers: {
                    "Content-Type":
                      "application/x-www-form-urlencoded;charset=UTF-8",
                  },
                }).then((e) =>
                  e.json().then(() => {
                    console.log(e);
                  })
                );
              // }, 1000 * y);
            });
          })
          .then(() => {
            data.function.map((e, y) => {
              // setTimeout(() => {
                fetch(api.manage("function"), {
                  method: "post",
                  body: `name=${e.name}`,
                  headers: {
                    "Content-Type":
                      "application/x-www-form-urlencoded;charset=UTF-8",
                  },
                }).then((e) =>
                  e.json().then(() => {
                    console.log(e);
                  })
                );
              // }, 1000 * y);
            });
          })
          .then(() => {
            data.sheet.map((e, y) => {
              // setTimeout(() => {
                fetch(api.manage("sheet"), {
                  method: "post",
                  body: `day=${e.day}&personName=${e.personName}&functionName=${e.functionName}`,
                  headers: {
                    "Content-Type":
                      "application/x-www-form-urlencoded;charset=UTF-8",
                  },
                }).then((e) =>
                  e.json().then(() => {
                    console.log(e);
                  })
                );
              // }, 1000 * y);
            });
          })
          .then(() => {
            fetch(api.manage("date"), {
              method: "post",
              body: `mounthNumber=${data.date.mounthNumber}&mounthString=${data.date.mounthString}&year=${data.date.year}`,
              headers: {
                "Content-Type":
                  "application/x-www-form-urlencoded;charset=UTF-8",
              },
            }).then((e) =>
              e.json().then((e) => {
                console.log(e);
              })
            );
          });
      });
    };
    reader.readAsText(file);

    // reader.onload

    console.log(uploadData);
  }

  return (
    <SettingsContex.Provider value={{ importData, exportData }}>
      {children}
    </SettingsContex.Provider>
  );
}
