import { Outlet } from "react-router";

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Outlet />
    </div>
  );
};

export default AppLayout;
