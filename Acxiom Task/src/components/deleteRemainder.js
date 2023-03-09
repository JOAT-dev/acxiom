import { Alert, FormControl, InputLabel, MenuItem, Paper, Select, Snackbar, TextField } from "@mui/material";
import React, { useState } from "react";
import { deleteReminder } from "../store/reminderReducer";
import { store } from "../store/store";
import { useHistory } from "react-router-dom";

function DeleteRemainder() {
  const history = useHistory();
  const [date, setDate] = useState("");
  const [datebyData, setdatebyData] = useState([]);
  const [dataLump, setdataLump] = useState([]);
  const [dataToSetUp, setdataToSetUp] = useState({});
  const [openFailedSubmit, setopenFailedSubmit] = useState(false);
  const [openSuccessSubmit, setopenSuccessSubmit] = useState(false);

  const [reminderText, setReminderText] = useState("");
  const [reminderSelectText, setReminderSelectText] = useState("");
  const [reminderTexts, setReminderTexts] = useState([]);
  const [reminderSubject, setReminderSubject] = useState("");
  const [reminderSubjects, setReminderSubjects] = useState(["Select a date"]);
  const users = store.getState().userReducer;
  const handleChange = (e) => {
    setReminderText(e.target.value);
  };
  console.log(users);
  const handleDateChange = (e) => {
    setDate(e.target.value);
    fetch("http://localhost:5000/remainder/remaindersbyDate", {
      method: "put",
      headers: { "Content-type": "application/json", Authorization: "Bearer " + localStorage.getItem("jwt") },
      body: JSON.stringify({ date: e.target.value }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result && result.result && result.result.length) {
          var data = [];
          setdatebyData(result.result);
          setdataLump(result.result);
          result.result.map((x) => data.push(x.subject));
          console.log(data);
          setReminderSubjects(data);
        } else {
          setReminderSubjects(["Select a date"]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleChangeSelectText = (e) => {
    setReminderSelectText(e.target.value);
    var data = dataLump.filter((x) => x.text.indexOf(e.target.value) > -1);
    setdataToSetUp(data[0]);
    setReminderText(data[0].text);
    // console.log(data[0].days);
    // var dame = [];
    // data.map((x) => dame.push(x.text));
    // console.log(dame);
    // setReminderTexts(dame);
  };
  const handleChangeSubject = (e) => {
    setReminderSubject(e.target.value);
    // console.log(datebyData, e.target.value);
    var data = datebyData.filter((x) => x.subject === e.target.value);
    setdataLump(data);
    var dame = [];
    data.map((x) => dame.push(x.text.substr(0, 20)));
    // console.log(dame);
    setReminderTexts(dame);
  };

  const handleCloseError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setopenFailedSubmit(false);
  };

  const handleCloseSuccess = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setopenSuccessSubmit(false);
  };

  const handleSubmit = () => {
    // console.log(date);
    fetch(`http://localhost:5000/remainder/remainder/${dataToSetUp._id}`, {
      method: "delete",
      headers: { "Content-type": "application/json", Authorization: "Bearer " + localStorage.getItem("jwt") },
      body: JSON.stringify({}),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        store.dispatch(deleteReminder(dataToSetUp._id));
        setopenSuccessSubmit(true);
      })
      .catch((err) => {
        console.log(err);
        setopenFailedSubmit(true);
      });
  };
  return (
    <div className="home-container">
      <h2>Delete Reminder</h2>
      <form action=""></form>
      <Paper className="reminder-text list">
        <form className="lisitem" onSubmit={handleSubmit}>
          Select a Date:
          <input type="date" value={date} onChange={handleDateChange} />
        </form>
        <FormControl className="lisitem" fullWidth>
          <InputLabel id="demo-simple-select-label">Subject</InputLabel>
          <Select labelId="demo-simple-select-label" id="demo-simple-select" value={reminderSubject} label="Subject" onChange={handleChangeSubject}>
            {reminderSubjects.map((remsub, i) => {
              return (
                <MenuItem key={i} value={remsub}>
                  {remsub}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl className="lisitem" fullWidth>
          <InputLabel id="demo-simple-select-label">Remainders</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={reminderSelectText}
            label="Subject"
            onChange={handleChangeSelectText}
          >
            {reminderTexts.map((remtext, i) => {
              return (
                <MenuItem key={i} value={remtext}>
                  {remtext}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <TextField
          className="lisitem"
          disabled
          id="outlined-multiline-flexible"
          label="Add Description"
          value={reminderText}
          onChange={handleChange}
          multiline
          maxRows={4}
        />
      </Paper>
      <div className="add-button">
        <input className="button" type="button" value="Back" onClick={() => history.push("/")} />
        <input className="button" type="button" value="Delete Reminder" onClick={handleSubmit} />
      </div>
      <Snackbar open={openFailedSubmit} autoHideDuration={6000} onClose={handleCloseError}>
        <Alert onClose={handleCloseError} severity="error" sx={{ width: "100%" }}>
          Fill all the details Properly or Something went wrong
        </Alert>
      </Snackbar>
      <Snackbar open={openSuccessSubmit} autoHideDuration={6000} onClose={handleCloseSuccess}>
        <Alert onClose={handleCloseSuccess} severity="success" sx={{ width: "100%" }}>
          Deleted Successfully
        </Alert>
      </Snackbar>
    </div>
  );
}

export default DeleteRemainder;
