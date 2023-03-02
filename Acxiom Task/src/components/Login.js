import TextField from "@material-ui/core/TextField";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Auth.css";
import { store } from "../store/store";
import { useHistory } from "react-router";
import { changeLoggedIndex } from "../store/indexReducer";
import { Alert, Snackbar } from "@mui/material";

const Login = () => {
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //   const users = store.getState().userReducer;
  const [openFailedSubmit, setopenFailedSubmit] = useState({ status: false, message: "" });
  const handleCloseError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setopenFailedSubmit({ ...openFailedSubmit, status: false });
  };
  const userChange = (e) => {
    setUsername(e.target.value);
  };

  const passwordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    fetch("http://localhost:5000/auth/signin", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.error) {
          setopenFailedSubmit({ status: true, message: result.error });
          return;
        }
        localStorage.setItem("jwt", result.token);
        store.dispatch(changeLoggedIndex(0));
        setUsername("");
        setPassword("");
      })
      .catch((err) => {
        console.log(err);
        setopenFailedSubmit({ status: true, message: err });
      });
  };

  return (
    <div className="login-container">
      <div className="login-header">Log In</div>
      <div className="login-input">
        <TextField value={username} onChange={userChange} placeholder="Username" variant="outlined" fullWidth />
      </div>
      <div className="login-input">
        <TextField value={password} onChange={passwordChange} placeholder="Password" type="password" variant="outlined" fullWidth />
      </div>
      <div className="login-button-container">
        <input onClick={handleLogin} className="login-button" type="button" value="Log In" />
      </div>
      <div className="login-already">
        New User?{" "}
        <Link style={{ textDecoration: "none", fontWeight: "bold" }} to="/signup">
          Sign Up
        </Link>
      </div>
      <Snackbar open={openFailedSubmit.status} autoHideDuration={6000} onClose={handleCloseError}>
        <Alert onClose={handleCloseError} severity="error" sx={{ width: "100%" }}>
          {openFailedSubmit.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Login;
