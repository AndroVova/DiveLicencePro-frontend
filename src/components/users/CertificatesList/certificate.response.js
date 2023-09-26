import axios from "axios";

const GET_CERTIFICATES = "http://127.0.0.1:8080/certificate/admin/all";
const GET_USERS = "http://127.0.0.1:8080/custom_user/admin/all";
const GET_ADMINS = "http://127.0.0.1:8080/custom_user/admin/all-admins";

export const getData = async (tokenValue) => {
  const respond = await axios.get(GET_CERTIFICATES, {
    headers: {
      Authorization: "Bearer " + tokenValue,
    },
  });
  const respond1 = await axios.get(GET_USERS, {
    headers: {
      Authorization: "Bearer " + tokenValue,
    },
  });
  const respond2 = await axios.get(GET_ADMINS, {
    headers: {
      Authorization: "Bearer " + tokenValue,
    },
  });

  return { certificates: respond.data, users: respond1.data, admins: respond2.data };
};

export const putCertificate = async (selectedCert, tokenValue) => {
  const responseBody = {
    name: selectedCert.name,
    date: selectedCert.date,
    numberOfSuccessfulLessonsToGet: selectedCert.numberOfSuccessfulLessonsToGet,
    maxDepth: selectedCert.maxDepth,
    isCompleted: selectedCert.isCompleted,
  };
  const PUT_CERTIFICATE = `http://localhost:8080/certificate/admin/${selectedCert.id}/user/${selectedCert.customUser.id}/instructor/${selectedCert.instructor.id}`;
  await axios
    .put(PUT_CERTIFICATE, responseBody, {
      headers: {
        Authorization: "Bearer " + tokenValue,
      },
    })
    .catch((error) => {
      console.error("Error while putting cert:", error);
    });
};

export const handleSelectInputChange = (e,field, setSelectedCert) => {
  const value = e.target.value;
  setSelectedCert((prevCert) => ({
    ...prevCert,
    [field]: {
      ...prevCert.field,
      id: value,
    },
  }));
};
