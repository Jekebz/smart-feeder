import { FaBoxOpen } from "react-icons/fa";

export default function ScheduleCard({ schedules }) {
  return (
    <section className="card schedule-card px-[32px] py-[20px]">
      <h3 className="font-inter text-[22px] font-medium text-black">Today's Schedule</h3>
      <div className="mt-4 space-y-4">
        {schedules.map((item, index) => (
          <div className="grid grid-cols-[22px_90px_1fr_92px] items-center gap-3 font-inter" key={`${item.time}-${item.mealName}`}>
            <span
              className={`relative h-[22px] w-[22px] rounded-full border ${
                item.status === "Completed" ? "border-[#B7F29A] bg-[#B7F29A]" : "border-[#CFCFCF] bg-white"
              }`}
            >
              {index < schedules.length - 1 && <span className="absolute left-1/2 top-[21px] h-[27px] border-l border-dashed border-[#CFCFCF]" />}
            </span>
            <span className="text-[18px] font-medium text-black">{item.time}</span>
            <span className="flex items-center gap-4 text-[17px] font-extrabold text-black">
              <FaBoxOpen className="text-[28px] text-[#DE6767]" />
              {item.mealName}
            </span>
            <span className="text-[17px] font-bold text-black">{item.status}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
