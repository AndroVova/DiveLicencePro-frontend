import { getData, handleSelectInputChange, putCertificate } from "./certificate.response";
import { getSortIcon, sortList } from "../list.sort";
import { useEffect, useState } from "react";

import { ButtonBox } from "../../utils/ButtonBox/ButtonBox";
import { ModalCertificateForm } from "../../utils/ModalCertificateForm/ModalCertificateForm";
import axios from "axios";
import styles from "../list.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const createCertsBtn = {
  style: {
    width: "220px",
    fontSize: "28px",
  },
};

export const CertificatesList = () => {
  const { tokenValue } = useSelector((s) => s.auth);
  const [certs, setCerts] = useState([]);
  const [users, setUsers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [selectedCert, setSelectedCert] = useState(null);

  const [isModalOpen, setModalOpen] = useState(false);
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState("");


  useEffect(() => {
    const start = async () => {
      const result  = await getData(tokenValue)

      setCerts(result.certificates);
      setUsers(result.users);
      setAdmins(result.admins);
    };

    start();
  }, []);

  const handleSubmit = async () => {
    await putCertificate(selectedCert, tokenValue)
    setModalOpen(false)
    
  };

  const handleUserChange = (e) => {
    handleSelectInputChange(e,"customUser", setSelectedCert)
  };

  const handleInstructorChange = (e) => {
    handleSelectInputChange(e,"instructor", setSelectedCert)
  };

  const handleCreateClub = () => {
    navigate("../certificates/create", { replace: true });
  };

  const handleUpdateCert = (cert) => {
    setSelectedCert(cert);
    setModalOpen(true);
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "ASC" ? "DESC" : "ASC");
    } else {
      setSortColumn(column);
      setSortDirection("ASC");
    }
  };

  const sortedCertificates = sortList(certs, sortColumn, sortDirection);


  return (
    <div className={styles.container}>
      <h2>{t("certificates")}</h2>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
        <tr>
            <th onClick={() => handleSort("id")}>
              {t("id")}
              {getSortIcon("id", sortColumn, sortDirection)}
            </th>
            <th onClick={() => handleSort("date")}>
              {t("date")}
              {getSortIcon("date", sortColumn, sortDirection)}
            </th>
            <th onClick={() => handleSort("name")}>
              {t("name")}
              {getSortIcon("name", sortColumn, sortDirection)}
            </th>
            <th onClick={() => handleSort("maxDepth")}>
              {t("max_depth")}
              {getSortIcon("maxDepth", sortColumn, sortDirection)}
            </th>
            <th onClick={() => handleSort("isCompleted")}>
              {t("completion")}
              {getSortIcon("isCompleted", sortColumn, sortDirection)}
            </th>
            <th onClick={() => handleSort("numberOfSuccessfulLessonsToGet")}>
              {t("number_of_successful_lessons_to_get")}
              {getSortIcon("numberOfSuccessfulLessonsToGet", sortColumn, sortDirection)}
            </th>
            <th onClick={() => handleSort("customUser.id")}>
              {t("user")}
              {getSortIcon("customUser.id", sortColumn, sortDirection)}
            </th>
            <th onClick={() => handleSort("instructor.id")}>
              {t("instructor")}
              {getSortIcon("instructor.id", sortColumn, sortDirection)}
            </th>
            <th>{t("update")}</th>
          </tr>
        </thead>
        <tbody>
          {sortedCertificates.map((c) => (
            <tr key={"w-" + c.id}>
              <td>{c.id}</td>
              <td>{c.date}</td>
              <td>{c.name}</td>
              <td>{c.maxDepth}</td>
              <td>{c.isCompleted ? t("complete") : t("not_completed")}</td>
              <td>{c.numberOfSuccessfulLessonsToGet}</td>
              <td>{c.customUser !== null ? c.customUser.id : null}</td>
              <td>{c.instructor !== null ? c.instructor.id : null}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => handleUpdateCert(c)}
                >
                  {t("update")}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ButtonBox
        text={t("create_cert")}
        settings={{
          ...createCertsBtn,
          onClick: handleCreateClub,
        }}
      />

      <ModalCertificateForm
        isOpen={isModalOpen}
        closeModal={() => setModalOpen(false)}
        handleSubmit={handleSubmit}
        selectedCert={selectedCert}
        handleUserChange={handleUserChange}
        handleInstructorChange={handleInstructorChange}
        styles={styles}
        users={users}
        admins={admins}
        t={t}
      />
    </div>
  );
};
