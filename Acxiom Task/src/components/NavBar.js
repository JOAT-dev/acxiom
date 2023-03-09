import { useSelector } from "react-redux";
import { store } from "../store/store";
import "../styles/NavBar.css";
import logout from "./logout.png";
import { loggedOut } from "../store/userReducer";

const NavBar = () => {
  const users = useSelector((state) => state.userReducer);

  const handleLogout = () => {
    localStorage.clear();
    store.dispatch(loggedOut());
    window.location.reload();
  };

  return (
    <div>
      {/* <AppBar position="sticky" sx={{ height: "80px", textAlign: "center" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontSize: 32, fontWeight: 900 }}>
            Acxiom Reminder-App
          </Typography>
          {users.auth ? (
            <IconButton color="secondary">
              <img onClick={handleLogout} src={logout} className="logout" />
            </IconButton>
          ) : (
            <Button color="inherit">Login</Button>
          )}
        </Toolbar>
      </AppBar> */}
      <div className="navbar">
        Acxiom Reminder-App
        {users.auth && <img onClick={handleLogout} alt="log out" src={logout} className="logout" />}
      </div>
    </div>
  );
};

export default NavBar;
