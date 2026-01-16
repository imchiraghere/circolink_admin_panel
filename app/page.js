"use client";
import { redirect } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";

export default function Page() {
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      redirect("/dashboard");
    } else {
      redirect("/login");
    }
  }, [user]);
}
