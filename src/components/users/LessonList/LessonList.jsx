import "bootstrap/dist/css/bootstrap.min.css";

import React, { useEffect, useState } from "react";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { ModalLessonForm } from "../../utils/ModalLessonForm/ModalLessonForm";
import Row from "react-bootstrap/Row";
import axios from "axios";
import { getLessonTestings } from "./lesson.response";
import styles from "../list.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const GET_LESSONS = "http://localhost:8080/lesson/user/";

const LessonList = () => {
  const [statusFilter, setStatusFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [lessons, setLessons] = useState([]);
  const { user } = useSelector((s) => s.auth);
  const { tokenValue } = useSelector((s) => s.auth);

  const [selectedLesson, setSelectedLesson] = useState(null);
  const [lessonTesting, setLessonTestings] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    getLessons(user.customUser.id);
  }, []);

  const getLessons = async (id) => {
    const a = await axios
      .get(GET_LESSONS + id, {
        headers: { Authorization: `Bearer ${tokenValue}` },
      })
      .then(
        (responce) => {
          setLessons(responce.data);
          return responce.data;
        },
        (error) => {
          console.error("Error while fetching lessons:", error);
        }
      );
    return a;
  };

  const filteredLessons = lessons.filter((lesson) => {
    const statusMatch = statusFilter
      ? lesson.isSuccessful.toString() === statusFilter
      : true;
    const termMatch = lesson.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return statusMatch && termMatch;
  });

  const handleAddLesson = () => {
    navigate("../lessons/create", { replace: true });
    console.log("Add lesson button clicked");
  };

  const expandLesson = async (lesson) => {
    setSelectedLesson(lesson);
    if (lesson.isSuccessful) {
      const test = await getLessonTestings(lesson.id, tokenValue);
      setLessonTestings(test[test.length - 1]);
    } else {
      setLessonTestings(null);
    }
    setModalOpen(true);
  };

  return (
    <Container fluid>
      <Row>
        <Col md={12}>
          <Form className="my-3 d-flex justify-content-between align-items-center">
            <div className="d-flex">
              <Form.Label className="mr-2">{t("Filter by Status")}:</Form.Label>

              <Form.Control
                as="select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="ml-3 mr-3"
                style={{ width: "150px" }}
              >
                <option value="">{t("All")}</option>
                <option value="true">{t("Completed")}</option>
                <option value="false">{t("Incomplete")}</option>
              </Form.Control>
            </div>
            <div className="ml-3">
              <Form.Control
                type="text"
                placeholder={t("Search by name")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: "350px" }}
              />
            </div>
            {user.roles.length == 2 ? (
              <Button onClick={handleAddLesson} variant="success">
                {t("Add New Lesson")}
              </Button>
            ) : null}
          </Form>
        </Col>
        <Col md={6} className="my-3 d-flex"></Col>
      </Row>

      <Row>
        {filteredLessons.sort((a, b) => a.id - b.id).map((lesson) => (
          <Col sm={3} key={lesson.id}>
            <Card style={{ width: "300px" }}>
              <Card.Body>
                <Card.Title>{lesson.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {t("Starts at")}:{" "}
                  {new Date(lesson.date).toLocaleString(t("locale"), {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </Card.Subtitle>
                <Card.Text>
                  {t("Duration")}: {lesson.duration} {t("min")}.
                </Card.Text>
                <Card.Text>
                  {t("Status")}:{" "}
                  {lesson.isSuccessful ? t("Completed") : t("Incomplete")}
                </Card.Text>
                <Button variant="primary" onClick={() => expandLesson(lesson)}>
                  {" "}
                  {t("Go to lesson")}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <ModalLessonForm
        isOpen={isModalOpen}
        closeModal={() => setModalOpen(false)}
        selectedLesson={selectedLesson}
        lessonTesting={lessonTesting}
        styles={styles}
        t={t}
      />
    </Container>
  );
};

export default LessonList;
