import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { appState, userState, modalState, teamState } from "../../globalstate";
import SubmitButton from "../SubmitButton";
import { getCompanyUsers } from "../../Services/users";
import { postTeams } from "../../Services/teams";
import { FormControl, Select, MenuItem } from "@mui/material";
import StyledTextField from "../StyledTextField";

const CreateTeamModal = () => {
  const [app] = useRecoilState(appState);
  const [user] = useRecoilState(userState);
  const [modal, setModal] = useRecoilState(modalState);
  const [teams, setTeams] = useRecoilState(teamState);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isEmpty, setIsEmpty] = useState(true);
  const [availableUsers, setAvailableUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  useEffect(() => {
    name.length === 0 || description.length === 0
      ? setIsEmpty(true)
      : setIsEmpty(false);
  }, [name, description]);

  useEffect(() => {
    const getAllUsers = async () => {
      const response = await getCompanyUsers(app.viewCompanyId);
      setAvailableUsers(response.data);
    };

    getAllUsers();
  }, []);

  const options = availableUsers.map((member) => (
    <MenuItem key={member.id} value={member.id.toString()}>
      {member.profile.firstName + " " + member.profile.lastName}
    </MenuItem>
  ));

  const style = {
    backgroundColor: "white",
    borderRadius: "6px",
    fontSize: "16px",
    minWidth: "120px",
  };

  function handleChange(e) {
    const selectedId = e.target.value;
    setSelectedUsers([
      ...selectedUsers,
      availableUsers.find((user) => {
        return user.id == selectedId;
      }),
    ]);
    setAvailableUsers(availableUsers.filter((user) => user.id != selectedId));
  }

  async function handleSubmit() {
    setAttemptedSubmit(true);
    if (isEmpty) return;
    const response = await postTeams(
      name,
      description,
      selectedUsers,
      [],
      user.username,
      user.password,
      app.viewCompanyId
    );
    setTeams([...teams, response]);
    setModal({ isOpen: false, type: "", data: {} });
  }

  return (
    <div className="modal-body">
      create team
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
      {availableUsers.length > 0 && (
        <FormControl sx={style}>
          <Select value={""} onChange={(event) => handleChange(event)}>
            {options}
          </Select>
        </FormControl>
      )}
      <div>
        {selectedUsers.map((u) => {
          <span>{u.profile.firstName}</span>;
        })}
      </div>
      <SubmitButton handleSubmit={handleSubmit} />
    </div>
  );
};

export default CreateTeamModal;
