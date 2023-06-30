import { createContext, ReactNode, useContext, useState } from "react";
import { Property as CSS } from "csstype";
import { ManageContext } from "../pages/management/manage.context";
import { api } from "../../utils/api";
import Cookies from "../../utils/cookies";
import { addRole } from "../../services/modifyRoleData";
interface DialogContext {
  createDialog: Display;
  createDialogFunction: Display;
  createDialogPerson: Display;
  deleteDialogFunction: Display;
  deleteDialogPerson: Display;
  handleValue: (element: string) => void;
  sendValue: () => void;
  getProps: (e: string) => void;
  value?: string;
}

type Display = {
  display: CSS.Display;
  open: () => void;
  close: () => void;
};

export const DialogContext = createContext({} as DialogContext);

export default function DialogProvider({ children }: { children: ReactNode }) {
  const [value, setValue] = useState<string>("");
  const [props, setProps] = useState<string>();
  const [CSSDisplay, setCSSDisplay] = useState<CSS.Display>("none");

  const { editRoles } = useContext(ManageContext);

  class Display {
    public display = CSSDisplay;

    open() {
      setCSSDisplay("flex");
    }
    close() {
      setCSSDisplay("none");
    }
  }
  const createDialog = new Display();
  const createDialogFunction = new Display();
  const createDialogPerson = new Display();
  const deleteDialogFunction = new Display();
  const deleteDialogPerson = new Display();

  function getProps(e: string) {
    setProps(e);
  }
  function handleValue(element: string) {
    setValue(element);
  }

  function sendValue() {
    editRoles.addRole(props, value);
    addRole(props, value);
    setValue("");
  }
  return (
    <DialogContext.Provider
      value={{
        createDialog,
        createDialogFunction,
        createDialogPerson,
        deleteDialogFunction,
        deleteDialogPerson,
        handleValue,
        sendValue,
        getProps,
        value,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
}
