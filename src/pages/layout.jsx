import { Outlet } from "react-router-dom";
import { useMediaQuery } from "@uidotdev/usehooks";
import { useClickOutside } from "../hooks/use-click-outside";
import { Sidebar } from "../layouts/sidebar";
import { Header } from "../layouts/header";
import { cn } from "../utils/cn";
import { useEffect, useRef, useState } from "react";
import { Footer } from "@/layouts/footer";

const Layout = () => {
  const isDesktopDevice = useMediaQuery("(min-width: 768px)");
  const [collapsed, setCollapsed] = useState(!isDesktopDevice);

  const sidebarRef = useRef(null);

  useEffect(() => {
    setCollapsed(!isDesktopDevice);
  }, [isDesktopDevice]);

  useClickOutside([sidebarRef], () => {
    if (!isDesktopDevice && !collapsed) {
      setCollapsed(true);
    }
  });

  return (
    <div className="min-h-screen bg-slate-100 transition-colors dark:bg-slate-950">
      <div
        className={cn(
          "pointer-events-none fixed inset-0 -z-10 bg-black opacity-0 transition-opacity",
          !collapsed &&
            "max-md:pointer-events-auto max-md:z-50 max-md:opacity-30"
        )}
      />
      <Sidebar ref={sidebarRef} collapsed={collapsed} />

      {/* Main content area with fixed header */}
      <div
        className={cn(
          "transition-[margin] duration-300",
          collapsed ? "md:ml-[70px]" : "md:ml-[240px]"
        )}
      >
        {/* Fixed Header */}
        <div
          className="fixed top-0 left-0 right-0 z-40 transition-[left] duration-300"
          style={{
            left: collapsed ? "70px" : "240px",
            width: collapsed ? "calc(100% - 70px)" : "calc(100% - 240px)",
          }}
        >
          <Header collapsed={collapsed} setCollapsed={setCollapsed} />
        </div>

        {/* Content area with padding to account for fixed header */}
        <div
          className="pt-16" // Add top padding equal to header height
          style={{ minHeight: "calc(100vh - 4rem)" }} // Ensure content area fills screen
        >
          <div className="overflow-y-auto overflow-x-hidden p-6 bg-white">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
