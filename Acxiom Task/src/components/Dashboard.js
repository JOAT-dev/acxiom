import { Link } from "react-router-dom";
import { store } from "../store/store";
import { useSelector } from "react-redux";
// import { useEffect } from "react";
// import { addUser } from "../store/userReducer";
// import AddReminder from "./AddReminder";
// import Reminders from "./Reminders";
// import Home from "./pages/home";

const Dashboard = () => {
  const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const d = new Date();
  const users = store.getState().userReducer;
  const loggedIndex = useSelector((state) => state.indexReducer[0]);
  //   useEffect(() => {
  //     fetch("http://localhost:5000/auth/", {
  //       method: "get",
  //       headers: { "Content-type": "application/json", Authorization: "Bearer " + localStorage.getItem("jwt") },
  //     })
  //       .then((res) => res.json())
  //       .then((result) => {
  //         console.log(result);
  //         // store.dispatch(addUser(result));
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }, []);
  //   console.log(users);
  return (
    <div className="home-container list">
      <h3>Welcome to the Remainder Application {users[loggedIndex].username}</h3>
      <div>
        Today is {weekday[d.getDay()]}, {d.getDate()} of {month[d.getMonth()]}
      </div>
      <Link className="link" to="/setremainder">
        Set Remainder
      </Link>
      <Link className="link" to="/remainders">
        Modify Remainder
      </Link>
      <Link className="link" to="/remainders">
        Disable Remainder
      </Link>
      <Link className="link" to="/remainders">
        Delete Remainder
      </Link>
      <Link className="link" to="/remainders">
        Enable Remainder
      </Link>
      <Link className="link" to="/remainders">
        View yours Remainder
      </Link>
    </div>
  );
};

export default Dashboard;

//   <AddReminder />
//   <Reminders />
