import React from "react";

const SubmitButton = ({ handleSubmit, disabled }) => {
  return (
    <button className="submit-btn" onClick={handleSubmit} disabled={disabled}>
      Submit
    </button>
  );
};

export default SubmitButton;
