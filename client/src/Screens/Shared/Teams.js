import { Navigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import TeamCard from "../../Components/TeamCard";
import NavBar from "../../Components/NavBar";
import { appState, teamState, userState } from "../../globalstate";
import { getTeams } from "../../Services/teams";

const Teams = () => {
  const [app] = useRecoilState(appState)
  const [user] = useRecoilState(userState);
  const [teams, setTeams] = useRecoilState(teamState);

  const getAllTeams = async () => {
    const response = await getTeams(app.viewCompanyId);
    setTeams(response.data)
  }

  const ts = teams.map(({ id, name, description, teammates }) => (
    <TeamCard
      key={id}
      id={id}
      name={name}
      projectCount={4}
      description={description}
      teammates={teammates}
    />
  ));

  if (!user.isLoggedIn) {
    return <Navigate replace to="/" />;
  } else if (app.viewCompanyId === undefined) {
    return <Navigate replace to="/company" />
  } else {
    if (user.isAdmin) {
      getAllTeams();
    }
    return (
      <div className="page">
        <NavBar />
        <div className="page-body">
          <h1>Teams</h1>
          <div className="team-body">{ts}</div>
        </div>
      </div>
    );
  }
};

export default Teams;
