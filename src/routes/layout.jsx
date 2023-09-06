import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      This is the main layout
      <Outlet />
    </div>
  );
};

export default Layout;
