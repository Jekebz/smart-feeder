import { useEffect, useState } from "react";
import { FaCalendarAlt, FaClock } from "react-icons/fa";

function formatDateTime(now) {
  return {
    date: now.toLocaleDateString("en-US", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    }),
    time: now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }),
  };
}

export default function Header() {
  const [now, setNow] = useState(new Date("2026-05-21T20:24:00"));

  useEffect(() => {
    const timer = setInterval(() => setNow((value) => new Date(value.getTime() + 1000)), 1000);
    return () => clearInterval(timer);
  }, []);

  const { date, time } = formatDateTime(now);

  return (
    <header className="mb-[14px] flex items-start justify-between pl-3">
      <div>
        <h1 className="font-imprima text-[42px] font-normal leading-[1] text-[#211915] md:text-[52px]">Halo! Ria</h1>
        <p className="mt-1 font-inter text-[18px] font-medium text-muted">Furry mu lagi ngapain yah?</p>
      </div>
      <div className="mr-[11px] mt-[-1px] h-[115px] w-[245px] rounded-[17px] border border-line bg-white/75 px-5 py-4 shadow-soft overflow-y-auto">
        <div className="flex items-center gap-3 font-inter text-[16px] font-bold">
          <FaCalendarAlt />
          <span>{date}</span>
        </div>
        <div className="mt-2 flex items-center gap-3 font-inter text-[16px] font-bold">
          <FaClock />
          <span>{time}</span>
        </div>
      </div>
    </header>
  );
}
