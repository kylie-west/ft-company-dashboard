import React from "react";

const ProjectCard = ({ name, description, active }) => {
  const activity = active ? (
    <span className="active">Active</span>
  ) : (
    <span className="inactive">Inactive</span>
  );

  return (
    <div className="project-card">
      <div className="project-details">
        <span className="activity-wrapper">
          <span className="project-name">{name}</span>
          {activity}
        </span>
        <span className="project-description">{description}</span>
      </div>
      <button className="edit-btn">Edit</button>
    </div>
  );
};

export default ProjectCard;
