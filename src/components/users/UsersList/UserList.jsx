import "../list.module.css";

import React, { useEffect, useState } from "react";
import {
  deleteUser,
  getClubs,
  getUsers,
  handleInputChange,
  handleSelectInputChange,
  updateUser,
} from "./user.response";
import { getSortIcon, sortList } from "../list.sort";

import { ButtonBox } from "../../utils/ButtonBox/ButtonBox";
import { ModalUserForm } from "../../utils/ModalUserForm/ModalUserForm";
import styles from "../list.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const createUserBtn = {
  style: {
    width: "220px",
    fontSize: "28px",
  },
};

export const UserList = () => {
  const { tokenValue } = useSelector((s) => s.auth);
  const [users, setUsers] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [isModalOpen, setModalOpen] = useState(false);
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState("");

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "ASC" ? "DESC" : "ASC");
    } else {
      setSortColumn(column);
      setSortDirection("ASC");
    }
  };

  const sortedUsers = sortList(users, sortColumn, sortDirection);

  //////

  useEffect(() => {
    const start = async () => {
      const usersData = await getUsers(tokenValue);
      const clubsData = await getClubs(tokenValue);

      setUsers(usersData);
      setClubs(clubsData);
    };

    start();
  }, []);

  const handleSubmit = async () => {
    await updateUser(selectedUser, tokenValue);
    setModalOpen(false);
  };

  const handleNameChange = (e) => {
    handleInputChange(e, "name", setSelectedUser);
  };

  const handlePlaceChange = (e) => {
    handleInputChange(e, "placeOfResidence", setSelectedUser);
  };

  const handleClubChange = (e) => {
    handleSelectInputChange(e, "diveClub", setSelectedUser);
  };

  const handleCreateWorker = () => {
    navigate("../users/create", { replace: true });
  };

  const handleUpdateUser = (user) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const handleDeleteUser = async (user) => {
    deleteUser(user, tokenValue);
  };

  return (
    <div className={styles.container}>
      <h2>{t("users")}</h2>
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
            <th onClick={() => handleSort("placeOfResidence")}>
              {t("place_of_residence")}
              {getSortIcon("placeOfResidence", sortColumn, sortDirection)}
            </th>
            <th onClick={() => handleSort("birthDate")}>
              {t("birth_date")}
              {getSortIcon("birthDate", sortColumn, sortDirection)}
            </th>
            <th onClick={() => handleSort("diveClub")}>
              {t("dive_club")}
              {getSortIcon("diveClub", sortColumn, sortDirection)}
            </th>
            <th>{t("update")}</th>
            <th>{t("delete")}</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((u) => (
            <tr key={"w-" + u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.placeOfResidence}</td>
              <td>{u.birthDate}</td>
              <td>{u.diveClub === null ? null : u.diveClub.id}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => handleUpdateUser(u)}
                >
                  {t("update")}
                </button>
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteUser(u)}
                >
                  {t("delete")}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ButtonBox
        text={t("create_user")}
        settings={{
          ...createUserBtn,
          onClick: handleCreateWorker,
        }}
      />

      <ModalUserForm
        isOpen={isModalOpen}
        closeModal={() => setModalOpen(false)}
        handleSubmit={handleSubmit}
        selectedUser={selectedUser}
        handleNameChange={handleNameChange}
        handlePlaceChange={handlePlaceChange}
        handleClubChange={handleClubChange}
        clubs={clubs}
        t={t}
      />
    </div>
  );
};
