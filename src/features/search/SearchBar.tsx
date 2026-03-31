import { useTaskStore } from "../task/taskStore";

const SearchBar = () => {
  const searchQuery = useTaskStore((s) => s.searchQuery);
  const setSearchQuery = useTaskStore((s) => s.setSearchQuery);

  return (
    <div className="p-4 bg-white dark:bg-gray-900 shadow">
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full max-w-md px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
      />
      {searchQuery && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Searching for: "{searchQuery}"
        </p>
      )}
    </div>
  );
};

export default SearchBar;
