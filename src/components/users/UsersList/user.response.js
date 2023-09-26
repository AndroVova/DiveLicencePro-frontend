import axios from "axios";

export const updateUser = async (selectedUser, tokenValue) => {
  const responseBody = {
    name: selectedUser.name,
    birthDate: selectedUser.birthDate,
    placeOfResidence: selectedUser.placeOfResidence,
    diveClub: selectedUser.diveClub,
  };

  await axios
    .put(`http://localhost:8080/custom_user/${selectedUser.id}`, responseBody, {
      headers: {
        Authorization: "Bearer " + tokenValue,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error while putting user:", error);
    });
};

export const handleInputChange = (e, field, setSelectedUser) => {
  const value = e.target.value;
  setSelectedUser((prevUser) => ({
    ...prevUser,
    [field]: value,
  }));
};

export const handleSelectInputChange = (e, field, setSelectedUser) => {
  const value = e.target.value;
  setSelectedUser((prevUser) => ({
    ...prevUser,
    [field]: {
      ...prevUser.field,
      id: value,
    },
  }));
};

export const deleteUser = async (user, tokenValue) => {
    if (confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`http://localhost:8080/custom_user/admin/${user.id}`, {
          headers: {
            Authorization: "Bearer " + tokenValue,
          },
        });
        window.location.reload();
      } catch (error) {
        console.error("Error while deleting user:", error);
      }
    }
  };


  export const getUsers = async (tokenValue) => {
    const GET_USERS = "http://127.0.0.1:8080/custom_user/admin/all";
    try {
      const response = await axios.get(GET_USERS, {
        headers: {
          Authorization: "Bearer " + tokenValue,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error while getting users:", error);
    }
  };

  export const getUser = async (id, tokenValue) => {
    const GET_USER = `http://localhost:8080/custom_user/${id}`;
    try {
      const response = await axios.get(GET_USER, {
        headers: {
          Authorization: "Bearer " + tokenValue,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error while getting users:", error);
    }
  };

  export const getClubs = async (tokenValue) => {
    const GET_DIVECLUBS = "http://127.0.0.1:8080/dive_club/admin/all";
    try {
      const response = await axios.get(GET_DIVECLUBS, {
        headers: {
          Authorization: "Bearer " + tokenValue,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error while getting clubs:", error);
    }
  };
