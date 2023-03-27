import React, { useState } from "react";
import { useRecoilState } from "recoil";
import SubmitButton from "../SubmitButton";

const EditProjectModal = () => {
  function handleSubmit() {}

  return (
    <div className="modal-body">
      edit project
      <SubmitButton handleSubmit={handleSubmit} />
    </div>
  );
};

export default EditProjectModal;
