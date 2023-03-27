import { Navigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../../globalstate";
import NavBar from "../../Components/NavBar";
const CompanyScreen = () => {
  const [user, setUser] = useRecoilState(userState);

  if (!user.isLoggedIn) {
    return <Navigate replace to="/" />;
  } else if (!user.isAdmin) {
    return <Navigate replace to="/announcements" />;
  } else {
    return (
      <div className="page">
        <NavBar />
        <div className="page-body">
          <h1>Company</h1>
        </div>
      </div>
    );
  }
};

export default CompanyScreen;
