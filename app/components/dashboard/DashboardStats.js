"use client";

import { DASHBOARD_STATS } from "@/app/constants/data";

export default function DashboardStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 pr-16 gap-4">
      {DASHBOARD_STATS?.map((item) => (
        <div
          key={item?.title}
          className="rounded-xl border-gray-200 border p-4 h-25 w-full min-w-55 max-w-sm"
          style={{ background: item?.bgColor }}
        >
          <p className="text-xs text-black uppercase font-medium">
            {item?.title}
          </p>

          <div className="flex items-end justify-between mt-2">
            <h2 className="text-2xl font-semibold text-gray-950">
              {item?.value}
            </h2>

            <span
              className={`text-xs font-medium flex items-center gap-1 ${
                item?.trend === "up" ? "text-green-600" : "text-red-600"
              }`}
            >
              {item?.change}
              {item?.trend === "up" ? "↗" : "↘"}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
