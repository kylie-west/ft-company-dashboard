import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { appState } from "../../globalstate";
import { userState } from "../../globalstate";
import { projectsState } from "../../globalstate";
import { modalState } from "../../globalstate";
import SubmitButton from "../SubmitButton";
import StyledTextField from "../StyledTextField";
import { postProject } from "../../Services/users";

const CreateProjectModal = () => {
  const [app] = useRecoilState(appState);
  const [user] = useRecoilState(userState);
  const [modal, setModal] = useRecoilState(modalState);
  const [projects, setProjects] = useRecoilState(projectsState);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    name.length === 0 || description.length === 0
      ? setIsEmpty(true)
      : setIsEmpty(false);
  }, [name, description]);

  function handleSubmit() {
    // const response = postProject(
    //   name,
    //   description,
    //   app.viewTeamId,
    //   user.username,
    //   user.password
    // ).catch((err) => {
    //   setError({ isError: true, message: err });
    // });
    // if (response) {
    //   setError({ isError: false, message: "" });
    //   setProjects([...projects, project]);
    // }
    setProjects([
      ...projects,
      { id: 99, name, description, active: false, teams: [app.viewTeamId] },
    ]);
    setModal({ isOpen: false, type: "", data: {} });
  }

  return (
    <div className="modal-body">
      <StyledTextField
        id="project-name-input"
        label="Project Name"
        variant="standard"
        onChange={(e) => setName(e.target.value)}
      />
      <StyledTextField
        id="description-input"
        label="Description"
        variant="standard"
        onChange={(e) => setDescription(e.target.value)}
      />
      <SubmitButton handleSubmit={handleSubmit} disabled={isEmpty} />
    </div>
  );
};

export default CreateProjectModal;
