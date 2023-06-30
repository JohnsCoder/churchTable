import { api } from "../../../utils/api";
import Cookies from "../../../utils/cookies";
import { useRouter } from "next/router";
import { createContext, ReactNode, useEffect, useState } from "react";
interface AdminContext {
  getUsers: () => void;
  users?: User[];
  deleteUser: (id: string) => void;
}

type User = {
  name: string;
  id: string;
};

export const AdminContext = createContext({} as AdminContext);

export default function AdminProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[]>();
  const router = useRouter();
  function getUsers() {
    fetch(
      api.auth("") +
        "?" +
        new URLSearchParams({
          tokenid: new Cookies().get("tokenid") + "",
        })
    ).then((e) => {
      if (e.status >= 400) {
        e.json().then((e) => {
          // console.log(e);
          router.push("/");
        });
        new Cookies().remove("tokenid");
        return;
      }

      fetch(api.manage("admin")).then(async (e) =>
        setUsers((await e.json()) as User[])
      );
    });
  }

  function deleteUser(id: string) {
    fetch(
      api.auth("") +
        "?" +
        new URLSearchParams({
          tokenid: new Cookies().get("tokenid") + "",
        })
    ).then((e) => {
      if (e.status >= 400) {
        e.json().then((e) => {
          // console.log(e);
        });
        new Cookies().remove("tokenid");
        return;
      }

      fetch(api.manage("admin"), {
        method: "delete",
        body: `id=${id}`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
      }).then((e) =>
        e.json().then((e) => {
          // console.log(e);

          getUsers();
        })
      );
    });
  }

  useEffect(() => {
    // getUsers();
  }, []);

  return (
    <AdminContext.Provider value={{ getUsers, users, deleteUser }}>
      {children}
    </AdminContext.Provider>
  );
}
