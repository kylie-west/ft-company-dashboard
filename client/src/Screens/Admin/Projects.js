import { Navigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../../globalstate";
import { projectsState } from "../../globalstate";
import NavBar from "../../Components/NavBar";
import ProjectCard from "../../Components/ProjectCard";

const Projects = () => {
  const [user, setUser] = useRecoilState(userState);
  const [projects, setProject] = useRecoilState(projectsState);

  const projs = projects.map((p, index) => (
    <ProjectCard
      key={index}
      name={p.name}
      description={p.description}
      active={p.active}
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

            <div className="project-list">{projs}</div>
          </div>
        </div>
      </div>
    );
  }
};

export default Projects;
