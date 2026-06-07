import { FaCalendarAlt, FaChartPie, FaCog, FaHeart, FaHome, FaRegClock } from "react-icons/fa";
import avatar from "../assets/jomok.png";
import paw from "../assets/paws.png";

const nav = [
  ["Dashboard", FaHome],
  ["Schedule", FaCalendarAlt],
  ["History", FaRegClock],
  ["Health", FaHeart],
  ["Setting", FaCog],
];

export default function Sidebar() {
  return (
    <aside className="fixed-sidebar flex flex-col items-center px-[30px] pb-8 pt-[78px]">
      <img src={avatar} className="h-[130px] w-[130px] rounded-full" alt="Jowok avatar" />
      <h2 className="mt-8 font-inter text-[29px] font-semibold leading-none text-[#754B4B]">Yosaw</h2>
      <p className="mt-4 font-inter text-[20px] font-medium text-[#8C5757]">Smart Feeder</p>

      <nav className="mt-8 flex w-full flex-col gap-[17px]">
        {nav.map(([label, Icon], index) => (
          <button
            key={label}
            className={`nav-item ${index === 0 ? "active" : ""} flex h-[51px] w-full items-center gap-4 rounded-[26px] px-[30px] font-inter text-[16px] font-semibold text-[#6C3D35]`}
          >
            <Icon className="text-[25px]" />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto">
        <img src={paw} className="h-[90px] w-[118px]" alt="" />
      </div>
    </aside>
  );
}
