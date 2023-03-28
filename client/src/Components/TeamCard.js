import React from "react";
import { Button, Card } from "@mui/material";

const TeamCard = ( {id, name, description, teammates }) => {
    
    
    return (
        <div className="team-card">
            <div className="team-header">
                <Button>{name}</Button>
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
