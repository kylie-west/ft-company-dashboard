import React, { useState } from "react";
import { useRecoilState } from "recoil";
import SubmitButton from "../SubmitButton";
import { getUsers } from "../../Services/users"

const CreateTeamModal = () => {
  const [app] = useRecoilState(appState);
  const [user] = useRecoilState(userState);
  const [modal, setModal] = useRecoilState(modalState);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("")
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    name.length === 0 || description.length === 0
      ? setIsEmpty(true)
      : setIsEmpty(false);
  }, [name, description]);

  // useEffeect(() => {
  //   const getAllUsers = async () => {
  //     const response = await getUsers()
  //   }
  // })
  function handleSubmit() {}



  return (
    <div className="modal-body">
      create team
      <SubmitButton handleSubmit={handleSubmit} />
    </div>
  );
};

export default CreateTeamModal;
