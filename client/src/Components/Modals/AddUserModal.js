import React, {useEffect, useState} from "react";
import SubmitButton from "../SubmitButton";
import FormControl from "@mui/material/FormControl";
import StyledTextField from "../StyledTextField";
import {postUser} from "../../Services/users";
import {useRecoilState} from "recoil";
import {allUsersState, appState, modalState, userState} from "../../globalstate";
import {MenuItem, Select} from "@mui/material";

const AddUserModal = () => {
    const [app] = useRecoilState(appState);
    const [user] = useRecoilState(userState);
    const [modal, setModal] = useRecoilState(modalState);
    const [users, setUsers] = useRecoilState(allUsersState);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [isEmpty, setIsEmpty] = useState(true);
    const [attemptedSubmit, setAttemptedSubmit] = useState(false);

    useEffect(() => {
        firstName.length === 0 ||
        lastName.length === 0 ||
        email.length === 0 ||
        phone.length === 0 ||
        username.length === 0 ||
        password.length === 0 ||
        confirmPassword.length === 0
            ? setIsEmpty(true)
            : setIsEmpty(false);
    }, [firstName, lastName, email, phone, username, password, confirmPassword]);

    async function handleSubmit() {
        setAttemptedSubmit(true);
        if (isEmpty) return;
        const addUserRequestDto = {
            user: {
                credentials: {
                    username: username,
                    password: password
                },
                profile: {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    phone: phone
                },
                admin: isAdmin
            },
            credentials: {
                username: user.username,
                password: user.password,
            }
        }
        console.log(addUserRequestDto);
        const response = await postUser(
            app.viewCompanyId,
            {...addUserRequestDto}
        );
        setUsers([...users, response]);
        setModal({isOpen: false, type: "", data: {}});
    }

    const selectStyle = {
        backgroundColor: "white",
        borderRadius: "6px",
        fontSize: "1.4rem",
        minWidth: "120px",
    };

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
                        id="user-first-name-input"
                        label="First Name"
                        error={attemptedSubmit && firstName.length === 0}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <StyledTextField
                        variant="standard"
                        id="user-last-name-input"
                        label="Last Name"
                        error={attemptedSubmit && lastName.length === 0}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <StyledTextField
                    variant="standard"
                    id="user-email-input"
                    label="Email"
                    error={attemptedSubmit && email.length === 0}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <StyledTextField
                    variant="standard"
                    id="user-phone-input"
                    label="Phone Number"
                    error={attemptedSubmit && phone.length === 0}
                    onChange={(e) => setPhone(e.target.value)}
                />
                <StyledTextField
                    variant="standard"
                    id="user-username-input"
                    label="Username"
                    error={attemptedSubmit && username.length === 0}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <div className="modal-row">
                    <StyledTextField
                        variant="standard"
                        id="user-password-input"
                        label="Password"
                        error={attemptedSubmit && password.length === 0}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <StyledTextField
                        variant="standard"
                        id="user-confirm-password-input"
                        label="Confirm Password"
                        error={attemptedSubmit && confirmPassword.length === 0}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                {/*<label>Make user an admin role?</label>
            <select>
                <option value="" disabled selected hidden>Pick an option</option>
                <option>true</option>
                <option>false</option>
            </select>*/}
                <h3>Make user an admin role?</h3>
                <Select
                    defaultValue={isAdmin}
                    onChange={(e) => {
                        setIsAdmin(e.target.value);
                    }}
                    sx={selectStyle}
                >
                    <MenuItem sx={{fontSize: "1.4rem"}} value={true}>
                        {" "}
                        true
                    </MenuItem>
                    <MenuItem sx={{fontSize: "1.4rem"}} value={false}>
                        {" "}
                        false
                    </MenuItem>
                </Select>
            </FormControl>
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
