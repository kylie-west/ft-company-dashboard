import { Navigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../../globalstate";
import NavBar from "../../Components/NavBar";
const CompanyScreen = () => {
  const [user, setUser] = useRecoilState(userState);
  const [company, setCompany] = useRecoilState(userState);
  const companyList = ['Fed-ex','Google','Cook Systems']
  
  if (!user.isLoggedIn) {
    return <Navigate replace to="/" />;
  } else 
  if (!user.isAdmin) {
    return <Navigate replace to="/announcements" />;
  } else {
    return (
      <div className="page">
        <NavBar />
        <div className="page-body">
          <h1>Select Company</h1>

          <div>
          <select
          value = {''}
          onChange={event =>
						setCompany({
							company
						})}
          
          > <option value="Pick A Company" />

            {companyList.map(company => ( <option key={company} value={company}>
							{company}
						</option>)
           )} 
          
             </select>

          </div>
        </div>
      </div>
    );
  }
};

export default CompanyScreen;
