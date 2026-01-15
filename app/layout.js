"use client";

import "./globals.css";
import { Poppins } from "next/font/google";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "./loading";
import { AuthProvider } from "../context/AuthContext";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  // hide layout on dashboard + login
  const hideLayout =
    pathname?.startsWith("/dashboard") || pathname === "/login";

  // useEffect(() => {
  //   setLoading(true);
  //   const timeout = setTimeout(() => {
  //     setLoading(false);
  //   }, 600);

  //   return () => clearTimeout(timeout);
  // }, [pathname]);

  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans antialiased`}>
        <AuthProvider>
          {loading ? (
            <Loading />
          ) : hideLayout ? (
            // Only page content (no header/footer)
            <main>{children}</main>
          ) : (
            // Normal public layout
            <div className="min-h-screen flex flex-col">
              <main className="flex-1">{children}</main>
            </div>
          )}
        </AuthProvider>
      </body>
    </html>
  );
}
