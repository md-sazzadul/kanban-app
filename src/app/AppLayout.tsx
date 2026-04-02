import { Outlet } from "react-router";

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0d0d14]">
      <Outlet />
    </div>
  );
};

export default AppLayout;
