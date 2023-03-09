import {
  Alert,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Snackbar,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { modifyRemainder } from "../store/reminderReducer";
import { store } from "../store/store";
import { useHistory } from "react-router-dom";

function ModifyReminder() {
  const history = useHistory();
  const [date, setDate] = useState("");
  const [datebyData, setdatebyData] = useState([]);
  const [dataLump, setdataLump] = useState([]);
  const [dataToSetUp, setdataToSetUp] = useState({});
  const [openFailedSubmit, setopenFailedSubmit] = useState("");

  const [reminderText, setReminderText] = useState("");
  const [reminderSelectText, setReminderSelectText] = useState("");
  const [reminderTexts, setReminderTexts] = useState([]);
  const [reminderSubject, setReminderSubject] = useState("");
  const [reminderSubjects, setReminderSubjects] = useState(["Select a date"]);
  const [reminderemail, setReminderemail] = useState("");
  const [remindercontact, setRemindercontact] = useState("");
  const [remindersms, setRemindersms] = useState("");
  const [reminderoccur, setReminderoccur] = useState("");
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
    setReminderemail(data[0].email);
    setRemindercontact(data[0].contact);
    setRemindersms(data[0].sms);
    // console.log(data[0].days);
    setReminderoccur(data[0].days);
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
  const handleChangeEmail = (e) => {
    setReminderemail(e.target.value);
  };
  const handleChangecontact = (e) => {
    setRemindercontact(e.target.value);
  };
  const handleChangesms = (e) => {
    setRemindersms(e.target.value);
  };

  const handleCloseError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setopenFailedSubmit(false);
  };

  const handleSubmit = () => {
    // console.log(date);
    if (!reminderText || !reminderemail || !reminderSubject || !date) {
      console.log("ntg");
      setopenFailedSubmit(true);
      return;
    }
    const reminder = {
      id: dataToSetUp._id,
      email: reminderemail,
      text: reminderText,
      contact: remindercontact,
      sms: remindersms,
      days: reminderoccur,
    };
    fetch("http://localhost:5000/remainder/modify", {
      method: "put",
      headers: { "Content-type": "application/json", Authorization: "Bearer " + localStorage.getItem("jwt") },
      body: JSON.stringify(reminder),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        store.dispatch(modifyRemainder(result.result));
        history.push("/remainders");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="home-container">
      <h2>Modify Reminder</h2>
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
          required
          id="outlined-multiline-flexible"
          label="Add Description"
          value={reminderText}
          onChange={handleChange}
          multiline
          maxRows={4}
        />
        <TextField className="lisitem" id="filled-basic" value={reminderemail} onChange={handleChangeEmail} label="Email" variant="filled" />
        <TextField className="lisitem" id="filled-basic" value={remindercontact} onChange={handleChangecontact} label="Contact no" variant="filled" />
        <TextField className="lisitem" id="filled-basic" value={remindersms} onChange={handleChangesms} label="SMS no" variant="filled" />
        <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label">Reoccur for next</FormLabel>
          <RadioGroup
            row
            value={reminderoccur}
            onChange={(e) => setReminderoccur(e.target.value)}
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel value="7" control={<Radio />} label="7 Days" />
            <FormControlLabel value="5" control={<Radio />} label="5 Days" />
            <FormControlLabel value="3" control={<Radio />} label="3 Days" />
            <FormControlLabel value="2" control={<Radio />} label="2 Days" />
          </RadioGroup>
        </FormControl>
      </Paper>
      <div className="add-button">
        <input className="button" type="button" value="Back" onClick={() => history.push("/")} />
        <input className="button" type="button" value="Modify Reminder" onClick={handleSubmit} />
      </div>
      <Snackbar open={openFailedSubmit} autoHideDuration={6000} onClose={handleCloseError}>
        <Alert onClose={handleCloseError} severity="error" sx={{ width: "100%" }}>
          Fill all the details Properly or Something went wrong
        </Alert>
      </Snackbar>
    </div>
  );
}

export default ModifyReminder;
