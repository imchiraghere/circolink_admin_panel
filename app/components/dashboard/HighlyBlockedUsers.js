"use client";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const BLOCKED_USERS = [
  {
    id: 1,
    name: "Tanisq Rawat",
    blockedCount: 5,
    reportedContent: "None",
  },
  {
    id: 2,
    name: "Nisha Gupta",
    blockedCount: 10,
    reportedContent: 5,
  },
  {
    id: 3,
    name: "Elrich Rozar",
    blockedCount: 12,
    reportedContent: 20,
  },
  {
    id: 4,
    name: "Mesh Cutinoh",
    blockedCount: 15,
    reportedContent: 31,
  },
];

const HighlyBlockedUser = () => {
  const [timeFilter, setTimeFilter] = useState("Today");

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-[#5A1A15] font-bold text-lg">
          HIGHLY BLOCKED USER
        </h1>
        <div className="relative">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors">
            <span className="text-sm text-gray-700">{timeFilter}</span>
            <ChevronDown size={16} className="text-gray-500" />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg ">
        <table className="w-full bg-white">
          <thead>
            <tr className="bg-[#5A1A15] text-white">
              <th className="text-left px-4 py-3 text-sm 2xl:text-base font-semibold">
                Sr.No
              </th>
              <th className="text-left px-4 py-3 text-sm 2xl:text-base font-semibold">
                User Name
              </th>
              <th className="text-left px-4 py-3 text-sm 2xl:text-base font-semibold">
                Blocked
              </th>
              <th className="text-left px-4 py-3 text-sm 2xl:text-base font-semibold">
                Reported content
              </th>
            </tr>
          </thead>
          <tbody>
            {BLOCKED_USERS.map((user, index) => (
              <tr
                key={user.id}
                className={`${
                  index % 2 === 1 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100 transition-colors`}
              >
                <td className="px-4 py-4 text-xs 2xl:text-sm text-gray-700">
                  {user.id}
                </td>
                <td className="px-4 py-4 text-xs 2xl:text-sm text-gray-900 font-medium">
                  {user.name}
                </td>
                <td className="px-4 py-4 text-xs 2xl:text-sm text-gray-700">
                  {user.blockedCount} Times
                </td>
                <td className="px-4 py-4 text-xs 2xl:text-sm text-gray-700">
                  {user.reportedContent}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HighlyBlockedUser;
