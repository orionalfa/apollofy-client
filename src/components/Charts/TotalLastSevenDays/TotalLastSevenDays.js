import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

export default function TotalLastSevenDays({ data }) {
  const [dataToShow, setDataToShow] = useState({
    labels: [],
    datasets: [
      {
        label: "n plays",
        data: [],
        fill: false,
        backgroundColor: "#ffc107",
        borderColor: "#ffc107",
      },
    ],
  });
  const [updating, setUpdating] = useState(true);
  const currentTime = new Date().getHours();

  useEffect(() => {
    if (data) {
      let labels = [];
      let totalPlays = [];
      data.forEach((element, i) => {
        labels.push(currentTime - i + ":00");
        totalPlays.push(element.length);
      });
      setData(labels, totalPlays);
      setUpdating(false);
    }
  }, [data]);

  function setData(labels, totalPlays) {
    setDataToShow({
      ...dataToShow,
      labels: labels.reverse(),
      datasets: [
        {
          label: "n plays",
          data: totalPlays.reverse(),
          fill: false,
          backgroundColor: "#ffc107",
          borderColor: "#ffc107",
        },
      ],
    });
  }

  return <Line data={dataToShow} options={options} />;
}
