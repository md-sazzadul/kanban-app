import { useTaskStore } from "../task/taskStore";

const SearchBar = () => {
  const searchQuery = useTaskStore((s) => s.searchQuery);
  const setSearchQuery = useTaskStore((s) => s.setSearchQuery);

  return (
    <div className="px-5 py-2.5">
      <div className="relative flex items-center max-w-85">
        {/* Search icon */}
        <svg
          className="absolute left-3 text-black/30 dark:text-white/30 pointer-events-none shrink-0"
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>

        <input
          type="text"
          placeholder="Search tasks…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-8.5 pr-8 py-2 text-[13.5px] text-[#1a1a2e] dark:text-white/85 bg-black/4 dark:bg-white/5 border border-black/8 dark:border-white/8 rounded-[9px] outline-none transition-all duration-200 placeholder:text-black/30 dark:placeholder:text-white/25 focus:bg-white dark:focus:bg-[rgba(79,110,247,0.08)] focus:border-[rgba(79,110,247,0.5)] focus:shadow-[0_0_0_3px_rgba(79,110,247,0.1)]"
        />

        {/* Clear button */}
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            aria-label="Clear search"
            className="absolute right-2 w-5.5 h-5.5 flex items-center justify-center text-black/35 dark:text-white/35 bg-black/6 dark:bg-white/8 rounded-full border-none cursor-pointer transition-all duration-150 hover:bg-black/12 hover:text-black/60 dark:hover:bg-white/[0.14] dark:hover:text-white/70"
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
