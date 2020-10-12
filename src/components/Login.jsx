import React, { useState } from "react";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";
import { Link} from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import LockIcon from "@material-ui/icons/Lock";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(0),
    fontSize: 20,
    height: 70,
    width: "100%",
  },
}));

export default function Login({ history }) {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState("");
  
  
  const dispatch = useDispatch();

  const classes = useStyles();

  const handleSumbit = async (e) => {
    e.preventDefault();
    try {
      
      let res = await fetch("http://localhost:3001/users/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      let data = await res.json();
      console.log(data);
      if (data.error) {
        seterror(data.msg);
      } else {
        localStorage.token = data.access_token;
        let { id, role, fname } = decode(data.access_token);
        dispatch({
          type: "LOGIN",
          payload: { userid: id, role, fname },
        });
        history.push("/");
      }
    } catch (err) {
      
    }
  };

  return (
    <div className="login">
      <LockIcon style={{ color: red[500] }}></LockIcon>
      <Typography variant="h4" gutterBottom>
        Log In
      </Typography>

      <form>
        <h2>{error}</h2>

        <TextField
          id="outlined-basic"
          variant="outlined"
          label="Username"
          onChange={(e) => setusername(e.target.value)}
          type="text"
        />
        <br></br>
        <br></br>
        <TextField
          id="outlined-basic"
          variant="outlined"
          label="Password"
          onChange={(e) => setpassword(e.target.value)}
          type="password"
        />
        <br></br>
        <br></br>
        <Button
          size="large"
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={handleSumbit}
        >
          Sign In
        </Button>

        {/* <button>Login</button> */}
      </form>
      <p>
        <Link to="/signup">Don't have an account? Sign up here </Link>
      </p>
      {/* <img
        src="https://media.tdc.travel/tdc_media/tmp/new/1475865594.500.package02.jpg"
        alt="Logo"
      /> */}
    </div>
  );
}
