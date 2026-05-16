import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ApiService from "../services/ApiService";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  Filler
} from "chart.js";
import { Radar } from "react-chartjs-2";
import { RadialLinearScale } from "chart.js";

ChartJS.register(RadialLinearScale);

import { Bar, Doughnut, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  PointElement
);

export default function AdminDashboard() {
  const [details, setDetails] = useState({});

  const fetchData = () => {
    ApiService.dashboard(null)
      .then((res) => {
        if (res.data.success) {
          setDetails(res.data);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);


  const radarData = {
  labels: ["Users", "Farmers", "Crops", "Bookings", "Progress"],
  datasets: [
    {
      label: "System Balance",
      data: [
        details.totalusers || 0,
        details.totalFarmers || 0,
        details.totalCrop || 0,
        details.totalBooking || 0,
        details.totalprogress || 0,
      ],
      backgroundColor: "rgba(255, 152, 0, 0.3)",  // inside fill
      borderColor: "#ff9800",                    // outer line
      pointBackgroundColor: "#2e7d32",           // dots
      pointBorderColor: "#ffffff",
      
    },
  ],
};

const radarOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    r: {
      beginAtZero: true,

      grid: {
        color: "#2e7d32",
        lineWidth: 1.5,     
      },

      angleLines: {
        color: "#4CAF50",  
        lineWidth: 1.5,
      },

      pointLabels: {
        color: "#333",    
      },
    },
  },
};
 
  const chartData = {
    labels: [
      "Users",
      "Farmers",
      "Crops",
      "Bookings",
      "Progress",
      "Seasons",
      "Lands",
    ],
    datasets: [
      {
        label: "Total Records",
        data: [
          details.totalusers || 0,
          details.totalFarmers || 0,
          details.totalCrop || 0,
          details.totalBooking || 0,
          details.totalprogress || 0,
          details.totalSeason || 0,
          details.totalLand || 0,
        ],
        backgroundColor: [
          "#36A2EB",
          "#4BC0C0",
          "#FFCE56",
          "#FF6384",
          "#9966FF",
          "#FF9F40",
          "#8BC34A",
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: { beginAtZero: true },
    },
  };

  const lineData = {
  labels: ["Users", "Farmers", "Crops", "Bookings", "Progress"],
  datasets: [
    {
      label: "System Data",
      data: [
        details.totalusers || 0,
        details.totalFarmers || 0,
        details.totalCrop || 0,
        details.totalBooking || 0,
        details.totalprogress || 0,
      ],
      borderColor: "#28a745",
      backgroundColor: "rgba(40,167,69,0.2)",
      tension: 0.4,
      fill: true,
    },
  ],
};

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Users vs Bookings Overview" },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };
  return (
    <div className="container-fluid py-4 bg-light min-vh-100 px-5">

      {/* ===== HEADER ===== */}
      <div className="mb-4">
        <h2 className="fw-bold">Admin Dashboard</h2>
        <small className="text-muted">System overview & analytics</small>
      </div>

      {/* ===== CARDS WITH ICONS ===== */}
      <div className="row g-4">

        {[
          { title: "Users", value: details.totalusers, icon: " fa fa-user", color: "success" },
          { title: "Farmers", value: details.totalFarmers, icon: " fa fa-tractor",color: "success" },
          { title: "Crops", value: details.totalCrop, icon: "fa fa-carrot", color: "success" },
          { title: "Bookings", value: details.totalBooking, icon: "fas fa-hand-holding-usd", color: "success" },
          { title: "Progress", value: details.totalprogress, icon: "fas fa-chart-line",color: "success" },
          { title: "Seasons", value: details.totalSeason, icon: "fa fa-calendar",color: "success" },
          { title: "Lands", value: details.totalLand, icon: " fa fa-seedling", color: "success" },
        ].map((item, index) => (
          <div className="col-xl-3 col-md-6" key={index}>
            <div className="card shadow-sm border-0 h-100 p-3">
              <div className="d-flex justify-content-between align-items-center">

                <div>
                  <h6 className="text-muted">{item.title}</h6>
                  <h3 className="fw-bold">{item.value || 0}</h3>
                </div>

                <div
                  className={`d-flex align-items-center justify-content-center bg-${item.color} text-white`}
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                  }}
                >
                 
                  <i className={`fa-solid ${item.icon}`} />
                </div>

              </div>
            </div>
          </div>
        ))}

      </div>

      <div className="row mt-5 g-4">

        <div className="col-lg-8">
          <div className="card shadow-sm border-0 p-4">
            <h5 className="mb-4">System Overview</h5>
            <div style={{ height: "350px" }}>
              <Bar data={chartData} options={options} />
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card shadow-sm border-0 p-4">
            <h5 className="mb-4">Distribution</h5>
            <div style={{ height: "350px" }}>
              <Doughnut data={chartData} />
            </div>
          </div>
        </div>

      </div>

      {/* ===== LINE CHART ===== */}
      <div className="row mt-5">
        <div className="col-8">
          <div className="card shadow-sm border-0 p-4">
            <h5 className="mb-4">Trend Analysis</h5>
            <div style={{ height: "350px" }}>
              <Line data={lineData} options={lineOptions} />
            </div>
          </div>
        </div>
        <div className="col-4" style={{ height: "450px", width: "450px", margin: "auto",color:"green" }}>
  <Radar data={radarData} options={radarOptions} />
</div>
      </div>

    </div>
  );



  
}