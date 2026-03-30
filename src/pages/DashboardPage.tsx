import { useAuthStore } from "../features/auth/authStore";

const DashboardPage = () => {
  const logout = useAuthStore((s) => s.logout);

  return (
    <div className="p-10">
      <h1>Dashboard</h1>

      <button onClick={logout} className="bg-red-500 text-white px-4 py-2 mt-4">
        Logout
      </button>
    </div>
  );
};

export default DashboardPage;
