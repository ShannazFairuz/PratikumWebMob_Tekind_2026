import { Doughnut } from "react-chartjs-2";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function GrafikCacat() {

  const data = {

    labels: [
      "Scratch",
      "Dent",
      "Lainnya"
    ],

    datasets: [

      {
        label: "Proporsi Cacat",

        data: [50, 30, 20],

        backgroundColor: [

          "rgba(54, 162, 235, 0.85)",

          "rgba(255, 206, 86, 0.85)",

          "rgba(255, 99, 132, 0.85)",
        ],

        borderColor: [
          "#36A2EB",
          "#FFCE56",
          "#FF6384",
        ],

        borderWidth: 2,

        hoverOffset: 15,
      },
    ],
  };

  const options = {

    responsive: true,

    maintainAspectRatio: false,

    devicePixelRatio: 4,

    animation: false,

    cutout: "60%",

    plugins: {

      legend: {

        position: "top",

        labels: {

          font: {
            size: 14,
            weight: "bold",
          },

          padding: 20,
        },
      },

      title: {

        display: true,

        text: "Grafik Proporsi Cacat",

        font: {
          size: 18,
          weight: "bold",
        },

        padding: {
          bottom: 20,
        },
      },

      tooltip: {

        titleFont: {
          size: 14,
        },

        bodyFont: {
          size: 13,
        },
      },
    },
  };

  return (

    <div
      style={{
        height: "420px",
        width: "100%",
        backgroundColor: "white",
        padding: "15px",
        borderRadius: "12px",
      }}
    >

      <Doughnut
        data={data}
        options={options}
      />

    </div>

  );
}

export default GrafikCacat;