import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ChevronsLeft,
  SquareChevronLeft,
  IterationCw,
  Bell,
} from "lucide-react";
import PropTypes from "prop-types";
import axios from "axios";
import { url } from "../../api";
import { logout } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";

import profileImg from "../assets/user.png";

export const Header = ({ collapsed, setCollapsed }) => {
  const [modal, setModal] = useState(false);
  const [profileModal, setProfileModal] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/signin");
  };

  // Load logged-in user from localStorage
  const storedUser = localStorage.getItem("authUser");
  const user = storedUser ? JSON.parse(storedUser) : null;
  // console.log("head user", user);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No token found.");
          return;
        }

        const response = await axios.get(`${url}notification`, {
          headers: { Authorization: token },
        });

        setNotifications(response.data);
      } catch (err) {
        setError("Failed to load notifications.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <>
      <header className="relative w-full z-10 flex h-[60px] items-center justify-between bg-[#FAFAF8] px-4 border-b dark:bg-slate-900">
        <div className="flex items-center gap-x-3">
          <button
            className="btn-ghost size-10"
            onClick={() => setCollapsed(!collapsed)}
          >
            <SquareChevronLeft className={collapsed ? "rotate-180" : ""} />
          </button>
        </div>
        <div className="flex items-center gap-x-3">
          <button
            onClick={() => {
              setModal(!modal);
              setProfileModal(false);
              setClicked(true);
            }}
            className="btn-ghost relative size-10"
          >
            <Bell size={20} />
            {!clicked && (
              <div className="absolute right-1 top-2 h-[8px] w-[8px] rounded-full bg-red-700"></div>
            )}
          </button>
          <div
            onClick={() => setProfileModal(true)}
            className="flex flex-row gap-2 justify-center items-center"
          >
            <div className="size-10 overflow-hidden rounded-md">
              <img
                src={profileImg}
                alt="profile image"
                className="size-full object-cover"
              />
            </div>
            <div className="md:flex hidden justify-start items-start flex-col">
              <p className="text-center text-sm font-semibold">
                {user?.fullName}
              </p>
              <p className="text-center text-xs capitalize">{user?.role}</p>
            </div>
          </div>
        </div>
      </header>

      {modal && (
        <div className="absolute md:right-10 right-3 top-[70px] w-full max-w-xs md:max-w-sm z-10">
          <div className="flex flex-col rounded-md bg-white p-4 shadow-md h-[300px] w-full md:w-[400px]">
            {/* Header */}
            <div className="flex items-center justify-between border-b-2 border-gray-200 pb-2">
              <h2 className="text-md font-semibold">NOTIFICATIONS</h2>
              <button
                onClick={() => setModal(false)}
                className="btn-ghost size-8"
              >
                ✕
              </button>
            </div>

            {/* Content Wrapper with Scroll */}
            <div className="flex-1 overflow-y-auto mt-2">
              {loading ? (
                <p className="py-4 text-center">Loading notifications...</p>
              ) : error ? (
                <p className="py-4 text-center text-red-500">{error}</p>
              ) : notifications.length === 0 ? (
                <p className="py-4 text-center text-gray-500">
                  No notifications found.
                </p>
              ) : (
                <ul className="space-y-2">
                  {notifications.map((notification, index) => (
                    <li key={index} className="rounded-md border p-2 text-sm">
                      {notification.message}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}

      {profileModal && (
        <div className="absolute right-3 top-[60px] max-w-xs md:max-w-sm z-10">
          <div className="flex flex-col items-center rounded-md bg-white p-4 shadow-md w-[250px]">
            <div className="size-10 overflow-hidden rounded-full">
              <img
                src={profileImg}
                alt="profile image"
                className="size-full object-cover"
              />
            </div>
            <h2 className="font-kanit text-center text-sm font-semibold text-[#003366 ]">
              {user?.fullName.toUpperCase()}
            </h2>
            <p className="text-xs mb-2">{user?.email}</p>
            <button
              onClick={() => {
                navigate("/dashboard/profile-settings"), setProfileModal(false);
              }}
              className="flex text-xs text-center hover:bg-white bg-slate-100 p-2 w-full border-2 border-gray-300 rounded-lg justify-center items-center gap-x-2 mb-2"
            >
              Manage your account
            </button>
            {/* <div className="flex flex-col justify-start gap-4 border-y-2 border-gray-200 py-2 w-full">
              <Link
                to="/dashboard/membership"
                onClick={() => setProfileModal(false)}
                className="w-full text-sm font-semibold text-[#003366 ] hover:underline"
              >
                Organizations
              </Link>
              <Link
                to="/dashboard/all-events"
                onClick={() => setProfileModal(false)}
                className="w-full text-sm font-semibold text-[#003366 ] hover:underline"
              >
                Events
              </Link>
              <Link
                to="/settings"
                className="w-full text-sm font-semibold text-[#003366 ] hover:underline"
              >
                Send Feedback
              </Link>
            </div> */}
            <button
              onClick={() => {
                handleLogout();
                setProfileModal(false);
              }}
              className="w-full text-start text-sm my-2 font-semibold text-[#003366 ] hover:underline"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </>
  );
};

Header.propTypes = {
  collapsed: PropTypes.bool.isRequired,
  setCollapsed: PropTypes.func.isRequired,
};
