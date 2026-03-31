import { useAuthStore } from "../features/auth/authStore";
import { useBoardStore } from "../features/board/boardStore";

const DashboardPage = () => {
  const logout = useAuthStore((s) => s.logout);
  const boards = useBoardStore((s) => s.boards);

  return (
    <div className="p-10">
      <h1 className="text-xl mb-4">Boards</h1>

      {boards.map((b) => (
        <div key={b.id} className="p-3 bg-white shadow mb-2">
          {b.title}
        </div>
      ))}

      <button onClick={logout} className="bg-red-500 text-white px-4 py-2 mt-4">
        Logout
      </button>
    </div>
  );
};

export default DashboardPage;
