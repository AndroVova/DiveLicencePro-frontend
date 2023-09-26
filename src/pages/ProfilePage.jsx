import { Button, Modal } from "react-bootstrap";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
  MDBCardTitle,
  MDBCol,
  MDBContainer,
  MDBRow,
} from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";

import { SERVICE_URL } from "../clients/app.const";
import axios from "axios";
import { updateUserImage } from "../reducers/auth.reducer";
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const GET_LESSONS = SERVICE_URL + "/lesson/count_successful_lessons/";
const GET_CERTS = SERVICE_URL + "/certificate/user/";
const GET_LESSON_TESTINGS_BY_USER = "http://localhost:8080/lesson_testing/all/user/";

export default function ProfilePage() {
  const { t } = useTranslation();
  const { user } = useSelector((s) => s.auth);
  const [lessonsCount, setLessonsCount] = useState(0);
  const [certs, setCerts] = useState(0);
  const [lessonTestings, setLessonTestings] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const token = sessionStorage.getItem("token");

  useEffect(() => {
    getLessons(user.customUser.id);
    getCerts(user.customUser.id);
    getLessonTestingsByUser(user.customUser.id);
    setImageUrl(user.image);
  }, []);

  const getLessons = async (id) => {
    const a = await axios
      .get(GET_LESSONS + id, { headers: { Authorization: `Bearer ${token}` } })
      .then(
        (responce) => {
          setLessonsCount(responce.data);
          return responce.data;
        },
        (error) => {
          console.error("Error while fetching lessons:", error);
        }
      );
    return a;
  };

  const getCerts = async (id) => {
    return await axios
      .get(GET_CERTS + id, { headers: { Authorization: `Bearer ${token}` } })
      .then(
        (responce) => {
          setCerts(responce.data);
          return responce.data;
        },
        (error) => {
          console.error("Error while fetching lessons:", error);
        }
      );
  };

  const getLessonTestingsByUser = async (id) => {
    const a = await axios
      .get(GET_LESSON_TESTINGS_BY_USER + id, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(
        (responce) => {
          const sortedLessonTestings = responce.data.sort(
            (a, b) => a.id - b.id
          );
          setLessonTestings(sortedLessonTestings);
          return responce.data;
        },
        (error) => {
          console.error("Error while fetching testings:", error);
        }
      );
    return a;
  };

  const updateProfileImage = async () => {
    const response = await axios
      .put(
        `http://localhost:8080/profile/${user.email}/image`,
        { image: imageUrl },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(
        (responce) => {
          dispatch(updateUserImage(imageUrl));
          setShowModal(false);
          
          return responce.data;
        },
        (error) => {
          console.error("Error while fetching profile image:", error);
        }
      );
  };

  return (
    <div className="h-100" style={{ backgroundColor: "#9de2ff" }}>
      <MDBContainer>
        <MDBRow className="justify-content-center">
          <MDBCol md="9" lg="7" xl="5" className="mt-5">
            <MDBCard style={{ borderRadius: "15px" }}>
              <MDBCardBody className="p-4">
                <div className="d-flex text-black">
                  <div className="flex-shrink-0">
                    <MDBCardImage
                      style={{  height: "180px",width: "180px", borderRadius: "10px" }}
                      src={user.image ? user.image 
                      : "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"}
    
                      alt="Generic placeholder image"
                      fluid
                    />

                    <div className="mt-2">
                      <Button
                        variant="primary"
                        onClick={() => setShowModal(true)}
                      >
                        {t("Change Profile Image")}
                      </Button>

                      <Modal
                        show={showModal}
                        onHide={() => setShowModal(false)}
                      >
                        <Modal.Header closeButton>
                          <Modal.Title>Change Profile Image</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <input
                            type="text"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            className="form-control"
                            placeholder="Enter image URL"
                          />
                        </Modal.Body>
                        <Modal.Footer>
                          <Button
                            variant="secondary"
                            onClick={() => setShowModal(false)}
                          >
                            {t("back")}
                          </Button>
                          <Button
                            variant="primary"
                            onClick={updateProfileImage}
                          >
                            {t("update")}
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </div>
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <MDBCardTitle>{user.customUser.name}</MDBCardTitle>
                    <MDBCardText>
                      {user.customUser.placeOfResidence}
                    </MDBCardText>
                    <MDBCardText>
                      {new Date(user.customUser.birthDate).toLocaleString(
                        t("locale"),
                        {
                          dateStyle: "long",
                        }
                      )}
                    </MDBCardText>

                    <div
                      className="d-flex justify-content-start rounded-3 p-2 mb-2"
                      style={{ backgroundColor: "#efefef" }}
                    >
                      <div>
                        <p className="small text-muted mb-1">
                          {t("successful_lessons")}
                        </p>
                        <p className="mb-0">{lessonsCount}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </MDBCardBody>
            </MDBCard>

            <h3 className="mt-4 mb-4">{t("certificates")}</h3>
            {Array.isArray(certs) && certs.length > 0 ? (
              certs.map((cert, index) => (
                <MDBCard
                  key={index}
                  style={{ borderRadius: "15px", marginTop: "20px" }}
                >
                  <MDBCardBody className="p-4">
                    <MDBCardTitle>{cert.name}</MDBCardTitle>
                    <MDBCardText>
                      {t("date")}:{" "}
                      {new Date(cert.date).toLocaleString(t("locale"), {
                        dateStyle: "long"
                      })}
                    </MDBCardText>
                    <MDBCardText>
                      {t("number_of_successful_lessons_to_get")}:{" "}
                      {cert.numberOfSuccessfulLessonsToGet}
                    </MDBCardText>
                    <MDBCardText>
                      {t("max_depth")}: {cert.maxDepth}
                    </MDBCardText>
                    <MDBCardText>
                      {t("completed")}: {cert.isCompleted ? t("yes") : t("no")}
                    </MDBCardText>
                  </MDBCardBody>
                </MDBCard>
              ))
            ) : (
              <p className="mt-4 mb-4">{t("no_data_certificates")}</p>
            )}

            <h3 className="mt-4 mb-4">{t("statistics")}</h3>
            {Array.isArray(lessonTestings) && lessonTestings.length > 0 ? (
              <div
                style={{
                  backgroundColor: "#fff",
                  padding: "10px",
                  borderRadius: "15px",
                  margin: "15px",
                }}
              >
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={lessonTestings}
                    margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                  >
                    <Line
                      type="monotone"
                      dataKey="heartRateValue"
                      stroke="#8884d8"
                      strokeWidth={4}
                      name="Heart Rate"
                    />
                    <Line
                      type="monotone"
                      dataKey="time"
                      stroke="#82ca9d"
                      strokeWidth={4}
                      name="Time"
                    />
                    <Line
                      type="monotone"
                      dataKey="depth"
                      stroke="#ffc658"
                      strokeWidth={4}
                      name="Depth"
                    />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis dataKey="id" />
                    <YAxis />
                    <Tooltip
                      formatter={(value, name) =>
                        name === "id" ? `Test: ${value}` : value
                      }
                    />
                    <Legend />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <p>{t("no_data_statistics")}</p>
            )}
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}