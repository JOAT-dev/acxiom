import { useSelector } from "react-redux";
import { changeLoggedIndex } from "../store/indexReducer";
import { store } from "../store/store";
import "../styles/NavBar.css";
import logout from "./logout.png";

const NavBar = () => {
  const loggedIndex = useSelector((state) => state.indexReducer[0]);

  const handleLogout = () => {
    localStorage.clear();
    store.dispatch(changeLoggedIndex(-1));
    window.location.reload();
  };

  return (
    <div className="navbar">
      Acxiom Reminder-App
      {loggedIndex != -1 && <img onClick={handleLogout} src={logout} className="logout" />}
    </div>
  );
};

export default NavBar;
