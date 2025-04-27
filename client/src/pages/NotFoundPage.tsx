const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 text-white">
      <div className="text-6xl font-bold mb-4">404</div>
      <p className="text-2xl mb-4">Oops! Page not found.</p>
      <div className="mb-6">
        <img
          src="https://www.freeiconspng.com/uploads/error-icon-png-13.png"
          alt="404 Error"
          className="w-32 h-32"
        />
      </div>
      <button
        onClick={() => (window.location.href = "/")}
        className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all duration-300"
      >
        Go Back Home
      </button>
    </div>
  );
};

export default NotFoundPage;
