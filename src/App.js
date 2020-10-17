import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Vacations from "./components/Vacations";
import AddVacation from "./components/AddVacation";
import EditVactaion from "./components/EditVactaion";
import jwt_decode from "jwt-decode";

import Chart from "./components/Chart";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch;

  useEffect(() => {
    ((async) => {
      let token = localStorage.token;
      let time = localStorage.time;
      if (token && time) {
        if (Date.now() - time < 600000) {
          let { id, role, fname } = jwt_decode(token);
          dispatch({ type: "LOGIN", payload: { id, role, fname } });
        } else {
          let { id, role, fname } = jwt_decode(token);
          dispatch({ type: "LOGOUT" });
        }
      }
    })();
  }, []);

  return (
    <Router>
      <div>
        <Route path="/login" component={Login} />
        <Route path="/Signup" component={Signup} />
        <Route path="/add" exact component={AddVacation} />
        <Route path="/edit/:id" component={EditVactaion} />
        <Route exact path="/" component={Vacations} />
        <Route path="/charts" exact component={Chart} />
      </div>
    </Router>
  );
}

export default App;
