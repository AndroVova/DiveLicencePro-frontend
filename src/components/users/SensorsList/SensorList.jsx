import { deleteSensor, getSensors, handleInputChange, putSensor } from "./sensor.response";
import { getSortIcon, sortList } from "../list.sort";
import { useEffect, useState } from "react";

import { ButtonBox } from "../../utils/ButtonBox/ButtonBox";
import { ModalSensorForm } from "../../utils/ModalSensorForm/ModalSensorForm";
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

export const SensorList = () => {
  const { tokenValue } = useSelector((s) => s.auth);
  const [sensor, setSensor] = useState([]);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [selectedSensor, setSelectedSensor] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState("");

  useEffect(() => {
    const start = async () => {
      const respond = await getSensors(tokenValue)

      setSensor(respond);
    };

    start();
  }, []);

  const handleSubmit = async () => {
    await putSensor(selectedSensor, tokenValue)
    setModalOpen(false)
  };

  const handleNameChange = (e) => {
    handleInputChange(e, "name", setSelectedSensor)
  };

  const handleHeartRateChange = (e) => {
    handleInputChange(e, "maxHeartRateValue", setSelectedSensor)
  };

  const handleDepthChange = (e) => {
    handleInputChange(e, "maxDepth", setSelectedSensor)
  };

  const handleTimeChange = (e) => {
    handleInputChange(e, "maxTime", setSelectedSensor)
  };

  const handleCreateSensor = () => {
    navigate("../sensors/create", { replace: true });
  };

  const handleUpdateSensor = (sensor) => {
    setSelectedSensor(sensor);
    setModalOpen(true);
  };

  const handleDeleteSensor = async (sensor) => {
    deleteSensor(sensor, tokenValue);
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "ASC" ? "DESC" : "ASC");
    } else {
      setSortColumn(column);
      setSortDirection("ASC");
    }
  };

  const sortedSensors = sortList(sensor, sortColumn, sortDirection);

  return (
    <div className={styles.container}>
      <h2>{t("sensors")}</h2>
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
            <th onClick={() => handleSort("maxDepth")}>
              {t("max_depth")}
              {getSortIcon("maxDepth", sortColumn, sortDirection)}
            </th>
            <th onClick={() => handleSort("maxHeartRateValue")}>
              {t("max_heart_rate")}
              {getSortIcon("maxHeartRateValue", sortColumn, sortDirection)}
            </th>
            <th onClick={() => handleSort("maxTime")}>
              {t("max_time")}
              {getSortIcon("maxTime", sortColumn, sortDirection)}
            </th>
            <th>{t("update")}</th>
            <th>{t("delete")}</th>
          </tr>
        </thead>
        <tbody>
          {sortedSensors.map((s) => (
            <tr key={"w-" + s.id}>
              <td>{s.id}</td>
              <td>{s.name}</td>
              <td>{s.maxDepth}</td>
              <td>{s.maxHeartRateValue}</td>
              <td>{s.maxTime}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => handleUpdateSensor(s)}
                >
                  {t("update")}
                </button>
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteSensor(s)}
                >
                  {t("delete")}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ButtonBox
        text={t("create_sensor")}
        settings={{
          ...createCertsBtn,
          onClick: handleCreateSensor,
        }}
      />
      <ModalSensorForm
        isOpen={isModalOpen}
        closeModal={() => setModalOpen(false)}
        handleSubmit={handleSubmit}
        selectedSensor={selectedSensor}
        handleNameChange={handleNameChange}
        handleHeartRateChange={handleHeartRateChange}
        handleDepthChange={handleDepthChange}
        handleTimeChange={handleTimeChange}
        styles={styles}
        t={t}
      />
    </div>
  );
};
