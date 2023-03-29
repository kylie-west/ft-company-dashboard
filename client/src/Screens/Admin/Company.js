import { Navigate, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState, companyState, appState } from "../../globalstate";
import NavBar from "../../Components/NavBar";
import { Select, MenuItem, FormControl } from "@mui/material";
const CompanyScreen = () => {
  const [app, setAppState] = useRecoilState(appState);
  const [user, setUser] = useRecoilState(userState);
  const [companies, setCompanies] = useRecoilState(companyState);
  const navigate = useNavigate();
  //const companyList = ["Fed-ex", "Google", "Cook Systems"];

  const options = companies.map((company) => (
    <MenuItem key={company.id} value={company.id.toString()}>
      {company.name}
    </MenuItem>
  ));

  function handleChange(e) {
    setAppState(Object.assign({}, app, { viewCompanyId: e.target.value }));
    navigate("/announcements");
  }

  const style = {
    backgroundColor: "white",
    borderRadius: "6px",
    fontSize: "16px",
    minWidth: "120px",
  };

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

          {companies.length > 0 && (
            <FormControl sx={style}>
              <Select value={""} onChange={(event) => handleChange(event)}>
                {options}
              </Select>
            </FormControl>
          )}
        </div>
      </div>
    );
  }
};

export default CompanyScreen;
