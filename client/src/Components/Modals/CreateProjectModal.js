import React, { useState } from "react";
import { useRecoilState } from "recoil";
import SubmitButton from "../SubmitButton";

const CreateProjectModal = () => {
  function handleSubmit() {}

  return (
    <div className="modal-body">
      create project
      <SubmitButton handleSubmit={handleSubmit} />
    </div>
  );
};

export default CreateProjectModal;
