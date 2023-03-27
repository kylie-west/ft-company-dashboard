import { createPortal } from "react-dom";
import { Route, Routes } from "react-router-dom";
import { useRecoilState } from "recoil";
import { modalState } from "./globalstate";
import "./App.css";
import Announcements from "./Screens/Shared/Announcements";
import Login from "./Screens/Shared/Login";
import CompanyScreen from "./Screens/Admin/Company";
import Projects from "./Screens/Admin/Projects";
import Users from "./Screens/Admin/Users";
import Teams from "./Screens/Admin/Teams";
import Project from "./Screens/Worker/Project";
import ModalContainer from "./Components/ModalContainer";

function App() {
  const [modal, setModal] = useRecoilState(modalState);
  function closeModal() {
    setModal({ isOpen: false, type: "", data: {} });
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/announcements" element={<Announcements />} />
        <Route path="/company" element={<CompanyScreen />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/users" element={<Users />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/project" element={<Project />} />
      </Routes>
      {modal.isOpen &&
        createPortal(
          <ModalContainer
            isOpen={modal.isOpen}
            type={modal.type}
            closeModal={closeModal}
          />,
          document.body
        )}
    </div>
  );
}

export default App;
