"use client";
import { Search, Bell } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { user } = useAuth();
  return (
    <>
      <div className="h-22  flex items-center bg-white relative justify-between gap-10 px-6">
        {/* Search Bar */}
        {/* <div className="flex-1 w-full">
          <div className="relative">
            <input
              type="text"
              placeholder="Search Anything Here You Need..."
              className="w-full h-10 pl-4 pr-10 text-sm text-gray-600 bg-gray-100 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 bg-primary-gradient rounded flex items-center justify-center  transition-colors">
              <Search className="w-4 h-4 text-white" />
            </button>
          </div>
        </div> */}

        {/* Right Side - Notifications and Profile */}
        <div className="flex items-center gap-4">
          {/* Notification Bell */}
          {/* <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="w-5 h-5 text-gray-700" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button> */}

          {/* User Profile */}
          <div className="flex items-center absolute right-10 gap-3">
            <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-300">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Gustavo"
                alt="admin"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-900">
                {user?.email}{" "}
              </span>
              <span className="text-xs text-white px-2 capitalize py-0.5 rounded inline-block w-fit bg-primary-gradient">
                {user?.role}{" "}
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* 
      <div className="bg-amber-400 w-full  h-30">

      </div> */}
    </>
  );
}
