import React, { useState } from "react";

import Center from "../components/layout/Center/Center";
import { UserSignUp } from "../components/auth/UserSingUp/UserSingUp";
import axios from "axios";
import formDataUtils from "../utils/form.data.utils";
import { useNavigate } from "react-router-dom";

export const CreateUserPage = () => {
  const [customUserId, setСustomUserId] = useState();
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = formDataUtils.toObject(e.target);

    if (user.password !== user.password_two) {
      alert("Password is different");
      return;
    }

    const responseBody = {
      birthDate: user.birth_date,
      name: user.name,
      placeOfResidence: user.place_of_residence,
    };

    const singUpData = {
      email: user.email,
      password: user.password,
    };

    axios.post("http://127.0.0.1:8080/profile/register", singUpData).then(
      (responce) => {
        return responce.data;
      },
      (error) => {
        console.error("Error while posting profile:", error);
      }
    );

    axios
      .post("http://127.0.0.1:8080/custom_user", responseBody, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const customUserId = response.data.id;

        setСustomUserId(response.data.id);

        setTimeout(() => {
          axios
            .put(
              `http://127.0.0.1:8080/profile/${user.email}/user/${customUserId}`,
              {},
              { headers: { Authorization: `Bearer ${token}` } }
            )
            .then((response) => {
              return response.data;
            })
            .then(() => {
              navigate("../users", { replace: true });
            })
            .catch((error) => {
              console.error("Error while putting profile:", error);
            });
        }, 2000);
      })
      .catch((error) => {
        console.error("Error while posting user:", error);
      });

    navigate("../users", { replace: true });
  };

  return (
    <Center useFreeHeightSpace={true}>
      <form onSubmit={handleSubmit}>
        <UserSignUp />
      </form>
    </Center>
  );
};
