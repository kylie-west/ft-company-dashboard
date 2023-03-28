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
