import Navbar from "../components/dashboard/Navbar";
import Sidebar from "../components/dashboard/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="h-screen flex">
      {/* Sidebar - Full Height */}
      <aside className="w-64 fixed left-0 top-0 h-full">
        <Sidebar />
      </aside>

      {/* Right Side */}
      <div className="ml-64 flex-1 flex flex-col">
        {/* Navbar - Not Full Width */}
        <header className="fixed top-0 left-64  right-0 z-50">
          <Navbar />
        </header>

        {/* Main Content */}
        <main className="mt-20 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
