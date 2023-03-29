import { Navigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import NavBar from "../../Components/NavBar";
import { announcementsState, userState } from "../../globalstate";

const Announcements = ({ openModal }) => {
  const [user] = useRecoilState(userState);
  const [announcements] = useRecoilState(announcementsState);

  const formatDate = date =>
    date.toLocaleDateString("en-us", {
      month: "long",
      day: "numeric",
      year: "numeric"
    });

  const getAuthorName = ({ firstname, lastname }) => {
    return firstname + " " + lastname[0] + ".";
  };

  const handleClick = e => {
    e.preventDefault();
    openModal("create-announcement");
  };

  if (!user.isLoggedIn) {
    return <Navigate replace to="/" />;
  } else {
    return (
      <div className="page">
        <NavBar />
        <div className="announce-wrapper">
          <div className="announce-top">
            <h1>Announcements</h1>
            <button onClick={handleClick} className="announce-btn">
              New
            </button>
          </div>
          {announcements.map(announcement => (
            <article
              key={announcement.id}
              className={`announce-card${
                user.id === announcement.author.id ? " isAuthor" : ""
              }`}>
              {user.id === announcement.author.id ? (
                <div className="announce-options">
                  <EditIcon className="announce-icon edit" />
                  <DeleteForeverIcon className="announce-icon delete" />
                </div>
              ) : null}
              <div className="content">
                <header>
                  <h2>{announcement.title}</h2>
                  <div className="announce-info">
                    <div>{getAuthorName(announcement.author.profile)}</div>
                    <div>{formatDate(announcement.date)}</div>
                  </div>
                </header>
                <p>{announcement.message}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    );
  }
};

export default Announcements;
