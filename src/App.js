import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Vacations from "./components/Vacations";
import AddVacation from "./components/AddVacation";
import EditVactaion from "./components/EditVactaion";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Chart from './components/Chart'



function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Route path="/login" component={Login} />
        <Route path="/Signup" component={Signup} />
        <Route path="/add" exact component={AddVacation} />
        <Route path="/edit/:id" component={EditVactaion} />
        <Route path="/" exact component={Vacations} />
        <Route path="/charts" exact  component={Chart} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
