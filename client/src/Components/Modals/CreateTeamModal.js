import React, { useState } from "react";
import { useRecoilState } from "recoil";
import SubmitButton from "../SubmitButton";

const CreateTeamModal = () => {
  function handleSubmit() {}

  return (
    <div className="modal-body">
      create team
      <SubmitButton handleSubmit={handleSubmit} />
    </div>
  );
};

export default CreateTeamModal;
