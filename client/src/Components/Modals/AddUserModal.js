import React from "react";
import SubmitButton from "../SubmitButton";
import FormControl from "@mui/material/FormControl";
import StyledTextField from "../StyledTextField";

const AddUserModal = () => {
    function handleSubmit() {
    }

    return (
        <div className="modal-body">
            {/*<div className="modal-row">
                <div>subdiv1</div>
                <div>subdiv2</div>
            </div>
            <div>div2</div>
            <div>div3</div>
            <div className="modal-row">
                <div>subdiv1</div>
                <div>subdiv2</div>
            </div>
            <div>div5</div>
            <div>div6</div>
            <div>div7</div>*/}
            <FormControl style={formStyle}>
                <div className="modal-row">
                    <StyledTextField
                        variant="standard"
                        placeholder="first name"
                    />
                    <StyledTextField
                        variant="standard"
                        placeholder="last name"
                    />
                </div>
                <StyledTextField
                    variant="standard"
                    placeholder="email"
                />
                <StyledTextField
                    variant="standard"
                    placeholder="phone number"
                />
                <div className="modal-row">
                    <StyledTextField
                        variant="standard"
                        placeholder="password"
                    />
                    <StyledTextField
                        variant="standard"
                        placeholder="confirm password"
                    />
                </div>
            </FormControl>
            <label>Make user an admin role?</label>
            <select>
                <option value="" disabled selected hidden>Pick an option</option>
                <option>true</option>
                <option>false</option>
            </select>
            <SubmitButton handleSubmit={handleSubmit}/>
        </div>
    );
};

export default AddUserModal;

const formStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    width: "clamp(20vw, 300px, 90vw)",
    padding: "30px 30px 50px 30px"
};
