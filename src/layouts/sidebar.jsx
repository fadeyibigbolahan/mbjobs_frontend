import { forwardRef } from "react";
import { NavLink } from "react-router-dom";

import {
  navbarLinks,
  employerNavbarLinks,
  apprenticeNavbarLinks,
} from "../constants";

import logoipsumm from "../assets/logoipsumm.png";

import { cn } from "../utils/cn";

import PropTypes from "prop-types";

export const Sidebar = forwardRef(({ collapsed }, ref) => {
  // Load logged-in user from localStorage
  const storedUser = localStorage.getItem("authUser");
  const user = storedUser ? JSON.parse(storedUser) : null;

  return (
    <aside
      ref={ref}
      className={cn(
        "fixed z-[100] flex h-full w-[240px] flex-col overflow-x-hidden border-r border-slate-300 bg-[#2563EB] [transition:_width_300ms_cubic-bezier(0.4,_0,_0.2,_1),_left_300ms_cubic-bezier(0.4,_0,_0.2,_1),_background-color_150ms_cubic-bezier(0.4,_0,_0.2,_1),_border_150ms_cubic-bezier(0.4,_0,_0.2,_1)] dark:border-slate-700 dark:bg-slate-900",
        collapsed ? "md:w-[70px] md:items-center" : "md:w-[240px]",
        collapsed ? "max-md:-left-full" : "max-md:left-0"
      )}
    >
      <div className="flex h-[60px] border-b items-center justify-center gap-x-3 p-3 bg-[#F8F8FA]">
        <img
          src={logoipsumm}
          alt="fagis"
          style={{ width: "100px" }}
          className="dark:hidden"
        />
        <img
          src={logoipsumm}
          alt="fagis"
          style={{ width: "100px" }}
          className="hidden dark:block"
        />
        {/* {!collapsed && <p className="text-lg font-medium text-slate-900 transition-colors dark:text-slate-50">Food World Global</p>} */}
      </div>
      <div className="flex w-full flex-col gap-y-8 my-4 overflow-y-auto overflow-x-hidden pl-3 [scrollbar-width:_thin]">
        {user?.role == "employer" &&
          employerNavbarLinks.map((navbarLink) => (
            <nav
              key={navbarLink.title}
              className={cn(
                "sidebar-group text-white",
                collapsed && "md:items-center text-white"
              )}
            >
              <p
                className={cn(
                  "sidebar-group-title text-white",
                  collapsed && "md:w-[45px] text-white"
                )}
              >
                {navbarLink.title}
              </p>
              {navbarLink.links.map((link) => (
                <NavLink
                  key={link.label}
                  to={link.path}
                  className={({ isActive }) =>
                    cn(
                      "sidebar-item font-kanit text-white hover:bg-black",
                      isActive &&
                        "bg-[#000000] text-slate-50 dark:bg-[#000000] border-l-4 border-[#FFFFFF] rounded-l-md hover:bg-black",
                      collapsed && "md:w-[45px]"
                    )
                  }
                >
                  <link.icon size={18} className="flex-shrink-0" />
                  {!collapsed && (
                    <p className="whitespace-nowrap">{link.label}</p>
                  )}
                </NavLink>
              ))}
            </nav>
          ))}

        {user?.role == "apprentice" &&
          apprenticeNavbarLinks.map((navbarLink) => (
            <nav
              key={navbarLink.title}
              className={cn(
                "sidebar-group text-white",
                collapsed && "md:items-center text-white"
              )}
            >
              <p
                className={cn(
                  "sidebar-group-title text-white",
                  collapsed && "md:w-[45px] text-white"
                )}
              >
                {navbarLink.title}
              </p>
              {navbarLink.links.map((link) => (
                <NavLink
                  key={link.label}
                  to={link.path}
                  className={({ isActive }) =>
                    cn(
                      "sidebar-item font-kanit text-white hover:bg-black",
                      isActive &&
                        "bg-[#000000] text-slate-50 dark:bg-[#000000] border-l-4 border-[#FFFFFF] rounded-l-md hover:bg-black",
                      collapsed && "md:w-[45px]"
                    )
                  }
                >
                  <link.icon size={18} className="flex-shrink-0" />
                  {!collapsed && (
                    <p className="whitespace-nowrap">{link.label}</p>
                  )}
                </NavLink>
              ))}
            </nav>
          ))}
      </div>
    </aside>
  );
});

Sidebar.displayName = "Sidebar";

Sidebar.propTypes = {
  collapsed: PropTypes.bool,
};
