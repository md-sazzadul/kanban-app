import { useNavigate } from "react-router";
import ThemeToggle from "../../components/ThemeToggle";
import { useAuthStore } from "../auth/authStore";
import PriorityFilter from "../filter/PriorityFilter";
import SearchBar from "../search/SearchBar";
import { useBoardStore } from "./boardStore";

const BoardHeader = () => {
  const boards = useBoardStore((s) => s.boards);
  const activeBoardId = useBoardStore((s) => s.activeBoardId);
  const setActiveBoard = useBoardStore((s) => s.setActiveBoard);
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-white dark:bg-[#111118] border-b border-black/[0.07] dark:border-white/[0.07] sticky top-0 z-50 shadow-[0_1px_12px_rgba(0,0,0,0.06)] dark:shadow-[0_1px_12px_rgba(0,0,0,0.3)]">
      {/* Top bar */}
      <div className="flex items-center h-13.5 px-5 gap-2">
        {/* Brand */}
        <div className="flex items-center gap-2 mr-4 shrink-0">
          <div className="w-7.5 h-7.5 rounded-lg bg-linear-to-br from-[#4f6ef7] to-[#7c3aed] flex items-center justify-center text-white shadow-[0_2px_8px_rgba(79,110,247,0.35)] shrink-0">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <rect
                x="3"
                y="3"
                width="7"
                height="18"
                rx="1.5"
                fill="currentColor"
                opacity="0.9"
              />
              <rect
                x="14"
                y="3"
                width="7"
                height="11"
                rx="1.5"
                fill="currentColor"
                opacity="0.7"
              />
              <rect
                x="14"
                y="17"
                width="7"
                height="4"
                rx="1.5"
                fill="currentColor"
                opacity="0.4"
              />
            </svg>
          </div>
          <span className="text-[15px] font-semibold tracking-tight text-[#1a1a2e] dark:text-white/90">
            Kanban
          </span>
        </div>

        {/* Board tabs */}
        <nav className="flex gap-0.5 flex-1">
          {boards.map((b) => (
            <button
              key={b.id}
              onClick={() => setActiveBoard(b.id)}
              className={`relative px-3.5 py-1.5 text-[13.5px] font-medium rounded-lg border-none cursor-pointer transition-all duration-150 tracking-tight
                ${
                  activeBoardId === b.id
                    ? "bg-[rgba(79,110,247,0.1)] text-[#4f6ef7] font-semibold dark:bg-[rgba(79,110,247,0.15)] dark:text-[#818cf8]"
                    : "bg-transparent text-black/50 dark:text-white/45 hover:bg-[rgba(79,110,247,0.08)] hover:text-[#4f6ef7] dark:hover:bg-[rgba(79,110,247,0.12)] dark:hover:text-[#818cf8]"
                }`}
            >
              {b.title}
              {activeBoardId === b.id && (
                <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#4f6ef7] rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 ml-auto shrink-0">
          <ThemeToggle />
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-medium text-black/45 dark:text-white/40 bg-transparent border border-black/10 dark:border-white/10 rounded-lg cursor-pointer transition-all duration-150 hover:bg-red-500/8 hover:text-red-500 hover:border-red-500/20"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            <span>Sign out</span>
          </button>
        </div>
      </div>

      {/* Controls bar */}
      <div className="border-t border-black/5 dark:border-white/5">
        <SearchBar />
        <PriorityFilter />
      </div>
    </header>
  );
};

export default BoardHeader;
