import {Navigate} from "react-router-dom";
import {useRecoilState} from "recoil";
import NavBar from "../../Components/NavBar";
import {userState} from "../../globalstate";
import "../../App.css"

const Users = ({openModal}) => {
    const [user, setUser] = useRecoilState(userState);
    const initialData = [
        {name: "Chris Purnell", email: "uliajkas@jhosk.com", active: "yes", admin: "yes", status: "joined"},
        {name: "Will Marttala", email: "uliajkas@jhosk.com", active: "yes", admin: "yes", status: "joined"},
        {name: "Kenny Worth", email: "uliajkas@jhosk.com", active: "yes", admin: "yes", status: "joined"}
    ]

    function openAddModal() {
        openModal("add-user");
    }

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

                        {user.isAdmin && (
                            <button className="add-user-btn" onClick={openAddModal}>Add User</button>
                        )}
                    </div>
                    <div>
                        <table className="table">
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Active</th>
                                <th>Admin</th>
                                <th>Status</th>
                            </tr>
                            {initialData.map((val, key) => {
                                return (
                                    <tr key={key}>
                                        <td>{val.name}</td>
                                        <td>{val.email}</td>
                                        <td>{val.active}</td>
                                        <td>{val.admin}</td>
                                        <td>{val.status}</td>
                                    </tr>
                                )
                            })
                            }

                        </table>
                        <button className="add-user-btn">Add User</button>
                    </div>
                </div>
            </div>
        );
    }
};

export default Users;
