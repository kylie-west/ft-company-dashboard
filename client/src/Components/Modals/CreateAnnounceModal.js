import React, { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import FormControl from "@mui/material/FormControl";
import StyledTextField from "../StyledTextField";
import SubmitButton from "../SubmitButton";
import { announcementsState } from "../../globalstate";

/**
 * @todo Set current user as author
 * @todo Close modal and reset modal state on submit
 * @todo Update submit button cursor/hover styles
 * @todo Preserve newlines?
 * @todo Use actual backend API data
 */
const CreateAnnounceModal = () => {
	const [announcements] = useRecoilState(announcementsState);
	const setAnnouncements = useSetRecoilState(announcementsState);
	const [form, setForm] = useState({ title: "", message: "" });

	function handleChange(e) {
		setForm({ ...form, [e.target.id]: e.target.value });
	}

	function handleSubmit(e) {
		e.preventDefault();
		const newAnnouncement = {
			id: Math.floor(Math.random() * 500000),
			date: new Date(),
			title: form.title,
			message: form.message,
			author: "Chris, CEO"
		};
		setAnnouncements([...announcements, newAnnouncement]);
	}

	return (
		<div className="modal-body">
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
	gap: "2rem",
	width: "300px"
};
