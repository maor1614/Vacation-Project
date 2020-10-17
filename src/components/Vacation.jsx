import React, { useState } from "react";
import { useSelector } from "react-redux";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import CreateIcon from "@material-ui/icons/Create";
import Button from "@material-ui/core/Button";
import "moment-timezone";
import Moment from "react-moment";
import { CardActions, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 275,
    opacity: 0.9,
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
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

  title: {
    fontSize: 14,
  },
}));

export default function Vacation({
  update,
  vacation,
  updateLikes,
  like,
  vacations,
  likedVacations,
  unLikedVacations,
  updateUnLikes,
}) {
  const user = useSelector((state) => state.user);
  const [error, setError] = useState("");

  const classes = useStyles();

  const handleFollowing = async (e) => {
    console.log(vacation);
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
      if (data.error) {
        setError(data.msg);
      } else {
        let newUnlikes = [...unLikedVacations];

        newUnlikes = newUnlikes.filter((item) => item.id !== vacation.id);
        vacation.follow = vacation.follow + 1;
        let newLikes = [...likedVacations, vacation];
        updateUnLikes(newUnlikes);
        updateLikes(newLikes);
      }
    } catch (err) {}
  };

  const handleUnLike = async () => {
   
   

    let res = await fetch("http://localhost:3001/follows/ " + user.userid, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: localStorage.token,
      },
      body: JSON.stringify({ vacation_id: vacation.id }),
    });
    // let data = await res.json();

    // vacation.follow = vacation.follow - 1;
    // let newVacations = unLikedVacations.filter((v) => v.id !== vacation.id);
    // updateLikes([...newVacations, likedVacations.find((v) => v.id == vacation.id)]);
    
    let newLikes = [...likedVacations];
    newLikes = newLikes.filter((item) => item.id !== vacation.id);
    updateLikes(newLikes);
    vacation.follow = vacation.follow - 1;
    let newUnLikesVacations = [...unLikedVacations, vacation];
    updateUnLikes(newUnLikesVacations);
  };

  const handleDelete = async (e) => {
    console.log(vacation);
    try {
      let res = await fetch("http://localhost:3001/vacations/" + vacation.id, {
        method: "DELETE",
        headers: { Authorization: localStorage.token },
      });
      let data = await res.json();
      console.log(data);
      if (data.error) {
        setError(data.msg);
      } else {
        let newVacations = [...vacations];
        newVacations = newVacations.filter((item) => item.id !== vacation.id);
        update(newVacations);
      }
    } catch (err) {}
  };

  return (
    <div>
      <Card className={classes.root}>
        <Grid container>
          {user.login && user.role == "admin" && (
            <CardActions>
              <Button
                size="small"
                onClick={handleDelete}
                color="default"
                startIcon={<CloseIcon />}
                variant="text"
                className={classes.button}
              />

              <Button
                size="small"
                variant="text"
                color="default"
                startIcon={<CreateIcon />}
                href={"/edit/" + vacation.id}
                className={classes.button}
              />
            </CardActions>
          )}
          <Grid item>
            <img
              className="ImgVaction"
              alt="vacationpic"
              src={vacation.img_src}
            ></img>
          </Grid>
          <Grid item>
            <CardContent>
              <Typography variant="h4" component="h2">
                {vacation.country_name}
              </Typography>

              <Typography variant="body2" component="p">
                Departure: <Moment format="DD/MM/YYYY">{vacation.dept}</Moment>
                <br />
                Return: <Moment format="DD/MM/YYYY">{vacation.ret}</Moment>
              </Typography>

              <Typography color="textSecondary" variant="h5" component="h2">
                Price: {vacation.price}$
              </Typography>

              <Typography variant="body2" color="textSecondary" component="p">
                Description: {vacation.descr}
              </Typography>
            </CardContent>

            <CardActions>
              {like === true ? (
                <Button size="small" onClick={handleUnLike}>
                  UnLike
                </Button>
              ) : (
                <Button size="small" onClick={handleFollowing}>
                  Like
                </Button>
              )}
            </CardActions>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
}
