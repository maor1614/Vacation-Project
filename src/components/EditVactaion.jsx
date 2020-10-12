import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";
import TextField from "@material-ui/core/TextField";
import CreateIcon from "@material-ui/icons/Create";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    fontSize: 20,
    height: 50,
    width: "50%",
  },
  pen: {
    float: "right",
    margin: "15px",
  },
  back: {
    position: "fixed",
    bottom: theme.spacing (2),
    right: theme.spacing (3),
  }
}));

export default function EditVactaion({ match, history }) {
  const [descr, setDescr] = useState("");
  const [dept, setDept] = useState("");
  const [ret, setRet] = useState("");
  const [price, setPrice] = useState("");
  const [img_src, setImg] = useState("");
  const [country_name, setCountry] = useState("");
  const classes = useStyles();

  useEffect(() => {
    (async () => {
      let res = await fetch(
        "http://localhost:3001/vacations/" + match.params.id
      );
      let data = await res.json();
      console.log(data);
      setDescr(data[0].descr);
      setDept(data[0].dept);
      setRet(data[0].ret);
      setPrice(data[0].price);
      setImg(data[0].img_src);
      setCountry(data[0].country_name);
    })();
  }, []);

  const handleSumbit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch(
        "http://localhost:3001/vacations/" + match.params.id,
        {
          method: "PUT",
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
        }
      );
      let data = await res.json();
      console.log(data);
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="editpage">
      <Typography className={classes.icon} variant="h2" gutterBottom>
        <CreateIcon className={classes.pen}></CreateIcon>
        Edit Vactaion
      </Typography>

      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="filled-secondary"
          label="Description"
          color="secondary"
          variant="filled"
          value={descr}
          onChange={(e) => setDescr(e.target.value)}
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
          label="Price"
          variant="filled"
          color="secondary"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <br></br>
        <br></br>

        <TextField
          id="filled-secondary"
          label="Image"
          variant="filled"
          color="secondary"
          value={img_src}
          onChange={(e) => setImg(e.target.value)}
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
      </form>

      <Button
        variant="contained"
        color="primary"
        href={"/"}
        className={classes.back}
      >
        Back
      </Button>
    </div>
  );
}
