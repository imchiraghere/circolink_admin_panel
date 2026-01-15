"use client";
import { useEffect, useState } from "react";
import DashboardStats from "../components/dashboard/DashboardStats";
import HighlyBlockedUser from "../components/dashboard/HighlyBlockedUsers";
import ListOfUsers from "../components/dashboard/ListOfUsers";
import RecentTickets from "../components/dashboard/RecentTickets";
import TrendingArtists from "../components/dashboard/TrendingArtists";
import TrendingPosts from "../components/dashboard/TrendingPosts";
import { DASHBOARD_STATS } from "../constants/data";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);



  return (
    <div>
      <DashboardStats />
      <ListOfUsers />
      <section className="flex  max-w-6xl ">
        <HighlyBlockedUser />
        <RecentTickets />
      </section>

      <section className="flex  max-w-6xl ">
        <TrendingArtists />
        <TrendingPosts />
      </section>
    </div>
  );
}
