import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../stores/auth";
import { useState } from "react";

export default function AppLayout() {
  const logout = useAuth((s) => s.logout);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Sidebar */}
      <aside className={`bg-white dark:bg-gray-800 shadow-lg w-64 p-5 flex flex-col ${open ? "block" : "hidden"} sm:block`}>
        <h1 className="text-xl font-bold text-brand mb-6">SaaS Analytics</h1>
        <nav className="flex flex-col gap-2">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `px-3 py-2 rounded transition ${
                isActive
                  ? "bg-brand text-white"
                  : "hover:bg-gray-200 dark:hover:bg-gray-700"
              }`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/customers"
            className={({ isActive }) =>
              `px-3 py-2 rounded transition ${
                isActive
                  ? "bg-brand text-white"
                  : "hover:bg-gray-200 dark:hover:bg-gray-700"
              }`
            }
          >
            Customers
          </NavLink>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `px-3 py-2 rounded transition ${
                isActive
                  ? "bg-brand text-white"
                  : "hover:bg-gray-200 dark:hover:bg-gray-700"
              }`
            }
          >
            Settings
          </NavLink>
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="flex justify-between items-center bg-white dark:bg-gray-800 shadow px-4 py-2">
          <button className="sm:hidden p-2" onClick={() => setOpen(!open)}>☰</button>
          <button
            onClick={() => { logout(); navigate("/login"); }}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Log out
          </button>
        </header>

        {/* Content */}
        <main className="p-6 overflow-y-auto flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
