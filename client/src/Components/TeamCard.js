import React from "react";
import { Button, Card } from "@mui/material";
import {NavLink} from "react-router-dom";

const TeamCard = ( {id, name, description, teammates }) => {
    
    const projects = [
        {
            id:0,
        },
        {
            id:1,
        }
    ];
    
    return (
        <div className="team-card">
            <div className="team-header">
                <NavLink to={{pathname:"/projects"}} state={{projects}}>
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
