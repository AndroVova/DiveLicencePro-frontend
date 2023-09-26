import axios from "axios";

export const updateClub = async (club, tokenValue) => {
  const responseBody = {
    name: club.name,
    address: club.address,
    city: club.city,
    country: club.country,
  };
  const PUT_CLUB = `http://localhost:8080/dive_club/admin/${club.id}`;
  try {
    const response = await axios.put(PUT_CLUB, responseBody, {
      headers: {
        Authorization: "Bearer " + tokenValue,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error while putting club:", error);
  }
};

export const deleteClub = async (club, tokenValue) => {
  if (confirm("Are you sure you want to delete this club?")) {
    try {
      await axios.delete(`http://localhost:8080/dive_club/admin/${club.id}`, {
        headers: {
          Authorization: "Bearer " + tokenValue,
        },
      });
      window.location.reload();
    } catch (error) {
      console.error("Error while deleting club:", error);
    }
  }
};

export const getClubs = async (tokenValue) => {
    const GET_CLUBS = "http://127.0.0.1:8080/dive_club/admin/all";
    try {
      const response = await axios.get(GET_CLUBS, {
        headers: {
          Authorization: "Bearer " + tokenValue,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error while getting clubs:", error);
    }
  };

  export const handleInputChange = (e, field, setSelectedClub) => {
    const value = e.target.value;
    setSelectedClub((prevClub) => ({
      ...prevClub,
      [field]: value,
    }));
  };