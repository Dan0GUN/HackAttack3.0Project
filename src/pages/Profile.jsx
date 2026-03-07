import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";

function Profile() {

  const { user } = useAuth();

  return (

    <Layout>

      <h1 className="text-3xl font-bold mb-6">
        Profile
      </h1>

      <div className="bg-white p-6 rounded-lg shadow text-center">

        <img
          src={user.photoURL}
          className="w-20 h-20 rounded-full mx-auto mb-4"
        />

        <p className="font-bold">
          {user.displayName}
        </p>

        <p className="text-gray-500">
          {user.email}
        </p>

      </div>

    </Layout>

  );
}

export default Profile;