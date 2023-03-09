import "../styles/Reminders.css";
import "../styles/Card.css";
import { useSelector } from "react-redux";
// import { store } from "../store/store";
// import { deleteReminder } from "../store/reminderReducer";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, styled, tableCellClasses } from "@mui/material";
import { useHistory } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    fontWeight: 700,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Reminders = () => {
  const reminders = useSelector((state) => state.reminderReducer);
  const history = useHistory();
  // const users = store.getState().userReducer;

  // const handleDelete = (reminder, id) => {
  //   fetch(`http://localhost:5000/remainder/remainder/${id}`, {
  //     method: "delete",
  //     headers: { "Content-type": "application/json", Authorization: "Bearer " + localStorage.getItem("jwt") },
  //   })
  //     .then((res) => res.json())
  //     .then((result) => {
  //       console.log(result);
  //       console.log(id);
  //       store.dispatch(deleteReminder(id));
  //       if (result.error) {
  //         return;
  //       }
  //       if (result.message) {
  //         console.log(result.message);
  //         alert(result.message);
  //       }
  //       // store.dispatch(setReminder(result));
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  console.log(reminders);
  return (
    <div>
      <div className="reminders">
        <div className="reminders-header">Early Reminders</div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Remainder Name</StyledTableCell>
                <StyledTableCell>Reminder Subject</StyledTableCell>
                <StyledTableCell>Remainder Description</StyledTableCell>
                <StyledTableCell>Email Address</StyledTableCell>
                <StyledTableCell>Contact No</StyledTableCell>
                <StyledTableCell>SMS No</StyledTableCell>
                <StyledTableCell>Recurrence Frequency</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reminders && reminders.length
                ? reminders.map((row) => (
                    <StyledTableRow key={row._id}>
                      <StyledTableCell>{row._id}</StyledTableCell>
                      <StyledTableCell>{row.subject}</StyledTableCell>
                      <StyledTableCell>{row.text}</StyledTableCell>
                      <StyledTableCell>{row.email}</StyledTableCell>
                      <StyledTableCell>{row.contact}</StyledTableCell>
                      <StyledTableCell>{row.sms}</StyledTableCell>
                      <StyledTableCell>{row.days}</StyledTableCell>
                    </StyledTableRow>
                  ))
                : ""}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Button variant="contained" sx={{ margin: "0 45vw" }} onClick={() => history.push("/")}>
        Back
      </Button>
    </div>
  );
};

export default Reminders;

// <div className="row">
//   {reminders && reminders.length
//     ? reminders.map((reminder) => {
//         return (
//           reminder && (
//             <div className="column">
//               <div className="card">
//                 <img src={cancel} className="delete" onClick={() => handleDelete(reminder, reminder._id)} />
//                 <div>Username: {reminder.username}</div>
//                 <div>Date: {reminder.date && reminder.date.substring(0, 10)}</div>
//                 <div>Email: {reminder.email}</div>
//                 <div>Description: {reminder.text}</div>
//                 <div>Subject: {reminder.subject}</div>
//                 <div>Contact: {reminder.contact}</div>
//                 <div>SMS: {reminder.sms}</div>
//               </div>
//             </div>
//           )
//         );
//       })
//     : ""}
// </div>
