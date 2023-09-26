import axios from "axios";

export const getSensors = async (tokenValue) => {
  const GET_SENSORS = "http://127.0.0.1:8080/sensor/admin/all";

  const respond = await axios.get(GET_SENSORS, {
    headers: {
      Authorization: "Bearer " + tokenValue,
    },
  });
  return respond.data;
};

export const putSensor = async (selectedSensor, tokenValue) => {
  const responseBody = {
    name: selectedSensor.name,
    maxHeartRateValue: selectedSensor.maxHeartRateValue,
    maxDepth: selectedSensor.maxDepth,
    maxTime: selectedSensor.maxTime,
  };
  
  const PUT_SENSOR = `http://localhost:8080/sensor/admin/${selectedSensor.id}`;

  await axios
    .put(PUT_SENSOR, responseBody, {
      headers: {
        Authorization: "Bearer " + tokenValue,
      },
    })
    .catch((error) => {
      console.error("Error while putting sensor:", error);
    });
};

export const deleteSensor = async (sensorId, tokenValue) => {
  await axios
    .delete(`http://localhost:8080/sensor/admin/${sensorId}`, {
      headers: {
        Authorization: "Bearer " + tokenValue,
      },
    })
    .catch((error) => {
      console.error("Error while posting sensor:", error);
    });
};

export const handleInputChange = (e, field, setSelectedSensor) => {
  const value = e.target.value;
  setSelectedSensor((prevSensor) => ({
    ...prevSensor,
    [field]: value,
  }));
};
