import "bootstrap/dist/css/bootstrap.min.css";

import { Button, Modal } from "react-bootstrap";
import { btnSize, inputSize } from "../../../utils/ui.utils";

import InputBox from "../InputBox/InputBox";

export const ModalLessonForm = ({
  isOpen,
  closeModal,
  selectedLesson,
  lessonTesting,
  styles,
  t,
}) => {
  return (
    <Modal show={isOpen} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>{t("lesson")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            {t("name")}:
          </label>
          <p className="form-text">
            {selectedLesson !== null ? selectedLesson.name : ""}
          </p>
        </div>

        <div className="form-group">
          <label htmlFor="task" className="form-label">
            {t("task")}:
          </label>
          <p className="form-text">
            {selectedLesson !== null ? selectedLesson.task : ""}
          </p>
        </div>

        <div className="form-group">
          <label htmlFor="date" className="form-label">
            {t("date")}:
          </label>
          <p className="form-text">
            {selectedLesson !== null
              ? new Date(selectedLesson.date).toLocaleString(t("locale"), {
                  dateStyle: "medium",
                  timeStyle: "short",
                })
              : ""}
          </p>
        </div>

        <div className="form-group">
          <label htmlFor="duration" className="form-label">
            {t("duration")}:
          </label>
          <p className="form-text">
            {selectedLesson !== null ? selectedLesson.duration : ""}
          </p>
        </div>

        <div className="form-group">
          <label htmlFor="instructor" className="form-label">
            {t("instructor")}:
          </label>
          <p className="form-text">
            {selectedLesson !== null ? selectedLesson.instructor.name : ""}
          </p>
        </div>

        {lessonTesting !== null && (
          <div className="form-group">
            <label htmlFor="lesson_test" className="form-label">
              {t("lesson_test")}:
            </label>
            <p className="form-text">Depth: {lessonTesting.depth} m</p>
            <p className="form-text">Heart Rate Value: {lessonTesting.heartRateValue} bpm</p>
            <p className="form-text">Time: {lessonTesting.time} min</p>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

//   if (!isOpen) return null;

//   return (
//     <div className="modal">
//     <div className="modal-content container">
//         <div className="modal-header">
//           <h2>{t("lesson")}</h2>
//         </div>

//         <form onSubmit={closeModal}>
//           <div className="modal-body">

//             <div className="form-group">
//               <label htmlFor="name" className="form-label">{t("name")}:</label>
//               <p className="form-text">{selectedLesson !== null ? selectedLesson.name : ""}</p>
//             </div>

//             <div className="form-group">
//               <label htmlFor="task" className="form-label">{t("task")}:</label>
//               <p className="form-text">{selectedLesson !== null ? selectedLesson.task : ""}</p>
//             </div>

//             <div className="form-group">
//               <label htmlFor="date" className="form-label">{t("date")}:</label>
//               <p className="form-text">{selectedLesson !== null ? selectedLesson.date : ""}</p>
//             </div>

//             <div className="form-group">
//               <label htmlFor="duration" className="form-label">{t("duration")}:</label>
//               <p className="form-text">{selectedLesson !== null ? selectedLesson.duration : ""}</p>
//             </div>

//             <div className="form-group">
//               <label htmlFor="instructor" className="form-label">{t("instructor")}:</label>
//               <p className="form-text">{selectedLesson !== null ? selectedLesson.instructor.name : ""}</p>
//             </div>

//             {lessonTesting !== null && (
//               <div className="form-group">
//                 <label htmlFor="lesson_test" className="form-label">{t("lesson_test")}:</label>
//                 <p className="form-text">{lessonTesting.depth}</p>
//                 <p className="form-text">{lessonTesting.heartRateValue}</p>
//                 <p className="form-text">{lessonTesting.time}</p>
//               </div>
//             )}

//           </div>
//         </form>

//         <div className="modal-footer">
//           <button className="btn btn-primary" onClick={closeModal}>
//             {t("back")}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
//};
