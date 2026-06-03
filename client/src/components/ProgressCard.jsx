export default function ProgressCard({ className, title, current, max, color }) {
  const percentage = Math.max(0, Math.min(100, (current / max) * 100));
  return (
    <section className={`card ${className} flex items-center px-[32px]`}>
      <div className="w-full">
        <h3 className="mb-[12px] font-inter text-[20px] font-medium text-black">{title}</h3>
        <div className="flex items-center gap-[27px]">
          <div className="progress-track flex-1">
            <div className="progress-fill" style={{ width: `${percentage}%`, background: color }} />
          </div>
          <p className="min-w-[150px] font-inter text-[18px] font-medium text-black">
            {current} ml / {max} ml
          </p>
        </div>
      </div>
    </section>
  );
}
