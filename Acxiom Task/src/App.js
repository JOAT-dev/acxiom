import { useEffect } from "react";
import NavBar from "./components/NavBar";
import Routes from "./routes/Routes";
import "./styles/Container.css";
import { store } from "./store/store";
import { addUser } from "./store/userReducer";
import { changeLoggedIndex } from "./store/indexReducer";

const App = () => {
  fetch("http://localhost:5000/auth/", {
    method: "get",
    headers: { "Content-type": "application/json", Authorization: "Bearer " + localStorage.getItem("jwt") },
  })
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      if (result.error) {
        localStorage.clear();
        store.dispatch(changeLoggedIndex(-1));
        return;
      }
      store.dispatch(addUser(result));
    })
    .catch((err) => {
      console.log(err);
    });
  // useEffect(() => {
  //   // console.log("sdsd");
  // }, []);
  return (
    <div>
      <NavBar />
      <Routes />
    </div>
  );
};

export default App;
