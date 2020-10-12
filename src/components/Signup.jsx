import React, { useState } from "react";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import LockIcon from '@material-ui/icons/Lock';
import { red } from "@material-ui/core/colors";


const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    fontSize: 20,
    height:50,
    width:"100%",
  },
  first: {
    margin: theme.spacing(1)
  }
}));

export default function Signup(history) {
  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState("");

  const classes = useStyles();

  const handleSumbit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("http://localhost:3001/users/register", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ username, password, fname, lname }),
      });
      let data = await res.json();
      console.log(data);
      if (data.error) {
        seterror(data.msg);
      } else {
        history.push("/login");
      }
    } catch (err) {}
  };

  return (
    <div className="register">
    <LockIcon style={{color: red[500]}} ></LockIcon>
      <Typography variant="h4" gutterBottom>
        Sign Up
      </Typography>
      <form>
        <h2>{error && error}</h2>
        <TextField
          id="outlined-basic"
          label="First Name"
          variant="outlined"
          onChange={(e) => setfname(e.target.value)}
          type="text"
          className={classes.first}
        />
        
        <TextField
          id="outlined-basic"
          label="Last Name"
          variant="outlined"
          onChange={(e) => setlname(e.target.value)}
          type="text"
          className={classes.first}
        />
        <br></br>
        <br></br>
        <TextField
         width={300}
         height="100%"
          id="outlined-basic"
          label="User Name"
          variant="outlined"
          onChange={(e) => setusername(e.target.value)}
          type="text"
          className={classes.button}
        />
        <br></br>
        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          onChange={(e) => setpassword(e.target.value)}
          type="password"
          className={classes.button}
        />
        <br></br>
        <Button
          size="large"
          variant="contained"
          color="secondary"
          className={classes.button}
          onClick={handleSumbit}
        disableElevation>
          Sign UP
        </Button>

        {/* <button>Send</button> */}
      </form>
      <p>
        <Link to="/login">Already Registered Move To? Login</Link>
      </p>
    </div>
  );
}
