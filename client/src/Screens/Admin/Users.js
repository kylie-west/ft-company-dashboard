import {Navigate} from "react-router-dom";
import {useRecoilState} from "recoil";
import NavBar from "../../Components/NavBar";
import {allUsersState, userState} from "../../globalstate";
import "../../App.css"
import UserCard from "../../Components/UserCard";

const Users = ({openModal}) => {
    const [user, setUser] = useRecoilState(userState);
    const [users, setUsers] = useRecoilState(allUsersState);

    function openAddModal() {
        openModal("add-user");
    }

    const showUsers = users.map(({name, email, active, admin, status}, index) => (
        <UserCard
            key={index}
            name={name}
            email={email}
            active={active}
            admin={admin}
            status={status}
        />
    ));

    if (!user.isLoggedIn) {
        return <Navigate replace to="/"/>;
    } else {
        return (
            <div className="page">
                <NavBar/>
                <div className="page-body">
                    <div className="header-w-subtitle-wrapper">
                        <h1>User Registry</h1>
                        <h2>A general view of all your members in your organization</h2>
                    </div>
                    <div className="user-list">
                        <div className="user-table">
                            <div className="row-with-5-columns user-header-card">
                                <span>Name</span>
                                <span>Email</span>
                                <span>Active</span>
                                <span>Admin</span>
                                <span>Status</span>
                            </div>
                            {showUsers}
                        </div>
                        {user.isAdmin && (
                            <button className="add-user-btn" onClick={openAddModal}>Add User</button>
                        )}
                    </div>
                </div>
            </div>
        );
    }
};

export default Users;
