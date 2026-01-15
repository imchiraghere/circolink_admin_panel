"use client";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const TICKETS = [
  {
    id: 6493,
    subject: "Sub: UK/USA Websites Guest Posting...",
    brief: "Some kind of inappropriate pictures..",
    author: {
      name: "Kwak Seong-Min",
      avatar: "https://picsum.photos/200?1",
    },
    status: "Open",
    date: "10/11/2025",
  },
  {
    id: 6493,
    subject: "Sub: UK/USA Websites Guest Posting...",
    brief: "vitae dicta sunt explicabo. Nemo.......",
    author: {
      name: "Mesh Rozar",
      avatar: "https://picsum.photos/200?2",
    },
    status: "Open",
    date: "29/11/2025",
  },
];

const RecentTickets = () => {
  const [timeFilter, setTimeFilter] = useState("Today");

  return (
    <div className="w-full max-w-md mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <div>
          <h1 className="text-gray-900 font-bold text-lg">RECENT TICKETS</h1>
          <p className="text-gray-600 text-xs mt-1">
            This will show the newest tickets raised
          </p>
        </div>
        <div className="relative">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors">
            <span className="text-sm text-gray-700">{timeFilter}</span>
            <ChevronDown size={16} className="text-gray-500" />
          </button>
        </div>
      </div>

      {/* Tickets List */}
      <div className="space-y-3 mt-4">
        {TICKETS.map((ticket, index) => (
          <div
            key={`${ticket.id}-${index}`}
            className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors border border-gray-200"
          >
            {/* Ticket ID */}
            <div className="text-gray-700 font-semibold text-xs 2xl:text-sm mb-2">
              #{ticket.id}
            </div>

            {/* Subject and Status */}
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-gray-900 font-medium text-xs 2xl:text-sm flex-1 pr-2">
                {ticket.subject}
              </h3>
              <div className="relative">
                <button className="flex items-center gap-1 text-red-600 text-xs 2xl:text-sm font-semibold hover:text-red-700">
                  {ticket.status}
                  <ChevronDown size={14} />
                </button>
              </div>
            </div>

            {/* Brief */}
            <p className="text-gray-600 text-xs 2xl:text-sm mb-3">
              <span className="font-semibold">Brief:</span> {ticket.brief}
            </p>

            {/* Author and Date */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-gray-600 text-xs 2xl:text-sm">By :</span>
                <img
                  src={ticket.author.avatar}
                  alt={ticket.author.name}
                  className="w-5 h-5 rounded-full object-cover"
                />
                <span className="text-gray-900 text-xs 2xl:text-sm font-medium">
                  {ticket.author.name}
                </span>
              </div>
              <span className="text-gray-600 text-xs 2xl:text-sm">
                {ticket.date}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTickets;
