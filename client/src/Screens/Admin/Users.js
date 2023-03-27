import { Navigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import NavBar from "../../Components/NavBar";
import { userState } from "../../globalstate";

const Users = () => {
  const [user, setUser] = useRecoilState(userState);

  if (!user.isLoggedIn) {
    return <Navigate replace to="/" />;
  } else {
    return (
      <div className="page">
        <NavBar />
        <div className="page-body">
          <h1>Users</h1>
        </div>
      </div>
    );
  }
};

export default Users;
