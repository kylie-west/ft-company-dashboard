import React, { useEffect } from "react";
import AddUserModal from "./Modals/AddUserModal";
import CreateAnnounceModal from "./Modals/CreateAnnounceModal";
import CreateProjectModal from "./Modals/CreateProjectModal";
import CreateTeamModal from "./Modals/CreateTeamModal";
import EditProjectModal from "./Modals/EditProjectModal";

const ModalContainer = ({ isOpen, type, closeModal }) => {
  function getModal() {
    switch (type) {
      case "add-user":
        return <AddUserModal />;
      case "create-announcement":
        return <CreateAnnounceModal />;
      case "create-project":
        return <CreateProjectModal />;
      case "edit-project":
        return <EditProjectModal />;
      case "create-team":
        return <CreateTeamModal />;
      default:
        return <>Invalid or empty modal type</>;
    }
  }
  let currentModal = getModal();

  useEffect(() => {
    isOpen ? (currentModal = getModal()) : (currentModal = <></>);
  }, [isOpen]);

  return (
    <div className="modal-container">
      <h1>🔥 My Cool Modal 🔥</h1>
      {currentModal}
      <button onClick={closeModal}>Close</button>
    </div>
  );
};

export default ModalContainer;
