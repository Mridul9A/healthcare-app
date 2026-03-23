import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Users,
  BarChart3,
  Moon,
  Sun,
  Menu,
  X,
} from "lucide-react";

export default function MainLayout({ children }: any) {
  const [dark, setDark] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setDark(isDark);
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    const isDark = root.classList.contains("dark");

    if (isDark) {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDark(false);
    } else {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDark(true);
    }
  };

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Patients", path: "/patients", icon: Users },
    { name: "Analytics", path: "/analytics", icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">

      {/* MOBILE HEADER */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow">
        <button onClick={() => setOpen(true)}>
          <Menu />
        </button>

        <h1 className="font-semibold">Healthcare</h1>

        <button onClick={toggleTheme}>
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>

      <div className="flex">

        {/* SIDEBAR */}
        <div
          className={`
          fixed md:relative z-50 top-0 left-0 h-full w-64
          bg-white dark:bg-gray-900
          border-r border-gray-200 dark:border-gray-800
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
        >
          <div className="p-5 flex flex-col h-full">

            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Healthcare</h2>

              <button
                className="md:hidden"
                onClick={() => setOpen(false)}
              >
                <X />
              </button>
            </div>

            <button
              onClick={toggleTheme}
              className="mb-6 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800"
            >
              {dark ? "Light Mode" : "Dark Mode"}
            </button>

            <nav className="flex flex-col gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = location.pathname === item.path;

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 px-4 py-2 rounded-lg ${
                      active
                        ? "bg-blue-500 text-white"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    <Icon size={18} />
                    {item.name}
                  </Link>
                );
              })}
            </nav>

          </div>
        </div>

        {/* OVERLAY */}
        {open && (
          <div
            className="fixed inset-0 bg-black/40 md:hidden"
            onClick={() => setOpen(false)}
          />
        )}

        {/* MAIN CONTENT (FIXED) */}
        <div className="flex-1 w-full md:ml-0 p-4 md:p-6">
          {children}
        </div>

      </div>
    </div>
  );
}