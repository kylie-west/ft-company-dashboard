import React, { useEffect } from "react";
import AddUserModal from "./Modals/AddUserModal";
import CreateAnnounceModal from "./Modals/CreateAnnounceModal";
import CreateProjectModal from "./Modals/CreateProjectModal";
import CreateTeamModal from "./Modals/CreateTeamModal";
import EditProjectModal from "./Modals/EditProjectModal";

const ModalContainer = ({ isOpen, type, closeModal }) => {
  let currentModal;

  function setModal() {
    switch (type) {
      case "add-user":
        currentModal = <AddUserModal />;
        break;
      case "create-announcement":
        currentModal = <CreateAnnounceModal />;
        break;
      case "create-project":
        currentModal = <CreateProjectModal />;
        break;
      case "edit-project":
        currentModal = <EditProjectModal />;
        break;
      case "create-team":
        currentModal = <CreateTeamModal />;
        break;
      default:
        currentModal = <>Invalid or empty modal type</>;
    }
    console.log(`Modal: ${type}`);
  }

  useEffect(() => setModal(), []);
  useEffect(() => {
    isOpen ? setModal() : (currentModal = <></>);
  }, [type]);

  return (
    <div className="modal-container">
      <h1>🔥 My Cool Modal 🔥</h1>
      {currentModal}
      <button onClick={closeModal}>Close</button>
    </div>
  );
};

export default ModalContainer;
