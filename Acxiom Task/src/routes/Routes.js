import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import AddReminder from "../components/AddReminder";
import Reminders from "../components/Reminders";
import Login from "../components/Login";
import Signup from "../components/Signup";
import PrivateRoute from "./PrivateRoute";
import { useSelector } from "react-redux";
import ModifyReminder from "../components/modifyReminder";
import { CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { store } from "../store/store";
import { loaded, loggedIn } from "../store/userReducer";
import { setReminder } from "../store/reminderReducer";
import DeleteRemainder from "../components/deleteRemainder";

const Routes = () => {
  const users = useSelector((state) => state.userReducer);
  const Remainders = useSelector((state) => state.reminderReducer);
  console.log(Remainders);
  useEffect(() => {
    fetch("http://localhost:5000/auth/", {
      method: "get",
      headers: { "Content-type": "application/json", Authorization: "Bearer " + localStorage.getItem("jwt") },
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        if (result.error) {
          localStorage.clear();
          store.dispatch(loaded());
          return;
        }
        store.dispatch(loggedIn(result.username));
      })
      .catch((err) => {
        localStorage.clear();
        store.dispatch(loaded());
        console.log(err);
      });
    // console.log("sdsd");
  }, []);
  useEffect(() => {
    fetch("http://localhost:5000/remainder/yourremainder", {
      method: "get",
      headers: { "Content-type": "application/json", Authorization: "Bearer " + localStorage.getItem("jwt") },
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        store.dispatch(setReminder(result));
      })
      .catch((err) => {
        console.log(err);
      });
    // console.log("sdsd");
  }, []);
  if (users.loading) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }
  // console.log(users);
  if (users.auth) {
    console.log("logged");
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/setremainder" component={AddReminder} />
          <Route exact path="/modifyremainder" component={ModifyReminder} />
          <Route exact path="/deleteremainder" component={DeleteRemainder} />
          <Route exact path="/remainders" component={Reminders} />
          <Redirect to="/" />
        </Switch>
      </Router>
    );
  }
  return (
    <Router>
      <Switch>
        <PrivateRoute exact path="/" component={Dashboard} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Redirect to="/login" />
      </Switch>
    </Router>
  );
};

export default Routes;
