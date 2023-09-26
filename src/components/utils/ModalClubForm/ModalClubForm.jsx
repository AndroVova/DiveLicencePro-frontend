import { Button, Form, Modal } from "react-bootstrap";

export const ModalClubForm = ({
  isOpen,
  closeModal,
  handleSubmit,
  selectedClub,
  handleNameChange,
  handleAddressChange,
  handleCityChange,
  handleCountryChange,
  t,
}) => {
  if (!isOpen) return null;

  return (
    <Modal show={isOpen} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>{t("update_club")}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group controlId="name">
            <Form.Label>{t("name")}</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={selectedClub ? selectedClub.name : ""}
              onChange={handleNameChange}
              minLength={3}
              required
            />
          </Form.Group>

          <Form.Group controlId="country">
            <Form.Label>{t("country")}</Form.Label>
            <Form.Control
              type="text"
              name="country"
              value={selectedClub ? selectedClub.country : ""}
              onChange={handleCountryChange}
              minLength={3}
              required
            />
          </Form.Group>

          <Form.Group controlId="city">
            <Form.Label>{t("city")}</Form.Label>
            <Form.Control
              type="text"
              name="city"
              value={selectedClub ? selectedClub.city : ""}
              onChange={handleCityChange}
              minLength={3}
              required
            />
          </Form.Group>

          <Form.Group controlId="address">
            <Form.Label>{t("address")}</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={selectedClub ? selectedClub.address : ""}
              onChange={handleAddressChange}
              minLength={3}
              required
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
