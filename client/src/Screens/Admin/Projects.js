import { Navigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../../globalstate";
import { projectsState } from "../../globalstate";
import NavBar from "../../Components/NavBar";
import ProjectCard from "../../Components/ProjectCard";

const Projects = ({ openModal }) => {
  const [user, setUser] = useRecoilState(userState);
  const [projects, setProject] = useRecoilState(projectsState);

  function openAddModal() {
    openModal("create-project");
  }

  function openEditModal(proj) {
    openModal("edit-project", proj);
  }

  const projs = projects.map(({ name, description, active }, index) => (
    <ProjectCard
      key={index}
      name={name}
      description={description}
      active={active}
      openEditModal={() => openEditModal({ name, description, active })}
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
            <span className="go-back">{"<"} Back</span>
            <h1>Projects for Team dfsjgjks</h1>
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
