import React, { useState } from "react";
import { useRecoilState } from "recoil";
import FormControl from "@mui/material/FormControl";
import StyledTextField from "../StyledTextField";
import SubmitButton from "../SubmitButton";
import { announcementsState, userState } from "../../globalstate";

/**
 * @todo Use actual backend API data
 * @todo Form validation/error handling
 */
const CreateAnnounceModal = ({ closeModal }) => {
  const [announcements, setAnnouncements] = useRecoilState(announcementsState);
  const [user] = useRecoilState(userState);
  const [form, setForm] = useState({ title: "", message: "" });

  function handleChange(e) {
    setForm({ ...form, [e.target.id]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.title.length || !form.message.length) {
      return;
    }

    const newAnnouncement = {
      id: Math.floor(Math.random() * 500000),
      date: new Date(),
      title: form.title,
      message: form.message,
      author: user
    };
    setAnnouncements([...announcements, newAnnouncement]);
    console.log("Announcements:", announcements);

    closeModal(e);
  }

  return (
    <div className="modal-body">
      <h2 style={{ fontWeight: 300 }}>Create new announcement</h2>
      <FormControl style={formStyle}>
        <StyledTextField
          id="title"
          value={form.title}
          label="title"
          variant="standard"
          onChange={handleChange}
        />
        <StyledTextField
          id="message"
          value={form.message}
          label="message"
          variant="standard"
          multiline
          onChange={handleChange}
        />
        <SubmitButton handleSubmit={handleSubmit} />
      </FormControl>
    </div>
  );
};

export default CreateAnnounceModal;

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  width: "clamp(20vw, 300px, 90vw)",
  padding: "30px 30px 50px 30px"
};
