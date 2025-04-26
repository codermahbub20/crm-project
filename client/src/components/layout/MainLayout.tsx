import { Menu, Moon, Sun, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { logOut, selectCurrentUser } from "../../redux/features/auth/authSlice";

const MainLayout = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      localStorage.getItem("theme") === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDarkMode(true);
    }
  };

  const handleLogout = () => {
    dispatch(logOut()); // remove user from store
    localStorage.removeItem("authToken"); // optional
    navigate("/login");
  };

  const sidebarItems = user
    ? [
        { name: "Dashboard", href: "/" },
        { name: "Create Clients", href: "/clients" },
        { name: "Create Projects", href: "/projects" },
        { name: "Create Logs", href: "/logs" },
        { name: "Add Reminders", href: "/reminders" },
      ]
    : [
        { name: "Login", href: "/login" },
        { name: "Signup", href: "/signup" },
      ];

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside
        className={`bg-white dark:bg-gray-800 w-64 p-4 space-y-4 fixed top-0 left-0 h-full transition-transform z-30 transform md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:block`}
      >
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Mini-CRM
        </h2>
        <nav className="flex flex-col space-y-2">
          {sidebarItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="text-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded"
            >
              {item.name}
            </Link>
          ))}

          {user && (
            <button
              onClick={handleLogout}
              className="text-left flex items-center gap-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900 p-2 rounded mt-4"
            >
              <LogOut size={18} /> Logout
            </button>
          )}
        </nav>
      </aside>

      {/* Overlay for small screens */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col w-full overflow-auto">
        {/* Top bar */}
        <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow-md">
          <button
            className="md:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu className="text-gray-800 dark:text-white" />
          </button>
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
            {user ? "Dashboard" : "Welcome"}
          </h1>
          <button
            onClick={toggleDarkMode}
            className="text-gray-800 dark:text-white"
          >
            {darkMode ? <Sun /> : <Moon />}
          </button>
        </header>

        {/* Render child routes */}
        <main className="p-6 space-y-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
