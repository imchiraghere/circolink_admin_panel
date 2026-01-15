"use client";
import React, { useState } from "react";
import { ChevronDown, Heart, Bookmark, Send, Play } from "lucide-react";

const VIDEOS = [
  {
    id: 1,
    image: "https://picsum.photos/400/300?7",
    title: "Gorem ipsum dolor",
    location: "London, United States",
    likes: "6.6k",
    bookmarks: "6.6k",
    shares: "6.6k",
    timeAgo: "4 Hours ago",
  },
  {
    id: 2,
    image: "https://picsum.photos/400/300?8",
    title: "Gorem ipsum dolor",
    location: "London, United States",
    likes: "6.6k",
    bookmarks: "6.6k",
    shares: "6.6k",
    timeAgo: "4 Hours ago",
  },
  {
    id: 3,
    image: "https://picsum.photos/400/300?9",
    title: "Gorem ipsum dolor",
    location: "London, United States",
    likes: "6.6k",
    bookmarks: "6.6k",
    shares: "6.6k",
    timeAgo: "4 Hours ago",
  },
  {
    id: 4,
    image: "https://picsum.photos/400/300?10",
    title: "Gorem ipsum dolor",
    location: "London, United States",
    likes: "6.6k",
    bookmarks: "6.6k",
    shares: "6.6k",
    timeAgo: "4 Hours ago",
  },
  {
    id: 5,
    image: "https://picsum.photos/400/300?11",
    title: "Gorem ipsum dolor",
    location: "London, United States",
    likes: "6.6k",
    bookmarks: "6.6k",
    shares: "6.6k",
    timeAgo: "4 Hours ago",
  },
  {
    id: 6,
    image: "https://picsum.photos/400/300?12",
    title: "Gorem ipsum dolor",
    location: "London, United States",
    likes: "6.6k",
    bookmarks: "6.6k",
    shares: "6.6k",
    timeAgo: "4 Hours ago",
  },
];

const TrendingPosts = () => {
  const [timeFilter, setTimeFilter] = useState("Today");

  return (
    <div className="w-full max-w-5xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-2">
        <div>
          <h1 className="text-[#5A1A15] font-bold text-lg">TRENDING PHOTOS</h1>
          <p className="text-gray-600 text-xs mt-1">Trending videos of today</p>
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
        {VIDEOS?.map((video) => (
          <div
            key={video.id}
            className="relative rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-gray-900"
          >
            {/* Image */}
            <div className="aspect-[4/3] relative">
              <img
                src={video.image}
                alt={video.title}
                className="w-full h-full object-cover"
              />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

              {/* Stats Overlay - Top Left */}
              <div className="absolute top-3 left-3 space-y-2 z-10">
                <div className="flex items-center gap-2 text-white">
                  <Heart size={16} fill="white" />
                  <span className="text-xs 2xl:text-sm font-semibold">
                    {video.likes}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <Bookmark size={16} fill="white" />
                  <span className="text-xs 2xl:text-sm font-semibold">
                    {video.bookmarks}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <Send size={16} fill="white" />
                  <span className="text-xs 2xl:text-sm font-semibold">
                    {video.shares}
                  </span>
                </div>
              </div>

              {/* Time Badge - Top Right */}
              <div className="absolute top-2 right-2 px-2 py-1 scale-80 2xl:scale-100 bg-white/50 backdrop-blur-sm rounded-full">
                <span className="text-xs text-gray-700 ">{video.timeAgo}</span>
              </div>

              <section className="absolute inset-0 flex items-center justify-center z-10">
                {/* Play Button - Center */}
                <div className=" flex items-center justify-center z-10">
                  <button className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg">
                    <Play size={20} fill="black" className="text-black ml-1" />
                  </button>
                </div>

                {/* Title & Location - Bottom Left */}
                <div className=" left-3 right-3 z-10">
                  <h3 className="text-white font-semibold text-sm 2xl:text-base mb-1">
                    {video.title}
                  </h3>
                  <p className="text-white/80 text-xs 2xl:text-sm">
                    {video.location}
                  </p>
                </div>
              </section>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingPosts;
