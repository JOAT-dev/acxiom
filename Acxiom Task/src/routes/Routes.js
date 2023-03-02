import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import AddReminder from "../components/AddReminder";
import Reminders from "../components/Reminders";
import Login from "../components/Login";
import Signup from "../components/Signup";
import PrivateRoute from "./PrivateRoute";
import { useSelector } from "react-redux";

const Routes = () => {
  const users = useSelector((state) => state.userReducer);
  const loggedIndex = useSelector((state) => state.indexReducer[0]);
  console.log(users);
  if (loggedIndex != -1) {
    console.log("logged");
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/setremainder" component={AddReminder} />
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
