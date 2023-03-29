import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import FormControl from "@mui/material/FormControl";
import StyledTextField from "../StyledTextField";
import SubmitButton from "../SubmitButton";
import { announcementsState, appState, modalState } from "../../globalstate";
import { editAnnouncement } from "../../Services/announcements";

/**
 * @todo Form validation/error handling
 */
const EditAnnounceModal = ({ closeModal }) => {
  const [announcements, setAnnouncements] = useRecoilState(announcementsState);
  const [app] = useRecoilState(appState);
  const [modal] = useRecoilState(modalState);
  const [form, setForm] = useState({ title: "", message: "" });

  const { id, credentials, title, message } = modal.data;

  useEffect(() => {
    setForm({ title, message });
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.id]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (
      !form.title.length ||
      !form.message.length ||
      (form.title === title && form.message === message)
    ) {
      return;
    }

    const requestObj = {
      credentials,
      title: form.title,
      message: form.message,
      companyId: app.viewCompanyId
    };

    editAnnouncement(id, requestObj).then(res => {
      console.log("New announcement:", res);

      // Replace old version in announcement state array
      const filteredAnnouncements = announcements.filter(
        announcement => announcement.id !== id
      );
      setAnnouncements([...filteredAnnouncements, res]);
    });

    closeModal(e);
  }

  return (
    <div className="modal-body">
      <h2 style={{ fontWeight: 300 }}>Edit announcement</h2>
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

export default EditAnnounceModal;

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  width: "clamp(20vw, 300px, 90vw)",
  padding: "30px 30px 50px 30px"
};
