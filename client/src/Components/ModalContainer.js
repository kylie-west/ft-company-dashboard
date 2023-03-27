import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { AddUserModal } from "./Modals/AddUserModal";
import { CreateAnnounceModal } from "./Modals/CreateAnnounceModal";
import { CreateProjectModal } from "./Modals/CreateProjectModal";
import { CreateTeamModal } from "./Modals/CreateTeamModal";
import { EditProjectModal } from "./Modals/EditProjectModal";

const ModalContainer = () => {
  const [modal] = useRecoilState(modalState);

  let currentModal;

  function setModal() {
    switch (modal.type) {
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
  }

  useEffect(() => {
    modal.isOpen ? setModal() : (currentModal = <></>);
  }, [modal.type]);

  return <div className="modal-container">{currentModal}</div>;
};

export default ModalContainer;
