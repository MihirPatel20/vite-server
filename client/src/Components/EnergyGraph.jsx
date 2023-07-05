import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Line } from "react-chartjs-2";
import { Chart } from "chart.js";
import {
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const EnergyGraph = () => {
  const [graphData, setGraphData] = useState(null);

  useEffect(() => {
    fetchGraphData();
  }, []);

  useEffect(() => {
    const socket = io("http://127.0.0.1:8000"); // Replace with your server's URL

    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("newData", (data) => {
      console.log("New data received:", data);
      updateGraphData(data);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const fetchGraphData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/graph/Vrn"); // Replace 'Vrn' with your actual parameter value
      const data = await response.json();
      setGraphData(data);
    } catch (error) {
      console.error("Failed to fetch graph data:", error);
    }
  };

  const updateGraphData = (newData) => {
    setGraphData((prevData) => {
      let updatedLabels = [...prevData.labels, newData.datetime];
      let updatedData = [...prevData.data, newData.Vrn];
  
      // Limit the array length to 10
      if (updatedLabels.length > 10) {
        updatedLabels = updatedLabels.slice(1);
        updatedData = updatedData.slice(1);
      }
  
      const updatedGraphData = {
        ...prevData,
        labels: updatedLabels,
        data: updatedData,
      };
  
      console.log("Updated data:", updatedGraphData);
      return updatedGraphData;
    });
  };
  

  return (
    <div>
      {graphData ? (
        <Line
          data={{
            labels: graphData.labels,
            datasets: [
              {
                label: "Graph Data",
                data: graphData.data,
                fill: false,
                borderColor: "rgb(75, 192, 192)",
                tension: 0.1,
              },
            ],
          }}
        />
      ) : (
        <p>Loading graph data...</p>
      )}
    </div>
  );
};

export default EnergyGraph;
