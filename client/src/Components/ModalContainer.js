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
        return <CreateAnnounceModal closeModal={closeModal} />;
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
    <div className="modal">
      <div className="modal-overlay" onClick={e => closeModal(e)}></div>
      <div className="modal-container">
        <span className="close-btn-wrapper">
          <button className="close-modal-btn" onClick={e => closeModal(e)}>
            ×
          </button>
        </span>
        {currentModal}
      </div>
    </div>
  );
};

export default ModalContainer;
