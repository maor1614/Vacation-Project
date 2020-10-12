import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    fontSize: 20,
    height: 50,
    width: "50%",
  },
  plus: {
    float: "right",
    margin: "15px",
  },
  back: {
    position: "fixed",
    bottom: theme.spacing (2),
    right: theme.spacing (3)
  }
}));

export default function AddVacation({ history }) {
  const user = useSelector((state) => state.user);
  const classes = useStyles();

  useEffect(() => {
    if (!user.login || user.role !== "admin") {
      history.push("/");
    }
  }, []);

  const [price, setPrice] = useState("");
  const [dept, setDept] = useState("");
  const [ret, setRet] = useState("");
  const [descr, setDesc] = useState("");
  const [img_src, setPic] = useState("");
  const [country_name, setCountry] = useState("");

  const handleSumbit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("http://localhost:3001/vacations/add", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: localStorage.token,
        },
        body: JSON.stringify({
          descr,
          dept,
          ret,
          price,
          img_src,
          country_name,
        }),
      });
      let data = await res.json();
      console.log(data);
      history.push("/");
    } catch (err) {}
  };

  return (
    <div className="newvacation">
     
      <Typography variant="h2" gutterBottom>
        <AddIcon className={classes.plus}></AddIcon>
        Add New Vacation
      </Typography>
      <form>
        <TextField
          id="filled-secondary"
          label="Price"
          variant="filled"
          color="secondary"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <br></br>
        <br></br>
        <TextField
          value={dept}
          onChange={(e) => setDept(e.target.value)}
          id="date"
          label="Departure"
          type="date"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <br></br>
        <br></br>
        <TextField
          value={ret}
          onChange={(e) => setRet(e.target.value)}
          id="date"
          label="Return"
          type="date"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <br></br>
        <br></br>
        <TextField
          id="filled-secondary"
          label="Description"
          color="secondary"
          variant="filled"
          value={descr}
          onChange={(e) => setDesc(e.target.value)}
        />
        <br></br>
        <br></br>
        <TextField
          id="filled-secondary"
          label="Image"
          variant="filled"
          color="secondary"
          value={img_src}
          onChange={(e) => setPic(e.target.value)}
        />
        <br></br>
        <br></br>

        <TextField
          id="filled-secondary"
          label="Country Name"
          variant="filled"
          color="secondary"
          value={country_name}
          onChange={(e) => setCountry(e.target.value)}
        />
        <br></br>
        <br></br>
        <Button
          onClick={handleSumbit}
          variant="contained"
          color="primary"
          size="small"
          className={classes.button}
          startIcon={<SaveIcon />}
        >
          Save
        </Button>

        
      <Button
        variant="contained"
        color="primary"
        href={"/"}
        className={classes.back}
      >
        Back
      </Button>
      </form>
    </div>
  );
}
