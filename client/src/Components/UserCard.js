import React from "react";

const UserCard = ({name, email, active, admin, status}) => {
    return (
        <div className="user-card">
            <div className="user-details">
                <span className="user-name">{name}</span>
                <span className="user-email">{email}</span>
                <span className="user-active">{active}</span>
                <span className="user-admin">{admin}</span>
                <span className="user-status">{status}</span>
            </div>
        </div>
    )
};

export default UserCard;