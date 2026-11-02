
"use client";

import { useEffect, useState } from "react";
import { Clock3 } from "lucide-react";

export default function ShowTime({
  openTime = "09:00",
  closeTime = "18:00",
}) {
  const [currentTime, setCurrentTime] = useState(null);

  useEffect(() => {
    const updateClock = () => setCurrentTime(new Date());

    updateClock();
    const timer = setInterval(updateClock, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (time) => {
    if (!time) return "--";

    const [hours, minutes] = time.split(":").map(Number);

    return new Date(2000, 0, 1, hours, minutes).toLocaleTimeString(
      "en-IN",
      {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }
    );
  };

  if (!currentTime) {
    return (
      <section className="w-full max-w-sm rounded-xl border border-gray-200 bg-white p-5">
        <p className="text-sm text-gray-500">
          Loading shop timing...
        </p>
      </section>
    );
  }

  const toMinutes = (time) => {
    if (!time) return 0;
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const open = toMinutes(openTime);
  const close = toMinutes(closeTime);

  const nowMinutes =
    currentTime.getHours() * 60 + currentTime.getMinutes();

  const nowSeconds =
    nowMinutes * 60 + currentTime.getSeconds();

  const isOvernight = close < open;

  const totalSeconds =
    (isOvernight ? 1440 - open + close : close - open) * 60;

  const elapsedSeconds =
    (nowSeconds - open * 60 + 86400) % 86400;

  const isOpen =
    open !== close &&
    (isOvernight
      ? nowMinutes >= open || nowMinutes < close
      : nowMinutes >= open && nowMinutes < close);

  let remainingSeconds;

  if (isOpen) {
    remainingSeconds = Math.max(0, totalSeconds - elapsedSeconds);
  } else {
    remainingSeconds =
      (open * 60 - nowSeconds + 86400) % 86400;
  }

  const hours = Math.floor(remainingSeconds / 3600);
  const minutes = Math.floor((remainingSeconds % 3600) / 60);
  const seconds = remainingSeconds % 60;

  // Calculate progress through today's shop hours
  const progress = isOpen && totalSeconds > 0
    ? Math.min(100, Math.max(0, (elapsedSeconds / totalSeconds) * 100))
    : 0;

  return (
    <section className=" mt-8 mb-6 w-full max-w-sm overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="space-y-2 p-4">

        {/* Current time */}
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm text-gray-500">
            Current time (India)
          </span>

          <span className="font-semibold tabular-nums text-gray-800">
            {currentTime.toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: true,
            })}
          </span>
        </div>

        {/* Opening and closing time */}
        <div className="flex justify-between gap-3">
          <div>
            <p className="mb-1 flex items-center gap-1.5 text-xs text-green-500">
              <Clock3 size={14} />
              Opens at
            </p>
            <p className="text-lg font-bold text-gray-800">
              {formatTime(openTime)}
            </p>
          </div>

          <div>
            <p className="mb-1 flex items-center text-red-600 gap-1.5 text-xs">
              <Clock3 size={14} />
              Closes at
            </p>
            <p className="text-lg font-bold text-gray-800">
              {formatTime(closeTime)}
            </p>
          </div>
        </div>

        {/* Green progress line */}
        <div className="h-2 rounded-full bg-gray-100">

          <span className={`text-xs text-black px-1 font-semibold  ${isOpen ? "text-green-600" : "text-gray-400"
            }`}>
            {Math.round(progress)}%
          </span>

          <div
            className={`w-full rounded-full transition-all duration-1000 ${isOpen ? "bg-green-500" : "bg-gray-300"
              }`}
            style={{ width: `${progress}%` }}
          >
          </div>
        </div>


        {/* Countdown */}
        <div className="flex flex-col items-center justify-center border-t border-gray-100 ">
          <span className={`text-sm font-medium ${isOpen ? "text-green-600" : "text-gray-500"
            }`}>
            {isOpen
              ? "Time remaining until closing"
              : "Time remaining until opening"}
          </span>

          <p className="mt-1 text-3xl font-bold tabular-nums text-gray-900">
            {String(hours).padStart(2, "0")}:
            {String(minutes).padStart(2, "0")}:
            {String(seconds).padStart(2, "0")}
          </p>

          <p className="mt-1 text-xs text-gray-400">
            HH : MM : SS
          </p>
        </div>
      </div>
    </section>
  );
}
