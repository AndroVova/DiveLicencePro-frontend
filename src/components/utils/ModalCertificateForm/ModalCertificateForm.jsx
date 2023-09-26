import { Button, Form, Modal } from 'react-bootstrap';

export const ModalCertificateForm = ({
  isOpen,
  closeModal,
  handleSubmit,
  selectedCert,
  handleUserChange,
  handleInstructorChange,
  styles,
  users,
  admins,
  t,
}) => {
  return (
    <Modal show={isOpen} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>{t("update_cert")}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group controlId="user">
            <Form.Label>{t("user")}</Form.Label>
            <Form.Control
              as="select"
              value={selectedCert?.customUser?.id || ""}
              onChange={handleUserChange}
            >
              <option value="">{t("select_user")}</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.id} - {user.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="intructor">
            <Form.Label>{t("instructor")}</Form.Label>
            <Form.Control
              as="select"
              value={selectedCert?.instructor?.id || ""}
              onChange={handleInstructorChange}
            >
              <option value="">{t("select_intructor")}</option>
              {admins.map((admin) => (
                <option key={admin.id} value={admin.id}>
                  {admin.id} - {admin.name}
                </option>
              ))}
            </Form.Control>
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
