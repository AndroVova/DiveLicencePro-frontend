import { btnSize, inputSize } from "../../utils/ui.utils";
import { useEffect, useState } from "react";

import { ButtonBox } from "../utils/ButtonBox/ButtonBox";
import { Container } from "../layout/Container/Container";
import InputBox from "../utils/InputBox/InputBox";
import { Link } from "react-router-dom";
import { getUsers } from "../users/UsersList/user.response";
import styles from "./user.sign.up.module.css";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

export const CreateLessonForm = () => {
  const { t } = useTranslation();

  const { tokenValue } = useSelector((s) => s.auth);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getUsers(tokenValue);
        setUsers(usersData);
      } catch (error) {
        console.error("Error while getting users:", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <Container width={"700px"}>
      <Link to={"../lessons"} replace={true}>
        {t("back")}
      </Link>
      <h2>{t("create_lesson")}</h2>
      <div className={styles.box}>
        <InputBox
          labelText={t("name")}
          inputParam={{ ...inputSize, minLength: 3, required: true }}
          name={"name"}
        />
        <InputBox
          labelText={t("task")}
          inputParam={{ ...inputSize, minLength: 3, required: true }}
          name={"task"}
        />
        <InputBox
          labelText={t("date")}
          type={"datetime-local"}
          inputParam={{ ...inputSize, required: true }}
          name={"date"}
        />
        <InputBox
          labelText={t("duration")}
          inputParam={{ ...inputSize, minLength: 3, required: true }}
          name={"duration"}
        />
        {/* <InputBox labelText={t('user')} inputParam={({...inputSize, required: true})} name={'user'}/> */}
        <div className={styles.inputBox}>
        <label>{t("users")}</label>
          <select required={true} name={"user"}>
            
            {users.map((user) => (
              <option
                className="form-control"
                required={true}
                name={"user"}
                key={user.id}
                value={user.id}
              >
                {user.id} - {user.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <ButtonBox settings={btnSize} text={t("submit")} />
    </Container>
  );
};
