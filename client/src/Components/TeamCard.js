import React, { useEffect } from "react";
import { Button, Card } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useRecoilState } from "recoil";
import { appState, projectsState } from "../globalstate";

const TeamCard = ({ id, name, description, teammates }) => {
  const [app, setApp] = useRecoilState(appState);
  const [projects, setProjects] = useRecoilState(projectsState);

  const companyId = 5;

  const updateProjects = () =>
    setProjects(
      // fetch("/company/" + companyId + "/teams/" + id + "/projects")
      // .then(response => response.json())
      // .then((data) => {
      //   setProjects(data);
      //   console.log(data);
      // })

      [
        {
          id: 20,
          name: "Cool Project?",
          description:
            "Egestas quis ipsum suspendisse ultrices gravida dictum fusce ut placerat orci nulla pellentesque dignissim enim sit amet venenatis urna cursus",
          active: true,
          team: {
            id: 10,
            name: "Awesome",
            description: "Among us",
            users: [{ id: 1 }]
          }
        }
      ]
    );

  const setTeamId = () =>
    setApp({
      viewTeamId: { id }
    });

  return (
    <div className="team-card">
      <div className="team-header">
        <NavLink
          to={{ pathname: "/projects" }}
          onClick={() => {
            setTeamId();
            updateProjects();
          }}>
          {name}
        </NavLink>
        <span># of projects: {4}</span>
      </div>
      <div className="team-members">
        {teammates.map(member => (
          <div key={member.id} className="team-pill">
            {member.profile.firstname} {member.profile.lastname}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamCard;
