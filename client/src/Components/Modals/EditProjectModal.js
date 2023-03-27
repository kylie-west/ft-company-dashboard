import React, { useState } from "react";
import { useRecoilState } from "recoil";
import SubmitButton from "../SubmitButton";

const EditProjectModal = () => {
  function handleSubmit() {}

  return (
    <div className="modal-body">

      <form>  
      <h2>Edit Project</h2>
      <label>Project Name:
        <input type="text"/>

      </label>


      <SubmitButton handleSubmit={handleSubmit} />

      </form>
    </div>
  );
};

export default EditProjectModal;
