import { Button, Link } from "@material-ui/core";
import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

export default class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vacations: [],
    };
  }

  componentDidMount() {
    (async () => {
      let res = await fetch("http://localhost:3001/vacations", {});
      let data = await res.json();
      this.setState({ vacations: data });
    })();
  }

  render() {
    console.log(this.state.vacations);

    return (
      <div className="chart">
        <Button>
          <Link to="/" component={RouterLink}>
            Back{" "}
          </Link>
        </Button>

        {this.state.vacations.length == 0 ? (
          "blah"
        ) : (
          <Bar
            data={{
              labels: this.state.vacations
                .filter((v) => v.follow !== 0)
                .map((v) => v.country_name),

              datasets: [
                {
                  label: "followers",
                  backgroundColor: "rgba(75,122,192,3)",
                  borderColor: "gba(0,0,0,1)",
                  borderWidth: 5,

                  data: this.state.vacations
                    .filter((v) => v.follow !== 0)
                    .map((v) => v.follow),
                },
              ],
            }}
            options={{
              title: {
                display: true,
                text: "Number of followers per vacation",
                fontSize: 25,
              },
              legend: {
                display: true,
                position: "right",
              },
            }}
          />
        )}
      </div>
    );
  }
}
