import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Vacation from "./Vacation";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import DeleteIcon from "@material-ui/icons/Delete";
import Typography from "@material-ui/core/Typography";
import FlightLandIcon from "@material-ui/icons/FlightLand";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(2),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  button: {
    margin: "15px",
  },
  textField: {},
  flight: {
    marginRight: "auto",
    float: "left",
    margin: "5px",
    width: "70px",
    height: "70px",
    color: "blue",
  },
  icon: {
    margin: theme.spacing(3),
  },
  plus: {
    float: "right",
  },
  secondry: {
    margin: theme.spacing(1),
  },
  back: {
    top: "50%",
    height: 50,
    float: "right",
    position: "relative",
    transform: "translateY(-70%)",
  },

  sign: {
    top: "50%",
    height: 50,
    float: "right",
    position: "relative",
    transform: "translateY(-70%)",
  },
}));

export default function Vacations({ history }) {
  const user = useSelector((state) => state.user);

  const [vacations, setVactions] = useState([]);

  const [dept, setDept] = useState("");
  const [ret, setRet] = useState("");
  const [descr, setDesc] = useState("");
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([])
  
  


  const classes = useStyles();

  useEffect(() => {
    (async () => {
      let res = await fetch("http://localhost:3001/vacations");
      let data = await res.json();
      setVactions(data);
      console.log(data);
    })();
  }, []);

  const handleSearch = async () => {
    try {
      let res = await fetch("http://localhost:3001/vacations/search", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: localStorage.token,
        },
        body: JSON.stringify({
          descr,
          dept,
          ret,
        }),
      });
      let data = await res.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
   
 



  return (
    <div className="vacation">
      <Typography className={classes.icon} variant="h2" gutterBottom>
        <FlightLandIcon className={classes.flight}></FlightLandIcon>
        Vactionly Safe Travel!
      </Typography>
      
      {user.login && user.role == "admin" && (
        <>
          <Button
            variant="contained"
            color="primary"
            className={classes.plus}
            onClick={() => history.push("/add")}
          >
            <AddIcon></AddIcon>
            Add Vacation
          </Button>
        </>
      )}

      {user.login ? (
        <Typography className={classes.secondry} variant="h4" gutterBottom>
          Hello Welcome to the best Vacations Companian App! {user.fname}
        </Typography>
      ) : (
        <>
          <Button
            variant="contained"
            color="primary"
            href={"/login"}
            className={classes.sign}
          >
            Login
          </Button>

          <Button
            variant="contained"
            color="primary"
            href={"/signup"}
            className={classes.back}
          >
            SignUp
          </Button>
        </>
      )}

      <TextField
        onChange={(e) => setDept(e.target.value)}
        id="date"
        label="Departure"
        type="date"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        onChange={(e) => setRet(e.target.value)}
        id="date"
        label="Return"
        type="date"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
      
      
      <TextField
        
        onChange={(e) => setSearch(e.target.value)}
        id="standard-basic"
        label="Description"
        value={search}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSearch}
        className={classes.textField}
      >
        <SearchIcon></SearchIcon>
        Search
      </Button>

      <Button type="reset" variant="contained" color="primary" className={classes.textField}>
        <DeleteIcon></DeleteIcon>
        Clear
      </Button>
      {/* {/* {user.login && user.role == "user" && (
        <>
          <h1>Vacations that i follow </h1>
          <h1>Vacations that i don't follow</h1>
        </>
      )} */}

      {vacations.map((f) => (
        <Vacation update={setVactions} key={f.id} vacation={f} />
      ))}
    </div>
  );
}
