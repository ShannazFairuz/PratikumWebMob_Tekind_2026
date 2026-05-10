import { useEffect, useState } from "react";

import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

function GrafikProduksi() {

  const [dataProduksi, setDataProduksi] = useState([]);

  useEffect(() => {

    const mockData = [

      {
        jam: "08:00",
        produksi: 115,
        target: 150,
      },

      {
        jam: "09:00",
        produksi: 145,
        target: 150,
      },

      {
        jam: "10:00",
        produksi: 175,
        target: 150,
      },

      {
        jam: "11:00",
        produksi: 165,
        target: 150,
      },

      {
        jam: "12:00",
        produksi: 205,
        target: 150,
      },

      {
        jam: "13:00",
        produksi: 220,
        target: 150,
      },
    ];

    setDataProduksi(mockData);

  }, []);

  const data = {

    labels: dataProduksi.map((item) => item.jam),

    datasets: [

      {
        label: "Jumlah Produksi",

        data: dataProduksi.map(
          (item) => item.produksi
        ),

        backgroundColor:
          "rgba(54, 162, 235, 0.65)",

        borderColor:
          "rgba(54, 162, 235, 1)",

        borderWidth: 2,

        borderRadius: 6,

        barThickness: 55,
      },

      {
        label: "Target",

        data: dataProduksi.map(
          (item) => item.target
        ),

        type: "line",

        borderColor: "rgb(255, 99, 132)",

        backgroundColor:
          "rgb(255, 99, 132)",

        borderWidth: 3,

        pointRadius: 5,

        pointHoverRadius: 7,

        tension: 0.25,
      },
    ],
  };

  const options = {

    responsive: true,

    maintainAspectRatio: false,

    devicePixelRatio: 4,

    animation: false,

    plugins: {

      legend: {
        position: "top",

        labels: {
          font: {
            size: 14,
            weight: "bold",
          },
        },
      },

      title: {
        display: true,

        text: "Grafik Produksi Harian - Shannaz Fairuz",

        font: {
          size: 20,
          weight: "bold",
        },

        padding: {
          bottom: 20,
        },
      },
    },

    scales: {

      x: {
        ticks: {
          font: {
            size: 13,
            weight: "bold",
          },
        },

        grid: {
          color: "rgba(0,0,0,0.06)",
        },
      },

      y: {

        beginAtZero: true,

        ticks: {
          font: {
            size: 13,
            weight: "bold",
          },
        },

        grid: {
          color: "rgba(0,0,0,0.08)",
        },
      },
    },
  };

  return (

    <div
      style={{
        height: "500px",
        width: "100%",
        backgroundColor: "white",
        padding: "10px",
        borderRadius: "10px",
      }}
    >

      <div
        style={{
          textAlign: "center",
          marginBottom: "10px",
        }}
      >
        <h5>Shannaz Fairuz</h5>
        <p>NIM: 23051430020</p>
      </div>

      <Bar
        data={data}
        options={options}
      />

    </div>

  );
}

export default GrafikProduksi;