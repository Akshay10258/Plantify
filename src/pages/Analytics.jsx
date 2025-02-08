import React, { useState, useEffect } from "react";
import { Line, Doughnut } from "react-chartjs-2";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend);

const Analytics = () => {
  // IoT Data States
  const [moisture, setMoisture] = useState(0);
  const [temperature, setTemperature] = useState(-10);
  const [humidity, setHumidity] = useState(0);
  const [pumpStatus, setPumpStatus] = useState(false);
  const [pumpTrigger, setPumpTrigger] = useState(20);

  // Graph Data States
  const [moistureData, setMoistureData] = useState([]);
  const [timeLabels, setTimeLabels] = useState([]);
  const [selectedRange, setSelectedRange] = useState("1H");

  useEffect(() => {
    const interval = setInterval(() => {
      const newTime = new Date().toISOString();
      const newMoisture = Math.floor(Math.random() * 100); // Replace with API/MQTT
      const newTemperature = (Math.random() * 50).toFixed(1);
      const newHumidity = Math.floor(Math.random() * 100);

      setMoisture(newMoisture);
      setTemperature(newTemperature);
      setHumidity(newHumidity);
      setPumpStatus(newMoisture < pumpTrigger);

      setMoistureData((prev) => [...prev, { time: newTime, value: newMoisture }]);
      setTimeLabels((prev) => [...prev, newTime]);
    }, 2000);

    return () => clearInterval(interval);
  }, [pumpTrigger]);

  // Filter Data Based on Selected Time Range
  const getFilteredData = () => {
    const now = new Date();
    let filterTime = new Date();

    if (selectedRange === "1H") filterTime.setHours(now.getHours() - 1);
    else if (selectedRange === "1D") filterTime.setDate(now.getDate() - 1);
    else if (selectedRange === "7D") filterTime.setDate(now.getDate() - 7);
    else if (selectedRange === "15D") filterTime.setDate(now.getDate() - 15);

    return moistureData.filter((data) => new Date(data.time) >= filterTime);
  };

  const filteredData = getFilteredData();

  // Graph Data
  const lineData = {
    labels: filteredData.map((d) => new Date(d.time).toLocaleTimeString()),
    datasets: [
      {
        label: "Moisture Level",
        data: filteredData.map((d) => d.value),
        borderColor: "#00d1b2",
        backgroundColor: "rgba(0, 209, 178, 0.2)",
        tension: 0.4,
        pointRadius: 3,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          color: "rgba(0, 255, 0, 0.5)",
          lineWidth: 1,
        },
        ticks: {
          color: "#fff",
        },
      },
      y: {
        grid: {
          color: "rgba(0, 255, 0, 0.5)",
          lineWidth: 1,
        },
        ticks: {
          color: "#fff",
        },
      },
    },
  };

  return (
    <>
    <Navbar/>
    <div className="bg-black/30 backdrop-blur-md text-white min-h-screen m-10 mb-0 p-6">
      <h1 className="text-4xl ml-2 mb-4 font-smooch">IoT Sensor Dashboard</h1>

      {/* First Row: Moisture Level Chart */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-6 font-smooch">
        <h3 className=" mb-2 text-2xl">Moisture Level</h3>
        <div className="flex space-x-4 mb-4 mt-4">
          {["1H", "1D", "7D", "15D"].map((range) => (
            <button
              key={range}
              onClick={() => setSelectedRange(range)}
              className={`px-4 py-2 rounded ${
                selectedRange === range ? "bg-emerald-500" : "bg-gray-700"
              }`}
            >
              {range}
            </button>
          ))}
        </div>
        <div className="h-64">
          <Line data={lineData} options={lineOptions} />
        </div>
      </div>

      {/* Second Row: Moisture, Temperature, Humidity, Pump Status, Pump Trigger */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 font-smooch">
        {/* Moisture Gauge */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-2xl mb-2">Moisture</h3>
          <Doughnut
            data={{
              datasets: [
                {
                  data: [moisture, 100 - moisture],
                  backgroundColor: ["#00d1b2", "#444"],
                },
              ],
            }}
          />
          <p className="text-center text-xl mt-2">{moisture}%</p>
        </div>

        {/* Temperature Gauge */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md font-smooch">
          <h3 className="text-2xl mb-2">Temperature</h3>
          <Doughnut
            data={{
              datasets: [
                {
                  data: [temperature, 50 - temperature],
                  backgroundColor: ["#ffcc00", "#444"],
                },
              ],
            }}
          />
          <p className="text-center text-xl mt-2">{temperature}°C</p>
        </div>

        {/* Humidity Gauge */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md font-smooch">
          <h3 className="text-2xl mb-2">Humidity</h3>
          <Doughnut
            data={{
              datasets: [
                {
                  data: [humidity, 100 - humidity],
                  backgroundColor: ["#00aaff", "#444"],
                },
              ],
            }}
          />
          <p className="text-center text-xl mt-2">{humidity}%</p>
        </div>

        {/* Pump Status */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md font-smooch">
          <h3 className="text-2xl mb-16">Pump Status</h3>
          <div
            className={`w-24 h-24 mx-auto rounded-full ${
              pumpStatus ? "bg-green-500" : "bg-red-500"
            }`}
          ></div>
          <p className="text-center text-xl mt-2">{pumpStatus ? "ON" : "OFF"}</p>
        </div>

        {/* Pump Trigger Level */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md font-smooch">
          <h3 className="text-2xl mb-24">Pump Trigger Level</h3>
          <input
            type="range"
            min="0"
            max="100"
            value={pumpTrigger}
            onChange={(e) => setPumpTrigger(Number(e.target.value))}
            className="w-full"
          />
          <p className="text-center text-xl mt-2">{pumpTrigger}</p>
        </div>
      </div>
    </div>
        <Footer/>
        </>
  );
};

export default Analytics; 