import { Navigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { Paper } from "@mui/material";
import NavBar from "../../Components/NavBar";
import { announcementsState, userState } from "../../globalstate";

const Announcements = () => {
	const [user] = useRecoilState(userState);
	const [announcements] = useRecoilState(announcementsState);
	const getDate = date =>
		date.toLocaleDateString("en-us", {
			month: "long",
			day: "numeric",
			year: "numeric"
		});

	if (!user.isLoggedIn) {
		return <Navigate replace to="/" />;
	} else {
		return (
			<div className="page">
				<NavBar />
				<div style={wrapperStyle}>
					<h1 style={h1Style}>Announcements</h1>
					{announcements.map(announcement => (
						<article key={announcement.id}>
							<Paper style={paperStyle}>
								<header style={{ width: "100%", textAlign: "center" }}>
									<h2 style={{ fontSize: "2rem", fontWeight: 300 }}>
										{announcement.title}
									</h2>
									<div style={infoStyle}>
										<div>{announcement.author}</div>
										<div>{getDate(announcement.date)}</div>
									</div>
								</header>
								<p>{announcement.message}</p>
							</Paper>
						</article>
					))}
				</div>
			</div>
		);
	}
};

export default Announcements;

const wrapperStyle = {
	display: "flex",
	flexDirection: "column",
	gap: "4rem",
	alignItems: "center",
	width: "clamp(40vw, 600px, 90vw)",
	margin: "0 auto 50px auto"
};
const h1Style = {
	position: "relative",
	display: "inline-block",
	width: "100%",
	padding: "2.5rem",
	textAlign: "center",
	fontSize: "3rem",
	fontWeight: "400",
	borderBottom: "1px solid #deb992"
};
const paperStyle = {
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	alignItems: "center",
	gap: "2rem",
	padding: "30px 50px",
	height: "fit-content",
	width: "clamp(25vw, 600px, 90vw)",
	fontSize: "1.6rem",
	color: "#fff",
	background: "#0B2D45",
	borderRadius: "10px"
};
const infoStyle = {
	display: "flex",
	justifyContent: "space-between",
	marginTop: "0.5rem",
	color: "rgba(255, 255, 255, 0.6)"
};
