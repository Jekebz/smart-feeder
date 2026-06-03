import { FaMicrophone, FaRegSquare, FaCamera } from "react-icons/fa";
import cameraCat from "../assets/camera-cat.svg";

export default function CameraCard() {
  return (
    <section className="camera-card rounded-[16px] bg-feed px-[18px] py-[10px] shadow-soft">
      <div className="mb-1 flex items-center justify-between">
        <h3 className="font-inter text-[16px] font-extrabold text-ink">Live Camera</h3>
        <span className="rounded-full bg-[#F0517B] px-3 py-1 text-[11px] font-bold text-white">LIVE</span>
      </div>
      <div className="relative h-[401px] overflow-hidden rounded-[18px]">
        <img src={cameraCat} className="h-full w-full object-cover" alt="Live camera view" />
        <div className="absolute bottom-[10px] left-[22px] right-[22px] grid h-[44px] grid-cols-3 rounded-[10px] bg-[#F6DDD8]/80 px-4 font-inter text-[14px] text-ink backdrop-blur">
          <button className="flex items-center justify-center gap-2"><FaCamera /> SNAPSHOT</button>
          <button className="flex items-center justify-center gap-2"><FaMicrophone /> TALK</button>
          <button className="flex items-center justify-center gap-2"><FaRegSquare /> RECORD</button>
        </div>
      </div>
    </section>
  );
}
