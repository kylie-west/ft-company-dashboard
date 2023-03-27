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
      <div>
        <NavBar />
        <h1>Company</h1>
      </div>
    );
  }
};

export default CompanyScreen;
