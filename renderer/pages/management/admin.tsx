import { Plus, Trash } from "lucide-react";
import styles from "../../styles/pages/manager/admin.module.css";
import Auth from "../../components/auth";
import { useContext } from "react";
import { AuthContext } from "../../contexts/components/auth.context";
import { AdminContext } from "../../contexts/pages/management/admin.context";

type User = {
  name: string;
  id: string;
};


export default function Admin() {
  const { authDialog } = useContext(AuthContext);
  const { users, deleteUser } = useContext(AdminContext);
  // console.log(users);
  return (
    <section className={styles["admin-window"]}>
      <div className={styles.admin}>
        <label htmlFor="">
          Adiministradores:
        </label>
        <div>
          {users &&
            (users as User[]).map((e, y) => (
              <div key={y}>
                <span>{e.name}</span>
                <button
                  className={styles["delete-admin"]}
                  onClick={() => {
                    deleteUser(e.id);
                  }}
                >
                  <Trash />
                </button>
              </div>
            ))}
          <div>
            <button
              className={styles["add-admin"]}
              onClick={() => authDialog.open()}
            >
              <Plus />
            </button>
          </div>
        </div>
      </div>
      <Auth name="Register" />
    </section>
  );
}
