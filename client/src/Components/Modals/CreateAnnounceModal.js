import React, { useState } from "react";
import { useRecoilState } from "recoil";
import SubmitButton from "../SubmitButton";

const CreateAnnounceModal = () => {
  function handleSubmit() {}

  return (
    <div className="modal-body">
      create announcement
      <SubmitButton handleSubmit={handleSubmit} />
    </div>
  );
};

export default CreateAnnounceModal;
