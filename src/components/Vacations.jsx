import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Vacation from "./Vacation";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import ClearIcon from "@material-ui/icons/Clear";
import { Grid, Link } from "@material-ui/core";
import Input from "@material-ui/core/Input";
import AppBar from "@material-ui/core/AppBar";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(2),
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

export default function Vacations({ history, match }) {
  const user = useSelector((state) => state.user);

  const [vacations, setVactions] = useState([]);
  const [likedVacations, setLikedVacations] = useState([]);
  const [unLikedVacations, setUnlikedVacations] = useState([]);
  const [dept, setDept] = useState("");
  const [ret, setRet] = useState("");
  const [descr, setDesc] = useState("");
  const [search, setSearch] = useState([]);
  const [error, seterror] = useState("");

  const classes = useStyles();

  useEffect(() => {
    if (user.login === false) {
      history.push("/login");
    } else {
      (async () => {
        console.log("vacation", user);
        let res = await fetch("http://localhost:3001/vacations", {
          headers: { Authorization: localStorage.token },
        });
        let data = await res.json();
        setVactions(data);
        if (user.role === "user") {
          let res1 = await fetch(
            `http://localhost:3001/follows/${user.userid}`,
            {
              headers: { Authorization: localStorage.token },
            }
          );
          let data1 = await res1.json();
          setLikedVacations(data1);

          setUnlikedVacations(data.filter(compare(data1)));
          console.log(data);
        }
      })();
    }
  }, [user, search]);

  const handleSearch = async () => {
    let res = await fetch("http://localhost:3001/vacations/search", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        descr,
        dept,
        ret,
      }),
    });
    let data = await res.json();
    console.log(data);
    if (data.error) {
      seterror(data.msg);
    } else {
      if (data.length === 0) {
        alert("There are no matching vacations for the search you requested");
      }
    }
    setSearch(data);
  };

  const handleClear = async () => {
    setSearch([]);
    setDesc("");
    setDept("");
    setRet("");
  };

  function compare(otherArray) {
    console.log("called from compare");
    return function (current) {
      for (var i = 0; i < otherArray.length; i++) {
        if (current.id == otherArray[i].id) {
          return false;
        }
      }
      return true;
    };
  }

  function handleLogOut() {
    user.login = false;
    localStorage.removeItem("token");
    localStorage.removeItem("time");
    history.push("login");
  }

  return (
    <div id="vacations">
      <AppBar>
        <Grid container>
          <Grid item xs={1}>
            <Typography color="inherit" gutterBottom>
              Welcome {user.fname}
            </Typography>
          </Grid>
          <Grid item xs={10}></Grid>
          <Grid item xs={1}>
            <Button color="inherit" onClick={handleLogOut}>
              Logout
            </Button>
          </Grid>
        </Grid>
      </AppBar>
      <br></br>
      <br></br>
      <div className="search">
        <TextField
          className={classes.margin}
          value={descr}
          placeholder="Description"
          color="primary"
          onChange={(e) => setDesc(e.target.value)}
          type="text"
        />
        <Input
          className={classes.margin}
          title="Departure"
          value={dept}
          placeholder="Departure"
          color="primary"
          onChange={(e) => setDept(e.target.value)}
          type="date"
        />
        <Input
          className={classes.margin}
          title="Return"
          value={ret}
          placeholder="Return"
          color="primary"
          onChange={(e) => setRet(e.target.value)}
          type="date"
        />
        <span>
          <Button
            ariant="outlined"
            size="small"
            color="primary"
            className={classes.margin}
            onClick={handleSearch}
          >
            <SearchIcon></SearchIcon>
            Search
          </Button>
          <Button
            variant="contained"
            size="small"
            color="primary"
            className={classes.margin}
            onClick={handleClear}
          >
            <ClearIcon></ClearIcon>
            Clear Search
          </Button>
        </span>
      </div>
      {search.length === 0 ? (
        user.role === "admin" ? (
          <>
            <br></br>

            <Button variant="contained" color="secondary">
              <Link to="/add" component={RouterLink}>
                Add Vacation
              </Link>
            </Button>

            <h5>Vacations list</h5>
            <Grid container>
              <Grid item xs={2}></Grid>
              <Grid item xs={8}>
                <Grid container spacing={2}>
                  {vacations.map((v) => (
                    <Grid item xs={6}>
                      <Vacation
                        update={setVactions}
                        key={v.id}
                        vacation={v}
                        vacations={vacations}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              <Grid item xs={2}></Grid>
            </Grid>
          </>
        ) : (
          <>
            <br></br>
            <br></br>
            <h5>The vacations followed by you</h5>
            <Grid container>
              <Grid item xs={2}></Grid>
              <Grid item xs={8}>
                <Grid container spacing={2}>
                  {likedVacations.map((f) => (
                    <Grid item xs={6}>
                      <Vacation
                        updateLikes={setLikedVacations}
                        updateUnLikes={setUnlikedVacations}
                        key={f.id}
                        vacation={f}
                        like={true}
                        likedVacations={likedVacations}
                        unLikedVacations={unLikedVacations}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              <Grid item xs={2}></Grid>
            </Grid>

            <h5> The vacations that have not yet been followed by you</h5>
            <Grid container>
              <Grid item xs={2}></Grid>
              <Grid item xs={8}>
                <Grid container spacing={2}>
                  {unLikedVacations.map((v) => (
                    <Grid item xs={6}>
                      <Vacation
                        updateLikes={setLikedVacations}
                        updateUnLikes={setUnlikedVacations}
                        key={v.id}
                        vacation={v}
                        like={false}
                        likedVacations={likedVacations}
                        unlikedVacations={unLikedVacations}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              <Grid item xs={2}></Grid>
            </Grid>
          </>
        )
      ) : (
        <Grid container>
          <Grid item xs={2}></Grid>
          <Grid item xs={8}>
            <Grid container spacing={2}>
              {search.map((f) => (
                <Grid item xs={6}>
                  <Vacation key={f.id} vacation={f} />
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={2}></Grid>
        </Grid>
      )}
    </div>
  );
}
