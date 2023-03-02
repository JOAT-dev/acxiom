import TextField from "@material-ui/core/TextField";
import { useState } from "react";
import { addReminder } from "../store/reminderReducer";
import { store } from "../store/store";
import "../styles/AddReminder.css";
import { useSelector } from "react-redux";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { MenuItem, Paper, Select } from "@material-ui/core";
import { Alert, FormControlLabel, FormLabel, Radio, RadioGroup, Snackbar } from "@mui/material";

const AddReminder = () => {
  //  const Reminder = () => {
  //  const [date, setDate] = useState("");

  //   const handleChange = (event) => {
  //     setDate(event.target.value);
  //   };

  //   const handleSubmit = (event) => {
  //     event.preventDefault();
  //     // Add code to save the reminder with the date
  //   };

  const [date, setDate] = useState("");
  const [openFailedSubmit, setopenFailedSubmit] = useState("");

  const [reminderText, setReminderText] = useState("");
  const [reminderSubject, setReminderSubject] = useState("");
  const [reminderemail, setReminderemail] = useState("");
  const [remindercontact, setRemindercontact] = useState("");
  const [remindersms, setRemindersms] = useState("");
  const [reminderoccur, setReminderoccur] = useState("");
  const loggedIndex = useSelector((state) => state.indexReducer[0]);
  const users = store.getState().userReducer;
  const handleChange = (e) => {
    setReminderText(e.target.value);
  };
  console.log(users);
  const handleDateChange = (e) => {
    setDate(e.target.value);
  };
  const handleChangeSubject = (e) => {
    setReminderSubject(e.target.value);
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
      username: users[loggedIndex].username,
      date: date,
      subject: reminderSubject,
      email: reminderemail,
      text: reminderText,
      contact: remindercontact,
      sms: remindersms,
      occur: reminderoccur,
    };
    fetch("http://localhost:5000/remainder/create", {
      method: "post",
      headers: { "Content-type": "application/json", Authorization: "Bearer " + localStorage.getItem("jwt") },
      body: JSON.stringify(reminder),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        store.dispatch(addReminder(result.result));
        setReminderText("");
        setReminderemail("");
        setReminderSubject("");
        setDate("");
        setReminderoccur("");
        setRemindercontact("");
        setRemindersms("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="home-container">
      <h2>Set Your Reminder</h2>
      <form action=""></form>
      <Paper className="reminder-text list">
        <form className="lisitem" onSubmit={handleSubmit}>
          Select a Date:
          <input type="date" value={date} onChange={handleDateChange} />
        </form>
        <FormControl className="lisitem" fullWidth>
          <InputLabel id="demo-simple-select-label">Subject</InputLabel>
          <Select labelId="demo-simple-select-label" id="demo-simple-select" value={reminderSubject} label="Subject" onChange={handleChangeSubject}>
            <MenuItem value="Subject 1">Subject 1</MenuItem>
            <MenuItem value="Subject 2">Subject 2</MenuItem>
            <MenuItem value="Subject 3">Subject 3</MenuItem>
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
        <input className="button" type="button" value="Add Reminder" onClick={handleSubmit} />
      </div>
      <Snackbar open={openFailedSubmit} autoHideDuration={6000} onClose={handleCloseError}>
        <Alert onClose={handleCloseError} severity="error" sx={{ width: "100%" }}>
          Fill all the details Properly or Something went wrong
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AddReminder;

// import React, { useState } from "react";

// const Reminder = () => {
//   const [date, setDate] = useState("");

//   const handleChange = (event) => {
//     setDate(event.target.value);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // Add code to save the reminder with the date
//   };

//   return (
// <form onSubmit={handleSubmit}>
//   <input type="date" value={date} onChange={handleChange} />
// </form>
//   );
// };

// export default Reminder;
