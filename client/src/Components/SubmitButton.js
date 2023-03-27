import React from "react";

const SubmitButton = ({ handleSubmit }) => {
  return (
    <button className="submit-btn" onClick={handleSubmit}>
      Submit
    </button>
  );
};

export default SubmitButton;
