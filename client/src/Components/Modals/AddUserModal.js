import React, { useState } from "react";
import { useRecoilState } from "recoil";
import SubmitButton from "../SubmitButton";

const AddUserModal = () => {
  function handleSubmit() {}

  return (
    <div className="modal-body">
      add user
      <SubmitButton handleSubmit={handleSubmit} />
    </div>
  );
};

export default AddUserModal;
