// import { useEffect } from "react";
import NavBar from "./components/NavBar";
import Routes from "./routes/Routes";
import "./styles/Container.css";
// import { store } from "./store/store";
// import { loggedIn } from "./store/userReducer";
// import { useSelector } from "react-redux";
// import { CircularProgress } from "@mui/material";

const App = () => {
  return (
    <div>
      <NavBar />
      <Routes />
    </div>
  );
};

export default App;
