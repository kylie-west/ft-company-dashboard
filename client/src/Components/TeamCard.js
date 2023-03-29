import React from "react";
import { Button, Card } from "@mui/material";
import {NavLink} from "react-router-dom";
import { useRecoilState } from "recoil";
import { appState } from "../globalstate";

const TeamCard = ( {id, name, description, teammates }) => {
    const [app, setApp] = useRecoilState(appState);
    
    const setTeamId = () => setApp({
      viewTeamId:{id},
    })
    
    return (
        <div className="team-card">
            <div className="team-header">
                <NavLink to={{pathname:"/projects"}} onClick={setTeamId}>
                    {name}
                </NavLink>
                <span># of projects: {4}</span>
            </div>
            <div className="team-members">
                {teammates.map( member => (
                    <Card key={member.id}>{member.profile.firstname} {member.profile.lastname}</Card>
                ))}
            </div>
        </div>
    );
};

export default TeamCard;
