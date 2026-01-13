import { Outlet } from "react-router";
import Navbar from "@/src/features/shared/containers/Navbar";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Layout;
