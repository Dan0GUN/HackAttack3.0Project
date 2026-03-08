import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-64 bg-white text-black h-screen p-6">

      <h1 className="text-2xl font-bold mb-10">
        Starter
      </h1>

      <nav className="space-y-4">

        <Link
          to="/dashboard"
          className="block p-2 rounded hover:bg-gray-700"
        >
          Dashboard
        </Link>

        <Link
          to="/profile"
          className="block p-2 rounded hover:bg-gray-700"
        >
          Profile
        </Link>

      </nav>

    </div>
  );
}

export default Sidebar;