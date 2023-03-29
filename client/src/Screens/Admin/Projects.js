import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../../globalstate";
import { projectsState } from "../../globalstate";
import { appState } from "../../globalstate";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import NavBar from "../../Components/NavBar";
import ProjectCard from "../../Components/ProjectCard";
import { getProjects } from "../../Services/users";

const Projects = ({ openModal }) => {
  const [app] = useRecoilState(appState);
  const [user, setUser] = useRecoilState(userState);
  const [projects, setProjects] = useRecoilState(projectsState);
  //const [projects, setProjects] = useState(useLocation().state.projects);

  // function addProjects(project) {
  //   setProjects(...projects, project);
  // }

  // function editProject(project) {
  //   const temp = [...projects];
  //   const index = temp.indexOf(temp.filter((p) => p.id === project.id));
  //   temp[index] = project;
  //   setProjects(temp);
  // }

  // if refreshing on projects page, refetch
  // useEffect(() => {
  //   if (projects.length === 0) {
  //     if (app.viewCompanyId && app.viewTeamId) {
  //       getProjects(app.viewCompanyId, app.viewTeamId).then((res) =>
  //         setProjects(res)
  //       );
  //     }
  //   }
  // }, []);

  function openAddModal() {
    openModal("create-project");
  }

  function openEditModal(projectId) {
    openModal("edit-project", projectId);
  }

  const noProjs = <div>No projects!</div>;

  const projs = projects.map((p) => (
    <ProjectCard
      key={p.id}
      name={p.name}
      description={p.description}
      active={p.active}
      openEditModal={() => openEditModal({ id: p.id })}
    />
  ));

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
            <h1>Projects for Team dfsjgjks</h1>
          </div>

          <div className="project-list">
            {projects.length === 0 && noProjs}
            {user.isAdmin && (
              <button className="new-project-btn" onClick={openAddModal}>
                New
              </button>
            )}
            {projs}
          </div>
        </div>
      
    );
  }
};

export default Projects;
