import { deleteRole, getRole } from "../../../services/modifyJsonData";
import { api } from "../../../utils/api";
import Cookies from "../../../utils/cookies";
import { createContext, ReactNode, useEffect, useState } from "react";
interface ManageContext {
  people?: PersonAndFunction[];
  functions?: PersonAndFunction[];
  getRoles: () => void;
  deleteRoles: (role: { name: string; id: string; value: string }) => void;
  editRoles: Roles;
}
type Roles = {
  addRole: (role: string, name: string) => void;
  removeRole: (role: string, name: string) => void;
};
type PersonAndFunction = {
  name: string;
  id: string;
};

export const ManageContext = createContext({} as ManageContext);

export default function ManageProvider({ children }: { children: ReactNode }) {
  const [people, setPeople] = useState<PersonAndFunction[]>();
  const [functions, setFunction] = useState<PersonAndFunction[]>();

  function getRoles() {
    setPeople(getRole().person);
    setFunction(getRole().function);
  }

  const editRoles = {
    addRole(role: string, name: string) {
      if (role === "function") {
        setFunction((f) => [
          ...(f as PersonAndFunction[]),
          { id: parseInt(functions?.at(-1)?.id as string) + 1 + "", name },
        ]);
      }
      if (role === "person") {
        setPeople((p) => [
          ...(p as PersonAndFunction[]),
          {
            id: parseInt(people?.at(-1)?.id as string) + 1 + "",
            name,
          },
        ]);
        // console.log(parseInt(people?.at(-1)?.id as string) + 1 + "");
      }
    },

    removeRole(role: string, id: string) {
      if (role === "function") {
        setFunction((f) => f?.filter((e) => e.id !== id));
      }
      if (role === "person") {
        setPeople((p) => p?.filter((e) => e.id !== id));
      }
    },
  };

  function deleteRoles(role: { name: string; id: string; value: string }) {
    if (role.name === "function") {
      editRoles.removeRole(role.name, role.id);
      deleteRole(role.name, role.id);
    } else {
      editRoles.removeRole(role.name, role.id);
      deleteRole(role.name, role.id);
    }
  }
  useEffect(() => {
    getRoles();
  }, []);
  return (
    <ManageContext.Provider
      value={{ people, functions, getRoles, deleteRoles, editRoles }}
    >
      {children}
    </ManageContext.Provider>
  );
}
