import { Plus, Trash } from "lucide-react";
import styles from "../../styles/pages/manager/manage.module.css";
import CreateDialog from "../../components/dialog";
import { useContext } from "react";
import { DialogContext } from "../../contexts/components/dialog.context";
import { ManageContext } from "../../contexts/pages/management/manage.context";

type Person = {
  name: string;
  id: string;
};

export default function Manage() {
  const { createDialog, getProps } = useContext(DialogContext);
  const { people, functions, deleteRoles } = useContext(ManageContext);

  return (
    <section className={styles["pf-window"]}>
      <div className={styles.people}>
        <label htmlFor="">Ministros:</label>
        <div>
          {people &&
            (people as Person[]).map((e, y) => (
              <div key={y}>
                <span>{e.name}</span>
                <button
                  className={styles["delete-person"]}
                  name="person"
                  onClick={(element) =>
                    deleteRoles({
                      name: element.currentTarget.name,
                      id: e.id,
                      value: e.name,
                    })
                  }
                >
                  <Trash />
                </button>
              </div>
            ))}
          <div>
            <button
              name="person"
              className={styles["add-person"]}
              onClick={(e) => {
                createDialog.open();
                getProps(e.currentTarget.name);
              }}
            >
              <Plus />
            </button>
          </div>
        </div>
      </div>

      <div className={styles.functions}>
        <label htmlFor="">Funções:</label>
        <div>
          {functions &&
            (functions as Person[]).map((e, y) => (
              <div key={y}>
                <span>{e.name}</span>
                <button
                  className={styles["delete-function"]}
                  name="function"
                  onClick={(element) =>
                    deleteRoles({
                      name: element.currentTarget.name,
                      id: e.id,
                      value: element.currentTarget.textContent as string,
                    })
                  }
                >
                  <Trash />
                </button>
              </div>
            ))}
          <div>
            <button
              className={styles["add-function"]}
              name="function"
              onClick={(e) => {
                createDialog.open();
                getProps(e.currentTarget.name);
              }}
            >
              <Plus />
            </button>
          </div>
        </div>
      </div>
      <CreateDialog />
    </section>
  );
}
