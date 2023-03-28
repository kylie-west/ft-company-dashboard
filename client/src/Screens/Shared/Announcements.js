import { Navigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import NavBar from "../../Components/NavBar";
import { announcementsState, userState } from "../../globalstate";

const Announcements = ({ openModal }) => {
  const [user] = useRecoilState(userState);
  const [announcements] = useRecoilState(announcementsState);

  const getDate = date =>
    date.toLocaleDateString("en-us", {
      month: "long",
      day: "numeric",
      year: "numeric"
    });

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
            <article key={announcement.id} className="announce-card">
              <header>
                <h2>{announcement.title}</h2>
                <div className="announce-info">
                  <div>{announcement.author}</div>
                  <div>{getDate(announcement.date)}</div>
                </div>
              </header>
              <p>{announcement.message}</p>
            </article>
          ))}
        </div>
      </div>
    );
  }
};

export default Announcements;
