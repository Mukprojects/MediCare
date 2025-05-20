
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ScrollArea } from "@/components/ui/scroll-area";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <ScrollArea className="flex-1">
        <Outlet />
      </ScrollArea>
      <Footer />
    </div>
  );
};

export default Layout;
