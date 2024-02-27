import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import studData from "../assets/data2.csv";
import 'chart.js/auto';//easy solution for the "arc" problem
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  BarElement,
  DoughnutController, 
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJs.register(
  CategoryScale,
  LinearScale,
  BarElement,
  DoughnutController,  // Register DoughnutController
  Title,
  Tooltip,
  Legend
);

const Graph = () => {
  const [barChartData, setBarChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [barChartOptions, setBarChartOptions] = useState({});
  
  const [pieChartData, setPieChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [pieChartOptions, setPieChartOptions] = useState({});

  useEffect(() => {
    Papa.parse(studData, {
      download: true,
      header: true,
      dynamicTyping: true,
      delimiter: "",
      complete: (results) => {
        console.log(results);
        const headers = Object.keys(results.data[0]);
        const data = results.data.map((item) => Object.values(item));

        const transposedData = headers.map((header, index) => ({
          label: header,
          data: data.map((row) => row[index + 1]),
          borderColor: "black",
          backgroundColor: "red", // Set your desired background color
        }));

        setBarChartData({
          labels: data.map((row) => row[0]),
          datasets: transposedData,
        });

        setPieChartData({
          labels: headers.slice(1),
          datasets: [
            {
              data: data[0].slice(1),
              backgroundColor: [
                "red", "blue", "green", "orange", "purple", "pink"
              ],
              borderColor: "black",
            },
          ],
        });

        setBarChartOptions({
          responsive: true,
          plugins: {
            legend: {
              display:false,
              position: "top",
            },
            title: {
              display: true,
              text: "Student Data (Bar Chart)",
            },
          },
        });

        setPieChartOptions({
          responsive: true,
          plugins: {
            legend: {
              display:false,
              position: "top",
            },
            title: {
              display: true,
              text: "Student Data (Pie Chart)",
            },
          },
        });
      },
    });
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Student - Data</h1>
      <div >
        {barChartData.datasets.length > 0 && pieChartData.datasets.length > 0 ? (
          <div className="cont"  style={{width:"1000px",height:"800px"}}>
              <Bar options={barChartOptions} data={barChartData} />
              <div className="" style={{width:"700px",height:"500px"}}>
              <Doughnut options={pieChartOptions} data={pieChartData} />
              </div>
          </div>
        ) : (
          <div className="loading">Loading...</div>
        )}
      </div>
    </div>
  );
};

export default Graph;
