import { Menu, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const MainLayout = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
          {["Dashboard", "Clients", "Projects", "Logs", "Reminders"].map(
            (item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded"
              >
                {item}
              </a>
            )
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
            Dashboard
          </h1>
          <button
            onClick={toggleDarkMode}
            className="text-gray-800 dark:text-white"
          >
            {darkMode ? <Sun /> : <Moon />}
          </button>
        </header>

        {/* Content */}
        <main className="p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Total Clients
              </h3>
              <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                24
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Total Projects
              </h3>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                12
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Reminders Due
              </h3>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                5
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Ongoing
              </h3>
              <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                3
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
