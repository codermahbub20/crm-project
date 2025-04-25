const Dashboard = () => {
  return (
    <div>
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
  );
};

export default Dashboard;
