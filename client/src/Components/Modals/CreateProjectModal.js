import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import {
  appState,
  userState,
  projectsState,
  modalState,
} from "../../globalstate";
import SubmitButton from "../SubmitButton";
import StyledTextField from "../StyledTextField";
import { postProject } from "../../Services/projects";

const CreateProjectModal = () => {
  const [app] = useRecoilState(appState);
  const [user] = useRecoilState(userState);
  const [modal, setModal] = useRecoilState(modalState);
  const [projects, setProjects] = useRecoilState(projectsState);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isEmpty, setIsEmpty] = useState(true);
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  useEffect(() => {
    name.length === 0 || description.length === 0
      ? setIsEmpty(true)
      : setIsEmpty(false);
  }, [name, description]);

  async function handleSubmit() {
    setAttemptedSubmit(true);
    if (isEmpty) return;
    const response = await postProject(
      name,
      description,
      app.viewTeamId,
      user.username,
      user.password
    );
    setProjects([...projects, response]);
    setModal({ isOpen: false, type: "", data: {} });
  }

  return (
    <div className="modal-body">
      <div className="modal-input-wrapper">
        <StyledTextField
          id="project-name-input"
          label="Project Name"
          variant="standard"
          error={attemptedSubmit && name.length === 0}
          onChange={(e) => setName(e.target.value)}
        />
        <StyledTextField
          id="description-input"
          label="Description"
          variant="standard"
          multiline
          error={attemptedSubmit && description.length === 0}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <SubmitButton handleSubmit={handleSubmit} />
    </div>
  );
};

export default CreateProjectModal;
