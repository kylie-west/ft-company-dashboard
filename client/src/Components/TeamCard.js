import React from "react";
import { NavLink } from "react-router-dom";
import { useRecoilState } from "recoil";
import { appState, projectsState } from "../globalstate";
import { getProjects } from "../Services/projects";

const TeamCard = ({ id, name, description, teammates }) => {
  const [app, setApp] = useRecoilState(appState);
  const [projects, setProjects] = useRecoilState(projectsState);

  const companyId = 5;

  const updateProjects = async () => {
    console.log(app.viewCompanyId);
    console.log(app.viewTeamId);
    const response = await getProjects(app.viewCompanyId, app.viewTeamId);
    setProjects(response.data);
    console.log(response.data);
  };

  const setTeamId = () =>
    setApp(
      Object.assign({}, app, {
        viewTeamId: id,
      })
    );

  return (
    <div className="team-card">
      <div className="team-header">
        <NavLink
          to={{ pathname: "/projects" }}
          onClick={() => {
            setTeamId();
            updateProjects();
          }}
        >
          {name}
        </NavLink>
        <span># of projects: {4}</span>
      </div>
      <div className="team-members">
        {teammates.map((member) => (
          <div key={member.id} className="team-pill">
            {member.profile.firstName} {member.profile.lastName}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamCard;
