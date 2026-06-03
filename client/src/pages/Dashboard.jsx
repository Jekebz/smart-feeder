import { useEffect } from "react";
import { BsDropletFill, BsThermometerHalf } from "react-icons/bs";
import Sidebar from "../components/Sidebar.jsx";
import Header from "../components/Header.jsx";
import ChartCard from "../components/ChartCard.jsx";
import FeedCard from "../components/FeedCard.jsx";
import ProgressCard from "../components/ProgressCard.jsx";
import ScheduleCard from "../components/ScheduleCard.jsx";
import CameraCard from "../components/CameraCard.jsx";
import { socket } from "../services/socket.js";
import api from "../services/api.js";
import { useDashboardStore } from "../store/dashboardStore.js";

export default function Dashboard() {
  const { temperature, humidity, resources, schedules, setSensor, setResources, setSchedules } = useDashboardStore();

  useEffect(() => {
    api.get("/resources").then((res) => setResources(res.data)).catch(() => {});
    api.get("/schedules").then((res) => setSchedules(res.data)).catch(() => {});

    socket.on("sensor_updated", setSensor);
    socket.on("resource_updated", setResources);
    return () => {
      socket.off("sensor_updated", setSensor);
      socket.off("resource_updated", setResources);
    };
  }, [setResources, setSchedules, setSensor]);

  const latestTemp = temperature.at(-1);
  const latestHumidity = humidity.at(-1);

  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main-canvas">
        <Header />
        <div className="dashboard-grid">
          <ChartCard
            className="temperature-card"
            icon={<BsThermometerHalf />}
            title="Temperature"
            value={latestTemp}
            unit="°C"
            color="#FF4F87"
            data={temperature}
            max={40}
          />
          <ChartCard
            className="humidity-card"
            icon={<BsDropletFill />}
            title="Humidity"
            value={latestHumidity}
            unit="%"
            color="#2F74E8"
            data={humidity}
            max={80}
          />
          <FeedCard />
          <div className="tip-banner flex items-center rounded-[18px] bg-feed px-3 font-inter text-[12px] font-medium text-ink">
            <span className="mr-2 flex h-[22px] w-[22px] items-center justify-center rounded-full bg-[#FFD95E] text-white">?</span>
            <strong className="mr-1">Tip:</strong> Keep water and food available for your cat's health and happiness
          </div>
          <ProgressCard className="food-card" title="Food level" current={resources.food.current} max={resources.food.max} color="#D98F95" />
          <ProgressCard className="water-card" title="Water level" current={resources.water.current} max={resources.water.max} color="#5FC5DD" />
          <ScheduleCard schedules={schedules} />
          <CameraCard />
        </div>
      </main>
    </div>
  );
}
