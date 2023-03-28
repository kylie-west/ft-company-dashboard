import { Navigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import TeamCard from "../../Components/TeamCard"
import NavBar from "../../Components/NavBar";
import { teamState, userState } from "../../globalstate";

const Teams = () => {
  const [user] = useRecoilState(userState);
  const [teams] = useRecoilState(teamState);

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
  } else {
    return (
      <div className="page">
        <NavBar />
        <div className="page-body">
          <h1>Teams</h1>
          <div className="team-body">
            {ts}
          </div>
        </div>
      </div>
    );
  }
};

export default Teams;
