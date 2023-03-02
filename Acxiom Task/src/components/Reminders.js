import "../styles/Reminders.css";
import "../styles/Card.css";
import { useSelector } from "react-redux";
import { store } from "../store/store";
import cancel from "./cancel.png";
import { setReminder, deleteReminder } from "../store/reminderReducer";
import { useEffect } from "react";

const Reminders = () => {
  const tmpReminders = useSelector((state) => state.reminderReducer);
  const reminders = tmpReminders.filter(() => true);
  const loggedIndex = useSelector((state) => state.indexReducer[0]);
  const users = store.getState().userReducer;

  const handleDelete = (reminder, id) => {
    fetch(`http://localhost:5000/remainder/remainder/${id}`, {
      method: "delete",
      headers: { "Content-type": "application/json", Authorization: "Bearer " + localStorage.getItem("jwt") },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.error) {
          return;
        }
        if (result.message) {
          console.log(result.message);
          alert(result.message);
        }
        // store.dispatch(setReminder(result));
        store.dispatch(deleteReminder(reminder));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetch("http://localhost:5000/remainder/", {
      method: "get",
      headers: { "Content-type": "application/json", Authorization: "Bearer " + localStorage.getItem("jwt") },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        store.dispatch(setReminder(result));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  //   console.log(reminders);
  return (
    <div className="reminders">
      <div className="reminders-header">Early Reminders</div>
      <div className="row">
        {reminders && reminders.length
          ? reminders.map((reminder) => {
              return (
                reminder && (
                  <div className="column">
                    <div className="card">
                      <img src={cancel} className="delete" onClick={() => handleDelete(reminder, reminder._id)} />
                      <div>Username: {reminder.username}</div>
                      <div>Date: {reminder.date && reminder.date.substring(0, 10)}</div>
                      <div>Email: {reminder.email}</div>
                      <div>Description: {reminder.text}</div>
                      <div>Subject: {reminder.subject}</div>
                      <div>Contact: {reminder.contact}</div>
                      <div>SMS: {reminder.sms}</div>
                    </div>
                  </div>
                )
              );
            })
          : ""}
      </div>
    </div>
  );
};

export default Reminders;
