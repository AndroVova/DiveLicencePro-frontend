import { Button, Form, Modal } from "react-bootstrap";

export const ModalSensorForm = ({
  isOpen,
  closeModal,
  handleSubmit,
  selectedSensor,
  handleNameChange,
  handleHeartRateChange,
  handleDepthChange,
  handleTimeChange,
  styles,
  t,
}) => {
  return (
    <Modal show={isOpen} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>{t("update_sensor")}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group controlId="name">
            <Form.Label>{t("name")}</Form.Label>
            <Form.Control
              type="text"
              value={selectedSensor?.name || ""}
              onChange={handleNameChange}
            />
          </Form.Group>

          <Form.Group controlId="heartRate">
            <Form.Label>{t("max_heart_rate")}</Form.Label>
            <Form.Control
              type="text"
              value={selectedSensor?.maxHeartRateValue || ""}
              onChange={handleHeartRateChange}
            />
          </Form.Group>

          <Form.Group controlId="depth">
            <Form.Label>{t("max_depth")}</Form.Label>
            <Form.Control
              type="text"
              value={selectedSensor?.maxDepth || ""}
              onChange={handleDepthChange}
            />
          </Form.Group>

          <Form.Group controlId="time">
            <Form.Label>{t("max_time")}</Form.Label>
            <Form.Control
              type="text"
              value={selectedSensor?.maxTime || ""}
              onChange={handleTimeChange}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit">
            {t("submit")}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
