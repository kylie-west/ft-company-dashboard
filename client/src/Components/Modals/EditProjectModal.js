import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import SubmitButton from "../SubmitButton";
import { projectsState, userState } from "../../globalstate";
import { modalState } from "../../globalstate";
import FormControl from "@mui/material/FormControl";
import StyledTextField from "../StyledTextField";
import { patchProject } from "../../Services/projects";

const EditProjectModal = ({ closeModal }) => {
  const [projects, setProjects] = useRecoilState(projectsState);
  const [modal] = useRecoilState(modalState);
  const [form, setForm] = useState({ title: "", message: "" });
  const [select, setSelect] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);
  const [user] = useRecoilState(userState);

  const { id, title, message, active, teamObj } = modal.data;

  useEffect(() => {
    setForm({ title, message });
  }, []);

  useEffect(() => {
    form.title.length === 0 || form.message.length === 0
      ? setIsEmpty(true)
      : setIsEmpty(false);
  }, [form.title, form.message]);

  function handleChange(e) {
    setForm({ ...form, [e.target.id]: e.target.value });
  }

  async function handleSubmit(e) {
    if (isEmpty) return;
    e.preventDefault();

    const response = await patchProject(
      id,
      form.title,
      form.message,
      select,
      teamObj,
      user.username,
      user.password
    );

    // update projects
    const newProjects = [...projects];
    const index = newProjects.findIndex((p) => p.id === id);
    newProjects[index] = response;
    setProjects(newProjects);

    closeModal(e);
  }

  return (
    <div className="modal-body">
      <div>
        <FormControl style={formStyle}>
          <StyledTextField
            id="title"
            value={form.title}
            label="Project Name"
            variant="standard"
            onChange={handleChange}
          />
          <StyledTextField
            id="message"
            value={form.message}
            label="Description"
            variant="standard"
            multiline
            onChange={handleChange}
          />
          <h2> Active? </h2>
          <select
            defaultValue={active}
            onChange={(e) => {
              setSelect(e.target.value);
            }}
          >
            <option value={true}> Yes</option>
            <option value={false}> No</option>
          </select>
        </FormControl>
      </div>

      <SubmitButton handleSubmit={handleSubmit} />
    </div>
  );
};

export default EditProjectModal;

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "2rem",
  width: "300px",
};
