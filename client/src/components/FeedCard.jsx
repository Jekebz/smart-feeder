import { useState } from "react";
import bowl from "../assets/bowl.svg";
import api from "../services/api";

export default function FeedCard() {
  const [feeding, setFeeding] = useState(false);

  async function feedNow() {
    setFeeding(true);
    try {
      await api.post("/feed");
    } finally {
      setTimeout(() => setFeeding(false), 650);
    }
  }

  return (
    <section className="feed-panel rounded-[16px] bg-feed px-[26px] py-[55px] shadow-soft">
      <div className="flex items-center gap-4">
        <img src={bowl} className="h-[70px] w-[104px]" alt="Food bowl" />
        <div>
          <h3 className="font-inter text-[24px] font-extrabold text-ink">Feed Jowok</h3>
          <p className="mt-1 font-inter text-[13px] font-medium text-ink">Give a meal now</p>
          <p className="mt-1 max-w-[140px] font-inter text-[12px] font-medium leading-tight text-[#8A625B]">
            Manual feeding outside schedule
          </p>
        </div>
      </div>

      <div className="my-[20px] h-px w-full bg-white/80" />

      <div className="font-inter">
        <p className="text-[12px] font-extrabold text-ink">Porsi berikutnya</p>
        <p className="mt-1 text-[11px] font-medium text-[#7E5A54]">Hari ini, 02:00 AM</p>
      </div>

      <button
        onClick={feedNow}
        className="feed-button mt-[20px] h-[59px] w-full rounded-[20px] font-inter text-[16px] font-bold text-white shadow-[0_5px_4px_rgba(0,0,0,.18)]"
      >
        {feeding ? "Dispensing..." : "Feed Now"}
      </button>
    </section>
  );
}
