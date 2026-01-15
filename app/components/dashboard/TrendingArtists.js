"use client";
import React, { useState } from "react";
import { ChevronDown, Heart, Bookmark, Send } from "lucide-react";

const ARTISTS = [
  {
    id: 1,
    image: "https://picsum.photos/400/300?1",
    likes: "6.6k",
    bookmarks: "6.6k",
    shares: "6.6k",
    timeAgo: "4 Hours ago",
  },
  {
    id: 2,
    image: "https://picsum.photos/400/300?2",
    likes: "6.6k",
    bookmarks: "6.6k",
    shares: "6.6k",
    timeAgo: "4 Hours ago",
  },
  {
    id: 3,
    image: "https://picsum.photos/400/300?3",
    likes: "6.6k",
    bookmarks: "6.6k",
    shares: "6.6k",
    timeAgo: "4 Hours ago",
  },
  {
    id: 4,
    image: "https://picsum.photos/400/300?4",
    likes: "6.6k",
    bookmarks: "6.6k",
    shares: "6.6k",
    timeAgo: "4 Hours ago",
  },
  {
    id: 5,
    image: "https://picsum.photos/400/300?5",
    likes: "6.6k",
    bookmarks: "6.6k",
    shares: "6.6k",
    timeAgo: "4 Hours ago",
  },
  {
    id: 6,
    image: "https://picsum.photos/400/300?6",
    likes: "6.6k",
    bookmarks: "6.6k",
    shares: "6.6k",
    timeAgo: "4 Hours ago",
  },
];

const TrendingArtists = () => {
  const [timeFilter, setTimeFilter] = useState("Today");

  return (
    <div className="w-full max-w-5xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-2">
        <div>
          <h1 className="text-[#5A1A15] font-bold text-lg">
            TRENDING ARTISTS/CHANNELS
          </h1>
          <p className="text-gray-600 text-xs mt-1">
            Trending Artists/Channels of today
          </p>
        </div>
        <div className="relative">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors">
            <span className="text-sm text-gray-700">{timeFilter}</span>
            <ChevronDown size={16} className="text-gray-500" />
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {ARTISTS.map((artist) => (
          <div
            key={artist.id}
            className="relative rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-gray-200"
          >
            {/* Image */}
            <div className="aspect-[4/3] relative">
              <img
                src={artist.image}
                alt={`Artist ${artist.id}`}
                className="w-full h-full object-cover"
              />

              {/* Stats Overlay */}
              <div className="absolute top-3 left-3 space-y-2">
                <div className="flex items-center gap-2 text-black">
                  <Heart size={16} fill="black" />
                  <span className="text-xs 2xl:text-sm font-semibold">
                    {artist.likes}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-black">
                  <Bookmark size={16} fill="black" />
                  <span className="text-xs 2xl:text-sm font-semibold">
                    {artist.bookmarks}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-black">
                  <Send size={16} fill="black" />
                  <span className="text-xs 2xl:text-sm font-semibold">
                    {artist.shares}
                  </span>
                </div>
              </div>

              {/* Time Ago */}
              <div className="absolute top-2 right-2 px-2 py-1 scale-80 2xl:scale-100 bg-white/50 backdrop-blur-sm rounded-full">
                <span className="text-xs text-gray-700 ">
                  {artist.timeAgo}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingArtists;
