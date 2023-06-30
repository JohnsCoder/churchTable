import { createContext, ReactNode, useContext, useState } from "react";
import { Property as CSS } from "csstype";
import { api } from "../../utils/api";
import Cookies from "../../utils/cookies";
import { AdminContext } from "../pages/management/admin.context";
import { Router, useRouter } from "next/router";

interface AuthContext {
  authDialog: Display;
  handleValue: ({ username, password }: User) => void;
  value: User;
  register: () => void;
  login: () => void;
  verifyLogin: () => void;
}

type User = {
  username: string;
  password: string;
};
type Display = {
  display: CSS.Display;
  open: () => void;
  close: () => void;
};

export const AuthContext = createContext({} as AuthContext);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [value, setValue] = useState<User>({ username: "", password: "" });
  const [CSSDisplay, setCSSDisplay] = useState<CSS.Display>("none");
  const { getUsers } = useContext(AdminContext);

  const router = useRouter();
  class Display {
    public display = CSSDisplay;

    open() {
      setCSSDisplay("flex");
    }
    close() {
      setCSSDisplay("none");
    }
  }

  function handleValue({ username, password }: User) {
    setValue((value) => ({
      ...value,
      [username]: password,
    }));
    // console.log(value);
  }

  function register() {
    fetch(api.auth("user"), {
      method: "post",
      body: `username=${value.username}&password=${value.password}`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
    }).then((e) =>
      e.json().then((e) => {
        // console.log(e);
        getUsers();
        setValue({ username: "", password: "" });
        authDialog.close();
      })
    );
  }

  function login() {
    fetch(
      api.auth("user") +
        "?" +
        new URLSearchParams({
          username: value.username,
          password: value.password,
        })
    ).then((e) =>
      e.json().then((e) => {
        // console.log(e);
        authDialog.close();
        setValue({ username: "", password: "" });
        new Cookies().add({
          key: "tokenid",
          value: e.payload.tokenid,
          hourExp: 24,
          place: "/",
        });
        router.push("/management/table");
      })
    );
  }

  function verifyLogin() {
    router.push("/management/table");
  }

  const authDialog = new Display();

  return (
    <AuthContext.Provider
      value={{ handleValue, authDialog, value, register, login, verifyLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
}
