import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip);

const labels = ["02 AM", "04 AM", "08 AM", "12 PM", "02 PM", "04 PM", "08 PM"];

export default function ChartCard({ className, icon, title, value, unit, color, data, max = 40 }) {
  const chartData = {
    labels,
    datasets: [
      {
        data,
        borderColor: color,
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return color;
          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, color === "#FF4F87" ? "rgba(255,123,165,.78)" : "rgba(124,192,255,.78)");
          gradient.addColorStop(1, color === "#FF4F87" ? "rgba(255,123,165,.10)" : "rgba(124,192,255,.10)");
          return gradient;
        },
        fill: true,
        tension: 0.45,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: color,
        pointBorderWidth: 0,
        borderWidth: 3,
      },
    ],
  };

  return (
    <section className={`card ${className} px-[31px] pb-4 pt-[22px]`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-[25px]" style={{ color }}>{icon}</span>
          <h3 className="font-inter text-[20px] font-medium text-black">{title}</h3>
        </div>
        <div className="font-inter text-[25px] font-extrabold" style={{ color }}>
          {value} {unit}
        </div>
      </div>
      <div className="mt-[46px] h-[238px]">
        <Line
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: { enabled: true },
            },
            scales: {
              x: {
                grid: { display: false },
                ticks: { color: "#55565B", font: { weight: 700, size: 12 }, maxRotation: 0 },
                border: { color: "#777" },
              },
              y: {
                min: 0,
                max,
                ticks: { stepSize: max / 4, color: "#55565B", font: { weight: 700, size: 12 } },
                grid: { color: "#D4D8DF" },
                border: { display: false },
              },
            },
          }}
        />
      </div>
    </section>
  );
}
