import { api } from "../utils/api";
import Cookies from "../utils/cookies";
import { useRouter } from "next/router";
import { createContext, ReactNode, useEffect } from "react";
interface RedirectContext {}

export const RedirectContext = createContext({} as RedirectContext);

export default function RedirectProvider({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    function getUsers() {
      fetch(
        api.auth("") +
          "?" +
          new URLSearchParams({
            tokenid: new Cookies().get("tokenid") + "",
          })
      ).then((e) => {
          // console.log(e)
      })
      .catch((e) => {



          // console.log(e)
     //       console.log(e.status)
     //    if (e.status >= 400) {
     //      e.json().then((e) => {
     //           router.push("/");
     //        console.log(e);
     //        new Cookies().remove("tokenid");
     //      });
     //    }
      });
    }
  }, []);

  return (
    <RedirectContext.Provider value={{}}>{children}</RedirectContext.Provider>
  );
}
