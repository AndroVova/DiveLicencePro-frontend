import {
  deleteClub,
  getClubs,
  handleInputChange,
  updateClub,
} from "./club.response";
import { getSortIcon, sortList } from "../list.sort";
import { useEffect, useState } from "react";

import { ButtonBox } from "../../utils/ButtonBox/ButtonBox";
import { ModalClubForm } from "../../utils/ModalClubForm/ModalClubForm";
import styles from "../list.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const createClubBtn = {
  style: {
    width: "220px",
    fontSize: "28px",
  },
};

export const ClubList = () => {
  const { tokenValue } = useSelector((s) => s.auth);
  const [clubs, setClubs] = useState([]);
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState("");

  const [selectedClub, setSelectedClub] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const clubsData = await getClubs(tokenValue);
      setClubs(clubsData);
    };

    fetchData();
  }, []);

  const handleSubmit = async () => {
    await updateClub(selectedClub, tokenValue);
    setModalOpen(false);
  };

  const handleNameChange = (e) => {
    handleInputChange(e, "name", setSelectedClub);
  };

  const handleAddressChange = (e) => {
    handleInputChange(e, "address", setSelectedClub);
  };

  const handleCityChange = (e) => {
    handleInputChange(e, "city", setSelectedClub);
  };

  const handleCountryChange = (e) => {
    handleInputChange(e, "country", setSelectedClub);
  };

  const handleCreateClub = () => {
    navigate("../clubs/create", { replace: true });
  };

  const handleUpdateClub = (club) => {
    setSelectedClub(club);
    setModalOpen(true);
  };

  const handleDeleteClub = async (club) => {
    deleteClub(club, tokenValue);
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "ASC" ? "DESC" : "ASC");
    } else {
      setSortColumn(column);
      setSortDirection("ASC");
    }
  };

  const sortedClubs = sortList(clubs, sortColumn, sortDirection);

  return (
    <div className={styles.container}>
      <h2>{t("clubs")}</h2>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
        <tr>
            <th onClick={() => handleSort("id")}>
              {t("id")}
              {getSortIcon("id", sortColumn, sortDirection)}
            </th>
            <th onClick={() => handleSort("name")}>
              {t("name")}
              {getSortIcon("name", sortColumn, sortDirection)}
            </th>
            <th onClick={() => handleSort("country")}>
              {t("country")}
              {getSortIcon("country", sortColumn, sortDirection)}
            </th>
            <th onClick={() => handleSort("city")}>
              {t("city")}
              {getSortIcon("city", sortColumn, sortDirection)}
            </th>
            <th onClick={() => handleSort("address")}>
              {t("address")}
              {getSortIcon("address", sortColumn, sortDirection)}
            </th>
            <th>{t("update")}</th>
            <th>{t("delete")}</th>
          </tr>
        </thead>
        <tbody>
          {sortedClubs.map((c) => (
            <tr key={"w-" + c.id}>
              <td>{c.id}</td>
              <td>{c.name}</td>
              <td>{c.country}</td>
              <td>{c.city}</td>
              <td>{c.address}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => handleUpdateClub(c)}
                >
                  {t("update")}
                </button>
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteClub(c)}
                >
                  {t("delete")}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ButtonBox
        text={t("create_club")}
        settings={{
          ...createClubBtn,
          onClick: handleCreateClub,
        }}
      />
      <ModalClubForm
        isOpen={isModalOpen}
        closeModal={() => setModalOpen(false)}
        handleSubmit={handleSubmit}
        selectedClub={selectedClub}
        handleNameChange={handleNameChange}
        handleAddressChange={handleAddressChange}
        handleCityChange={handleCityChange}
        handleCountryChange={handleCountryChange}
        styles={styles}
        t={t}
      />
    </div>
  );
};
