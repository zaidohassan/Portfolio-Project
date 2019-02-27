import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import "./charts.css";
import axios from "axios";

class Charts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // todaysDate: this.handleTodaysChange(new Date()),
      chartData: {
        labels: [
          "0-99,999",
          "100,000-499,999",
          "500,000-999,999",
          "1,000,000-5,000,000",
          "5,000,000+"
        ],
        datasets: [
          {
            label: "# of Books",
            data: [],
            backgroundColor: [
              "rgba(255,99,132, 0.6)",
              "rgba(255,162,235, 0.6)",
              "rgba(255,206,86, 0.6)",
              "rgba(255,159,64, 0.6)",
              "rgba(255,99,138, 0.6)"
            ]
          }
        ]
      }
    };
  }
  componentDidMount() {
    const { todaysDate } = this.props;
    axios.post("/api/getChartBook", { date: todaysDate }).then(response => {
      console.log(response.data);

      let bookData = this.state.chartData;
      bookData.datasets[0].data = Object.values(response.data[0]);
      this.setState({
        bookData
      });
    });
  }

  componentDidUpdate(prevProps) {
    const { todaysDate } = this.props;
    if (todaysDate !== prevProps.todaysDate) {
      axios.post("/api/getChartBook", { date: todaysDate }).then(response => {
        console.log(response.data);
        let bookData = this.state.chartData;
        bookData.datasets[0].data = Object.values(response.data[0]);
        this.setState({
          bookData
        });
      });
    }
  }

  render() {
    return (
      <div className="entirePage">
        <div className="charts">
          <Bar
            data={this.state.chartData}
            width={50}
            height={300}
            options={{
              title: {
                display: true,
                text: "# of Books Accepted in between Sales Rank",
                fontSize: 22
              },
              legend: {
                display: true,
                position: "top"
              },
              tooltips: {
                cornerRadius: 6
              },
              animation: {
                duration: 400,
                easing: "easeInQuart"
              },
              scales: {
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true,
                      stepSize: 1
                    }
                  }
                ]
              },

              maintainAspectRatio: false
            }}
          />
        </div>
      </div>
    );
  }
}

export default Charts;
