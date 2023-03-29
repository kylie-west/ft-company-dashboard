import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../../globalstate";
import { projectsState } from "../../globalstate";
import { appState } from "../../globalstate";
import { Link } from "react-router-dom";
import NavBar from "../../Components/NavBar";
import ProjectCard from "../../Components/ProjectCard";
import { getProjects } from "../../Services/projects";

const Projects = ({ openModal }) => {
  const [app] = useRecoilState(appState);
  const [user] = useRecoilState(userState);
  const [projects, setProjects] = useRecoilState(projectsState);
  const [team, setTeam] = useState("");

  function openAddModal() {
    openModal("create-project");
  }

  function openEditModal(projectId) {
    openModal("edit-project", projectId);
  }

  const projs = projects.map((p) => (
    <ProjectCard
      key={p.id}
      name={p.name}
      description={p.description}
      active={p.active}
      openEditModal={() => openEditModal({ id: p.id })}
    />
  ));

  //if refreshing on projects page, refetch
  useEffect(() => {
    if (projects.length === 0) {
      if (app.viewCompanyId && app.viewTeamId) {
        getProjects(app.viewCompanyId, app.viewTeamId).then((data) =>
          setProjects(data)
        );
      }
    } else {
      setTeam(projects[0].team?.name);
    }
  }, []);

  if (!user.isLoggedIn) {
    return <Navigate replace to="/" />;
  } else {
    return (
      <div className="page">
        <NavBar />
        <div className="page-body">
          <div className="header-wrapper">
            <Link to="/teams" className="go-back">
              {"<"} Back
            </Link>
            <h1>Projects for {team}</h1>
          </div>

          <div className="project-list">
            {user.isAdmin && (
              <button className="new-project-btn" onClick={openAddModal}>
                New
              </button>
            )}
            {projs}
          </div>
        </div>
      </div>
    );
  }
};

export default Projects;
