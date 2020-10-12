import React from "react";
import { useSelector } from "react-redux";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import CloseIcon from "@material-ui/icons/Close";
import CreateIcon from "@material-ui/icons/Create";
import Button from "@material-ui/core/Button";
import "moment-timezone";
import Moment from "react-moment";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 360,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  button: {},
}));

export default function Vacation({ vacation, update }) {
  const user = useSelector((state) => state.user);
  

  // put=> vacation id
  // follows - > insert useid vacation id,
  // update vacation => follow +1
  // trigger + set trigger
  // settigger(!trigger)// (tigger +1)
  // }
  const classes = useStyles();



  const handleFollowing = async () => {
    

    try {
      let res = await fetch("http://localhost:3001/follows/", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: localStorage.token,
        },
        body: JSON.stringify({
          user_id: user.userid,
          vacation_id: vacation.id,
        }),
      });
      let data = await res.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async () => {
    let res = await fetch("http://localhost:3001/vacations/" + vacation.id, {
      method: "DELETE",
      headers: { Authorization: localStorage.token },
    });
    let data = await res.json();
    console.log(data);
    update(data);
  };

  return (
    <div className="vacation">
        {/* {user.login && user.role == "user" && (
        <>
          <h1>Vacations that i follow</h1>

          <h1>Vacations that i don't follow</h1>
        </>
      )} */}
     

      <Card className={classes.root}>
      
      {user.login && user.role == "admin" && (
          <span>
            <Button
              onClick={handleDelete}
              color="default"
              startIcon={<CloseIcon />}
              variant="text"
              className={classes.button}
            />

            <Button
              variant="text"
              color="default"
              startIcon={<CreateIcon />}
              href={"/edit/" + vacation.id}
              className={classes.button}
            />
          </span>
        )}
        <CardHeader title={vacation.country_name} />


      

        {/* <h1>Ret: {vacation.ret} </h1> */}
        <CardMedia
          className={classes.media}
          image={vacation.img_src}
          alt="vacationImg"
        />
          <h3>
          Departure:
          <Moment format= "DD/MM/YYYY">{vacation.dept}</Moment>
        </h3>

        <h3>
          Return:
          <Moment format= "DD/MM/YYYY">{vacation.ret}</Moment>
        </h3>

        <h3>Price: {vacation.price} </h3>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            Description: {vacation.descr}
          </Typography>
        </CardContent>

        {user.login && user.role == "user" && (
          <IconButton  onClick={handleFollowing}>
            <FavoriteIcon />
          </IconButton>
        )}



      </Card>
    </div>
  );
}
