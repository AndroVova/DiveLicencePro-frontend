import { Button, Form, Modal } from "react-bootstrap";

export const ModalUserForm = ({
  isOpen,
  closeModal,
  handleSubmit,
  selectedUser,
  handleNameChange,
  handlePlaceChange,
  handleClubChange,
  clubs,
  t,
}) => {
  return (
    <Modal show={isOpen} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>{t("update_user")}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group controlId="name">
            <Form.Label>{t("name")}:</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={selectedUser !== null ? selectedUser.name : ""}
              onChange={handleNameChange}
            />
          </Form.Group>

          <Form.Group controlId="place">
            <Form.Label>{t("place_of_residence")}:</Form.Label>
            <Form.Control
              type="text"
              name="place"
              value={selectedUser !== null ? selectedUser.placeOfResidence : ""}
              onChange={handlePlaceChange}
            />
          </Form.Group>

          <Form.Group controlId="club">
            <Form.Label>{t("dive_club")}:</Form.Label>
            <Form.Control
              as="select"
              name="diveClubId"
              value={
                selectedUser === null ||
                selectedUser.diveClub === null ||
                typeof selectedUser.diveClub === "undefined"
                  ? ""
                  : selectedUser.diveClub.id || ""
              }
              onChange={handleClubChange}
            >
              <option value="">{t("select_club")}</option>
              {clubs !== null &&
                clubs.map((club) => (
                  <option key={club.id} value={club.id}>
                    {club.id}
                  </option>
                ))}
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-primary" type="submit">
            {t("submit")}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};