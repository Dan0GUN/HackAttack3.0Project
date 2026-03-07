import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";

import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

function Dashboard() {

  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (

    <Layout>

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>

      </div>

      <div className="bg-white p-6 rounded-lg shadow">

        <h2 className="text-xl font-semibold mb-2">
          Welcome {user?.displayName || user?.email}
        </h2>

        <p className="text-gray-500">
          This is your dashboard.
        </p>

      </div>

    </Layout>

  );
}

export default Dashboard;