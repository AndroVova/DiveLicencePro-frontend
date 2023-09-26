import Center from "../components/layout/Center/Center";
import { CreateLessonForm } from "../components/postForms/CreateLessonForm";
import React from "react";
import axios from "axios";
import formDataUtils from "../utils/form.data.utils";
import { getUser } from "../components/users/UsersList/user.response";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const CreateLessonPage = () => {
  //const [customUserId, setСustomUserId] = useState();
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  const { tokenValue } = useSelector((s) => s.auth);
  const { user } = useSelector((s) => s.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const lesson = formDataUtils.toObject(e.target);
    const userData = await getUser(lesson.user, tokenValue);
    const instructor = await getUser(user.customUser.id, tokenValue);
    const responseBody = {
      name: lesson.name,
      task: lesson.task,
      date: lesson.date,
      isSuccessful: false,
      duration: lesson.duration,
    };

    axios
      .post("http://localhost:8080/lesson/admin", responseBody, {
        headers: {
          Authorization: `Bearer ${tokenValue}`,
        },
      })
      .then((response) => {
        const lessonId = response.data.id;
        setTimeout(() => {
            axios
              .put(
                `http://127.0.0.1:8080/lesson/admin/${lessonId}/user/${userData.id}/instructor/${instructor.id}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
              )
              .then((response) => {
                return response.data;
              })
              .catch((error) => {
                console.error("Error while putting lesson:", error);
              });
          }, 1000);
      })
      .catch((error) => {
        console.error("Error while posting lesson:", error);
      });

    navigate("../lessons", { replace: true });
  };

  return (
    <Center useFreeHeightSpace={true}>
      <form onSubmit={handleSubmit}>
        <CreateLessonForm />
      </form>
    </Center>
  );
};
