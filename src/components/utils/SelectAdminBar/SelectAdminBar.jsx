import styles from "./select.leng.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const SelectAdminBar = () => {
  const [option, setOption] = useState("default");
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleChange = async ({ target: { value } }) => {
    setOption(value);

    switch (value) {
      case "admin":
        navigate("/admin");
        break;
      case "users":
        navigate("/users");
        break;
      case "dive_clubs":
        navigate("/clubs");
        break;
      case "certificates":
        navigate("/certificates");
        break;
      case "sensors":
        navigate("/sensors");
        break;
      default:
        navigate("/admin");
        break;
    }
  };

  return (
    <select value={option} onChange={handleChange} className={styles.box}>
      <option value={"admin"}>{t("admin")}</option>
      <option value={"users"}>{t("users")}</option>
      <option value={"dive_clubs"}>{t("clubs")}</option>
      <option value={"certificates"}>{t("certs")}</option>
      <option value={"sensors"}>{t("sensors")}</option>
    </select>
  );
};
