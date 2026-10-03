"use client";

import { useEffect, useState } from "react";

function getRemaining(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { hours, minutes, seconds };
}

export default function CountdownTimer({
  initialHours = 12,
  initialMinutes = 45,
  initialSeconds = 30,
}: {
  initialHours?: number;
  initialMinutes?: number;
  initialSeconds?: number;
}) {
  const [remaining, setRemaining] = useState(
    initialHours * 3600 + initialMinutes * 60 + initialSeconds,
  );

  useEffect(() => {
    if (remaining <= 0) return;

    const interval = setInterval(() => {
      setRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [remaining]);

  const { hours, minutes, seconds } = getRemaining(remaining);
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="mt-5 hidden md:block">
      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-[#8E93A0]">
        Offer ends in
      </p>
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 flex-col items-center justify-center rounded-lg bg-white/10 sm:h-14 sm:w-14">
          <span className="text-lg font-bold text-white sm:text-xl">
            {pad(hours)}
          </span>
          <span className="text-[10px] uppercase text-[#8E93A0]">Hours</span>
        </div>
        <span className="text-xl font-bold text-white/40">:</span>
        <div className="flex h-12 w-12 flex-col items-center justify-center rounded-lg bg-white/10 sm:h-14 sm:w-14">
          <span className="text-lg font-bold text-white sm:text-xl">
            {pad(minutes)}
          </span>
          <span className="text-[10px] uppercase text-[#8E93A0]">Minutes</span>
        </div>
        <span className="text-xl font-bold text-white/40">:</span>
        <div className="flex h-12 w-12 flex-col items-center justify-center rounded-lg bg-white/10 sm:h-14 sm:w-14">
          <span className="text-lg font-bold text-white sm:text-xl">
            {pad(seconds)}
          </span>
          <span className="text-[10px] uppercase text-[#8E93A0]">Seconds</span>
        </div>
      </div>
    </div>
  );
}
