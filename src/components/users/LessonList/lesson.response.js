import axios from "axios";

const GET_LESSON_TESTINGS = "http://localhost:8080/lesson_testing/all/lesson/";

export const getLessonTestings = async (id, tokenValue) => {
  const a = await axios
    .get(GET_LESSON_TESTINGS + id, {
      headers: { Authorization: `Bearer ${tokenValue}` },
    })
    .then(
      (responce) => {
        return responce.data;
      },
      (error) => {
        console.error("Error while fetching testings:", error);
      }
    );
    return a;
};


