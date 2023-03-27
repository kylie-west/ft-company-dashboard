import { Navigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import NavBar from "../../Components/NavBar";
import { userState } from "../../globalstate";

const Projects = () => {
  const [user, setUser] = useRecoilState(userState);

  if (!user.isLoggedIn) {
    return <Navigate replace to="/" />;
  } else {
    return (
      <div class="page">
        <NavBar />
        <div class="page-body">
          <h1>Projects</h1>
        </div>
      </div>
    );
  }
};

export default Projects;
