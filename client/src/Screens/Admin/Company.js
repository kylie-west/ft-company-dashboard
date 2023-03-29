import { Navigate, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState, companyState, appState } from "../../globalstate";
import NavBar from "../../Components/NavBar";
const CompanyScreen = () => {
  const [app, setAppState] = useRecoilState(appState);
  const [user, setUser] = useRecoilState(userState);
  const [companies, setCompanies] = useRecoilState(companyState);
  const navigate = useNavigate();
  //const companyList = ["Fed-ex", "Google", "Cook Systems"];

  const options = companies.map((company) => (
    <option key={company.id} value={company.id}>
      {company.name}
    </option>
  ));

  function handleChange(e) {
    setAppState(Object.assign({}, app, { viewCompanyId: e.target.value }));
    navigate("/announcements");
  }

  if (!user.isLoggedIn) {
    return <Navigate replace to="/" />;
  } else if (!user.isAdmin) {
    return <Navigate replace to="/announcements" />;
  } else {
    return (
      <div className="page">
        <NavBar />
        <div className="page-body">
          <h1>Select Company</h1>

          <div>
            <select
              value={companies.filter((c) => c.id === app.viewCompanyId)[0]}
              onChange={(event) => handleChange(event)}
            >
              <option value="Pick A Company" />
              {options}
            </select>
          </div>
        </div>
      </div>
    );
  }
};

export default CompanyScreen;
